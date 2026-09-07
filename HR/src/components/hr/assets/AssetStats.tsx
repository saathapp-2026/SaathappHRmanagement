import React from 'react';

export function AssetStats() {
  const stats = [
    { label: 'Total Assets', value: 312 },
    { label: 'Assigned', value: 246, color: 'text-indigo-600' },
    { label: 'Available', value: 42, color: 'text-emerald-600' },
    { label: 'Return Pending', value: 9, color: 'text-amber-600' },
    { label: 'Under Repair', value: 6, color: 'text-purple-600' },
    { label: 'Lost / Damaged', value: 9, color: 'text-rose-600' },
  ];

  return (
    <div className="flex overflow-x-auto gap-4 mb-6 no-scrollbar pb-2">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white px-5 py-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center min-w-[140px] flex-shrink-0">
          <p className="text-xs font-semibold text-gray-500 mb-1 whitespace-nowrap">{stat.label}</p>
          <p className={`text-2xl font-bold ${stat.color || 'text-gray-900'}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
