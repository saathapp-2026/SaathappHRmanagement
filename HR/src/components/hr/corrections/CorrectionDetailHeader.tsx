import React from 'react';
import Link from 'next/link';
import { User, Calendar, Clock, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import { AttendanceCorrection, getStatusBadgeStyle } from '@/data/hr/corrections';

export function CorrectionDetailHeader({ correction }: { correction: AttendanceCorrection }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-6 relative">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl font-bold text-gray-900">Attendance Correction</h1>
            <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${getStatusBadgeStyle(correction.status)}`}>{correction.status}</span>
            {correction.priority === 'High' && <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700">HIGH PRIORITY</span>}
          </div>
          <p className="text-sm font-medium text-gray-500 flex items-center gap-2">{correction.id} <span className="w-1 h-1 bg-gray-300 rounded-full"></span> {correction.type}</p>
        </div>
        <div className="flex items-center gap-1 hidden sm:flex">
          <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors" title="Previous Request"><ChevronLeft size={20}/></button>
          <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors" title="Next Request"><ChevronRight size={20}/></button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 p-4 bg-gray-50 border border-gray-100 rounded-lg">
        <div className="flex-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><User size={12}/> Employee</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-xs">{correction.avatar}</div>
            <div>
              <Link href={`/hr/employees/${correction.employeeId}`} className="font-bold text-sm text-gray-900 hover:text-indigo-600 transition-colors">{correction.employeeName}</Link>
              <div className="text-[11px] text-gray-500 mt-0.5">{correction.employeeId} · {correction.designation} · {correction.department}</div>
            </div>
          </div>
        </div>
        <div className="hidden sm:block w-px bg-gray-200"></div>
        <div className="flex-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Calendar size={12}/> Attendance Date</p>
          <p className="text-sm font-bold text-gray-900 mt-2">{correction.attendanceDate}</p>
          <Link href={`/hr/attendance/${correction.employeeId}`} className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 mt-0.5 inline-block">View Attendance Profile →</Link>
        </div>
        <div className="hidden sm:block w-px bg-gray-200"></div>
        <div className="flex-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Clock size={12}/> Submitted</p>
          <p className="text-sm font-bold text-gray-900 mt-2">{correction.submitted}</p>
          <div className="text-[11px] font-semibold text-gray-500 mt-0.5 flex items-center gap-1">
            {parseInt(correction.age) > 2 ? <AlertTriangle size={12} className="text-rose-500"/> : null} 
            <span className={parseInt(correction.age) > 2 ? 'text-rose-600' : ''}>{correction.age}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
