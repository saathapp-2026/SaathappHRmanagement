const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function runTests() {
  const checkInPromises = Array(5).fill().map(() => 
    supabase.rpc('check_in', { p_latitude: 12.9716, p_longitude: 77.5946, p_session_info: { client: "test_script" } })
  );
  const checkInResults = await Promise.allSettled(checkInPromises);
  checkInResults.forEach(r => {
      console.log(r.status === 'fulfilled' ? r.value : r.reason);
  });
}
runTests();
