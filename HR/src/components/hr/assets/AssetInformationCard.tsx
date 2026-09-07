import React from 'react';
import { Asset } from '@/data/hr/assets';

export function AssetInformationCard({ asset }: { asset: Asset }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Asset Information</h3>
        <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">Edit</button>
      </div>
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <span className="text-gray-500 block text-xs font-semibold mb-1">Asset Name</span>
          <span className="font-semibold text-gray-900 text-sm">{asset.name}</span>
        </div>
        <div>
          <span className="text-gray-500 block text-xs font-semibold mb-1">Asset ID</span>
          <span className="font-semibold text-gray-900 text-sm">{asset.assetId}</span>
        </div>
        <div>
          <span className="text-gray-500 block text-xs font-semibold mb-1">Type</span>
          <span className="font-semibold text-gray-900 text-sm">{asset.type}</span>
        </div>
        <div>
          <span className="text-gray-500 block text-xs font-semibold mb-1">Brand</span>
          <span className="font-semibold text-gray-900 text-sm">{asset.brand}</span>
        </div>
        <div>
          <span className="text-gray-500 block text-xs font-semibold mb-1">Model</span>
          <span className="font-semibold text-gray-900 text-sm">{asset.model}</span>
        </div>
        <div>
          <span className="text-gray-500 block text-xs font-semibold mb-1">{asset.type === 'Software License' ? 'Masked Key' : 'Serial Number'}</span>
          <span className="font-mono text-gray-900 text-sm bg-gray-100 px-1.5 py-0.5 rounded">{asset.serialNumber || asset.licenseKeyMasked || 'N/A'}</span>
        </div>
        <div>
          <span className="text-gray-500 block text-xs font-semibold mb-1">Purchase Date</span>
          <span className="font-semibold text-gray-900 text-sm">{asset.purchaseDate || 'N/A'}</span>
        </div>
        <div>
          <span className="text-gray-500 block text-xs font-semibold mb-1">Warranty Expiry</span>
          <span className={`font-semibold text-sm ${asset.warrantyExpiry ? 'text-gray-900' : 'text-gray-400'}`}>{asset.warrantyExpiry || 'N/A'}</span>
        </div>
        <div>
          <span className="text-gray-500 block text-xs font-semibold mb-1">Ownership</span>
          <span className="font-semibold text-gray-900 text-sm">{asset.ownershipType}</span>
        </div>
        <div>
          <span className="text-gray-500 block text-xs font-semibold mb-1">Location</span>
          <span className="font-semibold text-gray-900 text-sm">{asset.location}</span>
        </div>
      </div>
    </div>
  );
}
