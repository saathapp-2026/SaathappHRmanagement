'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, Users, Calendar, Download, MoreHorizontal, FileText, CheckCircle } from 'lucide-react';
import { mockPerformanceCycles, mockPerformanceReviews } from '@/data/hr/performance';

export default function PerformanceCyclePage() {
  const params = useParams();
  const cycleId = params.cycleId as string;
  const cycle = mockPerformanceCycles.find(c => c.id === cycleId) || mockPerformanceCycles[0];
  const reviews = mockPerformanceReviews.filter(r => r.cycleId === cycleId);

  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 relative">
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl z-50 flex items-center">
          <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
          {toastMessage}
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Link href="/hr/performance" className="hover:text-indigo-600 transition-colors">Performance</Link>
        <span>/</span>
        <span className="text-gray-900">Cycles</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{cycle.name}</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1"><FileText className="w-4 h-4" /> {cycle.id}</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {cycle.period}</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border bg-green-50 text-green-700 border-green-200">
              {cycle.status}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            Extend Deadline
          </button>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="p-4 border-b border-gray-100 font-semibold text-gray-900">Review Progress</div>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-3xl font-bold text-indigo-600">{cycle.completionPct}%</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Overall Completion</p>
                <div className="w-full bg-gray-100 rounded-full h-2 mt-1">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${cycle.completionPct}%` }}></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-50">
              <div><p className="text-xs text-gray-500">Assigned</p><p className="font-semibold text-gray-900">{cycle.employeesCount}</p></div>
              <div><p className="text-xs text-gray-500">Self Reviewed</p><p className="font-semibold text-gray-900">148</p></div>
              <div><p className="text-xs text-gray-500">Manager Reviewed</p><p className="font-semibold text-gray-900">121</p></div>
              <div><p className="text-xs text-gray-500">Finalized</p><p className="font-semibold text-gray-900">95</p></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <div className="p-4 border-b border-gray-100 font-semibold text-gray-900">Deadlines</div>
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Self Review</span>
              <span className="font-medium">{cycle.selfReviewDeadline}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Manager Review</span>
              <span className="font-medium">{cycle.managerDeadline}</span>
            </div>
            <div className="flex justify-between items-center text-sm pt-3 border-t border-gray-50">
              <span className="text-gray-600">Finalization</span>
              <span className="font-medium text-indigo-700">{cycle.finalizationDate}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">Employees in Cycle</h3>
          <div className="flex gap-2">
            <input type="text" placeholder="Search employee..." className="px-3 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <select className="border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none">
              <option>All Statuses</option>
              <option>Self Review Pending</option>
              <option>Manager Review Pending</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 text-gray-500 font-medium">
              <tr>
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Manager</th>
                <th className="px-4 py-3 text-center">Self</th>
                <th className="px-4 py-3 text-center">Manager</th>
                <th className="px-4 py-3 text-center">Final</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reviews.map((r, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{r.employeeName}</div>
                    <div className="text-xs text-gray-500">{r.employeeId}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{r.department}</td>
                  <td className="px-4 py-3 text-gray-600">{r.manager}</td>
                  <td className="px-4 py-3 text-center font-medium">{r.selfRating || '-'}</td>
                  <td className="px-4 py-3 text-center font-medium">{r.managerRating || '-'}</td>
                  <td className="px-4 py-3 text-center font-bold text-indigo-600">{r.finalRating || '-'}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border bg-gray-50 text-gray-700 border-gray-200">
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/hr/performance/reviews/${r.id}`} className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">Open</Link>
                  </td>
                </tr>
              ))}
              {reviews.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">No employees found matching the filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
