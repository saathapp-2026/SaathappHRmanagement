import React from 'react';
import { ProbationRecord } from '@/data/hr/probation';

interface ProbationDetailsCardProps {
  record: ProbationRecord;
}

export function ProbationDetailsCard({ record }: ProbationDetailsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Probation Details</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <p className="text-xs text-gray-500 mb-1">Probation Start</p>
          <p className="font-medium text-gray-900">{new Date(record.probationStart).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Original End Date</p>
          <p className="font-medium text-gray-900">{new Date(record.originalEndDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Duration</p>
          <p className="font-medium text-gray-900">{record.duration}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Current End Date</p>
          <p className="font-medium text-gray-900">{new Date(record.currentEndDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Extensions</p>
          <p className="font-medium text-gray-900">{record.extensions.length}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Status</p>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
            record.status === 'Active' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
            record.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
            record.status === 'Extended' ? 'bg-blue-50 text-blue-700 border-blue-200' :
            record.status === 'Overdue' ? 'bg-red-50 text-red-700 border-red-200' :
            'bg-amber-50 text-amber-700 border-amber-200'
          }`}>
            {record.status}
          </span>
        </div>
      </div>
    </div>
  );
}
