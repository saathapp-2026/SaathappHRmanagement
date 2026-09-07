const { Client } = require('pg');

async function testLeaveDB() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:saathapp2026@db.qdzvvrkghqczyowxhphk.supabase.co:5432/postgres'
  });

  try {
    await client.connect();
    console.log("Connected to Supabase DB.");

    // Helper to query as employee
    async function queryAsEmployee(employeeUserId, queryText, queryParams) {
      await client.query("BEGIN;");
      await client.query(`SET LOCAL role = 'authenticated';`);
      await client.query(`SET LOCAL "request.jwt.claims" = '{"sub": "${employeeUserId}", "role": "authenticated"}';`);
      try {
        const result = await client.query(queryText, queryParams);
        await client.query("COMMIT;");
        return result;
      } catch(err) {
        await client.query("ROLLBACK;");
        throw err;
      }
    }

    console.log("Setting up test data...");
    
    // Create test user
    const userRes = await client.query("INSERT INTO auth.users (id) VALUES (gen_random_uuid()) RETURNING id;");
    const userId = userRes.rows[0].id;
    
    await client.query(`
      INSERT INTO employee_profiles (user_id, employee_code, full_name, official_email, account_status, employment_status)
      VALUES ('${userId}'::uuid, 'EMP001-${userId}', 'Test User', 'test-${userId}@example.com', 'active', 'full_time')
    `);
    
    const empRes = await client.query(`SELECT id FROM employee_profiles WHERE user_id = '${userId}'::uuid`);
    const employeeId = empRes.rows[0].id;
    
    // Mock auth.uid
    await client.query(`
      SELECT set_config('request.jwt.claims', '{"sub":"' || '' || '"}', true);
    `);
    
    // Find a leave type
    const leaveTypeRes = await client.query("INSERT INTO leave_types (name, code, paid, requires_document) VALUES ('Casual Leave', 'CL', true, false) ON CONFLICT (code) DO NOTHING RETURNING id;");
    if (leaveTypeRes.rows.length === 0) throw new Error('Casual Leave type not found');
    const leaveTypeId = leaveTypeRes.rows[0].id;
    
    // Setup balance
    await client.query(`
      INSERT INTO employee_leave_balances (employee_id, leave_type_id, year, allocated, used, pending)
      VALUES ($1, $2, 2024, 12, 0, 0)
    `, [employeeId, leaveTypeId]);

    console.log("Test 1: Submit a valid leave request");
    let res = await queryAsEmployee(userId, `
      SELECT submit_leave_request(
        $1::UUID, '2024-12-01', '2024-12-02', 'full_day', null, 'Vacation', null, null
      ) as request_id;
    `, [leaveTypeId]);
    const requestId = res.rows[0].request_id;
    console.log("Leave submitted with ID:", requestId);

    console.log("Test 2: Verify balance locked in pending");
    const balRes = await client.query(`
      SELECT pending FROM employee_leave_balances 
      WHERE employee_id = $1 AND leave_type_id = $2 AND year = 2024
    `, [employeeId, leaveTypeId]);
    console.log("Pending days:", balRes.rows[0].pending);
    if (balRes.rows[0].pending != 1) throw new Error("Balance locking failed. Expected 1 pending day.");

    console.log("Test 3: Overlapping request should fail");
    try {
      await queryAsEmployee(userId, `
        SELECT submit_leave_request(
          $1::UUID, '2024-12-02', '2024-12-03', 'full_day', null, 'Overlap', null, null
        );
      `, [leaveTypeId]);
      throw new Error("Overlapping request succeeded incorrectly!");
    } catch (err) {
      console.log("Successfully prevented overlap:", err.message);
    }

    console.log("Test 4: Insufficient balance should fail");
    try {
      await queryAsEmployee(userId, `
        SELECT submit_leave_request(
          $1::UUID, '2024-12-10', '2024-12-25', 'full_day', null, 'Too long', null, null
        );
      `, [leaveTypeId]);
      throw new Error("Insufficient balance check failed!");
    } catch (err) {
      console.log("Successfully prevented insufficient balance:", err.message);
    }

    console.log("Test 5: Cancel the leave request");
    await queryAsEmployee(userId, `
      SELECT cancel_leave_request($1::UUID);
    `, [requestId]);
    
    console.log("Test 6: Verify balance refunded");
    const balResAfter = await client.query(`
      SELECT pending FROM employee_leave_balances 
      WHERE employee_id = $1 AND leave_type_id = $2 AND year = 2024
    `, [employeeId, leaveTypeId]);
    console.log("Pending days after cancel:", balResAfter.rows[0].pending);
    if (balResAfter.rows[0].pending != 0) throw new Error("Balance refund failed.");

    console.log("ALL TESTS PASSED.");
  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    await client.end();
  }
}

testLeaveDB();
