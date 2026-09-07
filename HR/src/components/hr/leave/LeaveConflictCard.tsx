import React from 'react';
import { Users } from 'lucide-react';

export function LeaveConflictCard() {
  return (
    <div className="bg-rose-50 border border-rose-200 p-6 rounded-xl shadow-sm">
      <div className="flex items-center gap-2 mb-4 text-rose-700">
        <Users size={18} />
        <h3 className="text-sm font-bold uppercase tracking-wider">Potential Conflicts</h3>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-rose-100 pb-2">
          <div>
            <p className="text-sm font-bold text-rose-900">Engineering</p>
            <p className="text-xs text-rose-700 font-medium">11 Sep</p>
          </div>
          <p className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-1 rounded">3 employees unavailable</p>
        </div>
        <div className="flex justify-between items-center border-b border-rose-100 pb-2">
          <div>
            <p className="text-sm font-bold text-rose-900">Operations</p>
            <p className="text-xs text-rose-700 font-medium">14 Sep</p>
          </div>
          <p className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-1 rounded">4 employees unavailable</p>
        </div>
      </div>
    </div>
  );
}
