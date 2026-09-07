import React from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { ConcernCategory } from '@/data/hr/concerns';

export function ConcernConfidentialityBanner({ category }: { category: ConcernCategory }) {
  if (category === 'Harassment') {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start gap-3 mb-6">
        <ShieldAlert className="text-rose-600 flex-shrink-0 mt-0.5" size={20} />
        <div>
          <h3 className="text-sm font-bold text-rose-900 mb-0.5">Highly Confidential</h3>
          <p className="text-sm text-rose-800">Restrict access to authorized HR personnel. Do not expose investigation notes to the employee portal.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3 mb-6">
      <ShieldCheck className="text-slate-500 flex-shrink-0 mt-0.5" size={20} />
      <div>
        <h3 className="text-sm font-bold text-slate-800 mb-0.5">Confidential HR Case</h3>
        <p className="text-sm text-slate-600">Access to this case should be limited to authorized HR personnel.</p>
      </div>
    </div>
  );
}
