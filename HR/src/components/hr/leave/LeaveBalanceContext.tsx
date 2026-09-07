import React from 'react';
import { ArrowRight, Briefcase } from 'lucide-react';
import { LeaveRequest } from '@/data/hr/leave';

export function LeaveBalanceContext({ request }: { request: LeaveRequest }) {
  const currentRemaining = request.balanceRemaining + request.workingDays;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Briefcase size={18} className="text-gray-400" />
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Balance Context</h3>
      </div>
      
      <div className="bg-gray-50 border border-gray-100 rounded-lg p-5">
        <h4 className="text-sm font-bold text-gray-900 mb-4">{request.leaveType}</h4>
        
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex-1 text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Current</p>
            <p className="text-lg font-bold text-gray-900">{currentRemaining} days</p>
          </div>
          <div className="text-gray-300">
            <ArrowRight size={20} />
          </div>
          <div className="flex-1 text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Request</p>
            <p className="text-lg font-bold text-amber-600">-{request.workingDays} days</p>
          </div>
          <div className="text-gray-300">
            <ArrowRight size={20} />
          </div>
          <div className="flex-1 text-center bg-white border border-emerald-100 rounded-lg py-2 shadow-sm">
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-0.5">After Approval</p>
            <p className="text-xl font-bold text-emerald-600">{request.balanceRemaining} days</p>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2 flex overflow-hidden">
          <div className="bg-gray-800 h-2" style={{ width: '16%' }} title="Used: 2"></div>
          <div className="bg-amber-400 h-2" style={{ width: '16%' }} title="Requested: 2"></div>
          <div className="bg-emerald-500 h-2" style={{ width: '66%' }} title="Remaining: 8"></div>
        </div>
        <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
          <span>Allocated: 12</span>
          <div className="flex gap-3">
            <span className="text-gray-900">Used: 2</span>
            <span className="text-emerald-600">Rem: 8</span>
          </div>
        </div>
      </div>
    </div>
  );
}
