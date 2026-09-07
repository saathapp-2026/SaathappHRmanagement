import React from 'react';
import { ProbationRecord } from '@/data/hr/probation';

interface ProbationExtensionHistoryProps {
  record: ProbationRecord;
}

export function ProbationExtensionHistory({ record }: ProbationExtensionHistoryProps) {
  if (record.extensions.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
      <h3 className="text-base font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Probation Extensions</h3>
      <div className="space-y-4">
        {record.extensions.map((ext, idx) => (
          <div key={ext.id} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Extension #{idx + 1}</h4>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Original End</p>
                <p className="text-sm text-gray-900">{new Date(ext.originalEnd).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">New End</p>
                <p className="text-sm font-medium text-blue-600">{new Date(ext.newEnd).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Duration</p>
                <p className="text-sm text-gray-900">{ext.duration}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Decision By</p>
                <p className="text-sm text-gray-900">{ext.decisionBy}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Reason</p>
              <p className="text-sm text-gray-700 bg-white p-2 border border-gray-100 rounded">{ext.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
