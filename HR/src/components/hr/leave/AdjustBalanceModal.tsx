import React, { useState } from 'react';
import { X, SlidersHorizontal, ShieldAlert } from 'lucide-react';

export function AdjustBalanceModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><SlidersHorizontal size={20} className="text-indigo-600"/> Adjust Leave Balance</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors"><X size={20}/></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Casual Leave</option>
                <option>Sick Leave</option>
                <option>Earned Leave</option>
                <option>Comp Off</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Effective Date</label>
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" defaultValue="2026-09-07" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adjustment</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Add (+)</option>
                <option>Deduct (-)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Days</label>
              <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="0.5, 1, 2..." step="0.5" min="0.5" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason <span className="text-rose-500">*</span></label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Select a reason</option>
              <option>Annual Allocation Correction</option>
              <option>Carry Forward</option>
              <option>Comp Off Credit</option>
              <option>Policy Adjustment</option>
              <option>Manual Correction</option>
              <option>Other</option>
            </select>
            <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" rows={2} placeholder="Additional remarks..."></textarea>
          </div>

          <div className="flex items-start gap-2 mt-4 text-gray-500">
            <ShieldAlert size={14} className="mt-0.5 flex-shrink-0" />
            <p className="text-xs">Leave balance adjustments will be included in HR audit logs when backend integration is enabled.</p>
          </div>
        </div>
        <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
          <button 
            onClick={onClose} 
            disabled={!reason}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors shadow-sm ${reason ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-300 cursor-not-allowed'}`}
          >
            Apply Adjustment
          </button>
        </div>
      </div>
    </div>
  );
}
