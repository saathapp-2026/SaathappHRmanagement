import React from 'react';
import Link from 'next/link';
import { AlertCircle, Clock, FileWarning, ArrowRight } from 'lucide-react';

export function AttendanceAttentionCard() {
  const items = [
    { icon: Clock, text: '13 employees have not checked in', color: 'text-gray-500', bg: 'bg-gray-100' },
    { icon: AlertCircle, text: '14 employees arrived late', color: 'text-amber-500', bg: 'bg-amber-100' },
    { icon: FileWarning, text: '3 employees have unusually short work hours', color: 'text-rose-500', bg: 'bg-rose-100' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">Needs Attention</h3>
      <div className="flex-1 space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${item.bg} ${item.color} flex-shrink-0`}>
              <item.icon size={16} />
            </div>
            <p className="text-sm font-medium text-gray-700 pt-1">{item.text}</p>
          </div>
        ))}
        
        <div className="flex items-start gap-3 mt-6 pt-4 border-t border-gray-100">
          <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 flex-shrink-0">
            <FileWarning size={16} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 pt-1 mb-1">2 corrections pending &gt; 48 hrs</p>
            <Link href="/hr/corrections" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              Review Corrections <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
