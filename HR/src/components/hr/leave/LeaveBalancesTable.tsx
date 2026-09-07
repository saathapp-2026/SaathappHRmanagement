import React from 'react';
import Link from 'next/link';
import { Settings } from 'lucide-react';

export function LeaveBalancesTable() {
  const balances = [
    { id: 'EMP001', name: 'Anjali Rao', cl: '8 / 12', sl: '6 / 10', el: '12 / 18', comp: '0 / 0', unpaid: '0', updated: '07 Sep 2026' },
    { id: 'EMP002', name: 'Rahul Mehta', cl: '4 / 12', sl: '2 / 10', el: '15 / 18', comp: '1 / 2', unpaid: '0', updated: '06 Sep 2026' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-4 py-3 whitespace-nowrap">Employee</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">Casual (Rem/All)</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">Sick (Rem/All)</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">Earned (Rem/All)</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">Comp Off</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">Unpaid</th>
              <th className="px-4 py-3 whitespace-nowrap">Last Updated</th>
              <th className="px-4 py-3 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {balances.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap">
                  <Link href={`/hr/leave/employee/${b.id}`} className="font-semibold text-sm text-gray-900 hover:text-indigo-600 transition-colors">{b.name}</Link>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium text-gray-900">{b.cl}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium text-gray-900">{b.sl}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium text-gray-900">{b.el}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium text-gray-900">{b.comp}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium text-gray-900">{b.unpaid}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{b.updated}</td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <Link href={`/hr/leave/employee/${b.id}`} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors inline-block"><Settings size={16}/></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
