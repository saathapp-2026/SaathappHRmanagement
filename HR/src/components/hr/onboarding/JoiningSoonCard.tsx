import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

export function JoiningSoonCard() {
  const joining = [
    { name: 'Siddharth Rao', role: 'Backend Engineer', date: '09 Sep', progress: 75 },
    { name: 'Meera Srinivasan', role: 'Product Designer', date: '12 Sep', progress: 90 },
    { name: 'Arjun Nair', role: 'Operations Executive', date: '15 Sep', progress: 40 },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Calendar size={20} className="text-blue-500" />
        <h3 className="font-bold text-gray-900 text-lg">Joining This Week</h3>
      </div>
      <div className="flex-1 space-y-4">
        {joining.map((item, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className="flex justify-between items-start mb-1.5">
              <div>
                <h4 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{item.name}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{item.role}</p>
              </div>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded">{item.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${item.progress}%` }}></div>
              </div>
              <span className="text-[10px] font-bold text-gray-400 w-12 text-right">{item.progress}% ready</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1 group">
          View all joining <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
