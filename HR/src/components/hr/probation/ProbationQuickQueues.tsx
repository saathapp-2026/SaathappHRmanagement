import React from 'react';

interface ProbationQuickQueuesProps {
  onSelectQueue: (queue: string) => void;
}

export function ProbationQuickQueues({ onSelectQueue }: ProbationQuickQueuesProps) {
  const queues = [
    'Ending in 7 Days',
    'Ending in 15 Days',
    'Ending in 30 Days',
    'No Review Scheduled',
    'Awaiting Manager Recommendation',
    'Overdue'
  ];

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm text-gray-500 mr-1 font-medium">Quick Queues:</span>
      {queues.map(queue => (
        <button
          key={queue}
          onClick={() => onSelectQueue(queue)}
          className="px-3 py-1.5 bg-white border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-600 hover:text-indigo-700 rounded-full text-xs font-medium transition-colors"
        >
          {queue}
        </button>
      ))}
    </div>
  );
}
