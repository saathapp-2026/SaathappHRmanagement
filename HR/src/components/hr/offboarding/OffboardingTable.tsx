'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { OffboardingRecord } from '@/data/hr/offboarding';

interface OffboardingTableProps {
  records: OffboardingRecord[];
  activeTab: string;
  searchQuery: string;
}

export function OffboardingTable({ records, activeTab, searchQuery }: OffboardingTableProps) {
  const filteredRecords = records.filter(record => {
    // Search filter
    const searchMatch = 
      record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!searchMatch) return false;

    // Tab filter
    if (activeTab === 'All') return true;
    if (activeTab === 'Active') return !['Completed', 'Cancelled'].includes(record.status);
    if (activeTab === 'Pending Review') return record.status === 'Under Review' || !record.hrReview.completed;
    if (activeTab === 'Notice Period') return record.status === 'Notice Period Active';
    if (activeTab === 'Clearance') return record.status === 'Clearance Pending';
    if (activeTab === 'Exit Interview') return record.status === 'Exit Interview Pending';
    if (activeTab === 'Completed') return record.status === 'Completed';
    if (activeTab === 'Cancelled') return record.status === 'Cancelled';
    
    return true;
  });

  if (filteredRecords.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No offboarding records match your filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 text-xs text-gray-500 uppercase font-medium border-b border-gray-200">
            <th className="px-4 py-3">Employee</th>
            <th className="px-4 py-3">Exit Type</th>
            <th className="px-4 py-3">Department</th>
            <th className="px-4 py-3">LWD</th>
            <th className="px-4 py-3">Notice</th>
            <th className="px-4 py-3">Progress</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {filteredRecords.map(record => (
            <tr key={record.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">{record.employeeName}</span>
                  <span className="text-xs text-gray-500">{record.employeeId}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{record.exitType}</td>
              <td className="px-4 py-3 text-sm text-gray-700">
                <div className="flex flex-col">
                  <span>{record.department}</span>
                  <span className="text-xs text-gray-500">{record.manager}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {record.adjustedLastWorkingDate || record.requestedLastWorkingDate}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {record.noticePeriod.durationDays > 0 ? `${record.noticePeriod.durationDays} days` : '—'}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden w-16">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: `${record.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-8">{record.progress}%</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {record.status}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <Link 
                  href={`/hr/offboarding/${record.id}`}
                  className="inline-flex items-center justify-center p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <span className="text-sm font-medium mr-1">View</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
