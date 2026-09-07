const { Client } = require('pg');
async function run() {
  const connectionString = "postgresql://postgres:saathapp2026@db.qdzvvrkghqczyowxhphk.supabase.co:5432/postgres";
  const client = new Client({ connectionString });
  await client.connect();
  
  // Get one user and their profile
  const u = await client.query("SELECT id FROM auth.users WHERE email = 'nikitarmalkhedkar@gmail.com' LIMIT 1;");
  const userId = u.rows[0].id;
  
  const emp = await client.query(`SELECT id FROM public.employee_profiles WHERE user_id = '${userId}'::uuid;`);
  const empId = emp.rows[0].id;
  
  // Impersonate
  await client.query(`SELECT set_config('request.jwt.claims', '{"sub":"${userId}", "role":"authenticated"}', true);`);
  await client.query("SET ROLE authenticated;");
  
  const myProfile = await client.query(`SELECT id FROM public.employee_profiles;`);
  console.log("My profile visible rows count:", myProfile.rows.length);
  
  if (myProfile.rows.length === 1 && myProfile.rows[0].id === empId) {
    console.log("PASS: can SELECT own profile, cannot SELECT another");
  } else {
    console.log("FAIL: got", myProfile.rows);
  }
  
  try {
    await client.query(`UPDATE public.employee_profiles SET account_status = 'active' WHERE id = '${empId}'::uuid;`);
    console.log("FAIL: was able to update restricted field");
  } catch (e) {
    console.log("PASS: cannot update restricted field:", e.message);
  }

  try {
    await client.query(`INSERT INTO public.employee_profiles (user_id, official_email) VALUES ('${userId}'::uuid, 'test2@example.com');`);
    console.log("FAIL: was able to insert a second employee profile");
  } catch (e) {
    console.log("PASS: cannot insert a second employee profile:", e.message);
  }
  
  await client.end();
}
run().catch(console.error);
