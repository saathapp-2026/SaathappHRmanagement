import React from 'react';

export function EmployeeLeaveBalances() {
  const balances = [
    { name: 'Casual Leave', alloc: 12, used: 2, pend: 2, rem: 8, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100' },
    { name: 'Sick Leave', alloc: 10, used: 4, pend: 0, rem: 6, color: 'text-rose-600', bg: 'bg-rose-50 border-rose-100' },
    { name: 'Earned Leave', alloc: 18, used: 6, pend: 0, rem: 12, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
    { name: 'Comp Off', alloc: 2, used: 1, pend: 0, rem: 1, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
    { name: 'Unpaid', alloc: 0, used: 0, pend: 0, rem: 0, color: 'text-gray-600', bg: 'bg-gray-50 border-gray-100' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {balances.map((b, idx) => (
        <div key={idx} className={`p-4 rounded-xl border shadow-sm ${b.bg}`}>
          <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${b.color}`}>{b.name}</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600 font-medium">Allocated</span>
              <span className="font-bold text-gray-900">{b.alloc}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600 font-medium">Used</span>
              <span className="font-bold text-gray-900">{b.used}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600 font-medium">Pending</span>
              <span className="font-bold text-gray-900">{b.pend}</span>
            </div>
            <div className="pt-2 border-t border-black/5 flex justify-between items-center">
              <span className="text-xs font-bold text-gray-900 uppercase">Remaining</span>
              <span className={`text-lg font-bold ${b.color}`}>{b.rem}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
