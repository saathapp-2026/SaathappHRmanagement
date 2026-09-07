import React, { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { mockLeaveRequests, getLeaveStatusColor } from '@/data/hr/leave';

export function LeaveRequestTable() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newSet = new Set(selectedRows);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedRows(newSet);
  };

  const toggleAll = () => {
    if (selectedRows.size === mockLeaveRequests.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(mockLeaveRequests.map(c => c.id)));
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
      {selectedRows.size > 0 ? (
        <div className="p-4 border-b border-indigo-100 bg-indigo-50 flex justify-between items-center">
          <span className="text-sm font-bold text-indigo-900">{selectedRows.size} selected</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-medium transition-colors shadow-sm">Assign Reviewer</button>
          </div>
        </div>
      ) : (
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Leave Requests</h3>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-4 py-3 whitespace-nowrap w-12">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" checked={selectedRows.size === mockLeaveRequests.length && mockLeaveRequests.length > 0} onChange={toggleAll} />
              </th>
              <th className="px-4 py-3 whitespace-nowrap">Employee</th>
              <th className="px-4 py-3 whitespace-nowrap">Leave Type & Reason</th>
              <th className="px-4 py-3 whitespace-nowrap">Dates & Balance</th>
              <th className="px-4 py-3 whitespace-nowrap">Submitted</th>
              <th className="px-4 py-3 whitespace-nowrap">Status</th>
              <th className="px-4 py-3 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockLeaveRequests.map((req) => {
              const isOverdue = req.age.includes('days') && parseInt(req.age) > 2;
              return (
                <tr key={req.id} className={`hover:bg-gray-50/50 transition-colors ${selectedRows.has(req.id) ? 'bg-indigo-50/30' : ''}`}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" checked={selectedRows.has(req.id)} onChange={() => toggleRow(req.id)} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-xs">{req.avatar}</div>
                      <div>
                        <Link href={`/hr/employees/${req.employeeId}`} className="font-semibold text-sm text-gray-900 hover:text-indigo-600 transition-colors">{req.employeeName}</Link>
                        <div className="text-[11px] text-gray-500 mt-0.5">{req.employeeId} · {req.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-normal max-w-xs">
                    <div className="text-sm font-bold text-gray-900">{req.leaveType}</div>
                    <div className="text-xs text-gray-500 mt-0.5 truncate">{req.reason}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{req.fromDate} <span className="text-gray-400 mx-1">→</span> {req.toDate}</div>
                    <div className="text-xs font-semibold mt-1">
                      <span className="text-gray-900">{req.workingDays} days</span> <span className="text-gray-400 mx-1">•</span> <span className="text-emerald-600">{req.balanceRemaining} days remaining</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{req.submitted}</div>
                    <div className={`text-xs font-semibold mt-0.5 flex items-center gap-1 ${isOverdue ? 'text-rose-500' : 'text-gray-500'}`}>
                      {isOverdue && <AlertTriangle size={12} />} {req.age}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${getLeaveStatusColor(req.status)}`}>{req.status}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <Link href={`/hr/leave/${req.id}`} className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 shadow-sm transition-colors inline-block">Review</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
