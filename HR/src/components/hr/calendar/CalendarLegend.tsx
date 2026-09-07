import React from 'react';
import { getEventDotColor } from '@/data/hr/calendar';

export function CalendarLegend() {
  const items = [
    { label: 'Holiday', type: 'Public Holiday' as const },
    { label: 'Leave', type: 'Employee Leave' as const },
    { label: 'Celebration / Joining', type: 'Birthday' as const },
    { label: 'HR Event', type: 'HR Event' as const },
    { label: 'Training / Meeting', type: 'Training' as const },
  ];

  return (
    <div className="flex flex-wrap gap-4 mt-6 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2">Legend</span>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-1.5">
          <div className={`w-2.5 h-2.5 rounded-full ${getEventDotColor(item.type)}`}></div>
          <span className="text-xs font-medium text-gray-600">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
