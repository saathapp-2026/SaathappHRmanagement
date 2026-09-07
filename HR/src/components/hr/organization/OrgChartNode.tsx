import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { OrgNode } from '@/data/hr/organization';

export function OrgChartNode({ node, onNodeClick, isExpandedAll }: { node: OrgNode, onNodeClick: (node: OrgNode) => void, isExpandedAll: boolean }) {
  const [isExpandedLocal, setIsExpandedLocal] = useState(true);
  
  const isExpanded = isExpandedAll || isExpandedLocal;
  const hasChildren = node.directReports && node.directReports.length > 0;

  return (
    <div className="flex flex-col items-center">
      <div 
        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer min-w-[200px] max-w-[240px] text-center relative group"
        onClick={() => onNodeClick(node)}
      >
        <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 mx-auto flex items-center justify-center font-bold text-lg mb-3">
          {node.avatar}
        </div>
        <h3 className="font-bold text-gray-900 text-sm truncate px-2">{node.name}</h3>
        <p className="text-xs text-indigo-600 font-semibold truncate px-2 mt-0.5">{node.designation}</p>
        <p className="text-[10px] text-gray-500 font-medium truncate px-2 mt-1 uppercase tracking-wider">{node.department}</p>
        
        {hasChildren && (
          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center px-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{node.directReports!.length} Reports</span>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsExpandedLocal(!isExpandedLocal); }}
              className="w-6 h-6 rounded bg-gray-50 hover:bg-indigo-50 text-gray-500 hover:text-indigo-600 flex items-center justify-center transition-colors border border-gray-100 hover:border-indigo-200"
            >
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="flex flex-col items-center mt-6 relative">
          <div className="w-px h-6 bg-gray-300 absolute -top-6"></div>
          <div className="flex justify-center gap-6 relative">
            <div className="absolute top-0 left-[calc(50%-1px)] w-full h-px bg-transparent">
               {/* Horizontal connecting line logic done via wrapping div borders */}
            </div>
            
            {node.directReports!.length > 1 && (
               <div className="absolute top-0 h-px bg-gray-300" style={{ left: 'calc(100px + 12px)', right: 'calc(100px + 12px)' }}></div>
            )}
            
            {node.directReports!.map((child, idx) => (
              <div key={child.id} className="relative pt-6">
                <div className="absolute top-0 left-1/2 w-px h-6 bg-gray-300 -translate-x-1/2"></div>
                <OrgChartNode node={child} onNodeClick={onNodeClick} isExpandedAll={isExpandedAll} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
