import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

export function ProfileCompletionCard() {
  const sections = [
    { name: 'Personal Details', status: 'Complete' },
    { name: 'Address', status: 'Complete' },
    { name: 'Emergency Contact', status: 'Pending' },
    { name: 'Employment Details', status: 'Complete' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Profile Completion</h3>
        <span className="text-lg font-bold text-indigo-600">75%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-6 overflow-hidden">
        <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '75%' }}></div>
      </div>
      <div className="space-y-4">
        {sections.map((section, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">{section.name}</span>
            {section.status === 'Complete' ? (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600"><CheckCircle2 size={16}/> Complete</span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-400"><Circle size={16}/> Pending</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
