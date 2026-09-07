import React from 'react';
import { AlertCircle, Clock, MessageSquare, ArrowRight } from 'lucide-react';

export function CorrectionAttentionCard() {
  const items = [
    { icon: Clock, text: '2 requests older than 48 hours', color: 'text-rose-500', bg: 'bg-rose-100' },
    { icon: AlertCircle, text: '1 urgent correction pending', color: 'text-amber-500', bg: 'bg-amber-100' },
    { icon: MessageSquare, text: '2 requests returned with evidence', color: 'text-blue-500', bg: 'bg-blue-100' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">Needs Attention</h3>
      <div className="flex-1 space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 cursor-pointer group">
            <div className={`p-2 rounded-lg ${item.bg} ${item.color} flex-shrink-0 group-hover:scale-105 transition-transform`}>
              <item.icon size={16} />
            </div>
            <p className="text-sm font-medium text-gray-700 pt-1 group-hover:text-indigo-600 transition-colors">{item.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1 group">
          View all actionable items <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
