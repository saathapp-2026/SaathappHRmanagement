import React from 'react';
import { Search, Filter, X } from 'lucide-react';

interface ProbationFiltersProps {
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  // Add other filter props if needed
}

export function ProbationFilters({ searchTerm, setSearchTerm }: ProbationFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search by name, ID, manager or designation..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Department</option>
          <option value="Engineering">Engineering</option>
          <option value="HR">HR</option>
          <option value="Operations">Operations</option>
          <option value="Marketing">Marketing</option>
        </select>
        
        <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="">Location</option>
          <option value="Bengaluru HQ">Bengaluru HQ</option>
          <option value="Mumbai Branch">Mumbai Branch</option>
          <option value="Delhi Branch">Delhi Branch</option>
        </select>

        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors">
          <Filter size={16} />
          More Filters
        </button>
      </div>
    </div>
  );
}
