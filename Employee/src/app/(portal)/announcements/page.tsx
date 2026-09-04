"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Megaphone } from "lucide-react";
import { MockPortalService } from "@/services/mockPortalService";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
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
