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

  // No filter, so it should return multiple rows (if there are any)
  const { data, error } = await supabase
    .from('departments')
    .select('*')
    .single();

  console.log('Error details:', error);
}

main().catch(console.error);
