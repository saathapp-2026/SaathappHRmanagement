import React from 'react';

export function OrganizationTabs({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
  const tabs = ['Org Chart', 'Departments', 'Designations', 'Teams', 'Work Locations'];

  return (
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
  );
}
