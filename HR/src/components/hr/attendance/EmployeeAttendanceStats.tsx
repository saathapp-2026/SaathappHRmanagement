import React from 'react';

export function EmployeeAttendanceStats() {
  const stats = [
    { label: 'Attendance', value: '95.5%', color: 'text-indigo-600' },
    { label: 'Present', value: '21 Days', color: 'text-emerald-600' },
    { label: 'Absent', value: '0 Days', color: 'text-rose-600' },
    { label: 'Leave', value: '1 Day', color: 'text-purple-600' },
    { label: 'Late', value: '2 Days', color: 'text-amber-600' },
    { label: 'Average Hours', value: '8h 31m', color: 'text-gray-900' },
    { label: 'Overtime', value: '6h 10m', color: 'text-blue-600' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center">
          <p className="text-xs font-semibold text-gray-500 mb-1">{stat.label}</p>
          <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
