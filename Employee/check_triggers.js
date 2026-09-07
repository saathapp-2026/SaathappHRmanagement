const { Client } = require('pg');
async function run() {
  const connectionString = "postgresql://postgres:saathapp2026@db.qdzvvrkghqczyowxhphk.supabase.co:5432/postgres";
  const client = new Client({ connectionString });
  await client.connect();
  
  const triggers = await client.query(`
    SELECT event_object_schema, event_object_table, trigger_name, action_statement
    FROM information_schema.triggers
    WHERE event_object_schema = 'auth' OR event_object_schema = 'public';
  `);
  console.log("Triggers:");
  console.table(triggers.rows);
  
  const funcs = await client.query(`
    SELECT routine_name, routine_definition
    FROM information_schema.routines
    WHERE routine_type = 'FUNCTION' AND routine_schema = 'public'
    AND routine_name LIKE '%profile%' OR routine_name LIKE '%auth%';
  `);
  console.log("Functions:");
  console.log(funcs.rows);
  
  await client.end();
}
run().catch(console.error);
