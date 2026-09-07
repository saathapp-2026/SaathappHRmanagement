import { supabase } from '@/lib/supabase/client';

export const authService = {
  signIn: async ({ email, password }: any) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },
  signOut: async () => {
    return await supabase.auth.signOut({ scope: 'global' }); // logout from other sessions where supported by forcing it if there was a way, but standard is signOut
  },
  resetPassword: async (email: string) => {
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
  },
  updatePassword: async (password: string) => {
    return await supabase.auth.updateUser({ password });
  },
  getSession: async () => {
    return await supabase.auth.getSession();
  },
  getCurrentEmployee: async () => {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) return { user: null, profile: null };

    const { data: profile, error } = await supabase
      .from('employee_profiles')
      .select('*')
      .eq('user_id', session.user.id)
      .maybeSingle();
      
    if (error) {
      console.error('Error fetching employee profile:', error);
    }
    
    return { user: session.user, profile: profile || null };
  },
  onAuthStateChange: (callback: (event: any, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};
