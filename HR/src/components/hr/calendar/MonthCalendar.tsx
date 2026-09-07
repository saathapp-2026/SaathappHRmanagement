import React from 'react';
import { mockCalendarEvents, getEventColor, getEventDotColor } from '@/data/hr/calendar';

export function MonthCalendar({ onDayClick }: { onDayClick: (date: string) => void }) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Dummy 30 day generator starting on Tuesday
  const emptyDays = 2; // Sept 1 is Tuesday
  const totalDays = 30;
  
  const cells = [];
  
  // Padding
  for (let i = 0; i < emptyDays; i++) {
    cells.push(<div key={`empty-${i}`} className="bg-gray-50/50 border-r border-b border-gray-100 p-2 min-h-[120px]"></div>);
  }

  // Days
  for (let i = 1; i <= totalDays; i++) {
    const dateStr = `${i.toString().padStart(2, '0')} Sep 2026`;
    const dayEvents = mockCalendarEvents.filter(e => {
      // Very basic date matching for mock
      if (e.date.startsWith(`${i.toString().padStart(2, '0')} Sep`)) return true;
      if (e.endDate && e.date <= dateStr && e.endDate >= dateStr) return true; // simplified range logic
      return false;
    });

    const isToday = i === 7;
    const isWeekend = (i + emptyDays) % 7 === 0 || (i + emptyDays) % 7 === 1;

    cells.push(
      <div 
        key={`day-${i}`} 
        onClick={() => onDayClick(dateStr)}
        className={`bg-white border-r border-b border-gray-100 p-2 min-h-[120px] hover:bg-gray-50 cursor-pointer transition-colors ${isWeekend ? 'bg-gray-50/30' : ''}`}
      >
        <div className="flex justify-between items-center mb-1">
          <span className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-indigo-600 text-white' : 'text-gray-700'}`}>{i}</span>
        </div>
        <div className="space-y-1">
          {dayEvents.slice(0, 3).map((ev, idx) => (
            <div key={idx} className={`px-2 py-1 text-[10px] font-bold rounded border-l-2 truncate ${getEventColor(ev.type)}`}>
              {ev.title}
            </div>
          ))}
          {dayEvents.length > 3 && (
            <div className="px-2 py-0.5 text-[10px] font-bold text-gray-500 hover:text-indigo-600">
              +{dayEvents.length - 3} more
            </div>
          )}
        </div>
      </div>
    );
  }

  // Padding end
  const remaining = 42 - cells.length;
  for (let i = 0; i < remaining; i++) {
    cells.push(<div key={`empty-end-${i}`} className="bg-gray-50/50 border-r border-b border-gray-100 p-2 min-h-[120px]"></div>);
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
        {daysOfWeek.map(d => (
          <div key={d} className="py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider border-r border-gray-100 last:border-0">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 border-l border-t border-gray-100">
        {cells}
      </div>
    </div>
  );
}
