import React, { useState } from 'react';
import Link from 'next/link';
import { mockTodayAttendance, getStatusColor, AttendanceRecord } from '@/data/hr/attendance';
import { Eye, MapPin } from 'lucide-react';
import { AttendanceHistoryDrawer } from './AttendanceHistoryDrawer';

export function AttendanceTable() {
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Live Attendance</h3>
        </div>
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-3 whitespace-nowrap">Employee</th>
                <th className="px-4 py-3 whitespace-nowrap">Timings</th>
                <th className="px-4 py-3 whitespace-nowrap">Work Hrs</th>
                <th className="px-4 py-3 whitespace-nowrap">Location</th>
                <th className="px-4 py-3 whitespace-nowrap">Status</th>
                <th className="px-4 py-3 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockTodayAttendance.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => setSelectedRecord(emp)}>
                  <td className="px-4 py-3 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-xs">{emp.avatar}</div>
                      <div>
                        <Link href={`/hr/employees/${emp.employeeId}`} className="font-semibold text-sm text-gray-900 hover:text-indigo-600 transition-colors">{emp.employeeName}</Link>
                        <div className="text-[11px] text-gray-500 mt-0.5">{emp.employeeId} · {emp.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{emp.checkIn || '—'}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{emp.checkOut || '—'}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {emp.workingHours || '—'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-600">
                    {emp.location !== '—' && <MapPin size={12} className="inline mr-1 text-gray-400"/>}
                    {emp.location}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${getStatusColor(emp.status)}`}>{emp.status}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setSelectedRecord(emp)} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="View Details"><Eye size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <AttendanceHistoryDrawer 
        record={selectedRecord} 
        isOpen={!!selectedRecord} 
        onClose={() => setSelectedRecord(null)} 
      />
    </>
  );
}
