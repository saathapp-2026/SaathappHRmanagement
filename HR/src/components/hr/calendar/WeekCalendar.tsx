import React from 'react';
import { mockCalendarEvents, getEventColor } from '@/data/hr/calendar';

export function WeekCalendar() {
  const days = ['Mon 7', 'Tue 8', 'Wed 9', 'Thu 10', 'Fri 11', 'Sat 12', 'Sun 13'];
  const times = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-8 border-b border-gray-200 bg-gray-50">
          <div className="p-3 border-r border-gray-100"></div>
          {days.map(d => (
            <div key={d} className={`p-3 text-center text-sm font-bold border-r border-gray-100 last:border-0 ${d === 'Mon 7' ? 'text-indigo-600 bg-indigo-50/50' : 'text-gray-700'}`}>{d}</div>
          ))}
        </div>
        
        {/* All Day Row */}
        <div className="grid grid-cols-8 border-b border-gray-200 bg-white">
          <div className="p-3 border-r border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider text-center flex items-center justify-center">All Day</div>
          <div className="p-2 border-r border-gray-100 bg-indigo-50/10">
            <div className={`px-2 py-1 text-[10px] font-bold rounded border-l-2 mb-1 bg-indigo-50 border-indigo-500 text-indigo-700`}>Policy Review</div>
          </div>
          <div className="p-2 border-r border-gray-100"></div>
          <div className="p-2 border-r border-gray-100">
            <div className={`px-2 py-1 text-[10px] font-bold rounded border-l-2 bg-purple-50 border-purple-500 text-purple-700`}>Rahul Birthday</div>
          </div>
          <div className="p-2 border-r border-gray-100 relative">
            <div className={`absolute left-0 right-[-100%] top-2 px-2 py-1 text-[10px] font-bold rounded border-l-2 bg-amber-50 border-amber-500 text-amber-700 z-10 mx-2`}>Anjali Rao — Casual Leave</div>
          </div>
          <div className="p-2 border-r border-gray-100"></div>
          <div className="p-2 border-r border-gray-100 bg-gray-50"></div>
          <div className="p-2 border-r border-gray-100 bg-gray-50"></div>
        </div>

        {/* Time Grid */}
        {times.map((t, idx) => (
          <div key={idx} className="grid grid-cols-8 border-b border-gray-100 last:border-0 bg-white min-h-[60px]">
            <div className="p-2 border-r border-gray-100 text-xs font-medium text-gray-400 text-center flex items-start justify-center pt-2 -mt-2">{t}</div>
            <div className="p-1 border-r border-gray-100 border-dashed bg-indigo-50/10"></div>
            <div className="p-1 border-r border-gray-100 border-dashed"></div>
            <div className="p-1 border-r border-gray-100 border-dashed"></div>
            <div className="p-1 border-r border-gray-100 border-dashed"></div>
            <div className="p-1 border-r border-gray-100 border-dashed relative">
              {t === '10:00 AM' && <div className="absolute top-1 bottom-[-59px] left-1 right-1 px-2 py-1 text-[10px] font-bold rounded border-l-2 bg-emerald-50 border-emerald-500 text-emerald-700 z-10">New Hire Orientation</div>}
            </div>
            <div className="p-1 border-r border-gray-100 border-dashed bg-gray-50"></div>
            <div className="p-1 border-r border-gray-100 border-dashed bg-gray-50"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
