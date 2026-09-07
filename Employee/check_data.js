const { Client } = require('pg');
async function run() {
  const connectionString = "postgresql://postgres:saathapp2026@db.qdzvvrkghqczyowxhphk.supabase.co:5432/postgres";
  const client = new Client({ connectionString });
  await client.connect();
  
  const authUsers = await client.query("SELECT id, email, phone, raw_user_meta_data FROM auth.users ORDER BY created_at DESC LIMIT 5;");
  console.log("Auth users:");
  console.table(authUsers.rows);
  
  const emp = await client.query("SELECT id, user_id, official_email, full_name, employee_code, account_status FROM public.employee_profiles;");
  console.log("Employee profiles:");
  console.table(emp.rows);
  
  await client.end();
}
run().catch(console.error);
