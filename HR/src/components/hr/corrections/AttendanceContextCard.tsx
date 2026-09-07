import React from 'react';
import { CalendarDays } from 'lucide-react';

export function AttendanceContextCard() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays size={18} className="text-gray-400" />
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Attendance Context</h3>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-start border-l-2 border-emerald-500 pl-3">
          <div>
            <p className="text-xs font-bold text-gray-900">04 Sep</p>
            <p className="text-xs font-medium text-emerald-600">Present</p>
          </div>
          <p className="text-xs text-gray-500 font-medium text-right">09:20 AM – 06:28 PM</p>
        </div>
        <div className="flex justify-between items-start border-l-2 border-amber-500 pl-3 bg-amber-50/50 -mx-2 px-2 py-1 rounded">
          <div>
            <p className="text-xs font-bold text-gray-900">05 Sep</p>
            <p className="text-xs font-medium text-amber-600">Correction Requested</p>
          </div>
          <p className="text-xs text-gray-500 font-medium text-right">09:17 AM – Missing</p>
        </div>
        <div className="flex justify-between items-start border-l-2 border-emerald-500 pl-3">
          <div>
            <p className="text-xs font-bold text-gray-900">06 Sep</p>
            <p className="text-xs font-medium text-emerald-600">Present</p>
          </div>
          <p className="text-xs text-gray-500 font-medium text-right">09:24 AM – 06:34 PM</p>
        </div>
      </div>
    </div>
  );
}
