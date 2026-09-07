import React from 'react';
import { X } from 'lucide-react';
import { mockCalendarEvents, getEventColor } from '@/data/hr/calendar';

export function DayEventsDrawer({ isOpen, onClose, dateStr, onEventClick }: { isOpen: boolean, onClose: () => void, dateStr: string, onEventClick: (id: string) => void }) {
  if (!isOpen) return null;

  const dayEvents = mockCalendarEvents.filter(e => {
    if (e.date.startsWith(dateStr.substring(0, 6))) return true; // Loose match for mock
    if (e.endDate && e.date <= dateStr && e.endDate >= dateStr) return true;
    return false;
  });

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose}></div>
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 overflow-y-auto flex flex-col">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur z-10">
          <h2 className="text-lg font-bold text-gray-900">{dateStr}</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 text-gray-500 hover:text-gray-900 rounded-full transition-colors flex-shrink-0"><X size={20}/></button>
        </div>
        <div className="p-6 space-y-4">
          {dayEvents.length === 0 ? (
            <p className="text-gray-500 italic text-sm">No events scheduled.</p>
          ) : (
            dayEvents.map(ev => (
              <div 
                key={ev.id} 
                onClick={() => { onClose(); onEventClick(ev.id); }}
                className="p-4 rounded-xl border shadow-sm border-gray-200 cursor-pointer hover:border-indigo-300 transition-colors"
              >
                <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2 ${getEventColor(ev.type)}`}>{ev.type}</span>
                <p className="font-bold text-gray-900 text-sm mb-1">{ev.title}</p>
                {ev.allDay ? (
                  <p className="text-xs font-medium text-gray-500">All Day</p>
                ) : (
                  <p className="text-xs font-medium text-gray-500">{ev.startTime} – {ev.endTime}</p>
                )}
                {ev.employeeName && <p className="text-xs text-gray-600 mt-2 font-medium">{ev.employeeName} · {ev.department}</p>}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
