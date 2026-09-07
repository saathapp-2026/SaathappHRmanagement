import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

export function UpcomingEvents() {
  const events = [
    { day: '09', month: 'SEP', title: 'New Employee Joining', desc: 'Siddharth Rao' },
    { day: '14', month: 'SEP', title: 'Company Holiday', desc: 'Ganesh Chaturthi' },
    { day: '20', month: 'SEP', title: 'Monthly HR Check-in', desc: 'Bengaluru Office' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-6">
        <Calendar size={20} className="text-gray-900" />
        <h3 className="font-bold text-gray-900 text-lg">Upcoming</h3>
      </div>
      
      <div className="space-y-4">
        {events.map((evt, idx) => (
          <div key={idx} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group border border-transparent hover:border-gray-100">
            <div className="flex flex-col items-center justify-center bg-indigo-50 text-indigo-700 rounded-lg w-12 h-12 flex-shrink-0">
              <span className="text-lg font-bold leading-none">{evt.day}</span>
              <span className="text-[10px] font-bold tracking-wider mt-0.5">{evt.month}</span>
            </div>
            <div className="pt-0.5">
              <h4 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{evt.title}</h4>
              <p className="text-xs text-gray-500 mt-1 font-medium">{evt.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="w-full py-2 text-sm text-indigo-600 font-semibold hover:bg-indigo-50 rounded-lg transition-colors flex items-center justify-center gap-1 group">
          View calendar <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
