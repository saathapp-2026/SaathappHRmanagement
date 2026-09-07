import React from 'react';
import { ArrowRight, AlertCircle } from 'lucide-react';

export function AttentionCard() {
  const items = [
    { text: '2 documents expiring soon', priority: 'urgent' },
    { text: '3 employees ending probation this week', priority: 'attention' },
    { text: '2 attendance corrections older than 48 hrs', priority: 'attention' },
    { text: '1 invitation expires today', priority: 'warning' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'attention': return 'bg-orange-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <AlertCircle size={20} className="text-orange-500" />
        <h3 className="font-bold text-gray-900 text-lg">Needs Your Attention</h3>
      </div>

      <div className="flex-1 space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors group cursor-pointer">
            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${getPriorityColor(item.priority)}`}></div>
            <p className="text-sm text-gray-700 font-medium group-hover:text-gray-900 transition-colors flex-1">
              {item.text}
            </p>
            <ArrowRight size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all mt-0.5" />
          </div>
        ))}
      </div>
    </div>
  );
}
