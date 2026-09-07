import React from 'react';
import { Search, Filter } from 'lucide-react';

export function AttendanceFilters() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-2 border border-gray-200 rounded-xl shadow-sm mb-6">
      <div className="flex-1 w-full sm:max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search by name or ID..." 
          className="w-full pl-10 pr-4 py-2 bg-transparent text-sm focus:outline-none"
        />
      </div>
      
      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto px-2 pb-2 sm:p-0 border-t border-gray-100 sm:border-0 pt-2 sm:pt-0">
        <input type="date" className="px-3 py-1.5 bg-gray-50 border border-transparent rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" defaultValue="2026-09-05" />
        
        <select className="px-3 py-1.5 bg-gray-50 border border-transparent rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_16px] pr-10" style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }}>
          <option value="">Department</option>
          <option>Engineering</option>
          <option>Design</option>
          <option>Operations</option>
        </select>

        <select className="px-3 py-1.5 bg-gray-50 border border-transparent rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_16px] pr-10 hidden md:block" style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }}>
          <option value="">Location</option>
          <option>Bengaluru HQ</option>
          <option>Remote</option>
        </select>
        
        <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">
          <Filter size={16} />
          <span className="hidden sm:inline">Filters</span>
        </button>
      </div>
    </div>
  );
}
