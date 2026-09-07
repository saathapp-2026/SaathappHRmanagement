import React from 'react';
import { X, XCircle, ShieldAlert } from 'lucide-react';

export function RejectCorrectionModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><XCircle size={20} className="text-rose-600"/> Reject Correction?</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors"><X size={20}/></button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rejection Reason <span className="text-rose-500">*</span></label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500">
              <option value="">Select a reason</option>
              <option>Insufficient Evidence</option>
              <option>Attendance Record Valid</option>
              <option>Requested Time Cannot Be Verified</option>
              <option>Duplicate Request</option>
              <option>Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">HR Remarks <span className="text-rose-500">*</span></label>
            <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500" rows={3} placeholder="Explain why this request is being rejected..."></textarea>
          </div>

          <div className="flex items-start gap-2 mt-4 text-gray-500">
            <ShieldAlert size={14} className="mt-0.5 flex-shrink-0" />
            <p className="text-xs">This action will be recorded in HR audit logs when backend integration is enabled.</p>
          </div>
        </div>
        <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors shadow-sm">Reject Correction</button>
        </div>
      </div>
    </div>
  );
}
