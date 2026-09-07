const tables = [
  'employee_profiles', 'attendance_records', 'attendance_corrections', 'leave_types', 'employee_leave_balances',
  'leave_requests', 'concerns', 'concern_messages', 'help_requests', 'help_request_messages',
  'employee_documents', 'profile_change_requests', 'calendar_events', 'announcements', 'announcement_reads',
  'notifications', 'employee_notifications', 'employee_sessions'
];
const rpcs = [
  'check_in', 'check_out', 'submit_attendance_correction', 'submit_leave_request', 'cancel_leave_request', 'submit_concern'
];

async function main() {
  const { execSync } = require('child_process');
  
  for (const table of tables) {
    try {
      const out = execSync(`SUPABASE_DB_PASSWORD="saathapp2026" npx -y supabase db query --linked "select to_regclass('public.${table}');"`, { encoding: 'utf8', stdio: 'pipe' });
      const found = out.includes(`"${table}"`);
      console.log(`TABLE ${table}: ${found ? 'EXISTS' : 'MISSING'}`);
    } catch (e) {
      console.log(`TABLE ${table}: ERROR`);
    }
  }

  for (const rpc of rpcs) {
    try {
      const out = execSync(`SUPABASE_DB_PASSWORD="saathapp2026" npx -y supabase db query --linked "select exists(select 1 from pg_proc where proname = '${rpc}');"`, { encoding: 'utf8', stdio: 'pipe' });
      const found = out.includes(`true`);
      console.log(`RPC ${rpc}: ${found ? 'EXISTS' : 'MISSING'}`);
    } catch (e) {
      console.log(`RPC ${rpc}: ERROR`);
    }
  }
}
main();
