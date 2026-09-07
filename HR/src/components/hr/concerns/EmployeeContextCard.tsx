import React from 'react';
import Link from 'next/link';
import { ExternalLink, CalendarDays, Plane } from 'lucide-react';
import { ConcernCase } from '@/data/hr/concerns';

export function EmployeeContextCard({ caseData }: { caseData: ConcernCase }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Employee Context</h3>
      </div>
      <div className="p-5 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 leading-tight">{caseData.employeeName}</h2>
          <p className="text-sm font-semibold text-gray-500">{caseData.employeeId}</p>
        </div>

        <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 space-y-3 text-sm">
          <div className="flex justify-between border-b border-indigo-100/50 pb-2">
            <span className="text-gray-500">Department</span>
            <span className="font-semibold text-gray-900">{caseData.employeeDepartment}</span>
          </div>
          <div className="flex justify-between border-b border-indigo-100/50 pb-2">
            <span className="text-gray-500">Designation</span>
            <span className="font-semibold text-gray-900 text-right">{caseData.employeeDesignation}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Manager</span>
            <span className="font-semibold text-indigo-700">{caseData.managerName || 'N/A'}</span>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3 text-sm">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500">Employment</span>
            <span className="font-semibold text-gray-900">{caseData.employmentType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Joining Date</span>
            <span className="font-semibold text-gray-900">{caseData.joiningDate}</span>
          </div>
        </div>

        <div className="pt-2 space-y-2">
          <Link href={`/hr/employees/${caseData.employeeId}`} className="w-full py-2 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg text-sm text-center hover:bg-gray-50 transition-colors shadow-sm flex justify-center items-center gap-2"><ExternalLink size={14}/> View Employee Profile</Link>
          <div className="grid grid-cols-2 gap-2">
            <Link href={`/hr/attendance/${caseData.employeeId}`} className="py-2 bg-white border border-gray-200 text-gray-600 font-medium rounded-lg text-xs text-center hover:bg-gray-50 transition-colors flex justify-center items-center gap-1.5"><CalendarDays size={14}/> Attendance</Link>
            <Link href={`/hr/leave/employee/${caseData.employeeId}`} className="py-2 bg-white border border-gray-200 text-gray-600 font-medium rounded-lg text-xs text-center hover:bg-gray-50 transition-colors flex justify-center items-center gap-1.5"><Plane size={14}/> Leave</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
