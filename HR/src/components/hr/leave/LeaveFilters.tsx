import React from 'react';
import { Search, Filter } from 'lucide-react';

export function LeaveFilters() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-2 border border-gray-200 rounded-xl shadow-sm mb-6">
      <div className="flex-1 w-full sm:max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search Employee..." 
          className="w-full pl-10 pr-4 py-2 bg-transparent text-sm focus:outline-none"
        />
      </div>
      
      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto px-2 pb-2 sm:p-0 border-t border-gray-100 sm:border-0 pt-2 sm:pt-0">
        <select className="px-3 py-1.5 bg-gray-50 border border-transparent rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_16px] pr-10">
          <option value="">Department</option>
          <option>Engineering</option>
        </select>
        <select className="px-3 py-1.5 bg-gray-50 border border-transparent rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_16px] pr-10 hidden sm:block">
          <option value="">Leave Type</option>
          <option>Casual Leave</option>
          <option>Sick Leave</option>
        </select>
        <input type="date" className="px-3 py-1.5 bg-gray-50 border border-transparent rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 hidden md:block" />
        
        <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">
          <Filter size={16} />
          <span className="hidden sm:inline">More</span>
        </button>
      </div>
    </div>
  );
}
