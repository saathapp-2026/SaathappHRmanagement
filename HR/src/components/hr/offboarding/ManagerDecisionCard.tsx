'use client';
import React, { useState } from 'react';
import { OffboardingRecord } from '@/data/hr/offboarding';

export function ManagerDecisionCard({ record, onUpdate }: { record: OffboardingRecord, onUpdate: (record: Partial<OffboardingRecord>) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(record.managerDecision.status);
  const [lwd, setLwd] = useState(record.managerDecision.recommendedLastWorkingDate || record.requestedLastWorkingDate);
  const [remark, setRemark] = useState(record.managerDecision.remark || '');

  const handleSave = () => {
    onUpdate({
      managerDecision: {
        status,
        recommendedLastWorkingDate: lwd,
        remark
      }
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">Manager Decision</h3>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Record Decision
          </button>
        )}
      </div>

      <div className="p-4">
        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Decision Status</label>
                <select 
                  value={status}
                  onChange={e => setStatus(e.target.value as 'Pending' | 'Approved' | 'Discussed')}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Discussed">Discussed - Requires change</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recommended LWD</label>
                <input 
                  type="date"
                  value={lwd}
                  onChange={e => setLwd(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Manager Remarks</label>
              <textarea
                value={remark}
                onChange={e => setRemark(e.target.value)}
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button 
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Save Decision
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="block text-gray-500 text-xs mb-1">Manager</span>
              <span className="font-medium text-gray-900 text-sm">{record.manager}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-xs mb-1">Status</span>
              <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                record.managerDecision.status === 'Approved' ? 'bg-green-100 text-green-800' :
                record.managerDecision.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {record.managerDecision.status}
              </span>
            </div>
            <div>
              <span className="block text-gray-500 text-xs mb-1">Recommended LWD</span>
              <span className="font-medium text-gray-900 text-sm">
                {record.managerDecision.recommendedLastWorkingDate || 'Not provided'}
              </span>
            </div>
            {record.managerDecision.remark && (
              <div className="col-span-1 md:col-span-3 mt-2">
                <span className="block text-gray-500 text-xs mb-1">Remarks</span>
                <div className="text-sm text-gray-700 italic">&quot;{record.managerDecision.remark}&quot;</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
