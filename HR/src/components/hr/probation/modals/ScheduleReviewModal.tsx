import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ProbationReviewType } from '@/data/hr/probation';

interface ScheduleReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (data: any) => void;
}

export function ScheduleReviewModal({ isOpen, onClose, onSchedule }: ScheduleReviewModalProps) {
  const [type, setType] = useState<ProbationReviewType>('Final Probation Review');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reviewer, setReviewer] = useState('Manager');
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Schedule Review</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Review Type</label>
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value as ProbationReviewType)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="30-Day Check-in">30-Day Check-in</option>
              <option value="Mid-Probation Review">Mid-Probation Review</option>
              <option value="Final Probation Review">Final Probation Review</option>
              <option value="Custom Review">Custom Review</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input 
                type="time" 
                value={time} 
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reviewer</label>
            <select 
              value={reviewer} 
              onChange={(e) => setReviewer(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Manager">Manager</option>
              <option value="HR">HR</option>
              <option value="Manager + HR">Manager + HR</option>
            </select>
          </div>
        </div>
        <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
            Cancel
          </button>
          <button 
            onClick={() => {
              onSchedule({ type, date, time, reviewer });
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            Schedule Review
          </button>
        </div>
      </div>
    </div>
  );
}
