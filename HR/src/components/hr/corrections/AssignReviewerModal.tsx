import React from 'react';
import { X, UserPlus } from 'lucide-react';

export function AssignReviewerModal({ isOpen, onClose, selectedCount }: { isOpen: boolean, onClose: () => void, selectedCount: number }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><UserPlus size={20} className="text-indigo-600"/> Assign HR Reviewer</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors"><X size={20}/></button>
        </div>
        <div className="p-5 space-y-4">
          <p className="text-sm text-gray-600">Assigning <strong className="text-gray-900">{selectedCount}</strong> correction requests to a reviewer.</p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reviewer</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Priya Sharma</option>
              <option>Rahul HR</option>
              <option>Meera HR</option>
            </select>
          </div>
        </div>
        <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">Assign</button>
        </div>
      </div>
    </div>
  );
}
