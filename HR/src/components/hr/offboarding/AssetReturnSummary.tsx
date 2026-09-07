'use client';
import React from 'react';
import { Laptop } from 'lucide-react';
import { AssignedAsset } from '@/data/hr/offboarding';

export function AssetReturnSummary({ assets }: { assets: AssignedAsset[] }) {
  if (!assets || assets.length === 0) return null;

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Laptop className="w-4 h-4 text-gray-500" />
        <h3 className="font-semibold text-gray-900 text-sm">Assigned Assets</h3>
      </div>
      
      <div className="space-y-3">
        {assets.map(asset => (
          <div key={asset.id} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{asset.name}</p>
              <p className="text-xs text-gray-500">{asset.assetId}</p>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
              asset.status === 'Returned' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {asset.status}
            </span>
          </div>
        ))}
      </div>
      <div className="pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-500 italic text-center">Asset returns are managed via the Assets module.</p>
      </div>
    </div>
  );
}
