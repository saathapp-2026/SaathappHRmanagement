import React from 'react';
import Link from 'next/link';
import { ExternalLink, Clock, CalendarOff, MessageSquareWarning } from 'lucide-react';
import { ProbationRecord } from '@/data/hr/probation';

interface ContextCardProps {
  record: ProbationRecord;
}

export function ProbationAttendanceContext({ record }: ContextCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Clock size={16} className="text-gray-400"/> Attendance During Probation</h4>
        <Link href={`/hr/attendance/${record.employeeId}`} className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
          View <ExternalLink size={12} />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Present</p>
          <p className="font-medium text-gray-900">54 days</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Late</p>
          <p className="font-medium text-amber-600">3 days</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Absent</p>
          <p className="font-medium text-red-600">1 day</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Leave</p>
          <p className="font-medium text-gray-900">4 days</p>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-2 flex justify-between items-center border border-gray-100">
        <span className="text-xs text-gray-500 font-medium">Attendance %</span>
        <span className="text-sm font-bold text-emerald-600">94.8%</span>
      </div>
    </div>
  );
}

export function ProbationLeaveContext({ record }: ContextCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><CalendarOff size={16} className="text-gray-400"/> Leave During Probation</h4>
        <Link href={`/hr/leave/employee/${record.employeeId}`} className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
          View <ExternalLink size={12} />
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-gray-50 p-2 rounded-lg border border-gray-100 text-center">
          <p className="text-lg font-bold text-gray-900">2</p>
          <p className="text-[10px] text-gray-500 uppercase font-medium">Casual</p>
        </div>
        <div className="bg-gray-50 p-2 rounded-lg border border-gray-100 text-center">
          <p className="text-lg font-bold text-gray-900">2</p>
          <p className="text-[10px] text-gray-500 uppercase font-medium">Sick</p>
        </div>
        <div className="bg-gray-50 p-2 rounded-lg border border-gray-100 text-center">
          <p className="text-lg font-bold text-gray-900">0</p>
          <p className="text-[10px] text-gray-500 uppercase font-medium">Unpaid</p>
        </div>
      </div>
    </div>
  );
}

export function ProbationCaseContext() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><MessageSquareWarning size={16} className="text-gray-400"/> Employee Cases</h4>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center py-1">
          <span className="text-sm text-gray-600">Open Concerns</span>
          <span className="text-sm font-medium text-gray-900 bg-gray-100 px-2 rounded-full">0</span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-sm text-gray-600">Open Help Requests</span>
          <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2 rounded-full">1</span>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 flex gap-4">
        <Link href="/hr/concerns" className="text-xs text-indigo-600 hover:text-indigo-800">View Concerns</Link>
        <Link href="/hr/help" className="text-xs text-indigo-600 hover:text-indigo-800">View Help</Link>
      </div>
    </div>
  );
}
