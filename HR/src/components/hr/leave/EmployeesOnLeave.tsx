import React from 'react';

export function EmployeesOnLeave() {
  const onLeaveData = [
    { name: 'Rahul Mehta', department: 'Engineering', type: 'Sick Leave', from: '06 Sep', to: '08 Sep', return: '09 Sep', remaining: '1 day', manager: 'Vikram Sharma', status: 'On Leave' },
    { name: 'Aditi Jain', department: 'Design', type: 'Casual Leave', from: '05 Sep', to: '09 Sep', return: '10 Sep', remaining: '2 days', manager: 'Priya Sharma', status: 'On Leave' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center text-center">
          <p className="text-xs font-semibold text-gray-500 mb-1">On Leave Today</p>
          <p className="text-xl font-bold text-indigo-600">14</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center text-center">
          <p className="text-xs font-semibold text-gray-500 mb-1">Returning Tomorrow</p>
          <p className="text-xl font-bold text-emerald-600">5</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center text-center">
          <p className="text-xs font-semibold text-gray-500 mb-1">Long Leave</p>
          <p className="text-xl font-bold text-amber-600">3</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center text-center">
          <p className="text-xs font-semibold text-gray-500 mb-1">Departments Affected</p>
          <p className="text-xl font-bold text-gray-900">6</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-3 whitespace-nowrap">Employee</th>
                <th className="px-4 py-3 whitespace-nowrap">Department</th>
                <th className="px-4 py-3 whitespace-nowrap">Leave Type</th>
                <th className="px-4 py-3 whitespace-nowrap">Dates</th>
                <th className="px-4 py-3 whitespace-nowrap">Returning</th>
                <th className="px-4 py-3 whitespace-nowrap">Manager</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {onLeaveData.map((emp, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap font-semibold text-sm text-gray-900">{emp.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{emp.department}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{emp.type}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{emp.from} → {emp.to}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm font-bold text-emerald-600">{emp.return}</span>
                    <span className="text-xs text-gray-400 ml-2">({emp.remaining})</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{emp.manager}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
