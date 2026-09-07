'use client';
import React, { useState } from 'react';
import { Gift, Award } from 'lucide-react';

export function CelebrationsCard() {
  const [activeTab, setActiveTab] = useState('Birthdays');

  const birthdays = [
    { name: 'Aditi Sharma', date: 'Today', icon: Gift, color: 'text-rose-500 bg-rose-50', initials: 'AS' },
    { name: 'Rahul Mehta', date: 'Sep 10', icon: Gift, color: 'text-gray-400 bg-gray-50', initials: 'RM' },
  ];

  const anniversaries = [
    { name: 'Deepak S.', date: '3 years today', icon: Award, color: 'text-amber-500 bg-amber-50', initials: 'DS' },
  ];

  const data = activeTab === 'Birthdays' ? birthdays : anniversaries;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900 text-lg">Celebrations</h3>
      </div>

      <div className="flex space-x-1 mb-6 border-b border-gray-100">
        {['Birthdays', 'Anniversaries'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
              activeTab === tab 
                ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${item.color}`}>
              <item.icon size={18} />
            </div>
            <div className="flex-1 flex justify-between items-center">
              <div>
                <p className="text-sm font-bold text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.date}</p>
              </div>
              <button className="text-xs font-semibold text-indigo-600 hover:bg-indigo-50 px-2.5 py-1.5 rounded transition-colors">
                Wish
              </button>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <div className="text-center py-6 text-sm text-gray-500">
            No upcoming {activeTab.toLowerCase()}.
          </div>
        )}
      </div>
    </div>
  );
}
