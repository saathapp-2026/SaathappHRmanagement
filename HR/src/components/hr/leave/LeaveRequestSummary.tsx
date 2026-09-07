import React from 'react';
import { LeaveRequest } from '@/data/hr/leave';

export function LeaveRequestSummary({ request }: { request: LeaveRequest }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Leave Details</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6 pb-6 border-b border-gray-100">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Leave Type</p>
          <p className="text-sm font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded w-fit">{request.leaveType}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">From</p>
          <p className="text-sm font-bold text-gray-900">{request.fromDate}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">To</p>
          <p className="text-sm font-bold text-gray-900">{request.toDate}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total</p>
          <p className="text-sm font-bold text-gray-900">{request.workingDays} Working Days</p>
        </div>
      </div>

      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Reason</p>
        <p className="text-sm text-gray-800 bg-gray-50 p-4 rounded-lg border border-gray-100 italic">&quot;{request.reason}&quot;</p>
      </div>
    </div>
  );
}
