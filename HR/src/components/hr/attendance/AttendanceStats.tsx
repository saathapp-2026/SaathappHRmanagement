import React from 'react';

export function AttendanceStats() {
  const primaryStats = [
    { label: 'Present', value: 182, color: 'text-emerald-600' },
    { label: 'Absent', value: 12, color: 'text-rose-600' },
    { label: 'Late', value: 14, color: 'text-amber-600' },
    { label: 'On Leave', value: 14, color: 'text-purple-600' },
  ];
  
  const secondaryStats = [
    { label: 'Half Day', value: 5, color: 'text-orange-600' },
    { label: 'Not Checked In', value: 13, color: 'text-gray-500' },
    { label: 'Checked Out', value: 96, color: 'text-indigo-600' },
    { label: 'Total Employees', value: 240, color: 'text-gray-900' },
  ];

  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {primaryStats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
            <p className="text-sm font-semibold text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {secondaryStats.map((stat, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-500">{stat.label}</p>
            <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
