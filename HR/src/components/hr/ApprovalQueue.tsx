'use client';
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export function ApprovalQueue() {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = [
    { name: 'All', count: 11 },
    { name: 'Leave', count: 5 },
    { name: 'Corrections', count: 3 },
    { name: 'Profile', count: 3 },
  ];

  const requests = [
    {
      id: 1,
      name: 'Anjali Rao',
      type: 'Leave',
      title: 'Casual Leave',
      date: 'Sep 10–11',
      duration: '2 days',
      avatar: 'AR'
    },
    {
      id: 2,
      name: 'Rahul Mehta',
      type: 'Corrections',
      title: 'Attendance Correction',
      date: 'Yesterday',
      duration: null,
      avatar: 'RM'
    },
    {
      id: 3,
      name: 'Neha Gupta',
      type: 'Profile',
      title: 'Profile Change Request',
      date: 'Mobile number',
      duration: null,
      avatar: 'NG'
    }
  ];

  const filtered = activeTab === 'All' ? requests : requests.filter(r => r.type === activeTab);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900 text-lg">Approvals Required</h3>
      </div>

      <div className="flex space-x-1 mb-4 overflow-x-auto pb-1 no-scrollbar border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`whitespace-nowrap px-3 py-1.5 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
              activeTab === tab.name 
                ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {tab.name} <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${activeTab === tab.name ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500'}`}>{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-3">
        {filtered.map((req) => (
          <div key={req.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 font-bold flex items-center justify-center text-sm flex-shrink-0">
                {req.avatar}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{req.name}</p>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                  <span className="font-medium text-gray-700">{req.title}</span>
                  <span>•</span>
                  <span>{req.date}</span>
                </div>
                {req.duration && (
                  <span className="inline-block mt-1 px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-semibold tracking-wide">
                    {req.duration.toUpperCase()}
                  </span>
                )}
              </div>
            </div>
            <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-semibold rounded-md shadow-sm hover:bg-gray-50 hover:text-indigo-600 transition-colors">
              Review
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-8 text-sm text-gray-500">
            No pending {activeTab.toLowerCase()} approvals.
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="w-full py-2 text-sm text-indigo-600 font-semibold hover:bg-indigo-50 rounded-lg transition-colors flex items-center justify-center gap-1 group">
          View all approvals <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
