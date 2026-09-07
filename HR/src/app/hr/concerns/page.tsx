'use client';
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { mockConcerns } from '@/data/hr/concerns';

import { ConcernStats } from '@/components/hr/concerns/ConcernStats';
import { ConcernStatusTabs } from '@/components/hr/concerns/ConcernStatusTabs';
import { ConcernFilters } from '@/components/hr/concerns/ConcernFilters';
import { ConcernTable } from '@/components/hr/concerns/ConcernTable';
import { ConcernAttentionCard } from '@/components/hr/concerns/ConcernAttentionCard';

export default function ConcernsPage() {
  const [activeTab, setActiveTab] = useState('New');

  const filteredConcerns = activeTab === 'All' 
    ? mockConcerns 
    : mockConcerns.filter(c => c.status === activeTab);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee Concerns</h1>
          <p className="text-sm text-gray-500 mt-1">Review, assign and resolve employee concerns while maintaining confidential HR case records.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors shadow-sm">
            Last 30 Days
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <Download size={16} /> Export Cases
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 order-2 xl:order-1 flex flex-col h-full">
          <ConcernStats />
        </div>
        <div className="xl:col-span-1 order-1 xl:order-2 mb-6 xl:mb-0">
          <ConcernAttentionCard />
        </div>
      </div>

      <ConcernStatusTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <ConcernFilters />
      <ConcernTable concerns={filteredConcerns} />
    </div>
  );
}
