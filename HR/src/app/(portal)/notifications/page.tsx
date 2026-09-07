 
"use client";

import { useEffect, useState } from "react";
import { notificationsService, AppNotification } from "@/services/employee/notifications.service";
import { Card, CardContent } from "@/components/ui/card";
import { Inbox, CheckCircle2, Link as LinkIcon, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

    const fetchNotifications = async () => {
    try {
      const data = await notificationsService.getNotifications();
      setNotifications(data);
    } catch (error: any) {
       
      const err = error as unknown;
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNotifications();

    const unsubscribe = notificationsService.subscribeToNotifications((payload) => {
      // In a real app we&apos;d handle insert/update/delete.
      // For now just refetch.
       
    fetchNotifications();
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  
  const markAsRead = async (id: string) => {
    try {
      await notificationsService.markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (error) {
      console.error(error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationsService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    } catch (error) {
      console.error(error);
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === "unread") return !n.is_read;
    if (filter === "read") return n.is_read;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-500 text-sm mt-1">Your recent activity and alerts.</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={filter} 
            onChange={e => setFilter(e.target.value)}
            className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background"
          >
            <option value="all">All</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
          {notifications.some(n => !n.is_read) && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <CheckCircle2 className="w-4 h-4 mr-2" /> Mark all read
            </Button>
          )}
        </div>
      </div>
      
      {loading ? (
         <div className="py-20 text-center text-slate-500">Loading notifications...</div>
      ) : filteredNotifications.length === 0 ? (
        <Card className="shadow-sm border-slate-200 text-center py-20 bg-slate-50/50">
          <CardContent className="flex flex-col items-center justify-center space-y-4 pt-6">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center">
              <Inbox className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-lg">No Notifications</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto mt-2">You&apos;re all caught up!</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notif) => (
            <Card key={notif.id} className={`shadow-sm transition-colors ${notif.is_read ? 'bg-white border-slate-100' : 'bg-blue-50/50 border-blue-200'}`}>
               <CardContent className="p-4">
                 <div className="flex justify-between items-start">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        {notif.category && (
                          <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-sm">
                            {notif.category}
                          </span>
                        )}
                        <h3 className="font-semibold text-slate-800 leading-tight">{notif.title}</h3>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{notif.message}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-xs text-slate-400">
                          {format(new Date(notif.created_at), 'MMM d, yyyy h:mm a')}
                        </span>
                        {notif.action_url && (
                          <Link href={notif.action_url} className="text-xs font-medium text-blue-600 hover:underline flex items-center">
                            <LinkIcon className="w-3 h-3 mr-1" /> View details
                          </Link>
                        )}
                      </div>
                    </div>
                    {!notif.is_read && (
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 shrink-0 h-8 text-xs" onClick={() => markAsRead(notif.id)}>
                        Mark read
                      </Button>
                    )}
                 </div>
               </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
