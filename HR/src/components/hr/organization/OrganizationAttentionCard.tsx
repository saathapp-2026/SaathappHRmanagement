import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function OrganizationAttentionCard() {
  const issues = [
    '3 employees have no reporting manager',
    '2 departments have no department head',
    '1 team has no team lead',
    '2 inactive designations still have assigned employees'
  ];

  return (
    <div className="bg-amber-50 p-5 rounded-xl border border-amber-200 shadow-sm mt-6">
      <div className="flex items-center gap-2 mb-4 text-amber-700">
        <AlertTriangle size={18} />
        <h3 className="text-sm font-bold uppercase tracking-wider">Needs Attention</h3>
      </div>
      <ul className="space-y-3">
        {issues.map((issue, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-amber-900">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></span>
            {issue}
          </li>
        ))}
      </ul>
    </div>
  );
}
