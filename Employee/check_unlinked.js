const { Client } = require('pg');
async function run() {
  const connectionString = "postgresql://postgres:saathapp2026@db.qdzvvrkghqczyowxhphk.supabase.co:5432/postgres";
  const client = new Client({ connectionString });
  await client.connect();
  
  const authUsers = await client.query(`
    SELECT u.id, u.email, u.created_at
    FROM auth.users u
    LEFT JOIN public.employee_profiles e ON e.user_id = u.id
    WHERE e.id IS NULL
    ORDER BY u.created_at DESC
  `);
  console.log("Unlinked Auth users:");
  console.table(authUsers.rows);
  
  await client.end();
}
run().catch(console.error);
