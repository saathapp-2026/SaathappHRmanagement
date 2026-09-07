import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';

export function EmployeeAttendanceHeader({ employeeId }: { employeeId: string }) {
  // Mock data resolution
  const empName = employeeId === 'EMP001' ? 'Anjali Rao' : 'Employee Name';
  const empRole = employeeId === 'EMP001' ? 'Software Developer' : 'Role';
  const empDept = employeeId === 'EMP001' ? 'Engineering' : 'Department';

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-xl font-bold text-indigo-700 flex-shrink-0">
          {empName.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{empName}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 font-medium">
            <span className="text-gray-900">{employeeId}</span>
            <span className="text-gray-300">•</span>
            <span>{empRole}</span>
            <span className="text-gray-300">•</span>
            <span>{empDept}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:items-end gap-4 w-full sm:w-auto">
        <Link href={`/hr/employees/${employeeId}`} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm transition-colors flex items-center gap-2">
          <User size={16} /> View Employee Profile
        </Link>
        <div className="flex items-center bg-gray-50 p-1.5 rounded-lg border border-gray-200">
          <button className="p-1 text-gray-500 hover:bg-white hover:shadow-sm rounded transition-all"><ChevronLeft size={16}/></button>
          <span className="px-4 text-sm font-bold text-gray-900">September 2026</span>
          <button className="p-1 text-gray-500 hover:bg-white hover:shadow-sm rounded transition-all"><ChevronRight size={16}/></button>
        </div>
      </div>
    </div>
  );
}
