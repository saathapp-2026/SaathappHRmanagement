import React from 'react';

export function ConcernStats() {
  const stats = [
    { label: 'Open Concerns', value: 6 },
    { label: 'New', value: 3, color: 'text-blue-600' },
    { label: 'Under Review', value: 8, color: 'text-indigo-600' },
    { label: 'Waiting for Employee', value: 4, color: 'text-amber-600' },
    { label: 'High Priority', value: 2, color: 'text-orange-600' },
    { label: 'Resolved This Month', value: 18, color: 'text-emerald-600' },
    { label: 'Average Resolution', value: '2.6 d' },
  ];

  return (
    <div className="flex overflow-x-auto gap-4 mb-6 no-scrollbar">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white px-5 py-3 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center min-w-[140px] flex-shrink-0">
          <p className="text-xs font-semibold text-gray-500 mb-1 whitespace-nowrap">{stat.label}</p>
          <p className={`text-xl font-bold ${stat.color || 'text-gray-900'}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
