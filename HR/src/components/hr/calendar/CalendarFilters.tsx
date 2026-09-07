import React from 'react';
import { Search, Filter } from 'lucide-react';

export function CalendarFilters({ activeFilter, setActiveFilter }: { activeFilter: string, setActiveFilter: (f: string) => void }) {
  const quickFilters = ['All', 'Leave', 'Holidays', 'Celebrations', 'HR Events', 'Meetings'];

  return (
    <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 bg-white p-3 border border-gray-200 rounded-xl shadow-sm mb-6">
      <div className="flex overflow-x-auto no-scrollbar space-x-2 w-full xl:w-auto">
        {quickFilters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
              activeFilter === f 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full xl:w-auto border-t border-gray-100 xl:border-0 pt-3 xl:pt-0">
        <div className="relative flex-1 sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search events, employees, holidays..." 
            className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">
          <Filter size={16} />
          <span>Filters</span>
        </button>
      </div>
    </div>
  );
}
