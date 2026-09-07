import React from 'react';
import { Briefcase } from 'lucide-react';

export function WorkingHoursCard() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Working Hours</h3>
        <Briefcase size={20} className="text-indigo-600" />
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-gray-600">Total Hours</span>
          <span className="font-bold text-gray-900">187h 20m</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-gray-600">Average / Day</span>
          <span className="font-bold text-gray-900">8h 31m</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-gray-600">Overtime</span>
          <span className="font-bold text-emerald-600">6h 10m</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-gray-600">Short Hours</span>
          <span className="font-bold text-amber-600">2 days</span>
        </div>
      </div>
    </div>
  );
}
