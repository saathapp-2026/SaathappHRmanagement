import React from 'react';
import { X, HelpCircle } from 'lucide-react';

export function RequestConcernInfoModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><HelpCircle size={20} className="text-indigo-600"/> Request More Information</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors"><X size={20}/></button>
        </div>
        <div className="p-5 space-y-4">
          <p className="text-sm text-gray-600">The status will change to <strong>Waiting for Employee</strong>.</p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message to Employee</label>
            <textarea 
              rows={4}
              placeholder="E.g. Could you share examples or dates when the issue occurred?"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Requested Items (Optional)</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" /> Supporting Evidence</label>
              <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" /> Dates / Timeline</label>
              <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" /> Manager Context</label>
            </div>
          </div>
        </div>
        <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">Send Request</button>
        </div>
      </div>
    </div>
  );
}
