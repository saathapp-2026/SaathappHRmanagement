import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { LeaveRequest } from '@/data/hr/leave';

export function LeavePolicyCard({ request }: { request: LeaveRequest }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck size={18} className="text-gray-400" />
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Policy Context</h3>
      </div>
      <p className="text-xs font-bold text-gray-900 mb-3 pb-1 border-b border-gray-100">{request.leaveType}</p>
      <div className="space-y-3 flex-1">
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500">Annual Allowance</span>
          <span className="font-semibold text-gray-900">12 Days</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500">Max Consecutive</span>
          <span className="font-semibold text-gray-900">3 Days</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500">Advance Notice</span>
          <span className="font-semibold text-gray-900">1 Day</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500">Document Required</span>
          <span className="font-semibold text-gray-900">No</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500">Carry Forward</span>
          <span className="font-semibold text-gray-900">No</span>
        </div>
      </div>
    </div>
  );
}
