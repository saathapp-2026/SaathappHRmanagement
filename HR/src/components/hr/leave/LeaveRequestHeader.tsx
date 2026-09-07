import React from 'react';
import Link from 'next/link';
import { User, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { LeaveRequest, getLeaveStatusColor } from '@/data/hr/leave';

export function LeaveRequestHeader({ request }: { request: LeaveRequest }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-6 relative">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl font-bold text-gray-900">Leave Request</h1>
            <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${getLeaveStatusColor(request.status)}`}>{request.status}</span>
          </div>
          <p className="text-sm font-medium text-gray-500 flex items-center gap-2">{request.id}</p>
        </div>
        <div className="flex items-center gap-1 hidden sm:flex">
          <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors" title="Previous Request"><ChevronLeft size={20}/></button>
          <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors" title="Next Request"><ChevronRight size={20}/></button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 p-4 bg-gray-50 border border-gray-100 rounded-lg">
        <div className="flex-[1.5]">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><User size={12}/> Employee</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">{request.avatar}</div>
            <div>
              <Link href={`/hr/employees/${request.employeeId}`} className="font-bold text-sm text-gray-900 hover:text-indigo-600 transition-colors">{request.employeeName}</Link>
              <div className="text-[11px] text-gray-500 mt-0.5">{request.employeeId} · {request.department}</div>
            </div>
          </div>
        </div>
        <div className="hidden sm:block w-px bg-gray-200"></div>
        <div className="flex-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Calendar size={12}/> Submitted</p>
          <p className="text-sm font-bold text-gray-900 mt-2">{request.submitted}</p>
          <p className="text-[11px] font-semibold text-gray-500 mt-0.5">{request.age}</p>
        </div>
        <div className="hidden sm:block w-px bg-gray-200"></div>
        <div className="flex-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><User size={12}/> Manager</p>
          <p className="text-sm font-bold text-gray-900 mt-2">{request.reportingManager}</p>
          <p className={`text-[11px] font-bold mt-0.5 ${request.managerRecommendation === 'Approved' ? 'text-emerald-600' : 'text-gray-500'}`}>
            {request.managerRecommendation === 'Approved' ? 'Recommended' : request.managerRecommendation}
          </p>
        </div>
      </div>
    </div>
  );
}
