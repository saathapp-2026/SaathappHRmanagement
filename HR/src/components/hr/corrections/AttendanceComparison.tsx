import React from 'react';
import { ArrowRight } from 'lucide-react';
import { AttendanceCorrection } from '@/data/hr/corrections';

export function AttendanceComparison({ correction }: { correction: AttendanceCorrection }) {
  const fields = ['status', 'checkIn', 'checkOut', 'workingHours', 'location'];
  const labels: Record<string, string> = {
    status: 'Status',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    workingHours: 'Working Hours',
    location: 'Location'
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Attendance Record Comparison</h3>
      
      <div className="flex flex-col md:flex-row gap-4 items-stretch relative">
        <div className="flex-1 border-2 border-gray-100 rounded-xl p-5 bg-gray-50/50">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 pb-2 border-b border-gray-200">Original Attendance</div>
          <div className="space-y-4">
            {fields.map(f => {
              const key = f as keyof typeof correction.original;
              const origVal = correction.original[key] || '—';
              return (
                <div key={f} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">{labels[f]}</span>
                  <span className="text-sm font-semibold text-gray-900">{origVal}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center -mx-3 z-10">
          <div className="w-8 h-8 bg-indigo-50 border-2 border-indigo-100 rounded-full flex items-center justify-center text-indigo-500">
            <ArrowRight size={16} />
          </div>
        </div>

        <div className="flex-1 border-2 border-indigo-100 rounded-xl p-5 bg-indigo-50/20 relative shadow-sm">
          <div className="absolute top-0 right-0 p-3"><span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span></span></div>
          <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-4 pb-2 border-b border-indigo-100">Requested Correction</div>
          <div className="space-y-4">
            {fields.map(f => {
              const key = f as keyof typeof correction.requested;
              const reqVal = correction.requested[key];
              const origVal = correction.original[key as keyof typeof correction.original];
              
              if (reqVal && reqVal !== origVal) {
                return (
                  <div key={f} className="flex justify-between items-center bg-indigo-50 -mx-2 px-2 py-1 rounded">
                    <span className="text-sm font-bold text-indigo-700">{labels[f]}</span>
                    <span className="text-sm font-bold text-indigo-700">{reqVal}</span>
                  </div>
                );
              }
              return (
                <div key={f} className="flex justify-between items-center px-0 py-1">
                  <span className="text-sm font-medium text-gray-400">{labels[f]}</span>
                  <span className="text-sm font-medium text-gray-400">{origVal || '—'}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
