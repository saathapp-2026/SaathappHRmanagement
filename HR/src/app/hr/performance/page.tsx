'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Download, Plus, Search, Filter, AlertCircle, Clock, CheckCircle, FileText, UserCog, Settings, MoreHorizontal } from 'lucide-react';
import { mockPerformanceCycles, mockPerformanceStats, mockPerformanceReviews } from '@/data/hr/performance';

export default function PerformanceMainPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'cycles', label: 'Review Cycles' },
    { id: 'reviews', label: 'Employee Reviews' },
    { id: 'goals', label: 'Goals & KRAs' },
    { id: 'calibration', label: 'Calibration' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance</h1>
          <p className="text-gray-500 mt-1">Manage review cycles, goals, employee evaluations, ratings and performance history.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
            <Plus className="w-4 h-4 mr-2" />
            Create Review Cycle
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Active Cycles</p><p className="text-2xl font-bold mt-1 text-indigo-600">{mockPerformanceStats.activeCycles}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Employees in Review</p><p className="text-2xl font-bold mt-1">{mockPerformanceStats.employeesInReview}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Self Reviews Pending</p><p className="text-2xl font-bold mt-1 text-amber-600">{mockPerformanceStats.selfReviewsPending}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Manager Reviews Pending</p><p className="text-2xl font-bold mt-1 text-blue-600">{mockPerformanceStats.managerReviewsPending}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Overdue</p><p className="text-2xl font-bold mt-1 text-red-600">{mockPerformanceStats.overdueReviews}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Completed (This Cycle)</p><p className="text-2xl font-bold mt-1 text-green-600">{mockPerformanceStats.completedThisCycle}</p></CardContent></Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Active Cycle: {mockPerformanceCycles[0].name}</h3>
                <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium border border-green-200">Active</span>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <div><p className="text-xs text-gray-500 mb-1">Cycle ID</p><p className="text-sm font-medium">{mockPerformanceCycles[0].id}</p></div>
                  <div><p className="text-xs text-gray-500 mb-1">Period</p><p className="text-sm font-medium">{mockPerformanceCycles[0].period}</p></div>
                  <div><p className="text-xs text-gray-500 mb-1">Employees</p><p className="text-sm font-medium">{mockPerformanceCycles[0].employeesCount}</p></div>
                  <div><p className="text-xs text-gray-500 mb-1">Self Review Deadline</p><p className="text-sm font-medium">{mockPerformanceCycles[0].selfReviewDeadline}</p></div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">Review Progress</span>
                    <span className="font-bold text-gray-900">{mockPerformanceCycles[0].completionPct}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${mockPerformanceCycles[0].completionPct}%` }}></div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Link href={`/hr/performance/cycles/${mockPerformanceCycles[0].id}`} className="px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100">
                    Manage Cycle
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <div className="p-4 border-b border-gray-100 font-semibold text-gray-900">Review Progress</div>
              <CardContent className="p-6">
                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-48 text-gray-600">Assigned</div>
                    <div className="flex-1 bg-gray-100 h-2 rounded"><div className="bg-gray-300 h-2 rounded" style={{width: '100%'}}></div></div>
                    <div className="w-12 text-right font-medium">184</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-48 text-gray-600">Self Review Completed</div>
                    <div className="flex-1 bg-gray-100 h-2 rounded"><div className="bg-blue-400 h-2 rounded" style={{width: '80%'}}></div></div>
                    <div className="w-12 text-right font-medium">148</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-48 text-gray-600">Manager Review Completed</div>
                    <div className="flex-1 bg-gray-100 h-2 rounded"><div className="bg-indigo-500 h-2 rounded" style={{width: '65%'}}></div></div>
                    <div className="w-12 text-right font-medium">121</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-48 text-gray-600">HR Reviewed</div>
                    <div className="flex-1 bg-gray-100 h-2 rounded"><div className="bg-purple-500 h-2 rounded" style={{width: '57%'}}></div></div>
                    <div className="w-12 text-right font-medium">106</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-48 text-gray-600">Finalized</div>
                    <div className="flex-1 bg-gray-100 h-2 rounded"><div className="bg-green-500 h-2 rounded" style={{width: '51%'}}></div></div>
                    <div className="w-12 text-right font-medium">95</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="border-amber-200">
              <div className="p-4 border-b border-amber-100 bg-amber-50/50 font-semibold text-amber-900 flex gap-2 items-center">
                <AlertCircle className="w-4 h-4" /> Needs Attention
              </div>
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                  <span className="text-gray-700">Self reviews pending</span>
                  <span className="font-bold text-gray-900">36</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                  <span className="text-gray-700">Manager reviews pending</span>
                  <span className="font-bold text-gray-900">42</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                  <span className="text-gray-700">Reviews overdue</span>
                  <span className="font-bold text-red-600">11</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                  <span className="text-gray-700">Awaiting HR calibration</span>
                  <span className="font-bold text-gray-900">7</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">Missing goals</span>
                  <span className="font-bold text-amber-600">4</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <div className="p-4 border-b border-gray-100 font-semibold text-gray-900 flex gap-2 items-center">
                <Clock className="w-4 h-4 text-gray-500" /> Upcoming Deadlines
              </div>
              <CardContent className="p-4 space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded text-center min-w-16">
                    <p className="text-xs uppercase font-bold">Dec</p>
                    <p className="text-lg font-bold">15</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Self Review Deadline</p>
                    <p className="text-xs text-gray-500 mt-1">All employees must submit.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-gray-50 text-gray-700 px-3 py-1 rounded text-center min-w-16">
                    <p className="text-xs uppercase font-bold">Dec</p>
                    <p className="text-lg font-bold">22</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Manager Review Deadline</p>
                    <p className="text-xs text-gray-500 mt-1">Managers finalize ratings.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-gray-50 text-gray-700 px-3 py-1 rounded text-center min-w-16">
                    <p className="text-xs uppercase font-bold">Dec</p>
                    <p className="text-lg font-bold">31</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Final Review Closure</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'cycles' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">Cycle</th>
                  <th className="px-4 py-3">Review Period</th>
                  <th className="px-4 py-3">Employees</th>
                  <th className="px-4 py-3">Progress</th>
                  <th className="px-4 py-3">Self Review Due</th>
                  <th className="px-4 py-3">Manager Due</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockPerformanceCycles.map((cycle) => (
                  <tr key={cycle.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-4 font-medium text-gray-900">
                      <Link href={`/hr/performance/cycles/${cycle.id}`} className="hover:text-indigo-600">
                        {cycle.name}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-gray-600">{cycle.period}</td>
                    <td className="px-4 py-4">{cycle.employeesCount}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-1.5"><div className="bg-indigo-600 h-1.5 rounded-full" style={{width: `${cycle.completionPct}%`}}></div></div>
                        <span className="text-xs text-gray-500">{cycle.completionPct}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-600">{cycle.selfReviewDeadline}</td>
                    <td className="px-4 py-4 text-gray-600">{cycle.managerDeadline}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
                        cycle.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-700 border-gray-200'
                      }`}>
                        {cycle.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Link href={`/hr/performance/cycles/${cycle.id}`} className="text-indigo-600 hover:text-indigo-800 font-medium">Manage</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'reviews' && (
        <Card>
          <div className="p-4 border-b border-gray-100 flex gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input type="text" placeholder="Search employee, manager, cycle..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>All Statuses</option>
              <option>Manager Review Completed</option>
              <option>Self Review Pending</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">Employee</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Manager</th>
                  <th className="px-4 py-3">Cycle</th>
                  <th className="px-4 py-3 text-center">Self</th>
                  <th className="px-4 py-3 text-center">Manager</th>
                  <th className="px-4 py-3 text-center">Final</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockPerformanceReviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{review.employeeName}</div>
                      <div className="text-xs text-gray-500">{review.employeeId}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{review.department}</td>
                    <td className="px-4 py-3 text-gray-600">{review.manager}</td>
                    <td className="px-4 py-3 text-gray-600">{review.cycleId}</td>
                    <td className="px-4 py-3 text-center font-medium text-gray-900">{review.selfRating || '-'}</td>
                    <td className="px-4 py-3 text-center font-medium text-gray-900">{review.managerRating || '-'}</td>
                    <td className="px-4 py-3 text-center font-bold text-indigo-600">{review.finalRating || '-'}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border bg-gray-50 text-gray-700 border-gray-200">
                        {review.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/hr/performance/reviews/${review.id}`} className="text-indigo-600 hover:text-indigo-800 font-medium">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Placeholders for Goals and Calibration to show tabs work */}
      {['goals', 'calibration'].includes(activeTab) && (
        <div className="bg-gray-50 border border-gray-200 p-12 text-center rounded-xl">
          <Settings className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">{tabs.find(t => t.id === activeTab)?.label} Module</h3>
          <p className="text-sm text-gray-500 mb-4">This section demonstrates the standard HR reporting structure.</p>
        </div>
      )}

    </div>
  );
}
