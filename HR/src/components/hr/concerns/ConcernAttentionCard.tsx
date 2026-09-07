import React from 'react';
import { AlertCircle } from 'lucide-react';

export function ConcernAttentionCard() {
  const issues = [
    '2 high-priority concerns open',
    '1 urgent concern unassigned',
    '3 cases waiting > 48 hours',
    '2 employees waiting for HR response',
    '1 concern awaiting employee information'
  ];

  return (
    <div className="bg-orange-50 p-5 rounded-xl border border-orange-200 shadow-sm h-full">
      <div className="flex items-center gap-2 mb-4 text-orange-700">
        <AlertCircle size={18} />
        <h3 className="text-sm font-bold uppercase tracking-wider">Needs Attention</h3>
      </div>
      <ul className="space-y-3">
        {issues.map((issue, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-orange-900 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></span>
            {issue}
          </li>
        ))}
      </ul>
    </div>
  );
}
