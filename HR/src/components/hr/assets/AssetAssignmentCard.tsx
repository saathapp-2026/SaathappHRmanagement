import React from 'react';
import Link from 'next/link';
import { ExternalLink, AlertTriangle } from 'lucide-react';
import { Asset } from '@/data/hr/assets';

export function AssetAssignmentCard({ asset }: { asset: Asset }) {
  if (asset.status === 'Available' || asset.status === 'Retired' || asset.status === 'Lost') {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 mb-6 text-center">
        <p className="text-sm text-gray-500">This asset is currently {asset.status.toLowerCase()} and has no active assignment.</p>
        {asset.status === 'Available' && (
          <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium shadow-sm transition-colors">Assign Asset</button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Current Assignment</h3>
        {asset.status === 'Return Pending' && (
          <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded uppercase flex items-center gap-1"><AlertTriangle size={12}/> Return Pending</span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">{asset.assignedTo}</h2>
            <p className="text-sm font-semibold text-gray-500">{asset.assignedEmployeeId}</p>
          </div>
          <Link href={`/hr/assets/employee/${asset.assignedEmployeeId}`} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Employee Assets">
            <ExternalLink size={18} />
          </Link>
        </div>
        
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3 text-sm">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500">Assigned Date</span>
            <span className="font-semibold text-gray-900">{asset.assignedDate}</span>
          </div>
          {asset.returnRequestedDate && (
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Requested Return</span>
              <span className="font-bold text-amber-700">{asset.returnRequestedDate}</span>
            </div>
          )}
          {asset.returnReason && (
            <div className="flex justify-between">
              <span className="text-gray-500">Return Reason</span>
              <span className="font-semibold text-gray-900">{asset.returnReason}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
