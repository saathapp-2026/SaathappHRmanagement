import React from 'react';
import Link from 'next/link';
import { CalendarClock, ChevronRight } from 'lucide-react';
import { ProbationRecord } from '@/data/hr/probation';

interface ProbationEndingSoonProps {
  records: ProbationRecord[];
}

export function ProbationEndingSoon({ records }: ProbationEndingSoonProps) {
  const endingWithin30Days = records.filter(
    r => r.status !== 'Confirmed' && r.status !== 'Cancelled' && r.daysRemaining >= 0 && r.daysRemaining <= 30
  ).sort((a, b) => a.daysRemaining - b.daysRemaining);

  const within7 = endingWithin30Days.filter(r => r.daysRemaining <= 7);
  const within15 = endingWithin30Days.filter(r => r.daysRemaining > 7 && r.daysRemaining <= 15);

  if (endingWithin30Days.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
        <CalendarClock size={18} className="text-amber-600" />
        <h3 className="font-semibold text-gray-900">Probation Ending Soon</h3>
      </div>
      <div className="p-4 space-y-4">
        {within7.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-2">Within 7 Days</h4>
            <div className="space-y-2">
              {within7.map(record => (
                <div key={record.employeeId} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{record.employeeName}</p>
                    <p className="text-xs text-gray-500">{new Date(record.currentEndDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
                  </div>
                  <Link href={`/hr/probation/${record.employeeId}`} className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-medium">
                    View <ChevronRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {within15.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-2 mt-4">Within 15 Days</h4>
            <div className="space-y-2">
              {within15.map(record => (
                <div key={record.employeeId} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{record.employeeName}</p>
                    <p className="text-xs text-gray-500">{new Date(record.currentEndDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
                  </div>
                  <Link href={`/hr/probation/${record.employeeId}`} className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-medium">
                    View <ChevronRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
