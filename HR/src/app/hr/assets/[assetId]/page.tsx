'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { mockAssets } from '@/data/hr/assets';

import { AssetDetailHeader } from '@/components/hr/assets/AssetDetailHeader';
import { AssetInformationCard } from '@/components/hr/assets/AssetInformationCard';
import { AssetAssignmentCard } from '@/components/hr/assets/AssetAssignmentCard';
import { AssetHistory } from '@/components/hr/assets/AssetHistory';

export default function AssetDetailPage() {
  const params = useParams();
  const assetId = params?.assetId as string;
  const asset = mockAssets.find(a => a.assetId === assetId);

  if (!asset) return <div className="p-8 text-center text-gray-500">Asset not found.</div>;

  return (
    <div className="pb-12 bg-slate-50/30 min-h-screen -mx-6 -my-6">
      <AssetDetailHeader asset={asset} />
      
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <AssetInformationCard asset={asset} />
              
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Notes & Attachments</h3>
                <textarea 
                  className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors resize-y" 
                  rows={4} 
                  placeholder="Add administrative notes about this asset..."
                  defaultValue={asset.notes || ''}
                />
                <div className="flex justify-between items-center mt-3">
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">Attach Document / Invoice</button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg text-sm hover:bg-gray-200 transition-colors">Save Notes</button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1 space-y-6">
              <AssetAssignmentCard asset={asset} />
              <AssetHistory history={asset.history} assignmentHistory={asset.assignmentHistory} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
