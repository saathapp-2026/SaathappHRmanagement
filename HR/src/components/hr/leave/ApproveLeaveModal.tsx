import React from 'react';
import { X, CheckCircle2, ShieldAlert } from 'lucide-react';
import { LeaveRequest } from '@/data/hr/leave';

export function ApproveLeaveModal({ isOpen, onClose, request }: { isOpen: boolean, onClose: () => void, request: LeaveRequest }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><CheckCircle2 size={20} className="text-emerald-600"/> Approve Leave Request?</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors"><X size={20}/></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500">Employee</span>
              <span className="text-sm font-semibold text-gray-900">{request.employeeName}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500">Leave Type</span>
              <span className="text-sm font-semibold text-gray-900">{request.leaveType}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500">Duration</span>
              <span className="text-sm font-semibold text-gray-900">{request.fromDate} – {request.toDate}</span>
            </div>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
              <span className="text-xs text-gray-500">Working Days</span>
              <span className="text-sm font-semibold text-gray-900">{request.workingDays}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-900">Balance After Approval</span>
              <span className="text-sm font-bold text-emerald-600">{request.balanceRemaining} days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-900">Team Conflict</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">Low</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">HR Remarks (Optional)</label>
            <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" rows={2} placeholder="Add a note..."></textarea>
          </div>

          <div className="flex items-start gap-2 mt-4 text-gray-500">
            <ShieldAlert size={14} className="mt-0.5 flex-shrink-0" />
            <p className="text-xs">This action will be recorded in HR audit logs when backend integration is enabled.</p>
          </div>
        </div>
        <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">Approve Leave</button>
        </div>
      </div>
    </div>
  );
}
