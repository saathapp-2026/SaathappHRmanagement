const fs = require('fs');

const calendarPage = `"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { MockPortalService } from "@/services/mockPortalService";

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MockPortalService.getEvents().then(data => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 px-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Company Calendar</h1>
        <p className="text-slate-500 text-sm mt-1">View upcoming holidays and company events.</p>
      </div>
      
      {loading ? (
        <div className="py-20 text-center">Loading events...</div>
      ) : events.length === 0 ? (
        <Card className="shadow-sm border-slate-100 text-center py-20">
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-lg">No Upcoming Events</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto mt-2">There are no upcoming company events or holidays this month.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {events.map((evt) => (
            <Card key={evt.id} className="shadow-sm border-slate-100 p-4">
              <div className="flex gap-4 items-center">
                 <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="font-semibold text-slate-800">{evt.title}</h3>
                    <p className="text-sm text-slate-500">{new Date(evt.date).toLocaleDateString()}</p>
                 </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
`;

const announcementsPage = `"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { MockPortalService } from "@/services/mockPortalService";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MockPortalService.getAnnouncements().then(data => {
      setAnnouncements(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 px-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Announcements</h1>
        <p className="text-slate-500 text-sm mt-1">Stay updated with the latest company news.</p>
      </div>
      
      {loading ? (
        <div className="py-20 text-center">Loading announcements...</div>
      ) : announcements.length === 0 ? (
        <Card className="shadow-sm border-slate-100 text-center py-20">
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center">
              <Bell className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-lg">You're all caught up!</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto mt-2">No new announcements at this time.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {announcements.map((ann) => (
            <Card key={ann.id} className="shadow-sm border-slate-100 p-4 flex flex-col gap-2">
               <h3 className="font-semibold text-slate-800">{ann.title}</h3>
               <p className="text-sm text-slate-600">{ann.content}</p>
               <p className="text-xs text-slate-400">{new Date(ann.date).toLocaleDateString()}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
`;

const notificationsPage = `"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Inbox } from "lucide-react";
import { MockPortalService } from "@/services/mockPortalService";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
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
`;

fs.writeFileSync('src/app/(portal)/calendar/page.tsx', calendarPage);
fs.writeFileSync('src/app/(portal)/announcements/page.tsx', announcementsPage);
fs.writeFileSync('src/app/(portal)/notifications/page.tsx', notificationsPage);
