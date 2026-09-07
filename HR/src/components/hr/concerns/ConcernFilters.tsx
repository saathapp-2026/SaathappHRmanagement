import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';

export function ConcernFilters() {
  return (
    <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 bg-white p-3 border border-gray-200 rounded-xl shadow-sm mb-6">
      <div className="relative flex-1 w-full xl:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input 
          type="text" 
          placeholder="Search by Employee Name, ID, Case ID, Subject..." 
          className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      
      <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto">
        <select className="px-3 py-1.5 bg-gray-50 border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 font-medium">
          <option>Category</option>
          <option>Manager</option>
          <option>Workplace</option>
          <option>Salary</option>
          <option>Harassment</option>
        </select>
        <select className="px-3 py-1.5 bg-gray-50 border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 font-medium">
          <option>Priority</option>
          <option>High / Urgent</option>
          <option>Normal / Low</option>
        </select>
        <select className="px-3 py-1.5 bg-gray-50 border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 font-medium">
          <option>Assigned HR</option>
          <option>Unassigned</option>
          <option>Priya Sharma</option>
          <option>Rahul HR</option>
        </select>
        
        <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block"></div>
        
        <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">
          <Filter size={16} />
          <span className="hidden sm:inline">More Filters</span>
        </button>
        <button className="flex items-center justify-center p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-700 rounded-lg transition-colors tooltip-trigger" title="Reset Filters">
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
