import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { ProbationRecord } from '@/data/hr/probation';

interface ProbationAttentionCardProps {
  records: ProbationRecord[];
}

export function ProbationAttentionCard({ records }: ProbationAttentionCardProps) {
  const overdueDecisions = records.filter(r => r.status === 'Overdue').length;
  const noReviewScheduled = records.filter(r => r.status !== 'Confirmed' && r.status !== 'Cancelled' && !r.reviews.some(rev => rev.status === 'Scheduled')).length;
  // Awaiting recommendation could be records near end without recommendation
  const awaitingRecommendation = records.filter(r => r.daysRemaining >= 0 && r.daysRemaining <= 15 && !r.managerRecommendation).length;

  const issues = [
    { count: overdueDecisions, text: 'probation decisions overdue', color: 'text-red-600' },
    { count: noReviewScheduled, text: 'reviews not scheduled', color: 'text-amber-600' },
    { count: awaitingRecommendation, text: 'employees have no manager recommendation', color: 'text-orange-600' },
  ].filter(issue => issue.count > 0);

  if (issues.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden mt-6">
      <div className="p-4 border-b border-red-50 bg-red-50 flex items-center gap-2">
        <AlertTriangle size={18} className="text-red-600" />
        <h3 className="font-semibold text-red-900">Needs Attention</h3>
      </div>
      <div className="p-4 space-y-3">
        {issues.map((issue, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <span className={`font-bold ${issue.color}`}>{issue.count}</span>
            <span className="text-sm text-gray-700">{issue.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
