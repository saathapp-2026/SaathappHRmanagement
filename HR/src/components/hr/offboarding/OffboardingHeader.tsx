'use client';
import React from 'react';
import { UserPlus, Ban } from 'lucide-react';
import { OffboardingRecord } from '@/data/hr/offboarding';

export function OffboardingHeader({ record, onUpdate }: { record: OffboardingRecord, onUpdate?: (record: Partial<OffboardingRecord>) => void }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-bold text-gray-900">Employee Offboarding</h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {record.id}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
            {record.status}
          </span>
        </div>
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <span className="font-medium text-gray-700">{record.employeeName}</span>
          <span>·</span>
          <span>{record.exitType}</span>
          <span>·</span>
          <span>LWD: {record.adjustedLastWorkingDate || record.requestedLastWorkingDate}</span>
          <span>·</span>
          <span>HR Owner: {record.hrOwner || 'Unassigned'}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {record.status !== 'Completed' && record.status !== 'Cancelled' && (
          <button onClick={() => onUpdate && onUpdate({ status: 'Cancelled' })} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 bg-white">
            <Ban className="w-4 h-4" />
            Cancel
          </button>
        )}
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white">
          <UserPlus className="w-4 h-4" />
          Assign Owner
        </button>
      </div>
    </div>
  );
}
