import React from 'react';

export function CorrectionStatusTabs({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  const tabs = [
    { name: 'Pending', count: 8 },
    { name: 'Approved', count: 24 },
    { name: 'Rejected', count: 6 },
    { name: 'Needs Information', count: 3 },
    { name: 'All', count: 41 },
  ];

  return (
    <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex overflow-x-auto no-scrollbar space-x-1 mb-6">
      {tabs.map(tab => (
        <button
          key={tab.name}
          onClick={() => setActiveTab(tab.name)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === tab.name 
              ? 'bg-indigo-50 text-indigo-700' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          {tab.name}
          <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${activeTab === tab.name ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500'}`}>
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}
