const { Client } = require('pg');
async function run() {
  const connectionString = "postgresql://postgres:saathapp2026@db.qdzvvrkghqczyowxhphk.supabase.co:5432/postgres";
  const client = new Client({ connectionString });
  await client.connect();
  
  const emp = await client.query("SELECT id, user_id, official_email, personal_email, full_name, employee_code FROM public.employee_profiles WHERE official_email IN ('kajalsoni39569@gmail.com', 'test.employee@saathapp.com', 'nikitarmalkhedkar@gmail.com') OR personal_email IN ('kajalsoni39569@gmail.com', 'test.employee@saathapp.com', 'nikitarmalkhedkar@gmail.com');");
  console.log("Matching employee profiles by email:");
  console.table(emp.rows);
  
  const empNull = await client.query("SELECT id, user_id, official_email, personal_email, full_name FROM public.employee_profiles WHERE user_id IS NULL;");
  console.log("Employee profiles with null user_id:");
  console.table(empNull.rows);
  
  await client.end();
}
run().catch(console.error);
