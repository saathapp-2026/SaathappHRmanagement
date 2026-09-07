BEGIN;
CREATE EXTENSION IF NOT EXISTS pgtap;

SELECT plan(13);

-- Setup: Create Mock Users
-- We need to mock auth.uid() function.
-- Supabase test helper: tests can use tests.create_supabase_user() or we can just mock it.
-- We can set request.jwt.claims to mock auth.uid().

-- First, let's insert two employees and bypass RLS to set them up
-- using local variables for their IDs.
\set emp1_uid '11111111-1111-1111-1111-111111111111'
\set emp2_uid '22222222-2222-2222-2222-222222222222'

-- We can't insert into auth.users easily without bypassing a lot. But employee_profiles 
-- references auth.users. Let's temporarily drop the FK for testing, or insert into auth.users.
ALTER TABLE public.employee_profiles DROP CONSTRAINT employee_profiles_user_id_fkey;

INSERT INTO public.employee_profiles (id, user_id, employee_code, full_name, official_email, account_status, employment_status)
VALUES 
  ('33333333-3333-3333-3333-333333333333', :'emp1_uid', 'EMP001', 'Emp A', 'a@test.com', 'active', 'full_time'),
  ('44444444-4444-4444-4444-444444444444', :'emp2_uid', 'EMP002', 'Emp B', 'b@test.com', 'active', 'full_time');

-- Insert some data for Emp B
INSERT INTO public.attendance_records (employee_id, attendance_date, status)
VALUES ('44444444-4444-4444-4444-444444444444', '2024-01-01', 'present');

INSERT INTO public.concerns (id, employee_id, ticket_number, category, subject, description, priority)
VALUES ('55555555-5555-5555-5555-555555555555', '44444444-4444-4444-4444-444444444444', 'T-001', 'HR', 'Test', 'Test', 'low');

INSERT INTO public.concern_messages (concern_id, author_user_id, visibility, message)
VALUES ('55555555-5555-5555-5555-555555555555', :'emp2_uid', 'internal', 'Secret Internal Note');


-- Test as Employee A
-- We set the role to authenticated and mock the JWT claims
SET ROLE authenticated;
SET request.jwt.claims TO '{"sub": "11111111-1111-1111-1111-111111111111", "role": "authenticated"}';

-- 1. Verify Emp A can read their own profile
SELECT is(
    (SELECT full_name FROM public.employee_profiles LIMIT 1),
    'Emp A',
    'Employee A can read their own profile'
);

-- 2. Verify Emp A cannot read Emp B's profile
SELECT is_empty(
    $$ SELECT 1 FROM public.employee_profiles WHERE full_name = 'Emp B' $$,
    'Employee A cannot read Employee B profile'
);

-- 3. Verify malicious filter still fails
SELECT is_empty(
    $$ SELECT 1 FROM public.employee_profiles WHERE user_id = '22222222-2222-2222-2222-222222222222' $$,
    'Employee A cannot read Employee B profile even with explicit filter'
);

-- 4. Verify Emp A cannot read Emp B's attendance
SELECT is_empty(
    $$ SELECT 1 FROM public.attendance_records $$,
    'Employee A cannot read Employee B attendance'
);

-- 5. Verify Emp A cannot read Emp B's concerns
SELECT is_empty(
    $$ SELECT 1 FROM public.concerns $$,
    'Employee A cannot read Employee B concerns'
);

-- 6. Verify Emp A cannot read internal concern notes
SELECT is_empty(
    $$ SELECT 1 FROM public.concern_messages $$,
    'Employee A cannot read any concern messages from B, especially internal ones'
);

-- Switch back to bypass RLS for a moment to insert Emp A's concern
RESET ROLE;
INSERT INTO public.concerns (id, employee_id, ticket_number, category, subject, description, priority)
VALUES ('66666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', 'T-002', 'HR', 'Test A', 'Test A', 'low');

INSERT INTO public.concern_messages (concern_id, author_user_id, visibility, message)
VALUES ('66666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', 'internal', 'Secret Internal Note A');
INSERT INTO public.concern_messages (concern_id, author_user_id, visibility, message)
VALUES ('66666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', 'employee_visible', 'Visible Note A');

-- Test again as Employee A
SET ROLE authenticated;
SET request.jwt.claims TO '{"sub": "11111111-1111-1111-1111-111111111111", "role": "authenticated"}';

-- 7. Verify Emp A can read own concern
SELECT is(
    (SELECT subject FROM public.concerns LIMIT 1),
    'Test A',
    'Employee A can read their own concern'
);

-- 8. Verify internal concern notes isolation
SELECT is(
    (SELECT count(*)::integer FROM public.concern_messages),
    1,
    'Employee A can only read employee_visible messages for their own concerns, internal notes are hidden'
);

-- Switch back to postgres (admin) to test Updates
RESET ROLE;
SET ROLE authenticated;
SET request.jwt.claims TO '{"sub": "11111111-1111-1111-1111-111111111111", "role": "authenticated"}';

-- 9. Verify Emp A can update allowed fields (e.g. personal email)
SELECT lives_ok(
    $$ UPDATE public.employee_profiles SET personal_email = 'new@test.com' WHERE user_id = '11111111-1111-1111-1111-111111111111' $$,
    'Employee A can update allowed fields'
);

-- 10. Verify Emp A cannot update protected field (employee_code)
SELECT throws_ok(
    $$ UPDATE public.employee_profiles SET employee_code = 'HACK' WHERE user_id = '11111111-1111-1111-1111-111111111111' $$,
    'P0001',
    'Not authorized to update restricted profile fields',
    'Employee A cannot update employee_code'
);

-- 11. Verify Emp A cannot update account_status
SELECT throws_ok(
    $$ UPDATE public.employee_profiles SET account_status = 'suspended' WHERE user_id = '11111111-1111-1111-1111-111111111111' $$,
    'P0001',
    'Not authorized to update restricted profile fields',
    'Employee A cannot update account_status'
);

-- Change account status to suspended
RESET ROLE;
UPDATE public.employee_profiles SET account_status = 'suspended' WHERE user_id = '11111111-1111-1111-1111-111111111111';
SET ROLE authenticated;
SET request.jwt.claims TO '{"sub": "11111111-1111-1111-1111-111111111111", "role": "authenticated"}';

-- 12. Verify Suspended employee can still see profile
SELECT is(
    (SELECT count(*)::integer FROM public.employee_profiles),
    1,
    'Suspended Employee A can read their own profile'
);

-- 13. Verify Suspended employee cannot see attendance
SELECT is_empty(
    $$ SELECT 1 FROM public.attendance_records $$,
    'Suspended Employee A cannot read attendance'
);

SELECT * FROM finish();
ROLLBACK;
