import React from 'react';
import { mockCalendarEvents, getEventColor, getEventDotColor } from '@/data/hr/calendar';
import { Clock, MapPin, Users } from 'lucide-react';

export function CalendarListView() {
  // Group events manually for demo
  const grouped = [
    { date: 'SEPTEMBER 7', events: mockCalendarEvents.filter(e => e.date === '07 Sep 2026') },
    { date: 'SEPTEMBER 9', events: mockCalendarEvents.filter(e => e.date === '09 Sep 2026') },
    { date: 'SEPTEMBER 10', events: mockCalendarEvents.filter(e => e.date === '10 Sep 2026') },
    { date: 'SEPTEMBER 12', events: mockCalendarEvents.filter(e => e.date === '12 Sep 2026') },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {grouped.map(group => (
          <div key={group.date}>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">{group.date}</h3>
            <div className="space-y-3 pl-4 border-l-2 border-gray-100 ml-2">
              {group.events.map(ev => (
                <div key={ev.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${getEventDotColor(ev.type)}`}></div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <h4 className="text-base font-bold text-gray-900">{ev.title}</h4>
                      <p className="text-xs font-semibold text-gray-500 mt-1">{ev.type}</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {!ev.allDay && <span className="flex items-center gap-1.5 text-sm text-gray-600"><Clock size={14}/> {ev.startTime} – {ev.endTime}</span>}
                      {ev.location && <span className="flex items-center gap-1.5 text-sm text-gray-600"><MapPin size={14}/> {ev.location}</span>}
                      {ev.audience && <span className="flex items-center gap-1.5 text-sm text-gray-600"><Users size={14}/> {ev.audience}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
