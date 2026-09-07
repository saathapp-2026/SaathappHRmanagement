import React from 'react';
import { X, Lock } from 'lucide-react';

export function AddInternalNoteModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-amber-50">
          <h2 className="text-lg font-bold text-amber-900 flex items-center gap-2"><Lock size={20}/> Add Internal HR Note</h2>
          <button onClick={onClose} className="text-amber-700 hover:text-amber-900 transition-colors"><X size={20}/></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="bg-amber-50/50 border border-amber-200 p-3 rounded-lg text-sm text-amber-800">
            Internal notes are strictly confidential and will <strong>never</strong> be visible to the employee.
          </div>
          <div>
            <textarea 
              rows={5}
              placeholder="Type your internal note here..."
              className="w-full p-3 border border-amber-300 bg-amber-50/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-950 placeholder:text-amber-900/50"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tag HR Member (Optional)</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">None</option>
              <option>Priya Sharma</option>
              <option>Rahul HR</option>
            </select>
          </div>
        </div>
        <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-amber-900 bg-amber-200 hover:bg-amber-300 rounded-lg transition-colors shadow-sm font-bold">Add Note</button>
        </div>
      </div>
    </div>
  );
}
