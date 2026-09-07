const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://qdzvvrkghqczyowxhphk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkenZ2cmtnaHFjenlvd3hocGhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1ODYyODYsImV4cCI6MjEwNDE2MjI4Nn0.vVYovzoGoO_s1D1uFjqSRiQBgEiOIgvctwuNorivZmM'
);

async function test() {
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
    
  console.log("Error:", error);
}

test();
