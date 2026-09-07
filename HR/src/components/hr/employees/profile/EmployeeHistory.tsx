import React from 'react';
import { UserPlus, Briefcase, TrendingUp, Filter } from 'lucide-react';

export function EmployeeHistory() {
  const events = [
    {
      date: '01 Apr 2027',
      title: 'Salary Revision',
      oldValue: '₹8.4 LPA',
      newValue: '₹9.2 LPA',
      changedBy: 'Priya Sharma · HR',
      icon: TrendingUp,
      iconColor: 'bg-indigo-100 text-indigo-600',
    },
    {
      date: '15 Jan 2027',
      title: 'Designation Updated',
      oldValue: 'Software Developer',
      newValue: 'Senior Software Developer',
      changedBy: 'Priya Sharma · HR',
      icon: Briefcase,
      iconColor: 'bg-blue-100 text-blue-600',
    },
    {
      date: '01 Aug 2026',
      title: 'Employee Joined',
      oldValue: null,
      newValue: 'Software Developer, Engineering, Bengaluru',
      changedBy: 'System',
      icon: UserPlus,
      iconColor: 'bg-emerald-100 text-emerald-600',
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Employee History</h3>
        <button className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
          <Filter size={14} /> Filter Events
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-4 bottom-4 w-px bg-gray-200"></div>
        <div className="space-y-8 relative z-10 pl-2">
          {events.map((event, idx) => (
            <div key={idx} className="flex items-start gap-6 group">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-white shadow-sm ${event.iconColor} z-10 relative`}>
                <event.icon size={16} />
              </div>
              <div className="pt-1.5 flex-1 bg-gray-50 rounded-xl p-4 border border-gray-100 group-hover:border-gray-200 group-hover:shadow-sm transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-bold text-gray-900">{event.title}</h4>
                  <span className="text-xs font-semibold text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">{event.date}</span>
                </div>
                
                <div className="mt-3 flex items-center gap-3 text-sm">
                  {event.oldValue && (
                    <>
                      <span className="text-gray-500 line-through">{event.oldValue}</span>
                      <span className="text-gray-300">→</span>
                    </>
                  )}
                  <span className="text-gray-900 font-medium">{event.newValue}</span>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-200/60 text-xs text-gray-400 font-medium">
                  Changed by: <span className="text-gray-500">{event.changedBy}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
