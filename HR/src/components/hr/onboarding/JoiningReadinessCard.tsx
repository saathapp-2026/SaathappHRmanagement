import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export function JoiningReadinessCard() {
  const items = [
    { label: 'Profile', value: '75%', ready: false },
    { label: 'Documents', value: '4/6', ready: false },
    { label: 'Account', value: 'Invitation Sent', ready: false },
    { label: 'Manager', value: 'Assigned', ready: true },
    { label: 'Work Location', value: 'Assigned', ready: true },
  ];

  const overallReady = false;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Joining Readiness</h3>
      </div>
      <div className="flex-1 space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-600">{item.label}</span>
            <div className="flex items-center gap-2">
              <span className={`font-semibold ${item.ready ? 'text-gray-900' : 'text-amber-600'}`}>{item.value}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={`mt-6 pt-4 border-t border-gray-100 flex items-center justify-between`}>
        <span className="text-xs font-bold text-gray-500 uppercase">Overall Status</span>
        {overallReady ? (
          <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-600"><CheckCircle2 size={18}/> Ready to Join</span>
        ) : (
          <span className="flex items-center gap-1.5 text-sm font-bold text-rose-500"><AlertTriangle size={18}/> Not Ready</span>
        )}
      </div>
    </div>
  );
}
