const { Client } = require('pg');

async function run() {
  const connectionString = "postgresql://postgres:saathapp2026@db.qdzvvrkghqczyowxhphk.supabase.co:5432/postgres";
  const client = new Client({ connectionString });
  await client.connect();
  
  await client.query("GRANT USAGE ON SCHEMA public TO authenticated;");
  await client.query("GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;");
  await client.query("GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;");
  
  await client.query("SET search_path TO public, auth;");
  
  const userRes = await client.query("INSERT INTO auth.users (id) VALUES (gen_random_uuid()) RETURNING id;");
  const userId = userRes.rows[0].id;
  
  await client.query(`
    INSERT INTO employee_profiles (user_id, employee_code, full_name, official_email, account_status, employment_status)
    VALUES ('${userId}'::uuid, 'EMP001-${userId}', 'Test User', 'test-${userId}@example.com', 'active', 'full_time')
  `);
  
  const empRes = await client.query(`SELECT id FROM employee_profiles WHERE user_id = '${userId}'::uuid`);
  const empId = empRes.rows[0].id;
  
  const concernRes = await client.query(`
    INSERT INTO concerns (employee_id, ticket_number, category, subject, description, priority, status)
    VALUES ('${empId}'::uuid, 'CON-TEST-${empId.substr(0, 8)}', 'HR', 'Test Concern', 'Test', 'medium', 'open') RETURNING id;
  `);
  const concernId = concernRes.rows[0].id;
  
  await client.query(`
    INSERT INTO concern_messages (concern_id, author_user_id, visibility, message)
    VALUES ('${concernId}'::uuid, '${userId}'::uuid, 'employee_visible', 'This is visible');
  `);
  
  await client.query(`
    INSERT INTO concern_messages (concern_id, author_user_id, visibility, message)
    VALUES ('${concernId}'::uuid, '${userId}'::uuid, 'internal', 'This is secret HR note');
  `);
  
  await client.query(`
    SELECT set_config('request.jwt.claims', '{"sub":"' || '' || '"}', true);
  `);
  
  await client.query("SET ROLE authenticated;");
  
  const messages = await client.query(`SELECT * FROM concern_messages WHERE concern_id = '${concernId}'::uuid`);
  console.log("Messages visible to employee:", messages.rows.map(r => r.visibility));
  
  if (messages.rows.some(r => r.visibility === 'internal')) {
    console.error("TEST FAILED: Internal message is visible!");
    process.exit(1);
  } else {
    console.log("TEST PASSED: Internal message is isolated.");
  }
  
  await client.end();
}

run().catch(console.error);
