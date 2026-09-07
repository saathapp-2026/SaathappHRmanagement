import React from 'react';
import { X, CheckCircle } from 'lucide-react';

export function ResolveConcernModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><CheckCircle size={20} className="text-emerald-600"/> Resolve Employee Concern?</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors"><X size={20}/></button>
        </div>
        <div className="p-5 overflow-y-auto space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resolution Type <span className="text-rose-500">*</span></label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">Select resolution type...</option>
              <option>Guidance Provided</option>
              <option>Manager Discussion</option>
              <option>Policy Clarification</option>
              <option>Correction Completed</option>
              <option>Escalated Internally</option>
              <option>No Further Action Required</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resolution Summary <span className="text-rose-500">*</span></label>
            <textarea 
              rows={4}
              placeholder="Summarize how the concern was resolved..."
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">This summary will be visible to the employee.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date (Optional)</label>
            <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="pt-2">
            <label className="flex items-center gap-2 text-sm text-gray-700 font-medium">
              <input type="checkbox" defaultChecked className="rounded text-indigo-600 focus:ring-indigo-500" />
              Notify Employee of Resolution
            </label>
          </div>
        </div>
        <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 shrink-0">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">Mark Resolved</button>
        </div>
      </div>
    </div>
  );
}
