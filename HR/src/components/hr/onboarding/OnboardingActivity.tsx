import React from 'react';
import { Clock } from 'lucide-react';

export function OnboardingActivity() {
  const activities = [
    { text: 'Manager assigned', date: '06 Sep · 10:10 AM' },
    { text: 'Employee created', date: '06 Sep · 10:15 AM' },
    { text: 'Invitation sent', date: '06 Sep · 10:30 AM' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Clock size={18} className="text-gray-400" />
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Recent Activity</h3>
      </div>
      <div className="relative">
        <div className="absolute left-2 top-2 bottom-2 w-px bg-gray-100"></div>
        <div className="space-y-6 relative z-10">
          {activities.map((activity, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="w-4 h-4 rounded-full bg-white border-2 border-indigo-100 flex-shrink-0 mt-1"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
