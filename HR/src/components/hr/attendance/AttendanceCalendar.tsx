import React, { useState } from 'react';
import { AttendanceDayDrawer } from './AttendanceDayDrawer';

export function AttendanceCalendar() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Mock calendar for Sept 2026 (Starts on Tuesday)
  const emptyDays = Array(2).fill(null);
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  const getDayStatus = (day: number) => {
    // Mock logic
    const dayOfWeek = (day + 2) % 7; // +2 because Sept 1 is Tue
    if (dayOfWeek === 0 || dayOfWeek === 6) return { code: 'WO', label: 'Weekly Off', color: 'bg-gray-100 text-gray-500' };
    if (day === 5) return { code: 'LT', label: 'Late', color: 'bg-amber-100 text-amber-700' };
    if (day === 14) return { code: 'L', label: 'Leave', color: 'bg-purple-100 text-purple-700' };
    if (day === 25) return { code: 'HD', label: 'Half Day', color: 'bg-orange-100 text-orange-700' };
    if (day > 28) return { code: '', label: 'Upcoming', color: 'bg-gray-50 text-transparent' };
    return { code: 'P', label: 'Present', color: 'bg-emerald-100 text-emerald-700' };
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-full flex flex-col">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Attendance Calendar</h3>
        <div className="grid grid-cols-7 gap-1 flex-1">
          {daysOfWeek.map(day => (
            <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">{day}</div>
          ))}
          {emptyDays.map((_, idx) => (
            <div key={`empty-${idx}`} className="p-2 border border-transparent rounded-lg"></div>
          ))}
          {daysInMonth.map(day => {
            const status = getDayStatus(day);
            const isUpcoming = status.label === 'Upcoming';
            return (
              <div 
                key={day} 
                onClick={() => !isUpcoming && setSelectedDay(day)}
                className={`p-1 sm:p-2 border border-gray-100 rounded-lg flex flex-col items-center justify-center gap-1 ${isUpcoming ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-indigo-300 hover:shadow-sm transition-all'} min-h-[60px] sm:min-h-[80px]`}
              >
                <span className={`text-sm font-bold ${isUpcoming ? 'text-gray-300' : 'text-gray-900'}`}>{day}</span>
                {status.code && (
                  <span className={`text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded ${status.color}`}>
                    {status.code}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600"><span className="w-3 h-3 rounded-full bg-emerald-100 flex items-center justify-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span></span> Present</div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600"><span className="w-3 h-3 rounded-full bg-amber-100 flex items-center justify-center"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span></span> Late</div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600"><span className="w-3 h-3 rounded-full bg-purple-100 flex items-center justify-center"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span></span> Leave</div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600"><span className="w-3 h-3 rounded-full bg-orange-100 flex items-center justify-center"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span></span> Half Day</div>
        </div>
      </div>

      <AttendanceDayDrawer 
        day={selectedDay} 
        isOpen={selectedDay !== null} 
        onClose={() => setSelectedDay(null)} 
      />
    </>
  );
}
