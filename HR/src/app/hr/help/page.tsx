'use client';
import React, { useState } from 'react';
import { Download, Filter, Search, RotateCcw } from 'lucide-react';
import { mockHelpRequests } from '@/data/hr/help';
import { HelpTable } from '@/components/hr/help/HelpTable';

export default function HelpRequestsPage() {
  const [activeTab, setActiveTab] = useState('Open');

  const filteredRequests = activeTab === 'All' 
    ? mockHelpRequests 
    : mockHelpRequests.filter(r => r.status === activeTab);

  const stats = [
    { label: 'Open Tickets', value: 2 },
    { label: 'In Progress', value: 1, color: 'text-indigo-600' },
    { label: 'Overdue SLA', value: 1, color: 'text-rose-600' },
    { label: 'Unassigned', value: 0, color: 'text-amber-600' },
    { label: 'Resolved (7d)', value: 12, color: 'text-emerald-600' },
  ];

  const tabs = ['Open', 'In Progress', 'Waiting for Employee', 'Resolved', 'Closed', 'All'];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Help Requests</h1>
          <p className="text-sm text-gray-500 mt-1">Manage IT, HR, Admin, and Facility helpdesk tickets from employees.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-4 mb-6 no-scrollbar">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white px-5 py-3 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center min-w-[140px] flex-shrink-0">
            <p className="text-xs font-semibold text-gray-500 mb-1 whitespace-nowrap">{stat.label}</p>
            <p className={`text-xl font-bold ${stat.color || 'text-gray-900'}`}>{stat.value}</p>
          </div>
        ))}
      </div>

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

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 bg-white p-3 border border-gray-200 rounded-xl shadow-sm mb-6">
        <div className="relative flex-1 w-full xl:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search tickets..." 
            className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto">
          <select className="px-3 py-1.5 bg-gray-50 border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 font-medium">
            <option>Category</option>
            <option>IT Support</option>
            <option>HR Policy</option>
          </select>
          <select className="px-3 py-1.5 bg-gray-50 border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 font-medium">
            <option>Priority</option>
            <option>High / Urgent</option>
          </select>
          <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block"></div>
          <button className="flex items-center justify-center p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-700 rounded-lg transition-colors tooltip-trigger" title="Reset Filters">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <HelpTable requests={filteredRequests} />
    </div>
  );
}
