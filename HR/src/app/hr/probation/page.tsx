'use client';

import React, { useState, useMemo } from 'react';
import { Download, FileText } from 'lucide-react';
import { ProbationStats } from '@/components/hr/probation/ProbationStats';
import { ProbationTabs, ProbationTabType } from '@/components/hr/probation/ProbationTabs';
import { ProbationFilters } from '@/components/hr/probation/ProbationFilters';
import { ProbationQuickQueues } from '@/components/hr/probation/ProbationQuickQueues';
import { ProbationTable } from '@/components/hr/probation/ProbationTable';
import { ProbationEndingSoon } from '@/components/hr/probation/ProbationEndingSoon';
import { ProbationAttentionCard } from '@/components/hr/probation/ProbationAttentionCard';
import { mockProbationRecords } from '@/data/hr/probation';

export default function ProbationPage() {
  const [activeTab, setActiveTab] = useState<ProbationTabType>('Active');
  const [searchTerm, setSearchTerm] = useState('');
  const [quickQueue, setQuickQueue] = useState<string | null>(null);

  const filteredRecords = useMemo(() => {
    let result = mockProbationRecords;

    if (activeTab !== 'All') {
      result = result.filter(r => r.status === activeTab);
    }

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(r => 
        r.employeeName.toLowerCase().includes(lower) ||
        r.employeeId.toLowerCase().includes(lower) ||
        r.manager.toLowerCase().includes(lower) ||
        r.designation.toLowerCase().includes(lower)
      );
    }

    if (quickQueue) {
      if (quickQueue === 'Ending in 7 Days') {
        result = result.filter(r => r.daysRemaining >= 0 && r.daysRemaining <= 7);
      } else if (quickQueue === 'Ending in 15 Days') {
        result = result.filter(r => r.daysRemaining >= 0 && r.daysRemaining <= 15);
      } else if (quickQueue === 'Ending in 30 Days') {
        result = result.filter(r => r.daysRemaining >= 0 && r.daysRemaining <= 30);
      } else if (quickQueue === 'No Review Scheduled') {
        result = result.filter(r => r.status !== 'Confirmed' && !r.reviews.some(rev => rev.status === 'Scheduled'));
      } else if (quickQueue === 'Awaiting Manager Recommendation') {
        result = result.filter(r => r.daysRemaining >= 0 && r.daysRemaining <= 15 && !r.managerRecommendation);
      } else if (quickQueue === 'Overdue') {
        result = result.filter(r => r.status === 'Overdue');
      }
    }

    return result;
  }, [activeTab, searchTerm, quickQueue]);

  const counts = useMemo(() => {
    return {
      'Active': mockProbationRecords.filter(r => r.status === 'Active').length,
      'Review Due': mockProbationRecords.filter(r => r.status === 'Review Due').length,
      'Extended': mockProbationRecords.filter(r => r.status === 'Extended').length,
      'Confirmed': mockProbationRecords.filter(r => r.status === 'Confirmed').length,
      'Overdue': mockProbationRecords.filter(r => r.status === 'Overdue').length,
      'All': mockProbationRecords.length
    } as Record<ProbationTabType, number>;
  }, []);

  const handleQueueSelect = (queue: string) => {
    if (queue === quickQueue) {
      setQuickQueue(null);
    } else {
      setQuickQueue(queue);
      setActiveTab('All');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Probation</h1>
          <p className="text-sm text-gray-500 mt-1">Track employee probation periods, upcoming reviews, confirmations and extensions.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium shadow-sm transition-colors">
            <FileText size={18} />
            Probation Policy
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium shadow-sm transition-colors">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      <ProbationStats />

      <ProbationTabs activeTab={activeTab} setActiveTab={(t) => { setActiveTab(t); setQuickQueue(null); }} counts={counts} />

      <div className="space-y-4">
        <ProbationFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <ProbationQuickQueues onSelectQueue={handleQueueSelect} />
        
        {quickQueue && (
          <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm flex items-center justify-between">
            <span>Showing results for: <strong>{quickQueue}</strong></span>
            <button onClick={() => setQuickQueue(null)} className="text-indigo-700 hover:text-indigo-900 font-medium">Clear</button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-3/4">
            <ProbationTable records={filteredRecords} />
          </div>
          <div className="w-full lg:w-1/4">
            <ProbationEndingSoon records={mockProbationRecords} />
            <ProbationAttentionCard records={mockProbationRecords} />
          </div>
        </div>
      </div>
    </div>
  );
}
