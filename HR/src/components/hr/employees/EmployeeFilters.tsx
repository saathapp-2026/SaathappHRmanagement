import React from 'react';
import { Search, Filter, Download } from 'lucide-react';

export function EmployeeFilters() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex-1 w-full sm:max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search employees by name, role, or email..." 
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
        />
      </div>
      
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <select className="px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_16px] pr-10" style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }}>
          <option value="">All Departments</option>
          <option value="engineering">Engineering</option>
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
          <option value="hr">HR</option>
          <option value="operations">Operations</option>
        </select>
        
        <select className="px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_16px] pr-10" style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }}>
          <option value="">Status: All</option>
          <option value="active">Active</option>
          <option value="on-leave">On Leave</option>
          <option value="notice-period">Notice Period</option>
        </select>

        <button className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium shadow-sm transition-colors">
          <Filter size={16} />
          <span className="hidden sm:inline">More Filters</span>
        </button>

        <button className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium shadow-sm transition-colors">
          <Download size={16} />
        </button>
      </div>
    </div>
  );
}
