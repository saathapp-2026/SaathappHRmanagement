import React from 'react';

export function AttendanceOverviewChart() {
  const segments = [
    { label: 'Present', value: 182, color: 'bg-emerald-500', width: '75.8%' },
    { label: 'Late', value: 14, color: 'bg-amber-500', width: '5.8%' },
    { label: 'On Leave', value: 14, color: 'bg-purple-500', width: '5.8%' },
    { label: 'Absent', value: 12, color: 'bg-rose-500', width: '5%' },
    { label: 'Half Day', value: 5, color: 'bg-orange-500', width: '2%' },
    { label: 'Not Checked In', value: 13, color: 'bg-gray-300', width: '5.6%' },
  ];

  const metrics = [
    { label: 'Attendance Rate', value: '91.4%' },
    { label: 'Average Check-in', value: '9:21 AM' },
    { label: 'Average Working Hours', value: '7h 42m' },
    { label: 'Late Arrival Rate', value: '6.1%' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Today&apos;s Attendance Overview</h3>
      
      <div className="mb-8">
        <div className="w-full h-4 rounded-full flex overflow-hidden mb-4 shadow-inner">
          {segments.map((seg, idx) => (
            <div key={idx} className={`h-full ${seg.color}`} style={{ width: seg.width }} title={`${seg.label}: ${seg.value}`}></div>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {segments.map((seg, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
              <div className={`w-2 h-2 rounded-full ${seg.color}`}></div>
              {seg.label} ({seg.value})
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-auto">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-xs font-medium text-gray-500 mb-1">{metric.label}</p>
            <p className="text-lg font-bold text-gray-900">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
