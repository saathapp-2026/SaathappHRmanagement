import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase configuration. Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in your environment variables."
  );
}

// Ensure the service role key is never used in the client
if (supabaseAnonKey === process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey.includes('service_role')) {
  console.warn("WARNING: You appear to be using the Supabase Service Role key in the browser. This is a severe security risk.");
}

// Create a single centralized Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
