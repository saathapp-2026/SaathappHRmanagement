"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Inbox, Bell } from "lucide-react";
import { MockPortalService } from "@/services/mockPortalService";

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MockPortalService.getNotifications().then(data => {
      setNotifications(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 px-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
        <p className="text-slate-500 text-sm mt-1">Your recent activity and alerts.</p>
      </div>
      
      {loading ? (
         <div className="py-20 text-center">Loading notifications...</div>
      ) : notifications.length === 0 ? (
        <Card className="shadow-sm border-slate-100 text-center py-20">
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center">
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
            <Card key={notif.id} className="shadow-sm border-slate-100 p-4">
               <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-800">{notif.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{notif.message}</p>
                  </div>
                  {!notif.read && <span className="bg-blue-500 w-2 h-2 rounded-full"></span>}
               </div>
               <p className="text-xs text-slate-400 mt-2">{new Date(notif.date).toLocaleDateString()}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
