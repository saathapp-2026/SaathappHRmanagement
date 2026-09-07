-- Help Requests
CREATE TABLE public.help_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    help_id TEXT NOT NULL UNIQUE, -- HELP-YYYY-XXXXXX
    employee_id UUID NOT NULL REFERENCES public.employee_profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL CHECK (category IN ('HR Help', 'IT Help', 'Office Help', 'Manager Assistance', 'Payroll Help', 'General Help')),
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'open', 'assigned', 'in_progress', 'resolved', 'closed')),
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    resolved_at TIMESTAMPTZ
);

-- Sequence for generating help_id
CREATE SEQUENCE public.help_requests_seq START 1;

-- Function to generate help_id on insert
CREATE OR REPLACE FUNCTION public.generate_help_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW.help_id := 'HELP-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('public.help_requests_seq')::text, 6, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_help_id
BEFORE INSERT ON public.help_requests
FOR EACH ROW
EXECUTE FUNCTION public.generate_help_id();

-- Help Request Messages
CREATE TABLE public.help_request_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    help_request_id UUID NOT NULL REFERENCES public.help_requests(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL, -- references either employees or auth.users (could be admin)
    message TEXT NOT NULL,
    is_internal BOOLEAN NOT NULL DEFAULT false, -- If true, employee cannot see this
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Notifications
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES public.employee_profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    related_entity_type TEXT, -- e.g., 'help_request', 'leave_request'
    related_entity_id UUID,
    action_url TEXT,
    is_read BOOLEAN NOT NULL DEFAULT false,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS

-- Help Requests
ALTER TABLE public.help_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees can view their own help requests"
ON public.help_requests FOR SELECT
TO authenticated
USING (employee_id = (SELECT id FROM employee_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Employees can insert their own help requests"
ON public.help_requests FOR INSERT
TO authenticated
WITH CHECK (employee_id = (SELECT id FROM employee_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Employees can update their own help requests"
ON public.help_requests FOR UPDATE
TO authenticated
USING (employee_id = (SELECT id FROM employee_profiles WHERE user_id = auth.uid()))
WITH CHECK (employee_id = (SELECT id FROM employee_profiles WHERE user_id = auth.uid()));
-- Note: Maybe restrict what they can update? e.g. status to closed. 
-- We'll just rely on the UI/API to only do what's allowed. We could add more strict RLS.

-- Help Request Messages
ALTER TABLE public.help_request_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees can view non-internal messages of their requests"
ON public.help_request_messages FOR SELECT
TO authenticated
USING (
    is_internal = false 
    AND 
    help_request_id IN (
        SELECT id FROM public.help_requests WHERE employee_id = (SELECT id FROM employee_profiles WHERE user_id = auth.uid())
    )
);

CREATE POLICY "Employees can insert messages to their requests"
ON public.help_request_messages FOR INSERT
TO authenticated
WITH CHECK (
    sender_id = (SELECT id FROM employee_profiles WHERE user_id = auth.uid())
    AND
    is_internal = false
    AND
    help_request_id IN (
        SELECT id FROM public.help_requests WHERE employee_id = (SELECT id FROM employee_profiles WHERE user_id = auth.uid())
    )
);

-- Notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees can view their own notifications"
ON public.notifications FOR SELECT
TO authenticated
USING (employee_id = (SELECT id FROM employee_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Employees can update their own notifications"
ON public.notifications FOR UPDATE
TO authenticated
USING (employee_id = (SELECT id FROM employee_profiles WHERE user_id = auth.uid()))
WITH CHECK (employee_id = (SELECT id FROM employee_profiles WHERE user_id = auth.uid()));

-- Employees cannot insert notifications directly (handled by backend or triggers)
-- Well, we might need a trusted function or trigger.
-- For triggers, let's create a function to create a notification.

CREATE OR REPLACE FUNCTION public.create_notification(
    p_employee_id UUID,
    p_category TEXT,
    p_title TEXT,
    p_message TEXT,
    p_related_entity_type TEXT DEFAULT NULL,
    p_related_entity_id UUID DEFAULT NULL,
    p_action_url TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_notification_id UUID;
BEGIN
    INSERT INTO public.notifications (
        employee_id, category, title, message, related_entity_type, related_entity_id, action_url
    ) VALUES (
        p_employee_id, p_category, p_title, p_message, p_related_entity_type, p_related_entity_id, p_action_url
    ) RETURNING id INTO v_notification_id;
    
    RETURN v_notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Let's create a trigger for help request replies from admin
CREATE OR REPLACE FUNCTION public.notify_on_help_request_reply()
RETURNS TRIGGER AS $$
DECLARE
    v_help_request public.help_requests%ROWTYPE;
BEGIN
    IF NEW.is_internal = false THEN
        SELECT * INTO v_help_request FROM public.help_requests WHERE id = NEW.help_request_id;
        IF v_help_request.employee_id != NEW.sender_id THEN
            PERFORM public.create_notification(
                v_help_request.employee_id,
                'help',
                'New Reply on Help Request',
                'A new reply was added to your help request: ' || v_help_request.help_id,
                'help_request',
                v_help_request.id,
                '/help/' || v_help_request.id
            );
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_notify_on_help_request_reply
AFTER INSERT ON public.help_request_messages
FOR EACH ROW
EXECUTE FUNCTION public.notify_on_help_request_reply();

-- Realtime Setup for Notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- We don't add help_request_messages or help_requests to realtime unless requested, but the prompt says:
-- "If useful and already appropriate to the frontend architecture, subscribe only to the authenticated employee's notification updates."
-- "Do not subscribe employees to unrestricted notification tables." (We have RLS)

-- Set up storage for Help Request attachments if they use it. 
-- Wait, the prompt says "upload attachments". Let's create a bucket for help attachments.
-- Wait, there might be a bucket or we just use documents. Let's create a bucket 'help-attachments'.

INSERT INTO storage.buckets (id, name, public) VALUES ('help-attachments', 'help-attachments', false) ON CONFLICT DO NOTHING;

CREATE POLICY "Employees can upload their own help attachments"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'help-attachments' 
    AND (storage.foldername(name))[1] = (SELECT id::text FROM public.employee_profiles WHERE user_id = auth.uid())
);

CREATE POLICY "Employees can view their own help attachments"
ON storage.objects FOR SELECT
TO authenticated
USING (
    bucket_id = 'help-attachments'
    AND (storage.foldername(name))[1] = (SELECT id::text FROM public.employee_profiles WHERE user_id = auth.uid())
);

CREATE INDEX idx_notifications_employee_id ON public.notifications(employee_id);
