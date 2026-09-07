import React from 'react';
import Link from 'next/link';
import { Eye, Clock } from 'lucide-react';
import { HelpRequest, getHelpPriorityColor, getHelpStatusColor, getSlaColor } from '@/data/hr/help';

export function HelpTable({ requests }: { requests: HelpRequest[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-4 py-3 whitespace-nowrap">Ticket</th>
              <th className="px-4 py-3 whitespace-nowrap">Employee</th>
              <th className="px-4 py-3 whitespace-nowrap">Category & Subject</th>
              <th className="px-4 py-3 whitespace-nowrap">Priority</th>
              <th className="px-4 py-3 whitespace-nowrap">SLA / Age</th>
              <th className="px-4 py-3 whitespace-nowrap">Status</th>
              <th className="px-4 py-3 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {requests.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded tracking-wider">{r.id}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-sm">{r.employeeName}</span>
                    <span className="text-xs text-gray-500">{r.employeeId}</span>
                  </div>
                </td>
                <td className="px-4 py-3 min-w-[200px] max-w-[300px]">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded uppercase tracking-wider w-fit">{r.category}</span>
                    <span className="text-sm text-gray-700 font-medium truncate" title={r.subject}>{r.subject}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border ${getHelpPriorityColor(r.priority)}`}>
                    {r.priority}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex flex-col items-start gap-1">
                    <span className={`text-[10px] uppercase tracking-wider flex items-center gap-1 ${getSlaColor(r.slaStatus)}`}><Clock size={10}/> {r.slaStatus}</span>
                    <span className="text-xs font-semibold text-gray-900">{r.ageText}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getHelpStatusColor(r.status)}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <Link href={`/hr/help/${r.id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 rounded-lg text-sm font-semibold transition-colors shadow-sm">
                    <Eye size={14} /> Review
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
