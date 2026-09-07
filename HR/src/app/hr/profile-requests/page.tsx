'use client';

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Download, Search, Filter, AlertCircle, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { mockProfileRequests, ProfileChangeStatus, ProfileChangeRisk, ProfileChangeType } from '@/data/hr/profile-requests';
import Link from 'next/link';

export default function ProfileRequestsPage() {
  const [activeTab, setActiveTab] = useState<ProfileChangeStatus | 'All'>('Pending');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Basic filtering
  const filteredRequests = mockProfileRequests.filter(req => {
    const matchesTab = activeTab === 'All' || req.status === activeTab;
    const matchesSearch = 
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      req.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getRiskColor = (risk: ProfileChangeRisk) => {
    switch(risk) {
      case 'High': return 'text-red-700 bg-red-100 border-red-200';
      case 'Medium': return 'text-amber-700 bg-amber-100 border-amber-200';
      case 'Low': return 'text-green-700 bg-green-100 border-green-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getStatusColor = (status: ProfileChangeStatus) => {
    switch(status) {
      case 'Pending': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Under Review': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Needs Clarification': return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'Approved': return 'text-green-700 bg-green-50 border-green-200';
      case 'Rejected': return 'text-red-700 bg-red-50 border-red-200';
      case 'Cancelled': return 'text-gray-700 bg-gray-50 border-gray-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const tabs: (ProfileChangeStatus | 'All')[] = ['Pending', 'Under Review', 'Needs Clarification', 'Approved', 'Rejected', 'All'];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile Change Requests</h1>
          <p className="text-gray-500 mt-1">Review and approve employee requests to update controlled profile information.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col justify-center">
            <p className="text-sm font-medium text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-gray-900">{mockProfileRequests.filter(r => r.status === 'Pending').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col justify-center">
            <p className="text-sm font-medium text-gray-500">Needs Review</p>
            <p className="text-2xl font-bold text-indigo-600">{mockProfileRequests.filter(r => r.status === 'Under Review').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col justify-center">
            <p className="text-sm font-medium text-gray-500">Awaiting Employee</p>
            <p className="text-2xl font-bold text-purple-600">{mockProfileRequests.filter(r => r.status === 'Needs Clarification').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col justify-center">
            <p className="text-sm font-medium text-gray-500">Approved Today</p>
            <p className="text-2xl font-bold text-green-600">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col justify-center">
            <p className="text-sm font-medium text-gray-500">Rejected This Month</p>
            <p className="text-2xl font-bold text-red-600">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col justify-center">
            <p className="text-sm font-medium text-gray-500">High Risk Changes</p>
            <p className="text-2xl font-bold text-red-600">{mockProfileRequests.filter(r => r.riskLevel === 'High' && r.status !== 'Approved' && r.status !== 'Rejected').length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex space-x-1 overflow-x-auto custom-scrollbar">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                      activeTab === tab
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab} <span className="ml-1.5 px-2 py-0.5 rounded-full text-xs bg-white border border-gray-200">{tab === 'All' ? mockProfileRequests.length : mockProfileRequests.filter(r => r.status === tab).length}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-4 flex flex-col sm:flex-row gap-3 border-b border-gray-100">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by ID or Employee..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/50 text-gray-500 font-medium">
                  <tr>
                    <th className="px-6 py-4">Request</th>
                    <th className="px-6 py-4">Request Type</th>
                    <th className="px-6 py-4">Risk</th>
                    <th className="px-6 py-4">Submitted</th>
                    <th className="px-6 py-4">Reviewer</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{req.id}</div>
                          <div className="text-gray-500">{req.employeeName}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{req.requestType}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getRiskColor(req.riskLevel)}`}>
                            {req.riskLevel}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {new Date(req.submittedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {req.reviewer || <span className="text-gray-400 italic">Unassigned</span>}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(req.status)}`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link href={`/hr/profile-requests/${req.id}`} className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                            Review
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                        No requests match the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 space-y-4">
          <Card>
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 text-amber-500" />
                Needs Attention
              </h3>
            </div>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">High risk requests unassigned</p>
                  <p className="text-xs text-gray-500 mt-0.5">2 requests need reviewer assignment.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Review overdue</p>
                  <p className="text-xs text-gray-500 mt-0.5">3 requests waiting more than 48 hours.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Employee responded</p>
                  <p className="text-xs text-gray-500 mt-0.5">1 clarification thread has new replies.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
