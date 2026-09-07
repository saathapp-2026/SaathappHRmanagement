import React from 'react';
import { ConcernTimelineEvent } from '@/data/hr/concerns';

export function ConcernTimeline({ timeline }: { timeline: ConcernTimelineEvent[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">Case Timeline</h3>
      <div className="relative border-l-2 border-gray-100 ml-3 space-y-6 pb-2">
        {timeline.map((event, idx) => (
          <div key={event.id} className="relative pl-6">
            <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${idx === timeline.length - 1 ? 'bg-indigo-600 ring-4 ring-indigo-50' : 'bg-gray-300'}`}></div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900">{event.title}</span>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
                <span className="font-semibold text-gray-700">{event.actor}</span>
                <span>•</span>
                <span>{event.date}</span>
              </div>
              {event.description && <p className="text-xs text-gray-600 mt-1">{event.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
