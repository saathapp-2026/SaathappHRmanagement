const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://qdzvvrkghqczyowxhphk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkenZ2cmtnaHFjenlvd3hocGhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1ODYyODYsImV4cCI6MjEwNDE2MjI4Nn0.vVYovzoGoO_s1D1uFjqSRiQBgEiOIgvctwuNorivZmM'
);

async function test() {
  const { data, error } = await supabase.rpc('get_tables');
  console.log("RPC Error:", error);
  
  // Try selecting from a known table if we know any. Let's just try to hit the rest API root?
  const res = await fetch('https://qdzvvrkghqczyowxhphk.supabase.co/rest/v1/', {
    headers: { 'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkenZ2cmtnaHFjenlvd3hocGhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1ODYyODYsImV4cCI6MjEwNDE2MjI4Nn0.vVYovzoGoO_s1D1uFjqSRiQBgEiOIgvctwuNorivZmM' }
  });
  const json = await res.json();
  console.log("Swagger:", Object.keys(json.definitions || {}));
}

test();
