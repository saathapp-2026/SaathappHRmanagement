import React from 'react';
import { Check, Upload, Clock, ArrowRight } from 'lucide-react';

export function RecentActivity() {
  const activities = [
    { text: <>Leave approved for <span className="font-bold text-gray-900">Neha Gupta</span></>, time: '10 min ago', icon: Check, color: 'text-emerald-500 bg-emerald-50' },
    { text: <><span className="font-bold text-gray-900">Amit Kumar</span> completed onboarding</>, time: '35 min ago', icon: Check, color: 'text-emerald-500 bg-emerald-50' },
    { text: <><span className="font-bold text-gray-900">Riya Sharma</span> uploaded Aadhaar document</>, time: '1 hr ago', icon: Upload, color: 'text-blue-500 bg-blue-50' },
    { text: <>Attendance correction submitted by <span className="font-bold text-gray-900">Rahul Mehta</span></>, time: '2 hr ago', icon: Clock, color: 'text-indigo-500 bg-indigo-50' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <h3 className="font-bold text-gray-900 text-lg mb-6">Recent HR Activity</h3>
      
      <div className="flex-1 relative">
        <div className="absolute left-4 top-4 bottom-4 w-px bg-gray-100"></div>
        <div className="space-y-6 relative z-10">
          {activities.map((act, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-white ${act.color}`}>
                <act.icon size={14} />
              </div>
              <div className="pt-1.5">
                <p className="text-sm text-gray-600">{act.text}</p>
                <p className="text-xs text-gray-400 mt-1 font-medium">{act.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1 group">
          View all activity <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
