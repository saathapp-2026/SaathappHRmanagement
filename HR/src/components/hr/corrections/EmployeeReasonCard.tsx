import React from 'react';
import { MessageSquareQuote } from 'lucide-react';
import { AttendanceCorrection } from '@/data/hr/corrections';

export function EmployeeReasonCard({ correction }: { correction: AttendanceCorrection }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquareQuote size={18} className="text-indigo-600" />
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Employee Reason</h3>
      </div>
      <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 relative">
        <div className="absolute -left-2 top-6 w-4 h-4 bg-gray-50 border-t border-l border-gray-100 transform -rotate-45"></div>
        <p className="text-sm text-gray-800 leading-relaxed relative z-10 italic">&quot;{correction.reason}&quot;</p>
      </div>
    </div>
  );
}
