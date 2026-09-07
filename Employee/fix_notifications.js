const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'src/app/(portal)/notifications/page.tsx');

const content = `"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Inbox, CheckCircle2 } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  title: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) return;

    const { data: profile } = await supabase.from('employee_profiles').select('id').eq('user_id', userId).single();
    if (!profile) return;

    const { data, error } = await supabase
      .from('employee_notifications')
      .select('*')
      .eq('employee_id', profile.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setNotifications(data);
    }
    setLoading(false);
  };

  const markAsRead = async (id: string) => {
    await supabase.from('employee_notifications').update({ is_read: true }).eq('id', id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  const markAllAsRead = async () => {
    const unreadIds = notifications.filter(n => !n.is_read).map(n => n.id);
    if (unreadIds.length === 0) return;

    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) return;

    const { data: profile } = await supabase.from('employee_profiles').select('id').eq('user_id', userId).single();
    if (!profile) return;

    await supabase.from('employee_notifications').update({ is_read: true }).eq('employee_id', profile.id).in('id', unreadIds);
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-500 text-sm mt-1">Your recent activity and alerts.</p>
        </div>
        {notifications.some(n => !n.is_read) && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCircle2 className="w-4 h-4 mr-2" /> Mark all as read
          </Button>
        )}
      </div>
      
      {loading ? (
         <div className="py-20 text-center text-slate-500">Loading notifications...</div>
      ) : notifications.length === 0 ? (
        <Card className="shadow-sm border-slate-200 text-center py-20 bg-slate-50/50">
          <CardContent className="flex flex-col items-center justify-center space-y-4 pt-6">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center">
              <Inbox className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-lg">No New Notifications</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto mt-2">We'll let you know when there's something new for you to check.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {notifications.map((notif) => (
            <Card key={notif.id} className={\`shadow-sm transition-colors \${notif.is_read ? 'bg-white border-slate-200' : 'bg-blue-50/30 border-blue-200'}\`}>
               <CardContent className="p-4">
                 <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-slate-800">{notif.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{notif.message}</p>
                    </div>
                    {!notif.is_read && (
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800" onClick={() => markAsRead(notif.id)}>
                        Mark read
                      </Button>
                    )}
                 </div>
                 <p className="text-xs text-slate-400 mt-2">
                   {new Date(notif.created_at).toLocaleString()}
                 </p>
               </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
`;

fs.writeFileSync(pagePath, content);
console.log('Patched notifications page.');
