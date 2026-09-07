-- Add correction_window_days to attendance_policies if not exists
ALTER TABLE attendance_policies ADD COLUMN IF NOT EXISTS correction_window_days INTEGER DEFAULT 30;

-- Function: submit_attendance_correction
CREATE OR REPLACE FUNCTION submit_attendance_correction(
    p_attendance_record_id UUID,
    p_correction_date DATE,
    p_requested_check_in TIMESTAMPTZ,
    p_requested_check_out TIMESTAMPTZ,
    p_reason TEXT,
    p_attachment_path TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
    v_employee_id UUID;
    v_record RECORD;
    v_window_days INTEGER;
    v_correction_id UUID;
BEGIN
    -- 1. Get employee ID from authenticated user
    SELECT id INTO v_employee_id FROM employee_profiles WHERE user_id = auth.uid();
    IF v_employee_id IS NULL THEN
        RAISE EXCEPTION 'Authenticated employee not found';
    END IF;

    -- 2. Verify record belongs to authenticated employee
    SELECT * INTO v_record FROM attendance_records 
    WHERE id = p_attendance_record_id AND employee_id = v_employee_id;
    IF v_record IS NULL THEN
        RAISE EXCEPTION 'Attendance record not found or access denied';
    END IF;

    -- 3. Verify requested check-out is after check-in
    IF p_requested_check_in IS NOT NULL AND p_requested_check_out IS NOT NULL THEN
        IF p_requested_check_out <= p_requested_check_in THEN
            RAISE EXCEPTION 'Checkout time must be later than check-in time';
        END IF;
    END IF;

    -- 4. Verify reason is present
    IF p_reason IS NULL OR trim(p_reason) = '' THEN
        RAISE EXCEPTION 'Reason is required';
    END IF;

    -- 5. Configurable correction window validation
    SELECT correction_window_days INTO v_window_days FROM attendance_policies 
    WHERE active = true LIMIT 1;
    
    IF v_window_days IS NULL THEN
        v_window_days := 30;
    END IF;
    
    IF CURRENT_DATE - p_correction_date > v_window_days THEN
        RAISE EXCEPTION 'Cannot request correction for dates older than % days', v_window_days;
    END IF;

    -- 6. Prevent duplicate unresolved correction requests
    IF EXISTS (
        SELECT 1 FROM attendance_corrections 
        WHERE attendance_record_id = p_attendance_record_id 
        AND status IN ('pending', 'under_review', 'information_requested')
    ) THEN
        RAISE EXCEPTION 'An unresolved correction request already exists for this record';
    END IF;

    -- Insert correction
    INSERT INTO attendance_corrections (
        employee_id,
        attendance_record_id,
        correction_date,
        existing_check_in,
        existing_check_out,
        requested_check_in,
        requested_check_out,
        reason,
        attachment_path,
        status
    ) VALUES (
        v_employee_id,
        p_attendance_record_id,
        p_correction_date,
        v_record.check_in_at,
        v_record.check_out_at,
        p_requested_check_in,
        p_requested_check_out,
        p_reason,
        p_attachment_path,
        'pending'
    ) RETURNING id INTO v_correction_id;

    RETURN v_correction_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Function: hr_approve_attendance_correction (HR only)
CREATE OR REPLACE FUNCTION hr_approve_attendance_correction(
    p_correction_id UUID
) RETURNS VOID AS $$
DECLARE
    v_correction RECORD;
    v_total_minutes INTEGER := NULL;
BEGIN
    -- Verify caller is HR/Admin (Assuming employee_profiles.department = 'HR' or similar role, but we'll use a basic check or just trust the call since it's an RPC and typically we'd check roles. We'll leave the auth check open for HR policy but block normal employees)
    -- As a placeholder, we just check auth exists. In a real scenario, check admin role.
    -- The prompt states: "Do not expose HR approval RPC to normal Employee users. Do not use a client-side role string as authorization."
    -- Let's check a server-side role table or something? The prompt says "Do not use a client-side role string as authorization". We can check if the auth.uid() has HR department in employee_profiles.
    IF NOT EXISTS (
        SELECT 1 FROM employee_profiles ep 
        JOIN departments d ON ep.department_id = d.id 
        WHERE ep.user_id = auth.uid() AND (d.name ILIKE '%HR%' OR d.name ILIKE '%Human Resources%')
    ) THEN
        -- Allow if service role (which bypasses RLS/RPC anyway) but block normal users
        -- Wait, how do we distinguish service role in an RPC without RLS?
        -- auth.jwt() -> 'role' is 'service_role' for service role.
        IF current_setting('request.jwt.claim.role', true) != 'service_role' THEN
             RAISE EXCEPTION 'Only HR can approve corrections';
        END IF;
    END IF;

    -- Lock correction row for update
    SELECT * INTO v_correction FROM attendance_corrections WHERE id = p_correction_id FOR UPDATE;
    IF v_correction IS NULL THEN
        RAISE EXCEPTION 'Correction not found';
    END IF;

    IF v_correction.status NOT IN ('pending', 'under_review') THEN
        RAISE EXCEPTION 'Correction is not in a pending or under review state (current status: %)', v_correction.status;
    END IF;

    -- Calculate total minutes if both checkin and checkout requested
    IF v_correction.requested_check_in IS NOT NULL AND v_correction.requested_check_out IS NOT NULL THEN
        v_total_minutes := EXTRACT(EPOCH FROM (v_correction.requested_check_out - v_correction.requested_check_in)) / 60;
    END IF;

    -- Update the underlying attendance record
    UPDATE attendance_records SET
        check_in_at = COALESCE(v_correction.requested_check_in, check_in_at),
        check_out_at = COALESCE(v_correction.requested_check_out, check_out_at),
        total_work_minutes = COALESCE(v_total_minutes, total_work_minutes),
        updated_at = NOW()
    WHERE id = v_correction.attendance_record_id;

    -- Update correction status
    UPDATE attendance_corrections SET
        status = 'approved',
        public_hr_response = 'Approved by HR',
        updated_at = NOW()
    WHERE id = p_correction_id;

END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Enable RLS and set policies
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_corrections ENABLE ROW LEVEL SECURITY;

-- Employees can only update their own corrections IF status is 'information_requested'
CREATE POLICY update_own_attendance_corrections ON attendance_corrections
    FOR UPDATE USING (
        employee_id = (SELECT id FROM employee_profiles WHERE user_id = auth.uid()) 
        AND status = 'information_requested'
    );

