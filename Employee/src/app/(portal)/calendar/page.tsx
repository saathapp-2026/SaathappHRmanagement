"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { MockPortalService } from "@/services/mockPortalService";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
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
