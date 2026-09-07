'use client';
import React, { useState } from 'react';
import { Check, CheckCircle2 } from 'lucide-react';
import { OffboardingRecord } from '@/data/hr/offboarding';

export function HRReviewCard({ record, onUpdate }: { record: OffboardingRecord, onUpdate: (record: Partial<OffboardingRecord>) => void }) {
  const [review, setReview] = useState(record.hrReview);

  const toggleCheck = (field: keyof typeof review) => {
    if (review.completed) return;
    setReview(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleComplete = () => {
    const updated = { ...review, completed: true };
    setReview(updated);
    onUpdate({ hrReview: updated });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">HR Review</h3>
        {review.completed && (
          <span className="flex items-center gap-1 text-sm font-medium text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full">
            <CheckCircle2 className="w-4 h-4" />
            Completed
          </span>
        )}
      </div>
      
      <div className="p-4 space-y-3 text-sm">
        <label className="flex items-start gap-3 cursor-pointer">
          <input 
            type="checkbox" 
            checked={review.resignationReviewed}
            onChange={() => toggleCheck('resignationReviewed')}
            disabled={review.completed}
            className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className={review.resignationReviewed ? 'text-gray-900 line-through opacity-70' : 'text-gray-900'}>
            Resignation request reviewed
          </span>
        </label>
        
        <label className="flex items-start gap-3 cursor-pointer">
          <input 
            type="checkbox" 
            checked={review.noticePeriodVerified}
            onChange={() => toggleCheck('noticePeriodVerified')}
            disabled={review.completed}
            className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className={review.noticePeriodVerified ? 'text-gray-900 line-through opacity-70' : 'text-gray-900'}>
            Notice period requirement verified against policy
          </span>
        </label>
        
        <label className="flex items-start gap-3 cursor-pointer">
          <input 
            type="checkbox" 
            checked={review.requestedLastWorkingDateReviewed}
            onChange={() => toggleCheck('requestedLastWorkingDateReviewed')}
            disabled={review.completed}
            className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className={review.requestedLastWorkingDateReviewed ? 'text-gray-900 line-through opacity-70' : 'text-gray-900'}>
            Requested Last Working Date evaluated
          </span>
        </label>
        
        <label className="flex items-start gap-3 cursor-pointer">
          <input 
            type="checkbox" 
            checked={review.managerNotified}
            onChange={() => toggleCheck('managerNotified')}
            disabled={review.completed}
            className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className={review.managerNotified ? 'text-gray-900 line-through opacity-70' : 'text-gray-900'}>
            Reporting manager notified
          </span>
        </label>

        {!review.completed && (
          <div className="pt-4 border-t border-gray-100 mt-2">
            <button 
              onClick={handleComplete}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              <Check className="w-4 h-4" />
              Complete HR Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
