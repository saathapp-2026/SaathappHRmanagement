import React from 'react';
import { CalendarDays } from 'lucide-react';

export function UpcomingHolidaysCard() {
  const holidays = [
    { date: '02 Oct', name: 'Gandhi Jayanti', days: '25 days away' },
    { date: '20 Oct', name: 'Diwali', days: '43 days away' },
  ];

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4 text-rose-600">
        <CalendarDays size={18} />
        <h3 className="text-sm font-bold uppercase tracking-wider">Upcoming Holidays</h3>
      </div>
      <div className="space-y-4">
        {holidays.map((h, idx) => (
          <div key={idx} className="flex justify-between items-center border-b border-gray-50 last:border-0 last:pb-0 pb-3">
            <div>
              <p className="text-sm font-bold text-gray-900">{h.name}</p>
              <p className="text-xs text-rose-600 font-medium">{h.date}</p>
            </div>
            <p className="text-xs text-gray-400 font-medium">{h.days}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
