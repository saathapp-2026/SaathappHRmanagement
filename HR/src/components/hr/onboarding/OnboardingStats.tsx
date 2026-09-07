import React from 'react';

export function OnboardingStats() {
  const stats = [
    { label: 'Pending Onboarding', value: 8, color: 'text-indigo-600' },
    { label: 'Joining This Week', value: 4, color: 'text-blue-600' },
    { label: 'Missing Documents', value: 5, color: 'text-rose-600' },
    { label: 'Expired Invitations', value: 2, color: 'text-amber-600' },
    { label: 'Ready for HR Verification', value: 3, color: 'text-emerald-600' },
    { label: 'Completed This Month', value: 12, color: 'text-gray-900' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
          <p className="text-xs font-semibold text-gray-500 mb-1">{stat.label}</p>
          <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
