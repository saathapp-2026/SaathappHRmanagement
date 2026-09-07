CREATE SEQUENCE IF NOT EXISTS concern_ticket_seq START 1;

ALTER TABLE concerns ADD COLUMN IF NOT EXISTS is_anonymous BOOLEAN DEFAULT false;

CREATE OR REPLACE FUNCTION public.submit_concern(
    p_category TEXT,
    p_subject TEXT,
    p_description TEXT,
    p_priority TEXT,
    p_is_anonymous BOOLEAN DEFAULT false
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_employee_id UUID;
    v_account_status TEXT;
    v_concern_id UUID;
BEGIN
    SELECT id, account_status INTO v_employee_id, v_account_status
    FROM employee_profiles
    WHERE user_id = auth.uid() LIMIT 1;
    
    IF v_employee_id IS NULL OR v_account_status != 'active' THEN
        RAISE EXCEPTION 'Unauthorized or inactive employee';
    END IF;

    INSERT INTO concerns (
        employee_id, ticket_number, category, subject, description, priority, status, is_anonymous
    ) VALUES (
        v_employee_id, 
        'CON-' || to_char(CURRENT_DATE, 'YYYY') || '-' || LPAD(nextval('concern_ticket_seq')::TEXT, 6, '0'), 
        p_category, p_subject, p_description, p_priority, 'open', p_is_anonymous
    ) RETURNING id INTO v_concern_id;
    
    RETURN v_concern_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.submit_leave_request(
    p_leave_type_id UUID,
    p_start_date DATE,
    p_end_date DATE,
    p_duration_type TEXT,
    p_half_day_session TEXT,
    p_reason TEXT,
    p_emergency_contact TEXT,
    p_attachment_path TEXT
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_employee_id UUID;
    v_account_status TEXT;
    v_leave_type_active BOOLEAN;
    v_requires_doc BOOLEAN;
    v_weekly_offs SMALLINT[];
    v_requested_days DOUBLE PRECISION := 0;
    v_curr_date DATE;
    v_dow SMALLINT;
    v_overlap_count INTEGER;
    v_balance_record RECORD;
    v_request_id UUID;
    v_year INTEGER := extract(year from p_start_date);
BEGIN
    -- 1. Validate employee
    SELECT id, account_status INTO v_employee_id, v_account_status
    FROM employee_profiles
    WHERE user_id = auth.uid() LIMIT 1;
    
    IF v_employee_id IS NULL OR v_account_status != 'active' THEN
        RAISE EXCEPTION 'Unauthorized or inactive employee';
    END IF;

    -- 2. Validate leave type
    SELECT active, requires_document INTO v_leave_type_active, v_requires_doc
    FROM leave_types WHERE id = p_leave_type_id;
    
    IF v_leave_type_active IS NULL OR NOT v_leave_type_active THEN
        RAISE EXCEPTION 'Invalid or inactive leave type';
    END IF;
    
    IF v_requires_doc AND (p_attachment_path IS NULL OR p_attachment_path = '') THEN
        RAISE EXCEPTION 'Supporting document required for this leave type';
    END IF;
    
    -- 3. Dates
    IF p_start_date > p_end_date THEN
        RAISE EXCEPTION 'Start date must be before or equal to end date';
    END IF;
    
    -- 4. Calculate requested_days
    SELECT weekly_off_days INTO v_weekly_offs
    FROM attendance_policies LIMIT 1; 
    
    IF v_weekly_offs IS NULL THEN
        v_weekly_offs := '{0,6}';
    END IF;

    IF p_duration_type = 'half_day' THEN
        IF p_start_date != p_end_date THEN
            RAISE EXCEPTION 'Half day leave must have same start and end date';
        END IF;
        IF p_half_day_session NOT IN ('morning', 'afternoon') THEN
            RAISE EXCEPTION 'Invalid half day session';
        END IF;
        v_requested_days := 0.5;
    ELSE
        v_curr_date := p_start_date;
        WHILE v_curr_date <= p_end_date LOOP
            v_dow := extract(dow from v_curr_date);
            IF NOT (v_dow = ANY(v_weekly_offs)) THEN
                v_requested_days := v_requested_days + 1;
            END IF;
            v_curr_date := v_curr_date + 1;
        END LOOP;
        
        IF v_requested_days = 0 THEN
            RAISE EXCEPTION 'Requested leave period contains only off days';
        END IF;
    END IF;

    -- 5. Check overlapping requests
    SELECT COUNT(*) INTO v_overlap_count
    FROM leave_requests
    WHERE employee_id = v_employee_id
      AND status NOT IN ('rejected', 'cancelled')
      AND p_start_date <= end_date 
      AND p_end_date >= start_date;
      
    IF v_overlap_count > 0 THEN
        RAISE EXCEPTION 'Leave request overlaps with an existing request';
    END IF;

    -- 6. Check and update balance
    SELECT * INTO v_balance_record
    FROM employee_leave_balances
    WHERE employee_id = v_employee_id 
      AND leave_type_id = p_leave_type_id
      AND year = v_year
    FOR UPDATE;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Leave balance not found for this leave type and year';
    END IF;
    
    IF (v_balance_record.allocated - v_balance_record.used - v_balance_record.pending) < v_requested_days THEN
        RAISE EXCEPTION 'Insufficient leave balance';
    END IF;
    
    -- 7. Insert Request
    INSERT INTO leave_requests (
        employee_id, leave_type_id, start_date, end_date, 
        duration_type, half_day_session, requested_days, 
        reason, emergency_contact, attachment_path, status
    ) VALUES (
        v_employee_id, p_leave_type_id, p_start_date, p_end_date, 
        p_duration_type, p_half_day_session, v_requested_days, 
        p_reason, p_emergency_contact, p_attachment_path, 'submitted'
    ) RETURNING id INTO v_request_id;
    
    -- 8. Update Balance
    UPDATE employee_leave_balances
    SET pending = pending + v_requested_days
    WHERE id = v_balance_record.id;
    
    RETURN v_request_id;
END;
$$;


CREATE OR REPLACE FUNCTION public.cancel_leave_request(
    p_request_id UUID
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_employee_id UUID;
    v_request RECORD;
    v_year INTEGER;
BEGIN
    SELECT id INTO v_employee_id FROM employee_profiles WHERE user_id = auth.uid() LIMIT 1;
    
    SELECT * INTO v_request FROM leave_requests WHERE id = p_request_id AND employee_id = v_employee_id;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Leave request not found or unauthorized';
    END IF;
    
    IF v_request.status NOT IN ('submitted', 'pending_approval', 'information_requested') THEN
        RAISE EXCEPTION 'Cannot cancel a leave request in % status', v_request.status;
    END IF;
    
    -- Update status
    UPDATE leave_requests
    SET status = 'cancelled', cancelled_at = NOW()
    WHERE id = p_request_id;
    
    -- Refund pending balance
    v_year := extract(year from v_request.start_date);
    
    UPDATE employee_leave_balances
    SET pending = pending - v_request.requested_days
    WHERE employee_id = v_employee_id 
      AND leave_type_id = v_request.leave_type_id
      AND year = v_year;
      
    -- Notify HR/Manager (in real scenario)
    
    RETURN TRUE;
END;
$$;
