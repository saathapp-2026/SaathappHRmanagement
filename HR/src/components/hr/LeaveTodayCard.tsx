import React from 'react';
import { ArrowRight } from 'lucide-react';

export function LeaveTodayCard() {
  const employees = [
    { name: 'Priya Nair', dept: 'Design', type: 'Casual Leave', dates: 'Sep 7', initials: 'PN', color: 'bg-blue-100 text-blue-700' },
    { name: 'Amit Kumar', dept: 'Engineering', type: 'Sick Leave', dates: 'Sep 7–8', initials: 'AK', color: 'bg-rose-100 text-rose-700' },
    { name: 'Sneha Rao', dept: 'Operations', type: 'Earned Leave', dates: 'Sep 6–9', initials: 'SR', color: 'bg-amber-100 text-amber-700' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <h3 className="font-bold text-gray-900 text-lg mb-6">On Leave Today</h3>
      
      <div className="flex-1 space-y-4">
        {employees.map((emp, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${emp.color}`}>
              {emp.initials}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-bold text-gray-900">{emp.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{emp.dept}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-gray-700">{emp.type}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{emp.dates}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1 group">
          View all 14 employees <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
