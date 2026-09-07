'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, History, Star, FileText } from 'lucide-react';
import { mockPerformanceReviews } from '@/data/hr/performance';

export default function PerformanceHistoryPage() {
  const params = useParams();
  const employeeId = params.employeeId as string;
  
  // Create some fake historical data for this employee based on the ID
  const currentReview = mockPerformanceReviews.find(r => r.employeeId === employeeId) || mockPerformanceReviews[0];
  
  const history = [
    { cycle: 'H2 2026', type: 'Half-Yearly', rating: currentReview.finalRating || 4.0, status: currentReview.status },
    { cycle: 'H1 2026', type: 'Half-Yearly', rating: 3.8, status: 'Finalized' },
    { cycle: '2025 Annual', type: 'Annual', rating: 3.7, status: 'Finalized' },
    { cycle: 'H1 2025', type: 'Half-Yearly', rating: 3.5, status: 'Finalized' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Link href="/hr/performance" className="hover:text-indigo-600 transition-colors">Performance</Link>
        <span>/</span>
        <span className="text-gray-900">History</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance History</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="font-semibold text-gray-900">{currentReview.employeeName}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 text-sm">{currentReview.employeeId}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 text-sm">{currentReview.designation}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 text-sm">{currentReview.department}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Latest Rating</p><p className="text-2xl font-bold mt-1 text-indigo-600">{history[0].rating}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Previous Rating</p><p className="text-2xl font-bold mt-1">{history[1].rating}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Completed Reviews</p><p className="text-2xl font-bold mt-1 text-green-600">{history.length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs text-gray-500">Current Cycle</p><p className="text-lg font-bold mt-2 truncate">{history[0].cycle}</p></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="p-4 border-b border-gray-100 font-semibold text-gray-900 flex items-center gap-2">
            <History className="w-5 h-5 text-gray-500" /> Historical Reviews
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/50 text-gray-500 font-medium">
                <tr>
                  <th className="px-4 py-3">Cycle</th>
                  <th className="px-4 py-3">Review Type</th>
                  <th className="px-4 py-3 text-center">Rating</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {history.map((h, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td className="px-4 py-4 font-medium text-gray-900">{h.cycle}</td>
                    <td className="px-4 py-4 text-gray-600">{h.type}</td>
                    <td className="px-4 py-4 text-center font-bold text-indigo-600">{h.rating}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${h.status === 'Finalized' ? 'bg-gray-50 text-gray-700 border-gray-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                        {h.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      {idx === 0 ? (
                        <Link href={`/hr/performance/reviews/${currentReview.id}`} className="text-indigo-600 hover:text-indigo-800 font-medium">View Review</Link>
                      ) : (
                        <span className="text-gray-400 text-xs italic">Archived</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <div className="p-4 border-b border-gray-100 font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" /> Performance Trend
            </div>
            <CardContent className="p-6">
              <div className="h-48 flex items-end justify-between gap-2 text-xs text-gray-500 pb-6 relative border-b border-gray-200">
                {/* Fake line chart using vertical bars for simplicity */}
                {[...history].reverse().map((h, i) => (
                  <div key={i} className="w-full flex flex-col items-center gap-2 group relative">
                    <div className="w-3 bg-indigo-200 hover:bg-indigo-600 rounded-t-sm transition-colors relative" style={{ height: `${(h.rating/5)*100}%` }}>
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-900 text-white px-2 py-1 rounded text-[10px] transition-opacity whitespace-nowrap">
                        {h.rating}
                      </div>
                    </div>
                    <span className="absolute -bottom-6 w-max">{h.cycle}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-8 text-center italic">Performance progression over time.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
