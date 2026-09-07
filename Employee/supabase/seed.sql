-- Seed file for essential reference data (Development Only)

-- Leave Types
INSERT INTO leave_types (id, name, code, paid, requires_document, active)
VALUES 
    (uuid_generate_v4(), 'Casual Leave', 'CL', true, false, true),
    (uuid_generate_v4(), 'Sick Leave', 'SL', true, true, true),
    (uuid_generate_v4(), 'Earned Leave', 'EL', true, false, true),
    (uuid_generate_v4(), 'Leave Without Pay', 'LWP', false, false, true),
    (uuid_generate_v4(), 'Maternity Leave', 'ML', true, true, true),
    (uuid_generate_v4(), 'Paternity Leave', 'PL', true, true, true)
ON CONFLICT (code) DO NOTHING;

-- Default Attendance Policy (Example)
INSERT INTO attendance_policies (id, office_start_time, office_end_time, grace_period_minutes, minimum_full_day_minutes, minimum_half_day_minutes, location_required, allowed_radius_meters, timezone, weekly_off_days, active)
VALUES (
    uuid_generate_v4(),
    '09:00:00',
    '18:00:00',
    15,
    480, -- 8 hours
    240, -- 4 hours
    true,
    100,
    'UTC',
    '{0,6}', -- Sunday, Saturday
    true
)
ON CONFLICT DO NOTHING;

-- Departments (Optional basic seed)
INSERT INTO departments (id, name, code, active)
VALUES 
    (uuid_generate_v4(), 'Human Resources', 'HR', true),
    (uuid_generate_v4(), 'Engineering', 'ENG', true),
    (uuid_generate_v4(), 'Sales', 'SLS', true)
ON CONFLICT (code) DO NOTHING;
