import React from 'react';

export function LeaveDateBreakdown() {
  const dates = [
    { date: '10 Sep', day: 'Thursday', status: 'Leave', type: 'working' },
    { date: '11 Sep', day: 'Friday', status: 'Leave', type: 'working' },
    { date: '12 Sep', day: 'Saturday', status: 'Weekly Off', type: 'off' },
    { date: '13 Sep', day: 'Sunday', status: 'Weekly Off', type: 'off' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Date Breakdown</h3>
      <div className="space-y-3">
        {dates.map((d, idx) => (
          <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0 last:pb-0">
            <div>
              <p className={`text-sm font-bold ${d.type === 'working' ? 'text-gray-900' : 'text-gray-400'}`}>{d.date}</p>
              <p className={`text-xs ${d.type === 'working' ? 'text-gray-500' : 'text-gray-400'}`}>{d.day}</p>
            </div>
            <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${d.type === 'working' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-gray-100 text-gray-500 border border-gray-200'}`}>
              {d.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
