import React from 'react';

export type ProbationTabType = 'Active' | 'Review Due' | 'Extended' | 'Confirmed' | 'Overdue' | 'All';

interface ProbationTabsProps {
  activeTab: ProbationTabType;
  setActiveTab: (tab: ProbationTabType) => void;
  counts: Record<ProbationTabType, number>;
}

export function ProbationTabs({ activeTab, setActiveTab, counts }: ProbationTabsProps) {
  const tabs: ProbationTabType[] = ['Active', 'Review Due', 'Extended', 'Confirmed', 'Overdue', 'All'];

  return (
    <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex overflow-x-auto no-scrollbar space-x-1">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === tab
              ? 'bg-indigo-50 text-indigo-700'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          {tab}
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            activeTab === tab ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500'
          }`}>
            {counts[tab] || 0}
          </span>
        </button>
      ))}
    </div>
  );
}
