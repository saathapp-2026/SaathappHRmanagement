-- 1. Create Storage Bucket for Employee Documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'employee-documents',
    'employee-documents',
    false,
    10485760, -- 10MB
    ARRAY['application/pdf', 'image/jpeg', 'image/png']
)
ON CONFLICT (id) DO UPDATE SET 
    public = false, 
    file_size_limit = 10485760, 
    allowed_mime_types = ARRAY['application/pdf', 'image/jpeg', 'image/png'];

-- 2. Enable RLS on storage.objects

-- 3. Storage Policies
CREATE POLICY "Employees can upload own documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'employee-documents' AND
    (storage.foldername(name))[1] = 'employees' AND
    (storage.foldername(name))[2] = public.current_employee_id()::text
);

CREATE POLICY "Employees can update own documents"
ON storage.objects FOR UPDATE
TO authenticated
USING (
    bucket_id = 'employee-documents' AND
    (storage.foldername(name))[1] = 'employees' AND
    (storage.foldername(name))[2] = public.current_employee_id()::text
)
WITH CHECK (
    bucket_id = 'employee-documents' AND
    (storage.foldername(name))[1] = 'employees' AND
    (storage.foldername(name))[2] = public.current_employee_id()::text
);

CREATE POLICY "Employees can view own documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
    bucket_id = 'employee-documents' AND
    (storage.foldername(name))[1] = 'employees' AND
    (storage.foldername(name))[2] = public.current_employee_id()::text
);

CREATE POLICY "Employees can delete own documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'employee-documents' AND
    (storage.foldername(name))[1] = 'employees' AND
    (storage.foldername(name))[2] = public.current_employee_id()::text
);

-- 4. Additional RLS on employee_documents table for updates and deletes
CREATE POLICY "Employees can update own documents record"
ON employee_documents FOR UPDATE
TO authenticated
USING (
    employee_id = public.current_employee_id() AND
    public.is_onboarding_or_active_employee()
)
WITH CHECK (
    employee_id = public.current_employee_id() AND
    public.is_onboarding_or_active_employee()
);

CREATE POLICY "Employees can delete own documents record"
ON employee_documents FOR DELETE
TO authenticated
USING (
    employee_id = public.current_employee_id() AND
    public.is_onboarding_or_active_employee() AND
    status IN ('uploaded', 'replacement_required', 'rejected')
);

-- 5. Trigger to prevent restricted status updates by employees
CREATE OR REPLACE FUNCTION public.trg_check_employee_document_updates()
RETURNS TRIGGER AS $$
BEGIN
    IF current_setting('role') = 'authenticated' THEN
        -- Only HR/Admin can mark as verified, rejected, replacement_required
        -- If employee is updating, they can only set it to 'uploaded' or 'pending_verification'
        IF NEW.status IN ('verified', 'rejected', 'replacement_required') THEN
            -- Check if it changed to one of these
            IF OLD.status IS DISTINCT FROM NEW.status THEN
                RAISE EXCEPTION 'Not authorized to mark document as %', NEW.status;
            END IF;
        END IF;
        
        -- Also prevent employee from changing public_review_message
        IF NEW.public_review_message IS DISTINCT FROM OLD.public_review_message THEN
            RAISE EXCEPTION 'Not authorized to update review message';
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER prevent_restricted_document_updates
BEFORE UPDATE ON employee_documents
FOR EACH ROW
EXECUTE FUNCTION public.trg_check_employee_document_updates();
