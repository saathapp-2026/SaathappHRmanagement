import React from 'react';

export function LeaveStats() {
  const stats = [
    { label: 'Pending Requests', value: 11, color: 'text-amber-600' },
    { label: 'Approved Today', value: 6, color: 'text-emerald-600' },
    { label: 'Employees on Leave', value: 14, color: 'text-indigo-600' },
    { label: 'Upcoming Leaves', value: 18, color: 'text-gray-900' },
    { label: 'Leave Conflicts', value: 3, color: 'text-rose-600' },
    { label: 'Needs Clarification', value: 2, color: 'text-blue-600' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center text-center">
          <p className="text-xs font-semibold text-gray-500 mb-1">{stat.label}</p>
          <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
