import React from 'react';
import Link from 'next/link';
import { Eye, ShieldAlert } from 'lucide-react';
import { ConcernCase, getPriorityColor, getStatusColor } from '@/data/hr/concerns';

export function ConcernTable({ concerns }: { concerns: ConcernCase[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-4 py-3 whitespace-nowrap w-10">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              </th>
              <th className="px-4 py-3 whitespace-nowrap">Case</th>
              <th className="px-4 py-3 whitespace-nowrap">Employee</th>
              <th className="px-4 py-3 whitespace-nowrap">Category & Subject</th>
              <th className="px-4 py-3 whitespace-nowrap">Priority</th>
              <th className="px-4 py-3 whitespace-nowrap">Assigned To</th>
              <th className="px-4 py-3 whitespace-nowrap">Age</th>
              <th className="px-4 py-3 whitespace-nowrap">Status</th>
              <th className="px-4 py-3 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {concerns.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-4 py-3 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded tracking-wider">{c.id}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-sm">{c.employeeName}</span>
                    <span className="text-xs text-gray-500">{c.employeeId}</span>
                  </div>
                </td>
                <td className="px-4 py-3 min-w-[200px] max-w-[300px]">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded uppercase tracking-wider">{c.category}</span>
                      {c.category === 'Harassment' && <span title="Highly Confidential"><ShieldAlert size={12} className="text-rose-500" /></span>}
                    </div>
                    <span className="text-sm text-gray-700 font-medium truncate" title={c.subject}>{c.subject}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border ${getPriorityColor(c.priority)}`}>
                    {c.priority}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 font-medium">
                  {c.assignedTo || <span className="text-gray-400 italic">Unassigned</span>}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">{c.ageText}</span>
                    <span className="text-xs text-gray-500">{c.submittedAt.split(' · ')[0]}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(c.status)}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <Link href={`/hr/concerns/${c.id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 rounded-lg text-sm font-semibold transition-colors shadow-sm">
                    <Eye size={14} /> Review
                  </Link>
                </td>
              </tr>
            ))}
            
            {concerns.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-sm text-gray-500">
                  No open concerns match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
