import React from 'react';
import { Clock } from 'lucide-react';

export function PunctualityCard() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Punctuality</h3>
        <Clock size={20} className="text-indigo-600" />
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-gray-600">On Time</span>
          <span className="font-bold text-emerald-600">19 days</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-gray-600">Late</span>
          <span className="font-bold text-amber-600">2 days</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-gray-600">Average Late Time</span>
          <span className="font-bold text-gray-900">14 min</span>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Earliest</p>
          <p className="text-sm font-bold text-gray-900">08:52 AM</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Latest</p>
          <p className="text-sm font-bold text-gray-900">09:46 AM</p>
        </div>
      </div>
    </div>
  );
}
