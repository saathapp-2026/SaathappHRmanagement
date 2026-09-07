import React from 'react';
import { ProbationRecord } from '@/data/hr/probation';

interface ProbationProgressTimelineProps {
  record: ProbationRecord;
}

export function ProbationProgressTimeline({ record }: ProbationProgressTimelineProps) {
  // Mock timeline events based on the record
  const timeline = [
    { title: 'Joined', date: record.joiningDate, completed: true },
    { title: '30-Day Check-in', date: record.reviews.find(r => r.type === '30-Day Check-in')?.scheduledDate || 'Not Set', completed: record.reviews.some(r => r.type === '30-Day Check-in' && r.status === 'Completed') },
    { title: 'Mid-Probation Review', date: record.reviews.find(r => r.type === 'Mid-Probation Review')?.scheduledDate || 'Not Set', completed: record.reviews.some(r => r.type === 'Mid-Probation Review' && r.status === 'Completed') },
    { title: 'Final Review', date: record.reviews.find(r => r.type === 'Final Probation Review')?.scheduledDate || 'Not Set', completed: record.reviews.some(r => r.type === 'Final Probation Review' && r.status === 'Completed') },
    { title: 'Probation End', date: record.currentEndDate, completed: record.status === 'Confirmed' || (record.daysRemaining < 0 && record.status !== 'Extended' && record.status !== 'Active') },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-6">Progress</h3>
      <div className="relative flex justify-between items-start w-full">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
        {timeline.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center w-1/5 relative">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white mb-2 ${item.completed ? 'bg-indigo-600' : 'bg-gray-200'}`}>
              {item.completed && (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <p className="text-xs font-medium text-gray-900 text-center">{item.title}</p>
            <p className="text-xs text-gray-500 text-center mt-1">
              {item.date !== 'Not Set' ? new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : 'Not Set'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
