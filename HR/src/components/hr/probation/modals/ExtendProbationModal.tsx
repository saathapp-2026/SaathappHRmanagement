import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ProbationRecord } from '@/data/hr/probation';

interface ExtendProbationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExtend: (data: any) => void;
  record: ProbationRecord;
}

export function ExtendProbationModal({ isOpen, onClose, onExtend, record }: ExtendProbationModalProps) {
  const [duration, setDuration] = useState('30 Days');
  const [newEndDate, setNewEndDate] = useState('');
  const [reason, setReason] = useState('Extended Evaluation Required');
  const [remarks, setRemarks] = useState('');
  
  useEffect(() => {
    if (duration !== 'Custom') {
      const days = parseInt(duration.split(' ')[0]);
      const current = new Date(record.currentEndDate);
      current.setDate(current.getDate() + days);
      setNewEndDate(current.toISOString().split('T')[0]);
    }
  }, [duration, record.currentEndDate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Extend Probation</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <div className="p-4 space-y-4">
          
          {record.extensions.length > 0 && (
            <div className="bg-amber-50 text-amber-800 p-3 rounded-lg text-sm mb-2 border border-amber-200">
              This employee&apos;s probation has already been extended once. Additional extension should be reviewed carefully.
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Extension Duration</label>
              <select 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="15 Days">15 Days</option>
                <option value="30 Days">30 Days</option>
                <option value="60 Days">60 Days</option>
                <option value="90 Days">90 Days</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New End Date</label>
              <input 
                type="date" 
                value={newEndDate} 
                onChange={(e) => setNewEndDate(e.target.value)}
                disabled={duration !== 'Custom'}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Extension</label>
            <select 
              value={reason} 
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Performance Review Required">Performance Review Required</option>
              <option value="Attendance Improvement">Attendance Improvement</option>
              <option value="Role Adaptation">Role Adaptation</option>
              <option value="Training Completion">Training Completion</option>
              <option value="Manager Recommendation">Manager Recommendation</option>
              <option value="Extended Evaluation Required">Extended Evaluation Required</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Detailed HR Remarks (Required)</label>
            <textarea 
              value={remarks} 
              onChange={(e) => setRemarks(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>
        </div>
        <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
            Cancel
          </button>
          <button 
            onClick={() => {
              if(!remarks) return alert("Remarks are required");
              onExtend({ duration, newEndDate, reason, remarks });
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Extend Probation
          </button>
        </div>
      </div>
    </div>
  );
}
