import React from 'react';
import Link from 'next/link';
import { ArrowLeft, MoreHorizontal, CheckCircle, HelpCircle, UserPlus } from 'lucide-react';
import { ConcernCase, getPriorityColor, getStatusColor } from '@/data/hr/concerns';

export function ConcernDetailHeader({ 
  caseData, 
  onAssign, 
  onRequestInfo, 
  onResolve, 
  onMoreActions 
}: { 
  caseData: ConcernCase, 
  onAssign: () => void, 
  onRequestInfo: () => void, 
  onResolve: () => void, 
  onMoreActions: () => void 
}) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-20 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex items-center gap-4">
        <Link href="/hr/concerns" className="p-2 -ml-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl font-bold text-gray-900 leading-tight">Employee Concern</h1>
            <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded tracking-wider">{caseData.id}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(caseData.status)}`}>
              {caseData.status}
            </span>
            <span className="text-gray-300">•</span>
            <span className={`inline-flex px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border ${getPriorityColor(caseData.priority)}`}>
              {caseData.priority}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded uppercase tracking-wider">{caseData.category}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
        <button onClick={onAssign} className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors shadow-sm whitespace-nowrap">
          <UserPlus size={16} /> Assign
        </button>
        <button onClick={onRequestInfo} className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors shadow-sm whitespace-nowrap">
          <HelpCircle size={16} /> Request Info
        </button>
        <button onClick={onResolve} className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors shadow-sm whitespace-nowrap">
          <CheckCircle size={16} /> Resolve Case
        </button>
        <button onClick={onMoreActions} className="flex items-center justify-center p-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors shadow-sm">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}
