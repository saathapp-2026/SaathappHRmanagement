import React from 'react';
import Link from 'next/link';
import { Eye, Clock, AlertCircle } from 'lucide-react';
import { ProbationRecord } from '@/data/hr/probation';

interface ProbationTableProps {
  records: ProbationRecord[];
}

export function ProbationTable({ records }: ProbationTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Review Due': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Extended': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Confirmed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Overdue': return 'bg-red-50 text-red-700 border-red-200';
      case 'Cancelled': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getDaysRemainingDisplay = (days: number, status: string) => {
    if (status === 'Confirmed') return <span className="text-gray-400">-</span>;
    if (days < 0) return <span className="text-red-600 font-medium flex items-center gap-1"><AlertCircle size={14}/> {Math.abs(days)} days overdue</span>;
    if (days === 0) return <span className="text-amber-600 font-medium flex items-center gap-1"><Clock size={14}/> Today</span>;
    if (days <= 7) return <span className="text-amber-600 font-medium flex items-center gap-1"><Clock size={14}/> {days} days</span>;
    return <span className="text-gray-600">{days} days</span>;
  };

  const getReviewStatus = (record: ProbationRecord) => {
    const nextReview = record.reviews.find(r => r.status === 'Scheduled');
    if (nextReview) return 'Scheduled';
    if (record.status === 'Overdue') return 'Pending';
    return 'Not Scheduled';
  };

  if (records.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={32} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No employees found</h3>
        <p className="text-gray-500">No probation records match your current filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-4">Employee</th>
              <th className="px-6 py-4">Department & Manager</th>
              <th className="px-6 py-4">Joining & End Date</th>
              <th className="px-6 py-4">Days Remaining</th>
              <th className="px-6 py-4">Review</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {records.map((record) => (
              <tr key={record.employeeId} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{record.employeeName}</span>
                    <span className="text-xs text-gray-500">{record.employeeId}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-900">{record.department}</span>
                    <span className="text-xs text-gray-500">Mgr: {record.manager}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-900">Joined: {new Date(record.joiningDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    <span className="text-xs text-gray-500">End: {new Date(record.currentEndDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getDaysRemainingDisplay(record.daysRemaining, record.status)}
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">{getReviewStatus(record)}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link 
                    href={`/hr/probation/${record.employeeId}`}
                    className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye size={18} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
