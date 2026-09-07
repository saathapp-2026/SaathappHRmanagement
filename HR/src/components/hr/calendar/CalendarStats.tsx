import React from 'react';

export function CalendarStats() {
  const stats = [
    { label: 'On Leave Today', value: 14, color: 'text-amber-600' },
    { label: 'Birthdays Today', value: 2, color: 'text-purple-600' },
    { label: 'Events Today', value: 3, color: 'text-indigo-600' },
    { label: 'Upcoming Holidays', value: 2, color: 'text-rose-600' },
    { label: 'Joining This Week', value: 4, color: 'text-emerald-600' },
  ];

  return (
    <div className="flex overflow-x-auto gap-4 mb-6 no-scrollbar">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white px-5 py-3 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center min-w-[140px] flex-shrink-0">
          <p className="text-xs font-semibold text-gray-500 mb-1 whitespace-nowrap">{stat.label}</p>
          <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
