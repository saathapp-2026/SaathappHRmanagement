import React from 'react';
import { History, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { AttendanceCorrection } from '@/data/hr/corrections';

export function CorrectionTimeline({ correction }: { correction: AttendanceCorrection }) {
  const events = [
    { type: 'submitted', title: 'Request Submitted', actor: correction.employeeName, time: '06 Sep · 10:32 AM', icon: User, color: 'text-gray-500', bg: 'bg-gray-100 border-gray-200' },
    { type: 'viewed', title: 'Opened by HR', actor: correction.assignedTo || 'HR Admin', time: '06 Sep · 11:15 AM', icon: History, color: 'text-indigo-500', bg: 'bg-indigo-50 border-indigo-200' },
  ];

  if (correction.status === 'Needs Information') {
    events.push({ type: 'info', title: 'Information Requested', actor: correction.assignedTo || 'HR Admin', time: '06 Sep · 11:20 AM', icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50 border-amber-200' });
  } else if (correction.status === 'Approved') {
    events.push({ type: 'approved', title: 'Approved', actor: correction.assignedTo || 'HR Admin', time: '07 Sep · 11:05 AM', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50 border-emerald-200' });
  }

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
