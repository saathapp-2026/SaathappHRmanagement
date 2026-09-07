import React, { useState } from 'react';
import { mockTodayAttendance, getStatusColor, AttendanceRecord } from '@/data/hr/attendance';
import { Eye } from 'lucide-react';
import { AttendanceHistoryDrawer } from './AttendanceHistoryDrawer';

export function AttendanceHistory() {
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);

  // Reusing mock data but pretending it's history
  const historyData = [...mockTodayAttendance, ...mockTodayAttendance].map((record, idx) => ({
    ...record,
    id: `HIST${idx}`,
    date: idx % 2 === 0 ? '05 Sep 2026' : '04 Sep 2026'
  }));

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-3 whitespace-nowrap">Date</th>
                <th className="px-4 py-3 whitespace-nowrap">Employee</th>
                <th className="px-4 py-3 whitespace-nowrap">Timings</th>
                <th className="px-4 py-3 whitespace-nowrap">Work Hrs</th>
                <th className="px-4 py-3 whitespace-nowrap">Late</th>
                <th className="px-4 py-3 whitespace-nowrap">Overtime</th>
                <th className="px-4 py-3 whitespace-nowrap">Status</th>
                <th className="px-4 py-3 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {historyData.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => setSelectedRecord(emp)}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{emp.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-semibold text-sm text-gray-900">{emp.employeeName}</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">{emp.employeeId}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{emp.checkIn || '—'}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{emp.checkOut || '—'}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {emp.workingHours || '—'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-amber-600">
                    {emp.lateMinutes > 0 ? `${emp.lateMinutes}m` : '—'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-emerald-600">
                    {emp.overtimeMinutes > 0 ? `${emp.overtimeMinutes}m` : '—'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${getStatusColor(emp.status)}`}>{emp.status}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <button onClick={(e) => { e.stopPropagation(); setSelectedRecord(emp); }} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
                      <Eye size={16}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AttendanceHistoryDrawer record={selectedRecord} isOpen={!!selectedRecord} onClose={() => setSelectedRecord(null)} />
    </>
  );
}
