-- 0. Helper Functions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 1. Departments
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Designations
CREATE TABLE designations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Work Locations
CREATE TABLE work_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    address TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    attendance_radius_meters INTEGER,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Employee Profiles
CREATE TABLE employee_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
    employee_code TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    official_email TEXT UNIQUE NOT NULL,
    personal_email TEXT,
    mobile TEXT,
    date_of_birth DATE,
    profile_photo_url TEXT,
    address JSONB,
    emergency_contact_name TEXT,
    emergency_contact_relationship TEXT,
    emergency_contact_phone TEXT,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    designation_id UUID REFERENCES designations(id) ON DELETE SET NULL,
    reporting_manager_id UUID REFERENCES employee_profiles(id) ON DELETE SET NULL,
    joining_date DATE,
    employment_type TEXT,
    work_location_id UUID REFERENCES work_locations(id) ON DELETE SET NULL,
    account_status TEXT NOT NULL CHECK (account_status IN ('invited', 'profile_pending', 'under_verification', 'active', 'suspended', 'deactivated', 'terminated')),
    employment_status TEXT NOT NULL,
    profile_completion_status TEXT,
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Employee Invitations
CREATE TABLE employee_invitations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_profile_id UUID REFERENCES employee_profiles(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    token_hash TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    accepted_at TIMESTAMPTZ,
    revoked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Attendance Policies
CREATE TABLE attendance_policies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    office_start_time TIME NOT NULL,
    office_end_time TIME NOT NULL,
    grace_period_minutes INTEGER DEFAULT 0,
    minimum_full_day_minutes INTEGER NOT NULL,
    minimum_half_day_minutes INTEGER NOT NULL,
    location_required BOOLEAN DEFAULT true,
    allowed_radius_meters INTEGER,
    timezone TEXT DEFAULT 'UTC',
    weekly_off_days SMALLINT[] DEFAULT '{0,6}', -- 0=Sunday, 6=Saturday
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Attendance Records
CREATE TABLE attendance_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employee_profiles(id) ON DELETE CASCADE,
    attendance_date DATE NOT NULL,
    check_in_at TIMESTAMPTZ,
    check_out_at TIMESTAMPTZ,
    total_work_minutes INTEGER,
    status TEXT NOT NULL CHECK (status IN ('present', 'late', 'half_day', 'absent', 'on_leave', 'holiday', 'weekly_off', 'work_from_home')),
    check_in_location JSONB,
    check_out_location JSONB,
    check_in_session_info JSONB,
    check_out_session_info JSONB,
    source TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(employee_id, attendance_date)
);

-- 8. Attendance Corrections
CREATE TABLE attendance_corrections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employee_profiles(id) ON DELETE CASCADE,
    attendance_record_id UUID NOT NULL REFERENCES attendance_records(id) ON DELETE CASCADE,
    correction_date DATE NOT NULL,
    existing_check_in TIMESTAMPTZ,
    existing_check_out TIMESTAMPTZ,
    requested_check_in TIMESTAMPTZ,
    requested_check_out TIMESTAMPTZ,
    reason TEXT NOT NULL,
    attachment_path TEXT,
    status TEXT NOT NULL CHECK (status IN ('pending', 'under_review', 'information_requested', 'approved', 'rejected')) DEFAULT 'pending',
    employee_response TEXT,
    public_hr_response TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Leave Types
CREATE TABLE leave_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    paid BOOLEAN DEFAULT true,
    requires_document BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Employee Leave Balances
CREATE TABLE employee_leave_balances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employee_profiles(id) ON DELETE CASCADE,
    leave_type_id UUID NOT NULL REFERENCES leave_types(id) ON DELETE CASCADE,
    year INTEGER NOT NULL,
    allocated DOUBLE PRECISION NOT NULL DEFAULT 0,
    used DOUBLE PRECISION NOT NULL DEFAULT 0,
    pending DOUBLE PRECISION NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(employee_id, leave_type_id, year)
);

-- 11. Leave Requests
CREATE TABLE leave_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employee_profiles(id) ON DELETE CASCADE,
    leave_type_id UUID NOT NULL REFERENCES leave_types(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    duration_type TEXT NOT NULL,
    half_day_session TEXT,
    requested_days DOUBLE PRECISION NOT NULL,
    reason TEXT NOT NULL,
    emergency_contact TEXT,
    attachment_path TEXT,
    status TEXT NOT NULL CHECK (status IN ('submitted', 'pending_approval', 'information_requested', 'approved', 'rejected', 'cancelled', 'completed')) DEFAULT 'submitted',
    current_approver_id UUID REFERENCES employee_profiles(id) ON DELETE SET NULL,
    public_response TEXT,
    rejection_reason TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    approved_at TIMESTAMPTZ,
    rejected_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Concerns
CREATE TABLE concerns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employee_profiles(id) ON DELETE CASCADE,
    ticket_number TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status TEXT NOT NULL CHECK (status IN ('open', 'under_review', 'in_progress', 'resolved', 'closed')) DEFAULT 'open',
    assigned_hr_id UUID REFERENCES employee_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    closed_at TIMESTAMPTZ
);

-- 13. Concern Messages
CREATE TABLE concern_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    concern_id UUID NOT NULL REFERENCES concerns(id) ON DELETE CASCADE,
    author_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    visibility TEXT NOT NULL CHECK (visibility IN ('employee_visible', 'internal')) DEFAULT 'employee_visible',
    message TEXT NOT NULL,
    attachment_path TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Help Requests

-- 15. Help Request Messages

-- 16. Employee Documents
CREATE TABLE employee_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employee_profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    document_name TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    mime_type TEXT,
    file_size INTEGER,
    status TEXT NOT NULL CHECK (status IN ('uploaded', 'pending_verification', 'verified', 'rejected', 'replacement_required', 'expired')) DEFAULT 'uploaded',
    public_review_message TEXT,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. Profile Change Requests
CREATE TABLE profile_change_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employee_profiles(id) ON DELETE CASCADE,
    field_name TEXT NOT NULL,
    current_value JSONB,
    requested_value JSONB,
    reason TEXT,
    supporting_document_path TEXT,
    status TEXT NOT NULL CHECK (status IN ('submitted', 'pending', 'under_review', 'approved', 'rejected')) DEFAULT 'submitted',
    public_response TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. Calendar Events
CREATE TABLE calendar_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    event_type TEXT NOT NULL,
    start_at TIMESTAMPTZ NOT NULL,
    end_at TIMESTAMPTZ,
    all_day BOOLEAN DEFAULT false,
    audience_type TEXT NOT NULL,
    audience_reference TEXT,
    created_by UUID REFERENCES employee_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. Announcements
CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    priority TEXT NOT NULL,
    description TEXT NOT NULL,
    attachment_path TEXT,
    audience_type TEXT NOT NULL,
    audience_reference TEXT,
    published_at TIMESTAMPTZ,
    archived_at TIMESTAMPTZ,
    created_by UUID REFERENCES employee_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. Announcement Reads
CREATE TABLE announcement_reads (
    announcement_id UUID NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
    employee_id UUID NOT NULL REFERENCES employee_profiles(id) ON DELETE CASCADE,
    read_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (announcement_id, employee_id)
);

-- 21. Employee Notifications

-- 22. Employee Sessions
CREATE TABLE employee_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employee_profiles(id) ON DELETE CASCADE,
    user_agent TEXT,
    ip_address TEXT,
    is_active BOOLEAN DEFAULT true,
    last_active_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    revoked_at TIMESTAMPTZ
);

-- Triggers for updated_at
DO $$
DECLARE
    t TEXT;
BEGIN
    FOR t IN 
        SELECT table_name FROM information_schema.columns 
        WHERE column_name = 'updated_at' 
          AND table_schema = 'public'
    LOOP
        EXECUTE format('
            CREATE TRIGGER update_%I_updated_at
            BEFORE UPDATE ON %I
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
        ', t, t);
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Indexes
CREATE INDEX idx_employee_profiles_user_id ON employee_profiles(user_id);
CREATE INDEX idx_attendance_records_employee_id ON attendance_records(employee_id);
CREATE INDEX idx_attendance_records_date ON attendance_records(attendance_date);
CREATE INDEX idx_leave_requests_employee_id ON leave_requests(employee_id);
CREATE INDEX idx_employee_documents_employee_id ON employee_documents(employee_id);

CREATE INDEX idx_announcements_published_at ON announcements(published_at);
CREATE INDEX idx_calendar_events_start_at ON calendar_events(start_at);
