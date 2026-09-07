'use client';
import React, { useState } from 'react';
import { Plus, Download, Search, RotateCcw } from 'lucide-react';
import { mockAssets } from '@/data/hr/assets';

import { AssetsTable } from '@/components/hr/assets/AssetsTable';
import { AssetStats } from '@/components/hr/assets/AssetStats';
import { AssetAttentionCard } from '@/components/hr/assets/AssetAttentionCard';

export default function AssetsPage() {
  const [activeTab, setActiveTab] = useState('All Assets');

  const filteredAssets = activeTab === 'All Assets' 
    ? mockAssets 
    : mockAssets.filter(a => a.status === activeTab);

  const tabs = ['All Assets', 'Assigned', 'Available', 'Return Pending', 'Under Repair', 'Lost / Damaged', 'Retired'];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assets</h1>
          <p className="text-sm text-gray-500 mt-1">Track company assets, employee assignments, conditions, returns and lifecycle status.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <Download size={16} /> Export
          </button>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2">
            <Plus size={16} /> Add Asset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 order-2 xl:order-1 flex flex-col h-full w-full overflow-hidden">
          <AssetStats />
        </div>
        <div className="xl:col-span-1 order-1 xl:order-2 mb-6 xl:mb-0">
          <AssetAttentionCard />
        </div>
      </div>

      <div className="flex overflow-x-auto no-scrollbar gap-2 mb-6 border-b border-gray-200">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === t 
                ? 'border-indigo-600 text-indigo-700' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 bg-white p-3 border border-gray-200 rounded-xl shadow-sm mb-6">
        <div className="relative flex-1 w-full xl:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by Asset ID, Name, Serial, or Employee..." 
            className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto">
          <select className="px-3 py-1.5 bg-gray-50 border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 font-medium">
            <option>Asset Type</option>
            <option>Laptop</option>
            <option>Phone</option>
            <option>Monitor</option>
            <option>Access Card</option>
          </select>
          <select className="px-3 py-1.5 bg-gray-50 border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 font-medium">
            <option>Location</option>
            <option>Bengaluru HQ</option>
            <option>Mumbai Office</option>
            <option>Remote</option>
          </select>
          <select className="px-3 py-1.5 bg-gray-50 border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 font-medium">
            <option>Condition</option>
            <option>New</option>
            <option>Good</option>
            <option>Damaged</option>
          </select>
          <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block"></div>
          <button className="flex items-center justify-center p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-700 rounded-lg transition-colors tooltip-trigger" title="Reset Filters">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <AssetsTable assets={filteredAssets} />
    </div>
  );
}
