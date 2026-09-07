'use client';
import React from 'react';
import { Clock } from 'lucide-react';
import { OffboardingTimelineEvent } from '@/data/hr/offboarding';

export function OffboardingTimeline({ events }: { events: OffboardingTimelineEvent[] }) {
  if (!events || events.length === 0) return null;

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-gray-500" />
        <h3 className="font-semibold text-gray-900 text-sm">Timeline</h3>
      </div>
      
      <div className="space-y-4">
        {events.map((event, idx) => (
          <div key={event.id} className="relative pl-6 pb-4 last:pb-0">
            {idx !== events.length - 1 && (
              <div className="absolute left-[7px] top-2 bottom-0 w-px bg-gray-200" />
            )}
            <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-blue-50 flex items-center justify-center border border-blue-200">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{event.title}</p>
              <p className="text-xs text-gray-500">{event.date} · {event.time}</p>
              {event.description && <p className="text-xs text-gray-600 mt-1">{event.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
