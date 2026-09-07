import { supabase } from '@/lib/supabase/client';

export interface AttendanceRecord {
  id: string;
  employee_id: string;
  attendance_date: string;
  check_in_at: string | null;
  check_out_at: string | null;
  total_work_minutes: number | null;
  status: 'present' | 'late' | 'half_day' | 'absent' | 'on_leave' | 'holiday' | 'weekly_off' | 'work_from_home';
}

export interface AttendanceCorrection {
  id: string;
  employee_id: string;
  attendance_record_id: string;
  correction_date: string;
  existing_check_in: string | null;
  existing_check_out: string | null;
  requested_check_in: string | null;
  requested_check_out: string | null;
  reason: string;
  attachment_path: string | null;
  status: 'pending' | 'under_review' | 'information_requested' | 'approved' | 'rejected';
  employee_response: string | null;
  public_hr_response: string | null;
  created_at: string;
  updated_at: string;
}

export interface MonthlySummary {
  totalWorkingDays: number;
  presentDays: number;
  absentDays: number;
  leaveDays: number;
  lateDays: number;
  halfDays: number;
  holidays: number;
  weeklyOffs: number;
  attendancePercentage: number;
  totalWorkingMinutes: number;
}

export const AttendanceService = {
  async getEmployeeProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");
    
    const { data, error } = await supabase
      .from('employee_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single();
      
    if (error) throw error;
    return data;
  },

  async getTodayAttendance() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('attendance_records')
      .select('*')
      .eq('attendance_date', today)
      .maybeSingle();

    if (error) {
      console.error(error);
      return null;
    }
    return data;
  },

  async checkIn(latitude?: number, longitude?: number) {
    const { data, error } = await supabase.rpc('check_in', {
      p_latitude: latitude || null,
      p_longitude: longitude || null,
      p_session_info: { client: "web" }
    });
    if (error) throw error;
    return data;
  },

  async checkOut(latitude?: number, longitude?: number) {
    const { data, error } = await supabase.rpc('check_out', {
      p_latitude: latitude || null,
      p_longitude: longitude || null,
      p_session_info: { client: "web" }
    });
    if (error) throw error;
    return data;
  },

  async getAttendanceHistory(startDate?: string, endDate?: string, status?: string, page = 1, limit = 50, sortBy = 'attendance_date', sortOrder = 'desc') {
    const profile = await this.getEmployeeProfile();
    let query = supabase
      .from('attendance_records')
      .select('*', { count: 'exact' })
      .eq('employee_id', profile.id);
      
    if (startDate) query = query.gte('attendance_date', startDate);
    if (endDate) query = query.lte('attendance_date', endDate);
    if (status) query = query.eq('status', status);
    
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    query = query.order(sortBy, { ascending: sortOrder === 'asc' }).range(from, to);
    
    const { data, error, count } = await query;
    if (error) throw error;
    
    return { data: data as AttendanceRecord[], count };
  },
  
  async getMonthlySummary(startDate: string, endDate: string): Promise<MonthlySummary> {
    const profile = await this.getEmployeeProfile();
    const { data, error } = await supabase
      .from('attendance_records')
      .select('attendance_date, status, total_work_minutes')
      .eq('employee_id', profile.id)
      .gte('attendance_date', startDate)
      .lte('attendance_date', endDate);
      
    if (error) throw error;
    
    const summary: MonthlySummary = {
      totalWorkingDays: 0,
      presentDays: 0,
      absentDays: 0,
      leaveDays: 0,
      lateDays: 0,
      halfDays: 0,
      holidays: 0,
      weeklyOffs: 0,
      attendancePercentage: 0,
      totalWorkingMinutes: 0
    };
    
    if (!data) return summary;
    
    const todayStr = new Date().toISOString().split('T')[0];

    data.forEach(record => {
      // Ignore future dates for absence/present counting
      if (record.attendance_date > todayStr) {
        return; 
      }

      if (['present', 'work_from_home'].includes(record.status)) summary.presentDays++;
      else if (record.status === 'absent') summary.absentDays++;
      else if (record.status === 'on_leave') summary.leaveDays++;
      else if (record.status === 'late') summary.lateDays++;
      else if (record.status === 'half_day') summary.halfDays++;
      else if (record.status === 'holiday') summary.holidays++;
      else if (record.status === 'weekly_off') summary.weeklyOffs++;
      
      // Calculate total working days: days employee is expected to be at work
      if (['present', 'work_from_home', 'late', 'half_day', 'absent'].includes(record.status)) {
        summary.totalWorkingDays++;
      }
      
      if (record.total_work_minutes) {
        summary.totalWorkingMinutes += record.total_work_minutes;
      }
    });
    
    const attended = summary.presentDays + summary.lateDays + (summary.halfDays * 0.5);
    summary.attendancePercentage = summary.totalWorkingDays > 0 ? Math.round((attended / summary.totalWorkingDays) * 100) : 0;
    
    return summary;
  },

  async submitCorrectionRequest(data: {
    attendance_record_id: string;
    correction_date: string;
    requested_check_in: string | null;
    requested_check_out: string | null;
    reason: string;
    attachment_path?: string | null;
  }) {
    // Rely solely on Postgres RPC for security (authenticity, ownership, rules, duplicate checks, etc.)
    const reqIn = data.requested_check_in ? `${data.correction_date}T${data.requested_check_in}:00Z` : null;
    const reqOut = data.requested_check_out ? `${data.correction_date}T${data.requested_check_out}:00Z` : null;
    
    const { data: correctionId, error } = await supabase.rpc('submit_attendance_correction', {
      p_attendance_record_id: data.attendance_record_id,
      p_correction_date: data.correction_date,
      p_requested_check_in: reqIn,
      p_requested_check_out: reqOut,
      p_reason: data.reason,
      p_attachment_path: data.attachment_path || null
    });

    if (error) throw error;
    
    return { id: correctionId };
  },
  
  async getCorrectionRequests(status?: string, page = 1, limit = 50) {
    const profile = await this.getEmployeeProfile();
    let query = supabase
      .from('attendance_corrections')
      .select('*, attendance_records(status)', { count: 'exact' })
      .eq('employee_id', profile.id);
      
    if (status) query = query.eq('status', status);
    
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    query = query.order('created_at', { ascending: false }).range(from, to);
    
    const { data, error, count } = await query;
    if (error) throw error;
    
    return { data, count };
  },
  
  async respondToCorrection(correctionId: string, responseText: string, attachmentPath?: string) {
    const profile = await this.getEmployeeProfile();
    
    const { data: req, error: reqErr } = await supabase
      .from('attendance_corrections')
      .select('id, status')
      .eq('id', correctionId)
      .eq('employee_id', profile.id)
      .single();
      
    if (reqErr || !req) throw new Error("Correction request not found");
    if (req.status !== 'information_requested') throw new Error("Cannot respond unless information is requested");
    
    const updateData: any = {
      employee_response: responseText,
      status: 'pending'
    };
    if (attachmentPath) {
       updateData.attachment_path = attachmentPath;
    }
    
    const { data, error } = await supabase
      .from('attendance_corrections')
      .update(updateData)
      .eq('id', correctionId)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }
};
