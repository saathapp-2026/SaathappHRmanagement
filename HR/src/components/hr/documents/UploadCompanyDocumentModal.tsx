import React from 'react';
import { X, UploadCloud } from 'lucide-react';

export function UploadCompanyDocumentModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><UploadCloud size={20} className="text-indigo-600"/> Upload Company Document</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors"><X size={20}/></button>
        </div>
        <div className="p-5 overflow-y-auto space-y-5">
          
          <div className="border-2 border-dashed border-indigo-200 bg-indigo-50/50 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-50 transition-colors">
            <UploadCloud size={40} className="text-indigo-400 mb-3" />
            <p className="text-sm font-bold text-indigo-900">Click to upload or drag and drop</p>
            <p className="text-xs text-indigo-600/70 mt-1">PDF, Word, or Excel (max 10MB)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Document Title <span className="text-rose-500">*</span></label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Work From Home Policy 2026" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Policy</option>
                <option>Template</option>
                <option>Company Identity</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Share With</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>All Employees</option>
                <option>Managers Only</option>
                <option>HR Only</option>
              </select>
            </div>
          </div>
          
          <div className="pt-2">
            <label className="flex items-center gap-2 text-sm text-gray-700 font-medium">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
              Send notification to target audience
            </label>
          </div>
        </div>
        <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 flex-shrink-0">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">Upload & Publish</button>
        </div>
      </div>
    </div>
  );
}
