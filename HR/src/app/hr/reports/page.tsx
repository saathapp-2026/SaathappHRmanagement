'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Download, Bookmark, Calendar, Users, Briefcase, FileText, CheckCircle, Clock, Search, ChevronRight } from 'lucide-react';
import { mockSummaryMetrics } from '@/data/hr/reports';

export default function ReportsMainPage() {
  const [dateFilter, setDateFilter] = useState('This Month');
  const [deptFilter, setDeptFilter] = useState('All Departments');

  const reportCategories = [
    { title: 'Headcount Report', desc: 'Active, probation, and notice period counts by department.', icon: Users, href: '/hr/reports/headcount' },
    { title: 'Attendance Analytics', desc: 'Present, absent, and late arrivals tracking.', icon: Clock, href: '/hr/reports/attendance' },
    { title: 'Leave Report', desc: 'Leave distribution, balances and pending requests.', icon: Calendar, href: '/hr/reports/leave' },
    { title: 'Employee Movement', desc: 'Joiners, exits, and turnover rates.', icon: Briefcase, href: '/hr/reports/movement' },
    { title: 'Probation Analytics', desc: 'Status of probation reviews and confirmations.', icon: CheckCircle, href: '/hr/reports/probation' },
    { title: 'Offboarding', desc: 'Exit reasons and clearance progress.', icon: Users, href: '/hr/reports/offboarding' },
    { title: 'Document Compliance', desc: 'Verified, pending, and expired documents tracking.', icon: FileText, href: '/hr/reports/documents' },
    { title: 'Concerns & Help', desc: 'SLA tracking and resolution metrics.', icon: Clock, href: '/hr/reports/concerns' },
    { title: 'Payroll Readiness', desc: 'Attendance locking and data completeness.', icon: FileText, href: '/hr/reports/payroll' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-500 mt-1">Monitor workforce trends, HR operations and compliance across the organization.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            <Bookmark className="w-4 h-4 mr-2" />
            Saved Reports
          </button>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Global Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-medium text-gray-500 mb-1">Date Range</label>
          <select 
            className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
          >
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-medium text-gray-500 mb-1">Department</label>
          <select 
            className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50"
            value={deptFilter}
            onChange={e => setDeptFilter(e.target.value)}
          >
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Operations</option>
            <option>Marketing</option>
            <option>Finance</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
          <select className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50">
            <option>All Locations</option>
            <option>Bengaluru HQ</option>
            <option>Mumbai Branch</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">Reset</button>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800">Apply</button>
        </div>
      </div>

      {/* Executive Summary */}
      <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">Executive Summary</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <Card className="col-span-2 lg:col-span-1">
          <CardContent className="p-4">
            <p className="text-xs text-gray-500 font-medium">Total Employees</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{mockSummaryMetrics.totalEmployees}</p>
          </CardContent>
        </Card>
        <Card className="col-span-2 lg:col-span-1">
          <CardContent className="p-4">
            <p className="text-xs text-gray-500 font-medium">Active</p>
            <p className="text-xl font-bold text-green-600 mt-1">{mockSummaryMetrics.activeEmployees}</p>
          </CardContent>
        </Card>
        <Card className="col-span-2 lg:col-span-1">
          <CardContent className="p-4">
            <p className="text-xs text-gray-500 font-medium">Joiners</p>
            <p className="text-xl font-bold text-blue-600 mt-1">{mockSummaryMetrics.newJoiners}</p>
          </CardContent>
        </Card>
        <Card className="col-span-2 lg:col-span-1">
          <CardContent className="p-4">
            <p className="text-xs text-gray-500 font-medium">Exits</p>
            <p className="text-xl font-bold text-amber-600 mt-1">{mockSummaryMetrics.exits}</p>
          </CardContent>
        </Card>
        <Card className="col-span-2 lg:col-span-1">
          <CardContent className="p-4">
            <p className="text-xs text-gray-500 font-medium">Attendance</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{mockSummaryMetrics.attendanceRate}</p>
          </CardContent>
        </Card>
        <Card className="col-span-2 lg:col-span-1">
          <CardContent className="p-4">
            <p className="text-xs text-gray-500 font-medium">On Leave</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{mockSummaryMetrics.employeesOnLeave}</p>
          </CardContent>
        </Card>
        <Card className="col-span-2 lg:col-span-1">
          <CardContent className="p-4">
            <p className="text-xs text-gray-500 font-medium">HR Actions</p>
            <p className="text-xl font-bold text-purple-600 mt-1">{mockSummaryMetrics.pendingHRActions}</p>
          </CardContent>
        </Card>
        <Card className="col-span-2 lg:col-span-1">
          <CardContent className="p-4">
            <p className="text-xs text-gray-500 font-medium">Docs Valid</p>
            <p className="text-xl font-bold text-green-600 mt-1">{mockSummaryMetrics.documentCompliance}</p>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p>Attendance improved 1.2% compared with last month across the Engineering department.</p>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 text-sm text-amber-800 flex items-start gap-3">
          <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p>3 probation decisions are overdue. Immediate review is recommended.</p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-sm text-red-800 flex items-start gap-3">
          <FileText className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <p>Document compliance is below 90% in Operations. 11 documents have expired.</p>
        </div>
      </div>

      {/* Report Library */}
      <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4 border-t border-gray-100 pt-6">Report Library</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportCategories.map((cat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all group flex flex-col h-full">
            <div className="p-5 flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <cat.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">{cat.title}</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">{cat.desc}</p>
            </div>
            <div className="px-5 py-3 border-t border-gray-50 bg-gray-50/50 flex items-center justify-between mt-auto rounded-b-xl">
              <span className="text-xs text-gray-400">Demo data</span>
              <Link href={cat.href} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center">
                Open Report <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
