import React from 'react';
import Link from 'next/link';
import { ArrowLeft, MoreHorizontal, UserPlus, RefreshCw, RotateCcw } from 'lucide-react';
import { Asset, getConditionColor, getStatusColor } from '@/data/hr/assets';

export function AssetDetailHeader({ asset }: { asset: Asset }) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-20 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex items-center gap-4">
        <Link href="/hr/assets" className="p-2 -ml-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl font-bold text-gray-900 leading-tight">{asset.name}</h1>
            <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded tracking-wider">{asset.assetId}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(asset.status)}`}>
              {asset.status}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded uppercase tracking-wider">{asset.type}</span>
            <span className="text-gray-300">•</span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getConditionColor(asset.condition)}`}>
              {asset.condition}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
        {asset.status === 'Available' && (
          <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors shadow-sm whitespace-nowrap">
            <UserPlus size={16} /> Assign
          </button>
        )}
        {asset.status === 'Assigned' && (
          <>
            <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors shadow-sm whitespace-nowrap">
              <RefreshCw size={16} /> Transfer
            </button>
            <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-amber-700 hover:bg-amber-50 rounded-lg text-sm font-medium transition-colors shadow-sm whitespace-nowrap">
              <RotateCcw size={16} /> Mark for Return
            </button>
          </>
        )}
        {asset.status === 'Return Pending' && (
          <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors shadow-sm whitespace-nowrap">
            <CheckCircle size={16} /> Mark Returned
          </button>
        )}
        <button className="flex items-center justify-center p-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors shadow-sm">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}

// Just adding CheckCircle since I used it above
import { CheckCircle } from 'lucide-react';
