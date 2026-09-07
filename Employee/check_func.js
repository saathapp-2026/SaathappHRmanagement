const { Client } = require('pg');
async function run() {
  const connectionString = "postgresql://postgres:saathapp2026@db.qdzvvrkghqczyowxhphk.supabase.co:5432/postgres";
  const client = new Client({ connectionString });
  await client.connect();
  
  const funcs = await client.query(`
    SELECT routine_definition
    FROM information_schema.routines
    WHERE routine_name = 'current_employee_id' AND routine_schema = 'public';
  `);
  console.log("current_employee_id definition:");
  console.log(funcs.rows[0]?.routine_definition);
  
  await client.end();
}
run().catch(console.error);
