import React from 'react';
import { ShieldCheck } from 'lucide-react';

export function CorrectionPolicyCard() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck size={18} className="text-gray-400" />
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Attendance Policy</h3>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500">Required Hours</span>
          <span className="font-semibold text-gray-900">8h 30m</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500">Grace Period</span>
          <span className="font-semibold text-gray-900">15 min</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500">Standard Shift</span>
          <span className="font-semibold text-gray-900">09:30 AM – 06:30 PM</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500">Minimum Full Day</span>
          <span className="font-semibold text-gray-900">8h</span>
        </div>
      </div>
    </div>
  );
}
