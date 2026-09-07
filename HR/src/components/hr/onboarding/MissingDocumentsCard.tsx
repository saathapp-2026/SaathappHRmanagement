import React from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';

export function MissingDocumentsCard() {
  const missing = [
    { name: 'Siddharth Rao', count: 2 },
    { name: 'Arjun Nair', count: 3 },
    { name: 'Meera Srinivasan', count: 1 },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <AlertCircle size={20} className="text-rose-500" />
        <h3 className="font-bold text-gray-900 text-lg">Missing Documents</h3>
      </div>
      <div className="flex-1 space-y-4">
        {missing.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center group cursor-pointer border-b border-gray-50 pb-3 last:border-0 last:pb-0">
            <div>
              <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{item.name}</p>
              <p className="text-xs font-semibold text-rose-500 mt-0.5">{item.count} missing</p>
            </div>
            <button className="text-xs font-semibold text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded transition-colors">Review</button>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1 group">
          View all missing <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
