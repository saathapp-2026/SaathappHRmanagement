# Supabase SQL Schema Migration Report

## 1. Migration files created
*   `supabase/migrations/20240101000000_core_tables.sql`
*   `supabase/seed.sql`

## 2. Tables created
1.  `departments`
2.  `designations`
3.  `work_locations`
4.  `employee_profiles`
5.  `employee_invitations`
6.  `attendance_policies`
7.  `attendance_records`
8.  `attendance_corrections`
9.  `leave_types`
10. `employee_leave_balances`
11. `leave_requests`
12. `concerns`
13. `concern_messages`
14. `help_requests`
15. `help_request_messages`
16. `employee_documents`
17. `profile_change_requests`
18. `calendar_events`
19. `announcements`
20. `announcement_reads`
21. `employee_notifications`
22. `employee_sessions`

## 3. Relationships created
*   **auth.users**: `employee_profiles` and message authors tie directly to `auth.users(id)`.
*   **employee_profiles**: Related to almost every table natively (`employee_invitations`, `attendance_records`, `leave_requests`, `employee_documents`, etc.).
*   **Hierarchical**: `employee_profiles.reporting_manager_id` references `employee_profiles(id)`.
*   **Lookup mapping**: `designations` -> `departments`, `employee_profiles` -> `departments` / `designations` / `work_locations`.
*   **Referential Integrity**: Used `ON DELETE CASCADE` for child records tied directly to an employee (e.g., `attendance_records`, `leave_requests`) to satisfy safe delete behaviors. Used `ON DELETE SET NULL` for lookups and references to avoid accidentally deleting profiles when a department is removed.

## 4. Indexes
*   `idx_employee_profiles_user_id`
*   `idx_attendance_records_employee_id`
*   `idx_attendance_records_date`
*   `idx_leave_requests_employee_id`
*   `idx_employee_documents_employee_id`
*   `idx_notifications_employee_id`
*   `idx_announcements_published_at`
*   `idx_calendar_events_start_at`

## 5. Constraints
*   **Primary Keys**: `id` UUID for all core tables. `(announcement_id, employee_id)` composite for `announcement_reads`.
*   **Unique Constraints**: 
    *   `attendance_records(employee_id, attendance_date)`
    *   `employee_leave_balances(employee_id, leave_type_id, year)`
    *   `employee_code` in `employee_profiles`
    *   `official_email` in `employee_profiles`
    *   `ticket_number` in `concerns`
    *   `request_number` in `help_requests`

## 6. Enums / Check constraints
Rather than custom Postgres ENUMs which can be difficult to manage in migrations, we used `TEXT` + `CHECK` constraints for strict integrity as requested:
*   `employee_profiles.account_status`: 'invited', 'profile_pending', 'under_verification', 'active', 'suspended', 'deactivated', 'terminated'
*   `attendance_records.status`: 'present', 'late', 'half_day', 'absent', 'on_leave', 'holiday', 'weekly_off', 'work_from_home'
*   `attendance_corrections.status`: 'pending', 'under_review', 'information_requested', 'approved', 'rejected'
*   `leave_requests.status`: 'submitted', 'pending_approval', 'information_requested', 'approved', 'rejected', 'cancelled', 'completed'
*   `concerns.priority`: 'low', 'medium', 'high', 'urgent'
*   `concerns.status`: 'open', 'under_review', 'in_progress', 'resolved', 'closed'
*   `help_requests.status`: 'submitted', 'open', 'assigned', 'in_progress', 'resolved', 'closed'
*   `employee_documents.status`: 'uploaded', 'pending_verification', 'verified', 'rejected', 'replacement_required', 'expired'

## 7. Seed / Reference data
*   `supabase/seed.sql` created, completely isolated from migrations.
*   Contains core development data for `leave_types`, `departments`, and `attendance_policies` using `ON CONFLICT DO NOTHING` for idempotency.
*   No fake production employee data was added.

## 8. Anything deliberately deferred
*   **TypeScript Types Generation**: `supabase gen types typescript` was deferred because it requires either a running local Supabase DB (Docker) or a remote DB connection. Without Docker in the sandbox or the DB password to link the remote project, we cannot generate types yet.
*   **RLS Policies**: Deferred as explicitly instructed ("Do not implement RLS yet").

## 9. SQL validation result
*   **Result**: Deferred / Attempted. `npx supabase db lint` was run but failed because Docker is not running in the current sandbox environment (`failed to connect to postgres... dial error`). The SQL schema has been statically written to follow standard Postgres/Supabase conventions.

## 10. lint/typecheck/build result
*   **Lint**: ❌ Continues to fail with `JavaScript heap out of memory` (same as Phase 1A).
*   **Typecheck**: ✅ `npx tsc --noEmit` completed successfully with 0 errors.
*   **Build**: ❌ `npm run build` continues to fail with the native Next.js `[TurbopackInternalError]: Failed to write app endpoint /page` regarding `globals.css` (same as Phase 1A).
