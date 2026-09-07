import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { mockCorrections, getStatusBadgeStyle } from '@/data/hr/corrections';
import { AssignReviewerModal } from './AssignReviewerModal';

export function CorrectionTable() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const toggleRow = (id: string) => {
    const newSet = new Set(selectedRows);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedRows(newSet);
  };

  const toggleAll = () => {
    if (selectedRows.size === mockCorrections.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(mockCorrections.map(c => c.id)));
    }
  };

  const renderComparison = (original: Partial<Record<string, string>>, requested: Partial<Record<string, string>>, type: string) => {
    if (type === 'Missed Check-Out') {
      return (
        <div className="text-sm">
          <div className="flex items-center gap-2"><span className="text-gray-400 w-16 text-xs">Out</span><span className="text-gray-400 line-through">{original.checkOut}</span> <ArrowRight size={12} className="text-gray-300"/> <span className="font-semibold text-gray-900">{requested.checkOut}</span></div>
          <div className="flex items-center gap-2 mt-0.5"><span className="text-gray-400 w-16 text-xs">Hours</span><span className="text-gray-400">{original.workingHours}</span> <ArrowRight size={12} className="text-gray-300"/> <span className="font-semibold text-gray-900">{requested.workingHours}</span></div>
        </div>
      );
    }
    if (type === 'Incorrect Check-In') {
      return (
        <div className="text-sm flex items-center gap-2">
          <span className="text-gray-400 line-through">{original.checkIn}</span> <ArrowRight size={14} className="text-gray-300"/> <span className="font-semibold text-gray-900">{requested.checkIn}</span>
        </div>
      );
    }
    if (type === 'Wrong Attendance Status') {
      return (
        <div className="text-sm flex items-center gap-2">
          <span className="text-gray-400">{original.status}</span> <ArrowRight size={14} className="text-gray-300"/> <span className="font-semibold text-gray-900">{requested.status}</span>
        </div>
      );
    }
    return <span className="text-sm text-gray-500">Multiple changes</span>;
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full overflow-hidden">
        {selectedRows.size > 0 ? (
          <div className="p-4 border-b border-indigo-100 bg-indigo-50 flex justify-between items-center">
            <span className="text-sm font-bold text-indigo-900">{selectedRows.size} selected</span>
            <div className="flex gap-2">
              <button onClick={() => setIsAssignModalOpen(true)} className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-medium transition-colors shadow-sm">Assign Reviewer</button>
              <button className="px-3 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors shadow-sm">Approve Selected</button>
            </div>
          </div>
        ) : (
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Correction Requests</h3>
          </div>
        )}
        
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-3 whitespace-nowrap w-12">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" checked={selectedRows.size === mockCorrections.length && mockCorrections.length > 0} onChange={toggleAll} />
                </th>
                <th className="px-4 py-3 whitespace-nowrap">Request</th>
                <th className="px-4 py-3 whitespace-nowrap">Employee</th>
                <th className="px-4 py-3 whitespace-nowrap">Change Request</th>
                <th className="px-4 py-3 whitespace-nowrap">Submitted</th>
                <th className="px-4 py-3 whitespace-nowrap">Status</th>
                <th className="px-4 py-3 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockCorrections.map((corr) => {
                const isOverdue = corr.age.includes('days') && parseInt(corr.age) > 2;
                return (
                  <tr key={corr.id} className={`hover:bg-gray-50/50 transition-colors ${selectedRows.has(corr.id) ? 'bg-indigo-50/30' : ''}`}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" checked={selectedRows.has(corr.id)} onChange={() => toggleRow(corr.id)} />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Link href={`/hr/corrections/${corr.id}`} className="font-bold text-sm text-indigo-600 hover:text-indigo-700 transition-colors block">{corr.id}</Link>
                      <div className="text-[11px] text-gray-500 mt-1 font-medium bg-gray-100 px-2 py-0.5 rounded-full w-fit">{corr.type}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-xs">{corr.avatar}</div>
                        <div>
                          <Link href={`/hr/employees/${corr.employeeId}`} className="font-semibold text-sm text-gray-900 hover:text-indigo-600 transition-colors">{corr.employeeName}</Link>
                          <div className="text-[11px] text-gray-500 mt-0.5">{corr.employeeId} · {corr.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">For: {corr.attendanceDate}</div>
                      {renderComparison(corr.original, corr.requested, corr.type)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{corr.submitted}</div>
                      <div className={`text-xs font-semibold mt-0.5 flex items-center gap-1 ${isOverdue ? 'text-rose-500' : 'text-gray-500'}`}>
                        {isOverdue && <AlertTriangle size={12} />} {corr.age}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${getStatusBadgeStyle(corr.status)}`}>{corr.status}</span>
                      {corr.priority === 'High' && <span className="ml-2 inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700">HIGH</span>}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <Link href={`/hr/corrections/${corr.id}`} className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 shadow-sm transition-colors inline-block">Review</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      <AssignReviewerModal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} selectedCount={selectedRows.size} />
    </>
  );
}
