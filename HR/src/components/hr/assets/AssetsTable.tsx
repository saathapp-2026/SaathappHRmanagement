import React from 'react';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { Asset, getConditionColor, getStatusColor } from '@/data/hr/assets';

export function AssetsTable({ assets }: { assets: Asset[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-4 py-3 whitespace-nowrap">Asset</th>
              <th className="px-4 py-3 whitespace-nowrap">Asset ID</th>
              <th className="px-4 py-3 whitespace-nowrap">Type</th>
              <th className="px-4 py-3 whitespace-nowrap">Assigned To</th>
              <th className="px-4 py-3 whitespace-nowrap">Location</th>
              <th className="px-4 py-3 whitespace-nowrap">Assigned Date</th>
              <th className="px-4 py-3 whitespace-nowrap">Condition</th>
              <th className="px-4 py-3 whitespace-nowrap">Status</th>
              <th className="px-4 py-3 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {assets.map((asset) => (
              <tr key={asset.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-sm font-bold text-gray-900">{asset.name}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase tracking-wider">{asset.assetId}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded uppercase tracking-wider">{asset.type}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {asset.assignedTo ? (
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-sm">{asset.assignedTo}</span>
                      <span className="text-xs text-gray-500">{asset.assignedEmployeeId}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400 font-medium">—</span>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                  {asset.location}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                  {asset.assignedDate || '—'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getConditionColor(asset.condition)}`}>
                    {asset.condition}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(asset.status)}`}>
                    {asset.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <Link href={`/hr/assets/${asset.assetId}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 rounded-lg text-sm font-semibold transition-colors shadow-sm">
                    <Eye size={14} /> View
                  </Link>
                </td>
              </tr>
            ))}
            {assets.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-sm text-gray-500">
                  No assets match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
