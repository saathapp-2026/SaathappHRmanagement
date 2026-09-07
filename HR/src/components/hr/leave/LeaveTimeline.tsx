import React from 'react';
import { History, User, Users } from 'lucide-react';
import { LeaveRequest } from '@/data/hr/leave';

export function LeaveTimeline({ request }: { request: LeaveRequest }) {
  const events = [
    { title: 'Leave Request Submitted', actor: request.employeeName, time: '07 Sep · 09:42 AM', icon: User, color: 'text-gray-500', bg: 'bg-gray-100 border-gray-200' },
    { title: 'Opened by HR', actor: 'Priya Sharma', time: '07 Sep · 10:05 AM', icon: History, color: 'text-indigo-500', bg: 'bg-indigo-50 border-indigo-200' },
    { title: 'Team Availability Reviewed', actor: 'Priya Sharma', time: '07 Sep · 10:07 AM', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50 border-indigo-200' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Approval History</h3>
      <div className="relative">
        <div className="absolute left-3 top-2 bottom-2 w-px bg-gray-100"></div>
        <div className="space-y-6 relative z-10">
          {events.map((event, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border mt-0.5 ${event.bg} ${event.color}`}>
                <event.icon size={12} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{event.title}</p>
                <p className="text-xs text-gray-500 mt-1 font-medium">{event.actor} <span className="mx-1">•</span> {event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
