import React from 'react';
import Link from 'next/link';
import { User, Calendar } from 'lucide-react';

export function EmployeeLeaveHeader({ employeeId }: { employeeId: string }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">AR</div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">Anjali Rao</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">{employeeId} · Engineering</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
        <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-100 text-sm font-medium text-gray-700 flex items-center gap-2">
          <Calendar size={16} className="text-gray-400" />
          Leave Year: <span className="font-bold">2026</span>
        </div>
        <Link href={`/hr/employees/${employeeId}`} className="px-4 py-2 bg-white border border-gray-200 text-indigo-600 hover:bg-indigo-50 rounded-lg text-sm font-medium transition-colors text-center shadow-sm flex items-center justify-center gap-2">
          <User size={16} /> View Profile
        </Link>
      </div>
    </div>
  );
}
