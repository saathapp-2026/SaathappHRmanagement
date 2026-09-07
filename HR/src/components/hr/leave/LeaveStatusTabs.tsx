import React from 'react';

export function LeaveStatusTabs({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
  const tabs = [
    { name: 'Pending', count: 11 },
    { name: 'Approved', count: 34 },
    { name: 'Rejected', count: 5 },
    { name: 'Needs Clarification', count: 2 },
    { name: 'Cancelled', count: 3 },
    { name: 'All', count: 55 },
  ];

  return (
    <div className="flex overflow-x-auto no-scrollbar space-x-4 mb-6 border-b border-gray-200">
      {tabs.map(tab => (
        <button
          key={tab.name}
          onClick={() => setActiveTab(tab.name)}
          className={`pb-3 text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === tab.name 
              ? 'border-indigo-600 text-indigo-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
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
