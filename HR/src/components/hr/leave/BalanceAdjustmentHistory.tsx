import React from 'react';
import { History } from 'lucide-react';

export function BalanceAdjustmentHistory() {
  const history = [
    { date: '05 Sep 2026', type: 'Casual Leave', change: '+1', prev: '7', next: '8', reason: 'Manual Correction', by: 'Priya Sharma' },
    { date: '15 Jan 2026', type: 'Earned Leave', change: '+18', prev: '0', next: '18', reason: 'Annual Allocation', by: 'System' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-6">
      <div className="p-5 border-b border-gray-100 flex items-center gap-2">
        <History size={18} className="text-gray-400" />
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Adjustment History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-4 py-3 whitespace-nowrap">Date</th>
              <th className="px-4 py-3 whitespace-nowrap">Leave Type</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">Change</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">Previous</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">New</th>
              <th className="px-4 py-3 whitespace-nowrap">Reason</th>
              <th className="px-4 py-3 whitespace-nowrap">Changed By</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {history.map((h, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors text-sm">
                <td className="px-4 py-3 whitespace-nowrap text-gray-900 font-medium">{h.date}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-900 font-medium">{h.type}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center font-bold text-emerald-600">{h.change}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-gray-500">{h.prev}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center font-bold text-gray-900">{h.next}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">{h.reason}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">{h.by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
