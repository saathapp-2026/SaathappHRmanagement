import React from 'react';
import { getEventDotColor } from '@/data/hr/calendar';

export function UpcomingEventsCard() {
  const events = [
    { section: 'Today', items: [{ title: 'HR Policy Review', time: '11:00 AM', type: 'HR Event' as const }] },
    { section: 'Tomorrow', items: [{ title: 'Rahul Mehta Birthday', time: 'All Day', type: 'Birthday' as const }, { title: 'Anjali Rao Leave', time: 'All Day', type: 'Employee Leave' as const }] },
    { section: '12 Sep', items: [{ title: 'New Hire Orientation', time: '10:00 AM', type: 'Training' as const }] },
  ];

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Upcoming</h3>
        <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700">View All</button>
      </div>
      
      <div className="space-y-6 flex-1">
        {events.map((group, idx) => (
          <div key={idx}>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{group.section}</p>
            <div className="space-y-3">
              {group.items.map((item, iIdx) => (
                <div key={iIdx} className="flex gap-3 items-start">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${getEventDotColor(item.type)}`}></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                    <p className="text-xs font-medium text-gray-500">{item.time}</p>
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
