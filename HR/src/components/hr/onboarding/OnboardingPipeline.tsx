import React from 'react';
import { ChevronRight } from 'lucide-react';

export function OnboardingPipeline() {
  const stages = [
    { name: 'Employee Created', count: 2 },
    { name: 'Invitation Sent', count: 3 },
    { name: 'Account Created', count: 2 },
    { name: 'Profile Completed', count: 4 },
    { name: 'Documents Submitted', count: 3 },
    { name: 'HR Verified', count: 2 },
    { name: 'Completed', count: 12 },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6 overflow-x-auto no-scrollbar">
      <div className="flex items-center min-w-[800px]">
        {stages.map((stage, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center flex-1 text-center group cursor-pointer">
              <div className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{stage.count}</div>
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mt-1">{stage.name}</div>
            </div>
            {idx < stages.length - 1 && (
              <div className="text-gray-300 mx-2">
                <ChevronRight size={16} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
