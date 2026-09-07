-- 20240101000001_rls_policies.sql

-- 1. Helper Functions for RLS
CREATE OR REPLACE FUNCTION public.current_employee_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM employee_profiles WHERE user_id = auth.uid() LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.current_employee_status()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT account_status FROM employee_profiles WHERE user_id = auth.uid() LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.is_active_employee()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT account_status = 'active' FROM employee_profiles WHERE user_id = auth.uid() LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.is_onboarding_or_active_employee()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT account_status IN ('active', 'profile_pending', 'under_verification') 
  FROM employee_profiles WHERE user_id = auth.uid() LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.is_in_audience(p_audience_type text, p_audience_reference text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    CASE
      WHEN p_audience_type = 'everyone' THEN true
      WHEN p_audience_type = 'department' THEN 
        EXISTS (SELECT 1 FROM employee_profiles WHERE id = public.current_employee_id() AND department_id::text = p_audience_reference)
      WHEN p_audience_type = 'location' THEN 
        EXISTS (SELECT 1 FROM employee_profiles WHERE id = public.current_employee_id() AND work_location_id::text = p_audience_reference)
      WHEN p_audience_type = 'designation' THEN 
        EXISTS (SELECT 1 FROM employee_profiles WHERE id = public.current_employee_id() AND designation_id::text = p_audience_reference)
      WHEN p_audience_type = 'employee' THEN 
        public.current_employee_id()::text = p_audience_reference
      ELSE false
    END;
$$;

-- Enable RLS on all tables
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE designations ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_corrections ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_leave_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE concerns ENABLE ROW LEVEL SECURITY;
ALTER TABLE concern_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_change_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcement_reads ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_sessions ENABLE ROW LEVEL SECURITY;

-- Disable all default access
-- (RLS defaults to deny all if enabled and no policies exist, but just in case, we will rely on strict policies)

-- Reference Tables (Read-Only for onboarding/active employees)
CREATE POLICY "Employees can read active departments" ON departments FOR SELECT TO authenticated USING (active = true AND public.is_onboarding_or_active_employee());
CREATE POLICY "Employees can read active designations" ON designations FOR SELECT TO authenticated USING (active = true AND public.is_onboarding_or_active_employee());
CREATE POLICY "Employees can read active work locations" ON work_locations FOR SELECT TO authenticated USING (active = true AND public.is_onboarding_or_active_employee());
CREATE POLICY "Employees can read active leave types" ON leave_types FOR SELECT TO authenticated USING (active = true AND public.is_onboarding_or_active_employee());
CREATE POLICY "Employees can read active attendance policies" ON attendance_policies FOR SELECT TO authenticated USING (active = true AND public.is_onboarding_or_active_employee());

-- 4. Employee Profiles
CREATE POLICY "Employees can view own profile" 
ON employee_profiles FOR SELECT 
TO authenticated 
USING (user_id = auth.uid());

CREATE POLICY "Employees can update own profile"
ON employee_profiles FOR UPDATE
TO authenticated
USING (user_id = auth.uid() AND account_status IN ('active', 'profile_pending', 'under_verification'))
WITH CHECK (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.trg_check_employee_profile_updates()
RETURNS TRIGGER AS $$
BEGIN
    IF current_setting('role') = 'authenticated' THEN
        IF NEW.employee_code IS DISTINCT FROM OLD.employee_code OR
           NEW.official_email IS DISTINCT FROM OLD.official_email OR
           NEW.department_id IS DISTINCT FROM OLD.department_id OR
           NEW.designation_id IS DISTINCT FROM OLD.designation_id OR
           NEW.reporting_manager_id IS DISTINCT FROM OLD.reporting_manager_id OR
           NEW.joining_date IS DISTINCT FROM OLD.joining_date OR
           NEW.employment_type IS DISTINCT FROM OLD.employment_type OR
           NEW.work_location_id IS DISTINCT FROM OLD.work_location_id OR
           NEW.account_status IS DISTINCT FROM OLD.account_status OR
           NEW.employment_status IS DISTINCT FROM OLD.employment_status OR
           NEW.verified_at IS DISTINCT FROM OLD.verified_at OR
           NEW.user_id IS DISTINCT FROM OLD.user_id OR
           NEW.id IS DISTINCT FROM OLD.id
        THEN
            RAISE EXCEPTION 'Not authorized to update restricted profile fields';
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER prevent_restricted_profile_updates
BEFORE UPDATE ON employee_profiles
FOR EACH ROW
EXECUTE FUNCTION public.trg_check_employee_profile_updates();


-- 7. Attendance Records
CREATE POLICY "Employees can view own attendance" 
ON attendance_records FOR SELECT 
TO authenticated 
USING (employee_id = public.current_employee_id() AND public.is_active_employee());

-- 8. Attendance Corrections
CREATE POLICY "Employees can view own attendance corrections" 
ON attendance_corrections FOR SELECT 
TO authenticated 
USING (employee_id = public.current_employee_id() AND public.is_active_employee());


-- 10. Employee Leave Balances
CREATE POLICY "Employees can view own leave balances" 
ON employee_leave_balances FOR SELECT 
TO authenticated 
USING (employee_id = public.current_employee_id() AND public.is_active_employee());

-- 11. Leave Requests
CREATE POLICY "Employees can view own leave requests" 
ON leave_requests FOR SELECT 
TO authenticated 
USING (employee_id = public.current_employee_id() AND public.is_active_employee());

CREATE POLICY "Employees can insert own leave requests" 
ON leave_requests FOR INSERT 
TO authenticated 
WITH CHECK (
  employee_id = public.current_employee_id() AND 
  public.is_active_employee() AND
  status = 'submitted' AND
  public_response IS NULL AND
  rejection_reason IS NULL AND
  approved_at IS NULL AND
  rejected_at IS NULL AND
  cancelled_at IS NULL
);

-- 12. Concerns
CREATE POLICY "Employees can view own concerns" 
ON concerns FOR SELECT 
TO authenticated 
USING (employee_id = public.current_employee_id() AND public.is_active_employee());

CREATE POLICY "Employees can insert own concerns" 
ON concerns FOR INSERT 
TO authenticated 
WITH CHECK (
  employee_id = public.current_employee_id() AND 
  public.is_active_employee() AND
  status = 'open' AND
  assigned_hr_id IS NULL AND
  resolved_at IS NULL AND
  closed_at IS NULL
);

-- 13. Concern Messages
CREATE POLICY "Employees can view own concern messages" 
ON concern_messages FOR SELECT 
TO authenticated 
USING (
  concern_id IN (SELECT id FROM concerns WHERE employee_id = public.current_employee_id()) AND 
  visibility = 'employee_visible' AND
  public.is_active_employee()
);

CREATE POLICY "Employees can insert own concern messages" 
ON concern_messages FOR INSERT 
TO authenticated 
WITH CHECK (
  concern_id IN (SELECT id FROM concerns WHERE employee_id = public.current_employee_id()) AND 
  author_user_id = auth.uid() AND
  visibility = 'employee_visible' AND
  public.is_active_employee()
);

