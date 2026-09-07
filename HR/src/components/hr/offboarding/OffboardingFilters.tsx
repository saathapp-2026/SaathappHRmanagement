'use client';
import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';

interface OffboardingFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function OffboardingFilters({ searchQuery, setSearchQuery }: OffboardingFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex gap-2">
        <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white">
          <Filter className="w-4 h-4" />
          More Filters
        </button>
        <button 
          onClick={() => setSearchQuery('')}
          className="flex items-center justify-center p-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 bg-white"
          title="Reset Filters"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
