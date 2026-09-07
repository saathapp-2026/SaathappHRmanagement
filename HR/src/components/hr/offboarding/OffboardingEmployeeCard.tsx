'use client';
import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { OffboardingRecord } from '@/data/hr/offboarding';

export function OffboardingEmployeeCard({ record }: { record: OffboardingRecord }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
          {record.employeeName.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{record.employeeName}</h3>
          <p className="text-sm text-gray-500">{record.employeeId}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm">
        <div>
          <span className="block text-gray-500 text-xs">Role</span>
          <span className="font-medium text-gray-900">{record.designation}</span>
        </div>
        <div>
          <span className="block text-gray-500 text-xs">Department</span>
          <span className="font-medium text-gray-900">{record.department}</span>
        </div>
        <div>
          <span className="block text-gray-500 text-xs">Manager</span>
          <span className="font-medium text-gray-900">{record.manager}</span>
        </div>
        <div>
          <span className="block text-gray-500 text-xs">Location</span>
          <span className="font-medium text-gray-900">{record.location}</span>
        </div>
        <div>
          <span className="block text-gray-500 text-xs">Joining Date</span>
          <span className="font-medium text-gray-900">{record.joiningDate}</span>
        </div>
        <div>
          <span className="block text-gray-500 text-xs">Tenure</span>
          <span className="font-medium text-gray-900">{record.tenure}</span>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-100">
        <Link 
          href={`/hr/employees/${record.employeeId}`}
          className="flex items-center justify-center gap-2 w-full py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          View Employee Profile
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
