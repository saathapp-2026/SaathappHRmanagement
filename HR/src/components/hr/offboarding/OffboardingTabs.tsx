'use client';
import React from 'react';

interface OffboardingTabsProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function OffboardingTabs({ tabs, activeTab, setActiveTab }: OffboardingTabsProps) {
  return (
    <div className="flex overflow-x-auto hide-scrollbar">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
            activeTab === tab
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
