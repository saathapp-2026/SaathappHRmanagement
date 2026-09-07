import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { Award, Star, CheckCircle2 } from 'lucide-react';

export const PerformanceReviewsPage = () => {
  const { performanceReviews } = useHR();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Performance Reviews</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Workflow: Employee Self Review → Manager Review → HR Review → Completed
          </p>
        </div>
      </div>

      {/* Reviews Queue */}
      <div className="space-y-4">
        {performanceReviews.map(r => (
          <div key={r.id} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-extrabold">
                  {r.reviewCycle}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">{r.employeeName}</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-saath-100 text-saath-800 text-xs font-bold">
                {r.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/60 font-medium">
              <div><span className="text-slate-400 block text-[10px]">Work Quality</span><span className="font-bold text-slate-800">{r.workQualityRating} / 5</span></div>
              <div><span className="text-slate-400 block text-[10px]">Productivity</span><span className="font-bold text-slate-800">{r.productivityRating} / 5</span></div>
              <div><span className="text-slate-400 block text-[10px]">Communication</span><span className="font-bold text-slate-800">{r.communicationRating} / 5</span></div>
              <div><span className="text-slate-400 block text-[10px]">Overall Rating</span><span className="font-bold text-purple-700">{r.overallRating} / 5</span></div>
            </div>

            <div className="space-y-2 text-xs">
              <p><strong>Strengths:</strong> {r.strengths}</p>
              <p><strong>Improvement Areas:</strong> {r.improvementAreas}</p>
              <p><strong>Recommended Action:</strong> {r.recommendedAction}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
