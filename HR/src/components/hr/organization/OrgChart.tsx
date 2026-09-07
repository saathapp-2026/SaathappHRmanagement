import React, { useState } from 'react';
import { mockOrgChart, OrgNode } from '@/data/hr/organization';
import { OrgChartNode } from './OrgChartNode';
import { OrgChartControls } from './OrgChartControls';
import { Search, Filter } from 'lucide-react';

export function OrgChart({ onNodeClick }: { onNodeClick: (node: OrgNode) => void }) {
  const [zoom, setZoom] = useState(1);
  const [isExpandedAll, setIsExpandedAll] = useState(true);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[700px] relative">
      <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0 z-10 relative">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Organization Chart</h2>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-700 uppercase tracking-wider">Interactive</span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search employee or manager..." 
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
          </div>
          <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors shadow-sm">
            <Filter size={16} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-slate-50/50 p-12 relative org-scroll-container">
        <div 
          className="min-w-fit flex justify-center origin-top transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
        >
          <OrgChartNode node={mockOrgChart} onNodeClick={onNodeClick} isExpandedAll={isExpandedAll} />
        </div>
      </div>

      <OrgChartControls zoom={zoom} setZoom={setZoom} isExpandedAll={isExpandedAll} setIsExpandedAll={setIsExpandedAll} />
    </div>
  );
}
