import { supabase } from '@/lib/supabase/client';

export const profileService = {
  async getEmployeeProfile() {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) {
      throw new Error('Authentication required');
    }

    const { data, error } = await supabase
      .from('employee_profiles')
      .select(`
        *,
        departments ( name ),
        designations ( name ),
        work_locations ( name ),
        reporting_manager:employee_profiles!reporting_manager_id ( full_name )
      `)
      .eq('user_id', authData.user.id)
      .maybeSingle();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Unable to complete request. Please try again. (${error.code}: ${error.message})`);
    }
    if (!data) {
      throw new Error('Employee profile is not linked to this account');
    }
    return data;
  },

  async updatePermittedFields(fields: {
    profile_photo_url?: string;
    mobile?: string;
    personal_email?: string;
    address?: any;
    emergency_contact_name?: string;
    emergency_contact_relationship?: string;
    emergency_contact_phone?: string;
  }) {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) {
      throw new Error('Authentication required');
    }

    const { data: profile, error: profileError } = await supabase
      .from('employee_profiles')
      .select('id')
      .eq('user_id', authData.user.id)
      .maybeSingle();

    if (profileError) {
      throw new Error(`Unable to load profile. Please try again. (${profileError.code || 'unknown'}: ${profileError.message || 'unknown'})`);
    }
    if (!profile) {
      throw new Error('Employee profile is not linked to this account');
    }

    const { data, error } = await supabase
      .from('employee_profiles')
      .update(fields)
      .eq('id', profile.id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Unable to complete request. Please try again. (${error.code}: ${error.message})`);
    }
    return data;
  },

  async completeProfile(fields: {
    mobile?: string;
    date_of_birth?: string;
    address?: any;
    emergency_contact_name?: string;
    emergency_contact_relationship?: string;
    emergency_contact_phone?: string;
  }) {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) {
      throw new Error('Authentication required');
    }

    const { data: profile, error: profileError } = await supabase
      .from('employee_profiles')
      .select('id')
      .eq('user_id', authData.user.id)
      .maybeSingle();

    if (profileError) {
      throw new Error(`Unable to load profile. Please try again. (${profileError.code || 'unknown'}: ${profileError.message || 'unknown'})`);
    }
    if (!profile) {
      throw new Error('Employee profile is not linked to this account');
    }

    const { data, error } = await supabase
      .from('employee_profiles')
      .update({
        ...fields,
        profile_completion_status: 'completed'
      })
      .eq('id', profile.id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Unable to complete request. Please try again. (${error.code}: ${error.message})`);
    }
    return data;
  },

  async requestChange(requestData: {
    field_name: string;
    current_value: any;
    requested_value: any;
    reason?: string;
    supporting_document_path?: string;
  }) {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) {
      throw new Error('Authentication required');
    }

    const { data: profile, error: profileError } = await supabase
      .from('employee_profiles')
      .select('id')
      .eq('user_id', authData.user.id)
      .maybeSingle();

    if (profileError) {
      throw new Error(`Unable to load profile. Please try again. (${profileError.code || 'unknown'}: ${profileError.message || 'unknown'})`);
    }
    if (!profile) {
      throw new Error('Employee profile is not linked to this account');
    }

    const { data, error } = await supabase
      .from('profile_change_requests')
      .insert({
        employee_id: profile.id,
        ...requestData,
        status: 'submitted'
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Unable to complete request. Please try again. (${error.code}: ${error.message})`);
    }
    return data;
  },

  async getChangeRequests() {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) {
      throw new Error('Authentication required');
    }

    const { data: profile, error: profileError } = await supabase
      .from('employee_profiles')
      .select('id')
      .eq('user_id', authData.user.id)
      .maybeSingle();

    if (profileError) {
      throw new Error(`Unable to load profile. Please try again. (${profileError.code || 'unknown'}: ${profileError.message || 'unknown'})`);
    }
    if (!profile) {
      throw new Error('Employee profile is not linked to this account');
    }

    const { data, error } = await supabase
      .from('profile_change_requests')
      .select('*')
      .eq('employee_id', profile.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Unable to complete request. Please try again. (${error.code}: ${error.message})`);
    }
    return data;
  }
};
