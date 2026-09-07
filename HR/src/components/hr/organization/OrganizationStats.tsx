import React from 'react';

export function OrganizationStats() {
  const stats = [
    { label: 'Departments', value: 8 },
    { label: 'Designations', value: 24 },
    { label: 'Teams', value: 16 },
    { label: 'Work Locations', value: 4 },
    { label: 'Managers', value: 32 },
    { label: 'Employees', value: 248 },
  ];

  return (
    <div className="flex overflow-x-auto gap-4 mb-6 no-scrollbar">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white px-5 py-3 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center min-w-[120px] flex-shrink-0">
          <p className="text-xs font-semibold text-gray-500 mb-1 whitespace-nowrap">{stat.label}</p>
          <p className="text-xl font-bold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
