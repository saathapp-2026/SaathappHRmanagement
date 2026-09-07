'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertCircle, User, Star, FileText, Lock, MessageSquare } from 'lucide-react';
import { mockPerformanceReviews, mockGoals, mockPerformanceCycles } from '@/data/hr/performance';

export default function PerformanceReviewPage() {
  const params = useParams();
  const reviewId = params.reviewId as string;
  const review = mockPerformanceReviews.find(r => r.id === reviewId) || mockPerformanceReviews[0];
  const cycle = mockPerformanceCycles.find(c => c.id === review.cycleId) || mockPerformanceCycles[0];
  const goals = mockGoals.filter(g => g.reviewId === reviewId);
  
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

      {/* Header */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Link href="/hr/performance" className="hover:text-indigo-600 transition-colors">Performance</Link>
        <span>/</span>
        <Link href={`/hr/performance/cycles/${cycle.id}`} className="hover:text-indigo-600 transition-colors">{cycle.name}</Link>
        <span>/</span>
        <span className="text-gray-900">Review</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance Review</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="font-semibold text-gray-900">{review.employeeName}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 text-sm">{review.employeeId}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 text-sm">{review.designation}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 text-sm">{review.department}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/hr/performance/employee/${review.employeeId}`} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            History
          </Link>
          <button 
            onClick={() => triggerToast('Reminder recorded.')}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Send Reminder
          </button>
          {review.status !== 'Finalized' && (
            <button 
              onClick={() => triggerToast('Review finalized successfully.')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
            >
              Finalize Review
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          
          {/* Goals and KRAs */}
          <Card>
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Star className="w-5 h-5 text-indigo-500" />
                Goals & KRAs
              </h3>
              <span className="text-sm text-gray-500 font-medium">{goals.length} Goals • 100% Weight</span>
            </div>
            <div className="divide-y divide-gray-100">
              {goals.map((goal, idx) => (
                <div key={idx} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{goal.type}</span>
                        <h4 className="font-bold text-gray-900">{goal.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{goal.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">{goal.weight}%</div>
                      <div className="text-xs text-gray-500 font-medium">Weight</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="bg-gray-50 p-3 rounded border border-gray-100">
                      <span className="text-gray-500 block mb-1 text-xs">Metric</span>
                      <span className="font-medium text-gray-900">{goal.metric}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded border border-gray-100">
                      <span className="text-gray-500 block mb-1 text-xs">Target</span>
                      <span className="font-medium text-gray-900">{goal.target}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-gray-100 rounded-lg overflow-hidden">
                    <div className="p-4 border-b md:border-b-0 md:border-r border-gray-100">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-gray-900 text-sm">Employee Self Rating</span>
                        <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-lg">{goal.selfRating || '-'}</span>
                      </div>
                      <p className="text-sm text-gray-600 italic">"I delivered major product milestones and improved release quality. Achieved 95% feature completion."</p>
                    </div>
                    <div className="p-4 bg-gray-50/50">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-gray-900 text-sm">Manager Rating</span>
                        <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-lg">{goal.managerRating || '-'}</span>
                      </div>
                      <p className="text-sm text-gray-600 italic">"Excellent work on the delivery front. Code quality has remained stable."</p>
                    </div>
                  </div>
                </div>
              ))}
              {goals.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <p>No goals defined for this review.</p>
                </div>
              )}
            </div>
          </Card>

          {/* HR Calibration Section */}
          <Card className="border-indigo-100">
            <div className="p-4 border-b border-indigo-100 bg-indigo-50/50 flex justify-between items-center">
              <h3 className="font-semibold text-indigo-900 flex items-center gap-2">
                <FileText className="w-5 h-5" /> HR Calibration & Finalization
              </h3>
            </div>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 border border-gray-100 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Self</p>
                  <p className="text-2xl font-bold text-gray-900">{review.selfRating || '-'}</p>
                </div>
                <div className="p-4 border border-gray-100 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Manager</p>
                  <p className="text-2xl font-bold text-gray-900">{review.managerRating || '-'}</p>
                </div>
                <div className="p-4 border border-indigo-200 bg-indigo-50 rounded-lg">
                  <p className="text-xs text-indigo-700 uppercase font-bold tracking-wider mb-1">Calibrated</p>
                  <p className="text-2xl font-bold text-indigo-700">{review.calibratedRating || '-'}</p>
                </div>
                <div className="p-4 border border-gray-900 bg-gray-900 text-white rounded-lg">
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Final</p>
                  <p className="text-2xl font-bold">{review.finalRating || '-'}</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="font-medium text-gray-900 text-sm">HR Checklist</h4>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                  <span className="text-sm text-gray-700">Self Review Submitted</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                  <span className="text-sm text-gray-700">Manager Review Completed</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                  <span className="text-sm text-gray-700">Goal Weights Total 100%</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">Internal HR Remark (Not visible to employee)</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  rows={3}
                  placeholder="Add a private note about calibration or finalization..."
                  defaultValue="Ratings are consistent with department average. No calibration adjustment required."
                ></textarea>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Context */}
        <div className="space-y-6">
          <Card>
            <div className="p-4 border-b border-gray-100 font-semibold text-gray-900">Review Status</div>
            <CardContent className="p-4 space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Current Stage</span>
                <span className="font-semibold text-indigo-600">{review.status}</span>
              </div>
              <div className="flex flex-col gap-1 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Manager</span>
                <span className="text-sm font-medium text-gray-900">{review.manager}</span>
              </div>
              <div className="flex flex-col gap-1 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Cycle</span>
                <span className="text-sm font-medium text-gray-900">{cycle.name}</span>
                <span className="text-xs text-gray-500">{cycle.period}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <div className="p-4 border-b border-gray-100 font-semibold text-gray-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-gray-500" /> Privacy
            </div>
            <CardContent className="p-4 text-sm text-gray-600 space-y-3">
              <p>• Employee Self Review is <span className="font-medium text-gray-900">read-only</span> to HR.</p>
              <p>• Calibration decisions and HR remarks remain <span className="font-medium text-gray-900">internal</span>.</p>
              <p>• Final rating will be visible to the employee once finalized.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
