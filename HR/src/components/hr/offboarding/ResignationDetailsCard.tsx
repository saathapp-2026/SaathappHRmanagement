'use client';
import React from 'react';
import { OffboardingRecord } from '@/data/hr/offboarding';

export function ResignationDetailsCard({ record }: { record: OffboardingRecord }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-gray-900">Resignation Details</h3>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="block text-gray-500 text-xs mb-1">Submitted On</span>
          <span className="font-medium text-gray-900 text-sm">{record.resignationDate}</span>
        </div>
        <div>
          <span className="block text-gray-500 text-xs mb-1">Requested Last Working Date</span>
          <span className="font-medium text-gray-900 text-sm">{record.requestedLastWorkingDate}</span>
        </div>
        <div>
          <span className="block text-gray-500 text-xs mb-1">Primary Reason</span>
          <span className="font-medium text-gray-900 text-sm">{record.reason || 'Not specified'}</span>
        </div>
        <div>
          <span className="block text-gray-500 text-xs mb-1">Notice Period Required</span>
          <span className="font-medium text-gray-900 text-sm">{record.noticePeriod.durationDays} days</span>
        </div>
        
        {record.employeeRemarks && (
          <div className="col-span-1 md:col-span-2 mt-2">
            <span className="block text-gray-500 text-xs mb-1">Employee Remarks</span>
            <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 italic border border-gray-100">
              &quot;{record.employeeRemarks}&quot;
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
