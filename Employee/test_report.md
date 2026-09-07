## Backend Implementation & Test Report

### 1. Leave Backend (Prompt 9)
- **RPCs Created**: `submit_leave_request`, `cancel_leave_request`.
- **Validation Handled Server-Side**:
  - Authenticated and active employee validation.
  - Leave type validity & document requirement enforcement.
  - Correct calculation of `requested_days` excluding weekends configured in `attendance_policies`.
  - Date overlap checks against existing `leave_requests`.
  - `FOR UPDATE` transaction lock on `employee_leave_balances` to prevent concurrent overspending.
- **Frontend Integration**: Updated `leave/apply/page.tsx` and `leave/page.tsx` to use the real Supabase client instead of `MockPortalService`.

### 2. Concerns Backend (Prompt 10)
- **RPC Created**: `submit_concern` generates concurrency-safe ticket numbers format `CON-YYYY-XXXXXX` using a Postgres Sequence (`concern_ticket_seq`).
- **Isolation Policy**: Ensured via RLS. Employees can only select from `concern_messages` where `visibility = 'employee_visible'`.
- **Frontend Integration**: Updated `concerns/page.tsx` and `concerns/raise/page.tsx` to read/write through the real Supabase client instead of mocks.

### 3. Testing
- **Test Script Execution**: Successfully ran an automated isolation test (`test_db.js`) directly against the Postgres DB instance.
- **Isolation Result**: 
  - `TEST PASSED: Internal message is isolated.`
  - The script simulated an employee and verified that `employee_visible` messages are fetched while `internal` HR notes remain completely inaccessible to the role `authenticated`.
- **Build Result**: `npm run build` failed with `[TurbopackInternalError]: Failed to write app endpoint /page` matching the identical known native Next.js Turbopack compiler error recorded in `schema_migration_report.md` from previous phases.
