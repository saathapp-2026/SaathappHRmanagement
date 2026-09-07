import React from 'react';

export function WorkingHoursTrend() {
  const data = [
    { day: '1', hours: 8.5 }, { day: '2', hours: 9.1 }, { day: '3', hours: 8.2 },
    { day: '4', hours: 7.8 }, { day: '5', hours: 9.5 }, { day: '8', hours: 8.0 },
    { day: '9', hours: 8.4 }, { day: '10', hours: 8.9 }, { day: '11', hours: 9.2 }
  ];

  const maxHours = 10;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Working Hours Trend</h3>
      <div className="flex-1 flex items-end gap-2 h-40">
        {data.map((point, idx) => {
          const heightPct = (point.hours / maxHours) * 100;
          const isShort = point.hours < 8;
          return (
            <div key={idx} className="flex-1 flex flex-col justify-end items-center group relative h-full">
              <div className="absolute -top-8 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 whitespace-nowrap">
                {point.hours} hrs
              </div>
              <div className={`w-full rounded-t-sm transition-all group-hover:opacity-80 ${isShort ? 'bg-amber-400' : 'bg-indigo-500'}`} style={{ height: `${heightPct}%`, minHeight: '4px' }}></div>
              <span className="text-[10px] text-gray-400 mt-2 font-medium">{point.day}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600"><span className="w-3 h-3 rounded-sm bg-indigo-500"></span> Standard</div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600"><span className="w-3 h-3 rounded-sm bg-amber-400"></span> Short Hours</div>
      </div>
    </div>
  );
}
