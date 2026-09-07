import { supabase } from '@/lib/supabase/client';

export const PortalService = {
  async getLeaveBalances() {
    const { data, error } = await supabase
      .from('employee_leave_balances')
      .select('*, leave_types(name)')
      .order('year', { ascending: false });
    if (error) throw error;
    return data;
  },
  
  async applyLeave(data: any) {
    // We assume data has leaveTypeId, startDate, endDate, durationType, reason, etc.
    // Call the RPC
    const { data: request_id, error } = await supabase.rpc('submit_leave_request', {
      p_leave_type_id: data.leaveTypeId,
      p_start_date: data.startDate,
      p_end_date: data.endDate,
      p_duration_type: data.durationType || 'full_day',
      p_half_day_session: data.halfDaySession || null,
      p_reason: data.reason,
      p_emergency_contact: data.emergencyContact || null,
      p_attachment_path: data.attachmentPath || null
    });
    
    if (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
    return { success: true, request_id };
  },

  async getLeaveHistory() {
    const { data, error } = await supabase
      .from('leave_requests')
      .select('*, leave_types(name)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  
  async cancelLeave(requestId: string) {
    const { error } = await supabase.rpc('cancel_leave_request', {
      p_request_id: requestId
    });
    if (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
    return { success: true };
  },

  async submitConcern(data: any) {
    const { data: concern_id, error } = await supabase.rpc('submit_concern', {
      p_category: data.category,
      p_subject: data.subject,
      p_description: data.description,
      p_priority: data.priority || 'medium',
      p_is_anonymous: data.isAnonymous || false
    });
    
    if (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
    return { success: true, concern_id };
  },
  
  async getConcerns() {
    const { data, error } = await supabase
      .from('concerns')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  
  async getConcernDetail(concernId: string) {
    const { data: concern, error: cError } = await supabase
      .from('concerns')
      .select('*')
      .eq('id', concernId)
      .single();
    if (cError) throw cError;
    
    const { data: messages, error: mError } = await supabase
      .from('concern_messages')
      .select('*')
      .eq('concern_id', concernId)
      .order('created_at', { ascending: true });
    if (mError) throw mError;
    
    return { concern, messages };
  },
  
  async addConcernMessage(concernId: string, message: string, attachmentPath?: string) {
    const { data, error } = await supabase
      .from('concern_messages')
      .insert({
        concern_id: concernId,
        message,
        attachment_path: attachmentPath,
        visibility: 'employee_visible',
        author_user_id: (await supabase.auth.getUser()).data.user?.id
      });
    if (error) throw error;
    return { success: true, data };
  }
};
