const { Client } = require('pg');
async function run() {
  const connectionString = "postgresql://postgres:saathapp2026@db.qdzvvrkghqczyowxhphk.supabase.co:5432/postgres";
  const client = new Client({ connectionString });
  await client.connect();
  
  const empSchema = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'employee_profiles';");
  console.log("Employee Profiles schema:");
  console.table(empSchema.rows);
  
  const authUsers = await client.query("SELECT * FROM auth.users ORDER BY created_at DESC LIMIT 5;");
  console.log("Auth users:");
  console.log(authUsers.rows.map(u => ({ id: u.id, email: u.email })));
  
  await client.end();
}
run().catch(console.error);
