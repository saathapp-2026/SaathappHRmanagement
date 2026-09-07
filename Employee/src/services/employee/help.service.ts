import { supabase } from '@/lib/supabase/client';

export type HelpRequestStatus = 'submitted' | 'open' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
export type HelpRequestPriority = 'low' | 'medium' | 'high';

export interface HelpRequest {
  id: string;
  help_id: string;
  employee_id: string;
  category: string;
  subject: string;
  description: string;
  status: HelpRequestStatus;
  priority: HelpRequestPriority;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
}

export interface HelpRequestMessage {
  id: string;
  help_request_id: string;
  sender_id: string;
  message: string;
  is_internal: boolean;
  created_at: string;
}

export const helpService = {
  async getHelpRequests(status?: string) {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error("Not authenticated");

    let query = supabase.from('help_requests').select('*').order('created_at', { ascending: false });
    
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as HelpRequest[];
  },

  async getHelpRequestById(id: string) {
    const { data, error } = await supabase
      .from('help_requests')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as HelpRequest;
  },

  async getHelpRequestMessages(requestId: string) {
    const { data, error } = await supabase
      .from('help_request_messages')
      .select('*')
      .eq('help_request_id', requestId)
      .eq('is_internal', false)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data as HelpRequestMessage[];
  },

  async submitHelpRequest(payload: { category: string; subject: string; description: string; priority?: string }) {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error("Not authenticated");

    const { data: employeeData } = await supabase.from('employee_profiles').select('id').eq('user_id', userData.user.id).single();
    if (!employeeData) throw new Error("Employee not found");

    const { data, error } = await supabase
      .from('help_requests')
      .insert({
        employee_id: employeeData.id,
        category: payload.category,
        subject: payload.subject,
        description: payload.description,
        priority: payload.priority || 'medium'
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as HelpRequest;
  },

  async replyToHelpRequest(requestId: string, message: string) {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error("Not authenticated");

    const { data: employeeData } = await supabase.from('employee_profiles').select('id').eq('user_id', userData.user.id).single();
    if (!employeeData) throw new Error("Employee not found");

    const { data, error } = await supabase
      .from('help_request_messages')
      .insert({
        help_request_id: requestId,
        sender_id: employeeData.id,
        message,
        is_internal: false
      })
      .select()
      .single();

    if (error) throw error;
    return data as HelpRequestMessage;
  },

  async closeHelpRequest(requestId: string) {
    const { data, error } = await supabase
      .from('help_requests')
      .update({ status: 'closed', resolved_at: new Date().toISOString() })
      .eq('id', requestId)
      .select()
      .single();

    if (error) throw error;
    return data as HelpRequest;
  },
  
  async uploadAttachment(file: File, requestId: string) {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error("Not authenticated");

    const { data: employeeData } = await supabase.from('employee_profiles').select('id').eq('user_id', userData.user.id).single();
    if (!employeeData) throw new Error("Employee not found");

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${employeeData.id}/${requestId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('help-attachments')
      .upload(filePath, file);

    if (uploadError) throw uploadError;
    
    const { data } = supabase.storage.from('help-attachments').getPublicUrl(filePath);
    return data.publicUrl;
  }
};
