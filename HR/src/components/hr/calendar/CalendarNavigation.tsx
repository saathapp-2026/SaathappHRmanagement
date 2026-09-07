import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function CalendarNavigation({ view, setView }: { view: string, setView: (v: string) => void }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2">
        <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"><ChevronLeft size={20}/></button>
        <button className="px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded transition-colors border border-gray-200">Today</button>
        <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"><ChevronRight size={20}/></button>
        <h2 className="ml-2 text-lg font-bold text-gray-900 min-w-[140px]">September 2026</h2>
      </div>
      
      <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
        {['Month', 'Week', 'List'].map(v => (
          <button 
            key={v}
            onClick={() => setView(v)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${view === v ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
