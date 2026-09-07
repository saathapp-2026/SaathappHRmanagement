import { supabase } from '@/lib/supabase/client';

export interface AppNotification {
  id: string;
  employee_id: string;
  category: string;
  title: string;
  message: string;
  related_entity_type?: string;
  related_entity_id?: string;
  action_url?: string;
  is_read: boolean;
  read_at?: string;
  created_at: string;
}

export const notificationsService = {
  async getNotifications() {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as AppNotification[];
  },

  async markAsRead(id: string) {
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data as AppNotification;
  },

  async markAllAsRead() {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error("Not authenticated");

    const { data: employeeData } = await supabase.from('employee_profiles').select('id').eq('user_id', userData.user.id).single();
    if (!employeeData) throw new Error("Employee not found");

    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('employee_id', employeeData.id)
      .eq('is_read', false)
      .select();

    if (error) throw error;
    return data;
  },
  
  subscribeToNotifications(callback: (payload: any) => void) {
    let subscription: any | null = null;
    let isSubscribed = true;

    supabase.auth.getUser().then(({ data: userData }) => {
      if (!userData.user || !isSubscribed) return;
      supabase.from('employee_profiles').select('id').eq('user_id', userData.user.id).single().then(({ data: employeeData }) => {
        if (!employeeData || !isSubscribed) return;
        
        subscription = supabase
          .channel(`public:notifications:employee_id=eq.${employeeData.id}`)
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'notifications',
              filter: `employee_id=eq.${employeeData.id}`
            },
            (payload) => {
              callback(payload);
            }
          )
          .subscribe();
      });
    });

    return () => {
      isSubscribed = false;
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }
};
