import React from 'react';
import { ConcernCase } from '@/data/hr/concerns';

export function ConcernSummary({ caseData }: { caseData: ConcernCase }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Concern Summary</h2>
      </div>
      <div className="p-5 space-y-5">
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-1">{caseData.subject}</h3>
          <p className="text-xs text-gray-500">Submitted by <span className="font-semibold text-gray-700">{caseData.employeeName}</span> on {caseData.submittedAt}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">&quot;{caseData.description}&quot;</p>
        </div>
      </div>
    </div>
  );
}
