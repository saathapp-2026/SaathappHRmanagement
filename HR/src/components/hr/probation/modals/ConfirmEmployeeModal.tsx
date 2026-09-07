import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ProbationRecord } from '@/data/hr/probation';

interface ConfirmEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  record: ProbationRecord;
}

export function ConfirmEmployeeModal({ isOpen, onClose, onConfirm, record }: ConfirmEmployeeModalProps) {
  const [effectiveDate, setEffectiveDate] = useState(record.currentEndDate);
  const [remarks, setRemarks] = useState('');
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Confirm Employment?</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div className="bg-emerald-50 text-emerald-800 p-3 rounded-lg text-sm mb-2 border border-emerald-100">
            You are about to confirm employment for <strong>{record.employeeName}</strong>.
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmation Effective Date</label>
            <input 
              type="date" 
              value={effectiveDate} 
              onChange={(e) => setEffectiveDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">HR Remarks (Required)</label>
            <textarea 
              value={remarks} 
              onChange={(e) => setRemarks(e.target.value)}
              rows={3}
              placeholder="e.g. Probation completed successfully."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div className="space-y-2 mt-4">
            <p className="text-xs font-semibold text-gray-500 uppercase">Checklist Confirmation</p>
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" required />
              <span className="text-sm text-gray-700">Manager recommendation reviewed</span>
            </label>
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" required />
              <span className="text-sm text-gray-700">Probation review completed</span>
            </label>
          </div>
        </div>
        <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
            Cancel
          </button>
          <button 
            onClick={() => {
              if(!remarks) return alert("HR Remarks required");
              onConfirm({ effectiveDate, remarks });
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
          >
            Confirm Employee
          </button>
        </div>
      </div>
    </div>
  );
}
