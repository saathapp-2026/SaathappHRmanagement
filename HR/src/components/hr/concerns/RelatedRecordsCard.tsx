import React from 'react';
import Link from 'next/link';

export function RelatedRecordsCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Related Records</h3>
      </div>
      <div className="p-5 space-y-4">
        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Previous Concerns</h4>
          <Link href="/hr/concerns/CON-2026-00083" className="block p-3 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors bg-gray-50">
            <div className="flex justify-between items-start mb-1">
              <span className="text-xs font-bold text-gray-700">CON-2026-00083</span>
              <span className="text-[10px] font-bold bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded uppercase">Closed</span>
            </div>
            <p className="text-xs text-gray-500">Attendance Issue • 12 Aug 2026</p>
          </Link>
        </div>
        
        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Recent Requests</h4>
          <Link href="/hr/corrections/ACR-2026-00124" className="block p-3 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors mb-2">
            <div className="flex justify-between items-start mb-1">
              <span className="text-xs font-bold text-gray-700">ACR-2026-00124</span>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded uppercase">Approved</span>
            </div>
            <p className="text-xs text-gray-500">Attendance Correction • 05 Sep</p>
          </Link>
          <Link href="/hr/leave/LVR-2026-00124" className="block p-3 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
            <div className="flex justify-between items-start mb-1">
              <span className="text-xs font-bold text-gray-700">LVR-2026-00124</span>
              <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded uppercase">Pending</span>
            </div>
            <p className="text-xs text-gray-500">Leave Request • 10-11 Sep</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
