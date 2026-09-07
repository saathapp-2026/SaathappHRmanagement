import React from 'react';

export function LeaveTabs({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
  const tabs = ['Requests', 'On Leave', 'Upcoming', 'Balances', 'History'];
  return (
    <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex overflow-x-auto no-scrollbar space-x-1 mb-6">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
            activeTab === tab 
              ? 'bg-indigo-50 text-indigo-700' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
