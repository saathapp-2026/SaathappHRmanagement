import React from 'react';
import { ProbationRecord } from '@/data/hr/probation';

interface ManagerRecommendationCardProps {
  record: ProbationRecord;
}

export function ManagerRecommendationCard({ record }: ManagerRecommendationCardProps) {
  if (!record.managerRecommendation) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-2 border-b border-gray-100 pb-2">Manager Recommendation</h3>
        <p className="text-sm text-gray-500 italic py-4">No recommendation received yet.</p>
      </div>
    );
  }

  const { type, remarks, submittedBy, date } = record.managerRecommendation;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Manager Recommendation</h3>
      <div className="space-y-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Recommendation</p>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium ${
            type === 'Confirm Employment' ? 'bg-emerald-50 text-emerald-700' :
            type === 'Extend Probation' ? 'bg-blue-50 text-blue-700' :
            'bg-amber-50 text-amber-700'
          }`}>
            {type}
          </span>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Manager Remarks</p>
          <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 border border-gray-100">
            "{remarks}"
          </div>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
          <span>Submitted By: <span className="font-medium text-gray-700">{submittedBy}</span></span>
          <span>Date: {new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
        </div>
      </div>
    </div>
  );
}
