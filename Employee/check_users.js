const { Client } = require('pg');
async function run() {
  const connectionString = "postgresql://postgres:saathapp2026@db.qdzvvrkghqczyowxhphk.supabase.co:5432/postgres";
  const client = new Client({ connectionString });
  await client.connect();
  
  const users = await client.query("SELECT id, email, created_at, confirmed_at FROM auth.users ORDER BY created_at DESC LIMIT 5;");
  console.log("Auth users:");
  console.table(users.rows);
  
  const emp = await client.query("SELECT id, user_id, work_email, personal_email, first_name, last_name, employee_code FROM public.employee_profiles LIMIT 5;");
  console.log("Employee profiles:");
  console.table(emp.rows);
  
  await client.end();
}
run().catch(console.error);
