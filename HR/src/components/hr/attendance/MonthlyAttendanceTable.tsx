import React from 'react';
import Link from 'next/link';
import { mockMonthlySummary } from '@/data/hr/attendance';

export function MonthlyAttendanceTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Employee Summary</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-4 py-3 whitespace-nowrap">Employee</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">Present</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">Absent</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">Leave</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">Late</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">Half Day</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">Week Off</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">Working Days</th>
              <th className="px-4 py-3 whitespace-nowrap">Attendance %</th>
              <th className="px-4 py-3 whitespace-nowrap text-right">Avg Hours</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockMonthlySummary.map((emp) => (
              <tr key={emp.employeeId} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap">
                  <Link href={`/hr/attendance/${emp.employeeId}`} className="font-semibold text-sm text-gray-900 hover:text-indigo-600 transition-colors">{emp.name}</Link>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium text-emerald-700">{emp.present}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium text-rose-700">{emp.absent}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium text-purple-700">{emp.leave}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium text-amber-700">{emp.late}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium text-orange-700">{emp.halfDay}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium text-gray-500">{emp.weeklyOff}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium text-gray-900">{emp.workingDays}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900 w-12">{emp.attendancePct}%</span>
                    <div className="w-16 bg-gray-100 rounded-full h-1.5 flex overflow-hidden">
                      <div className={`h-1.5 rounded-full ${emp.attendancePct >= 95 ? 'bg-emerald-500' : emp.attendancePct >= 85 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${emp.attendancePct}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                  {emp.avgHours}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
