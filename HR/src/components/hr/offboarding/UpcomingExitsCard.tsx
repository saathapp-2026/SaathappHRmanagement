'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronRight, Calendar } from 'lucide-react';
import { OffboardingRecord } from '@/data/hr/offboarding';

export function UpcomingExitsCard({ records }: { records: OffboardingRecord[] }) {
  const upcomingExits = records
    .filter(r => r.status !== 'Completed' && r.status !== 'Cancelled')
    .sort((a, b) => {
      const dateA = new Date(a.adjustedLastWorkingDate || a.requestedLastWorkingDate).getTime();
      const dateB = new Date(b.adjustedLastWorkingDate || b.requestedLastWorkingDate).getTime();
      return dateA - dateB;
    })
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="p-4 border-b border-gray-200 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-gray-500" />
        <h3 className="font-semibold text-gray-900">Upcoming Last Working Days</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {upcomingExits.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">
            No employee exits are scheduled.
          </div>
        ) : (
          upcomingExits.map(record => {
            const lwd = record.adjustedLastWorkingDate || record.requestedLastWorkingDate;
            const dateObj = new Date(lwd);
            const displayDate = isNaN(dateObj.getTime()) ? lwd : dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

            return (
              <div key={record.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">{record.employeeName}</span>
                  <span className="text-xs text-blue-600 font-medium">{displayDate}</span>
                </div>
                <Link 
                  href={`/hr/offboarding/${record.id}`}
                  className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1"
                >
                  View
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
