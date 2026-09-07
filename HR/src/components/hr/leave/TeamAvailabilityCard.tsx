import React from 'react';
import { Users, AlertTriangle } from 'lucide-react';
import { mockTeamOverlap } from '@/data/hr/leave';

export function TeamAvailabilityCard() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Users size={18} className="text-gray-400" />
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Overlapping Team Leave</h3>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-5 flex items-start gap-2.5">
        <AlertTriangle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-xs font-bold text-amber-900">Potential Leave Conflict</p>
          <p className="text-xs text-amber-800 mt-0.5">2 team members would be unavailable on 11 Sep.</p>
        </div>
      </div>

      <div className="space-y-6">
        {mockTeamOverlap.map((overlap, idx) => (
          <div key={idx}>
            <p className="text-xs font-bold text-gray-900 mb-3 border-b border-gray-100 pb-1">{overlap.date} (Engineering)</p>
            <div className="space-y-2">
              {overlap.employees.map((emp, eIdx) => {
                let statusColor = 'text-gray-500';
                if (emp.status === 'Requested') statusColor = 'text-amber-600 font-bold';
                if (emp.status === 'Approved Leave') statusColor = 'text-rose-600 font-bold';
                
                return (
                  <div key={eIdx} className="flex justify-between items-center text-sm">
                    <span className={emp.status === 'Requested' ? 'font-bold text-gray-900' : 'text-gray-600'}>{emp.name}</span>
                    <span className={statusColor}>{emp.status}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
