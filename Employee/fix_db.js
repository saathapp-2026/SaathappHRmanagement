const { Client } = require('pg');
async function run() {
  const connectionString = "postgresql://postgres:saathapp2026@db.qdzvvrkghqczyowxhphk.supabase.co:5432/postgres";
  const client = new Client({ connectionString });
  await client.connect();
  
  // 1. Create missing profiles for auth users who don't have one
  await client.query(`
    INSERT INTO public.employee_profiles (
      user_id,
      official_email,
      full_name,
      employee_code,
      account_status,
      profile_completion_status,
      employment_status
    )
    SELECT 
      u.id,
      u.email,
      COALESCE(u.raw_user_meta_data->>'full_name', 'New Employee'),
      'EMP-' || substr(u.id::text, 1, 8),
      'profile_pending',
      'pending',
      'full_time'
    FROM auth.users u
    LEFT JOIN public.employee_profiles e ON e.user_id = u.id
    WHERE e.id IS NULL AND u.email IS NOT NULL;
  `);
  
  // 2. Add unique constraint on user_id
  await client.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS employee_profiles_user_id_unique
    ON public.employee_profiles(user_id)
    WHERE user_id IS NOT NULL;
  `);

  // 3. Create handle_new_user function and trigger
  await client.query(`
    CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS trigger AS $$
    BEGIN
      IF EXISTS (SELECT 1 FROM public.employee_profiles WHERE official_email = NEW.email AND user_id IS NULL) THEN
        UPDATE public.employee_profiles
        SET user_id = NEW.id
        WHERE official_email = NEW.email AND user_id IS NULL;
      ELSE
        INSERT INTO public.employee_profiles (
          user_id,
          official_email,
          full_name,
          employee_code,
          account_status,
          profile_completion_status,
          employment_status
        ) VALUES (
          NEW.id,
          NEW.email,
          COALESCE(NEW.raw_user_meta_data->>'full_name', 'New Employee'),
          'EMP-' || substr(NEW.id::text, 1, 8),
          'profile_pending',
          'pending',
          'full_time'
        );
      END IF;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
  `);

  await client.query(`
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
  `);
  
  console.log("DB fixes applied successfully!");
  await client.end();
}
run().catch(console.error);
