"use client";

import React, { useState } from 'react';
import { mockJobs, mockCandidates } from '@/data/hr/recruitment';
import { Plus, Download, Search, Filter, Briefcase, Users, UserCheck, Clock, FileText } from 'lucide-react';
import Link from 'next/link';

export function RecruitmentDashboard() {
  const [activeTab, setActiveTab] = useState('Pipeline');
  const [candidates, setCandidates] = useState(mockCandidates);
  const [jobs, setJobs] = useState(mockJobs);
  const [searchQuery, setSearchQuery] = useState('');

  const TABS = ['Pipeline', 'Candidates', 'Jobs', 'Interviews', 'Offers', 'Hired'];
  const STAGES = ['Applied', 'Screening', 'Interview', 'Selected', 'Offer', 'Hired'];

  const getKPIs = () => {
    return [
      { label: 'Open Positions', value: jobs.filter(j => j.status === 'Open').length },
      { label: 'Active Candidates', value: candidates.filter(c => c.status === 'Active').length },
      { label: 'Interviews This Week', value: 14 },
      { label: 'Offers Pending', value: candidates.filter(c => c.stage === 'Offer' && c.status === 'Active').length },
      { label: 'Hired This Month', value: candidates.filter(c => c.status === 'Hired').length },
      { label: 'Time to Hire', value: '24 days' }
    ];
  };

  const renderPipeline = () => {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
        {STAGES.map(stage => {
          const stageCandidates = candidates.filter(c => c.stage === stage && c.status === 'Active');
          return (
            <div key={stage} className="flex-shrink-0 w-80 bg-gray-50 rounded-xl border border-gray-200 flex flex-col max-h-[800px]">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-gray-50 z-10 rounded-t-xl">
                <h3 className="font-semibold text-gray-900">{stage}</h3>
                <span className="bg-white border border-gray-200 px-2 py-0.5 rounded-full text-xs font-medium text-gray-600">
                  {stageCandidates.length}
                </span>
              </div>
              <div className="p-3 overflow-y-auto flex-1 space-y-3">
                {stageCandidates.map(c => (
                  <div key={c.id} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow transition-shadow cursor-pointer">
                    <Link href={`/hr/recruitment/candidates/${c.id}`}>
                      <div className="font-semibold text-gray-900 text-sm mb-1">{c.firstName} {c.lastName}</div>
                      <div className="text-xs text-gray-500 mb-2">{c.id}</div>
                      <div className="text-sm font-medium text-indigo-700">{c.appliedJobTitle}</div>
                      <div className="text-xs text-gray-500 mt-1">{c.department}</div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">Exp: {c.experience}</span>
                        <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{c.source}</span>
                        {c.priority === 'Urgent' && <span className="text-[10px] bg-red-100 px-1.5 py-0.5 rounded text-red-700">Urgent</span>}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderCandidatesList = () => {
    const list = candidates.filter(c => 
      c.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.appliedJobTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase">
                <th className="p-4">Candidate</th>
                <th className="p-4">Applied Role</th>
                <th className="p-4">Experience</th>
                <th className="p-4">Location</th>
                <th className="p-4">Source</th>
                <th className="p-4">Stage</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {list.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{c.firstName} {c.lastName}</div>
                    <div className="text-xs text-gray-500">{c.id}</div>
                  </td>
                  <td className="p-4 text-sm text-gray-700">{c.appliedJobTitle}</td>
                  <td className="p-4 text-sm text-gray-700">{c.experience}</td>
                  <td className="p-4 text-sm text-gray-700">{c.currentLocation}</td>
                  <td className="p-4 text-sm text-gray-700">{c.source}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                      {c.stage}
                    </span>
                    {c.status !== 'Active' && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        {c.status}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <Link href={`/hr/recruitment/candidates/${c.id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderJobs = () => (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase">
              <th className="p-4">Job</th>
              <th className="p-4">Department</th>
              <th className="p-4">Location</th>
              <th className="p-4">Openings</th>
              <th className="p-4">Hiring Manager</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {jobs.map(j => (
              <tr key={j.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="font-medium text-gray-900">{j.title}</div>
                  <div className="text-xs text-gray-500">{j.id}</div>
                </td>
                <td className="p-4 text-sm text-gray-700">{j.department}</td>
                <td className="p-4 text-sm text-gray-700">{j.location}</td>
                <td className="p-4 text-sm text-gray-700">{j.openings}</td>
                <td className="p-4 text-sm text-gray-700">{j.hiringManager}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${j.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {j.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <Link href={`/hr/recruitment/jobs/${j.id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recruitment</h1>
          <p className="text-sm text-gray-500 mt-1">Manage job openings, candidate pipelines, interviews, offers and hiring.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download size={16} /> Export
          </button>
          <button className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <Plus size={16} /> Add Candidate
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {getKPIs().map((k, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="text-sm font-medium text-gray-500 mb-1 line-clamp-1">{k.label}</div>
            <div className="text-2xl font-bold text-gray-900">{k.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6 overflow-x-auto hide-scrollbar">
        <nav className="-mb-px flex space-x-6">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab 
                  ? 'border-indigo-500 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Filters (show mostly for lists) */}
      {['Candidates', 'Jobs', 'Interviews', 'Offers'].includes(activeTab) && (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Filter size={16} /> Filters
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="min-h-[500px]">
        {activeTab === 'Pipeline' && renderPipeline()}
        {activeTab === 'Candidates' && renderCandidatesList()}
        {activeTab === 'Jobs' && renderJobs()}
        {activeTab === 'Interviews' && <div className="text-gray-500 p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">Interviews tab content (Placeholder)</div>}
        {activeTab === 'Offers' && <div className="text-gray-500 p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">Offers tab content (Placeholder)</div>}
        {activeTab === 'Hired' && <div className="text-gray-500 p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">Hired tab content (Placeholder)</div>}
      </div>

    </div>
  );
}
