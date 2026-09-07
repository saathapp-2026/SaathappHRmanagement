import React from 'react';
import { mockProbationStats } from '@/data/hr/probation';

export function ProbationStats() {
  const stats = [
    { label: 'On Probation', value: mockProbationStats.active, color: 'text-indigo-600' },
    { label: 'Ending in 7 Days', value: mockProbationStats.endingIn7Days, color: 'text-rose-600' },
    { label: 'Ending in 15 Days', value: mockProbationStats.endingIn15Days, color: 'text-amber-600' },
    { label: 'Ending in 30 Days', value: mockProbationStats.endingIn30Days, color: 'text-blue-600' },
    { label: 'Overdue Reviews', value: mockProbationStats.overdue, color: 'text-red-600' },
    { label: 'Confirmed This Month', value: mockProbationStats.confirmedThisMonth, color: 'text-emerald-600' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{stat.label}</p>
          <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
