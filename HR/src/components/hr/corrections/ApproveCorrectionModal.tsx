import React from 'react';
import { X, CheckCircle2, ShieldAlert } from 'lucide-react';
import { AttendanceCorrection } from '@/data/hr/corrections';

export function ApproveCorrectionModal({ isOpen, onClose, correction }: { isOpen: boolean, onClose: () => void, correction: AttendanceCorrection }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><CheckCircle2 size={20} className="text-emerald-600"/> Approve Correction?</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors"><X size={20}/></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">Employee</p>
            <p className="text-sm font-semibold text-gray-900 mb-3">{correction.employeeName}</p>
            <p className="text-xs text-gray-500 mb-1">Attendance Date</p>
            <p className="text-sm font-semibold text-gray-900 mb-3">{correction.attendanceDate}</p>
            <p className="text-xs text-gray-500 mb-1">Change</p>
            <p className="text-sm font-semibold text-indigo-600">{correction.type}</p>
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
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">Approve Correction</button>
        </div>
      </div>
    </div>
  );
}
