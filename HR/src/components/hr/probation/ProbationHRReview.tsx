import React, { useState } from 'react';

export function ProbationHRReview() {
  const [checks, setChecks] = useState({
    attendance: false,
    leave: false,
    recommendation: false,
    concerns: false,
    documents: false,
    review: false
  });

  const toggleCheck = (key: keyof typeof checks) => {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">HR Review Checklist</h3>
      <div className="space-y-3">
        {[
          { key: 'attendance', label: 'Attendance reviewed' },
          { key: 'leave', label: 'Leave records reviewed' },
          { key: 'recommendation', label: 'Manager recommendation received' },
          { key: 'concerns', label: 'Pending concerns checked' },
          { key: 'documents', label: 'Required documents verified' },
          { key: 'review', label: 'Probation review completed' }
        ].map((item) => (
          <label key={item.key} className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              checked={checks[item.key as keyof typeof checks]}
              onChange={() => toggleCheck(item.key as keyof typeof checks)}
            />
            <span className={`text-sm ${checks[item.key as keyof typeof checks] ? 'text-gray-400 line-through' : 'text-gray-700 group-hover:text-gray-900'}`}>
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
