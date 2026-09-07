import React from 'react';
import { AlertCircle, AlertTriangle } from 'lucide-react';

export function AssetAttentionCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden h-full">
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
        <AlertCircle size={18} className="text-rose-500" />
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Needs Attention</h3>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
          <AlertTriangle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-amber-900">9 assets pending return</p>
            <p className="text-xs text-amber-700">2 are overdue by &gt;3 days.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-rose-50 rounded-lg border border-rose-100">
          <AlertCircle size={16} className="text-rose-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-rose-900">3 damaged assets need review</p>
            <p className="text-xs text-rose-700">Require repair approval.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
          <AlertCircle size={16} className="text-indigo-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-indigo-900">4 unassigned employees</p>
            <p className="text-xs text-indigo-700">Require laptops for onboarding.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
