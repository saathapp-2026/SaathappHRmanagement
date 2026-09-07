import React from 'react';

export function ConcernStatusTabs({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
  const tabs = [
    { name: 'New', count: 3 },
    { name: 'Under Review', count: 8 },
    { name: 'Waiting for Employee', count: 4 },
    { name: 'Resolved', count: 18 },
    { name: 'Closed', count: 34 },
    { name: 'All', count: 67 }
  ];

  return (
    <div className="flex overflow-x-auto no-scrollbar gap-2 mb-6 border-b border-gray-200">
      {tabs.map(t => (
        <button
          key={t.name}
          onClick={() => setActiveTab(t.name)}
          className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === t.name 
              ? 'border-indigo-600 text-indigo-700' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          {t.name} <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === t.name ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}>{t.count}</span>
        </button>
      ))}
    </div>
  );
}
