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

  const { data, error } = await supabase
    .from('employee_profiles')
    .select(`
      *,
      departments ( name ),
      designations ( name ),
      work_locations ( name ),
      reporting_manager:employee_profiles!reporting_manager_id ( full_name )
    `)
    .eq('user_id', '123e4567-e89b-12d3-a456-426614174000') // valid UUID syntax
    .maybeSingle();

  console.log('Error:', JSON.stringify(error, null, 2));
  console.log('Error details:', error);
}

main().catch(console.error);
