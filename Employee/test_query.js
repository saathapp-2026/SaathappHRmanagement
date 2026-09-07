const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

async function main() {
  const envFile = fs.readFileSync('.env', 'utf-8');
  const env = {};
  for (const line of envFile.split('\n')) {
    if (line.trim() && !line.startsWith('#')) {
      const [key, ...values] = line.split('=');
      env[key.trim()] = values.join('=').trim();
    }
  }

  const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
  const supabaseAnonKey = env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Authenticate using a known user? We can't really do that without an email/password.
  // We can just run the query and see the error.
  const { data, error } = await supabase
    .from('employee_profiles')
    .select(`
      *,
      departments ( name ),
      designations ( name ),
      work_locations ( name ),
      reporting_manager:employee_profiles!reporting_manager_id ( full_name )
    `)
    .limit(1);

  console.log('Error:', error);
}

main().catch(console.error);
