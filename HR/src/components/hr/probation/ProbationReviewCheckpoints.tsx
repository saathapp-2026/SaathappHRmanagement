import React from 'react';
import { ProbationRecord } from '@/data/hr/probation';

interface ProbationReviewCheckpointsProps {
  record: ProbationRecord;
}

export function ProbationReviewCheckpoints({ record }: ProbationReviewCheckpointsProps) {
  const checkpoints = [
    { type: '30-Day Check-in' },
    { type: 'Mid-Probation Review' },
    { type: 'Final Probation Review' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
        <h3 className="text-base font-semibold text-gray-900">Review Checkpoints</h3>
      </div>
      <div className="space-y-4">
        {checkpoints.map((cp, idx) => {
          const rev = record.reviews.find(r => r.type === cp.type);
          return (
            <div key={idx} className="flex items-start justify-between border border-gray-50 rounded-lg p-3 bg-gray-50/50">
              <div>
                <p className="font-medium text-gray-900 text-sm">{cp.type}</p>
                {rev?.scheduledDate ? (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(rev.scheduledDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    {rev.scheduledTime ? ` · ${rev.scheduledTime}` : ''}
                  </p>
                ) : (
                  <p className="text-xs text-gray-400 mt-0.5">Not scheduled</p>
                )}
                {rev?.reviewer && <p className="text-xs text-gray-500 mt-1">Reviewer: {rev.reviewer}</p>}
                {rev?.remarks && <p className="text-xs text-gray-600 mt-2 italic">"{rev.remarks}"</p>}
              </div>
              <div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  rev?.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                  rev?.status === 'Scheduled' ? 'bg-indigo-50 text-indigo-700' :
                  rev?.status === 'Missed' ? 'bg-red-50 text-red-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {rev?.status || 'Not Scheduled'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
