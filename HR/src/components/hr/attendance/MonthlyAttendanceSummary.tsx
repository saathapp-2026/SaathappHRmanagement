import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MonthlyAttendanceTable } from './MonthlyAttendanceTable';

export function MonthlyAttendanceSummary() {
  const summaryCards = [
    { label: 'Average Attendance', value: '93.8%', color: 'text-indigo-600' },
    { label: 'Avg Working Hours', value: '8h 04m', color: 'text-emerald-600' },
    { label: 'Late Arrivals', value: '42', color: 'text-amber-600' },
    { label: 'Absences', value: '18', color: 'text-rose-600' },
    { label: 'Half Days', value: '13', color: 'text-orange-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"><ChevronLeft size={20}/></button>
        <h2 className="text-lg font-bold text-gray-900">September 2026</h2>
        <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"><ChevronRight size={20}/></button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {summaryCards.map((card, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center">
            <p className="text-xs font-semibold text-gray-500 mb-2">{card.label}</p>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      <MonthlyAttendanceTable />
    </div>
  );
}
