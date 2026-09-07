'use client';
import React, { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { OffboardingRecord } from '@/data/hr/offboarding';

export function NoticePeriodCard({ record, onUpdate }: { record: OffboardingRecord, onUpdate: (record: Partial<OffboardingRecord>) => void }) {
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [newLwd, setNewLwd] = useState(record.adjustedLastWorkingDate || record.requestedLastWorkingDate);
  const [reason, setReason] = useState('');
  const [remark, setRemark] = useState('');

  const np = record.noticePeriod;
  const progressPercent = np.durationDays > 0 ? Math.min(100, Math.max(0, (np.servedDays / np.durationDays) * 100)) : 100;

  const handleAdjust = () => {
    // Basic logic for updating LWD and recalculating NP duration
    onUpdate({
      adjustedLastWorkingDate: newLwd,
      internalNotes: [
        {
          id: Date.now().toString(),
          author: 'HR User', // Should come from context
          timestamp: new Date().toLocaleString(),
          note: `LWD Adjusted to ${newLwd}. Reason: ${reason}. Remarks: ${remark}`
        },
        ...record.internalNotes
      ]
    });
    setIsAdjusting(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">Notice Period</h3>
        {!isAdjusting && record.status !== 'Completed' && (
          <button 
            onClick={() => setIsAdjusting(true)}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Adjust Dates
          </button>
        )}
      </div>

      <div className="p-4">
        {isAdjusting ? (
          <div className="space-y-4 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Adjust Last Working Day</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current LWD</label>
                <input 
                  type="text"
                  disabled
                  value={record.adjustedLastWorkingDate || record.requestedLastWorkingDate}
                  className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New LWD *</label>
                <input 
                  type="date"
                  value={newLwd}
                  onChange={e => setNewLwd(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason *</label>
                <select 
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Reason</option>
                  <option value="Early Release">Early Release</option>
                  <option value="Notice Extension">Notice Extension</option>
                  <option value="Mutual Agreement">Mutual Agreement</option>
                  <option value="Leave Adjustment">Leave Adjustment</option>
                  <option value="Business Requirement">Business Requirement</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">HR Remark *</label>
                <input 
                  type="text"
                  value={remark}
                  onChange={e => setRemark(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => setIsAdjusting(false)}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button 
                onClick={handleAdjust}
                disabled={!newLwd || !reason || !remark}
                className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex-1">
                <span className="block text-gray-500 text-xs mb-1">Start Date</span>
                <span className="font-medium text-gray-900">{np.startDate}</span>
              </div>
              <div className="flex-1 border-l border-gray-200 pl-4">
                <span className="block text-gray-500 text-xs mb-1">End Date (LWD)</span>
                <span className="font-medium text-gray-900 flex items-center gap-2">
                  {record.adjustedLastWorkingDate || np.endDate}
                  {record.adjustedLastWorkingDate && record.adjustedLastWorkingDate !== record.requestedLastWorkingDate && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-800">Adjusted</span>
                  )}
                </span>
              </div>
              <div className="flex-1 border-l border-gray-200 pl-4">
                <span className="block text-gray-500 text-xs mb-1">Duration</span>
                <span className="font-medium text-gray-900">{np.durationDays} days</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-gray-600 flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" />
                  Progress: {np.servedDays} days served
                </span>
                <span className="font-medium text-gray-900">{np.remainingDays} days remaining</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
