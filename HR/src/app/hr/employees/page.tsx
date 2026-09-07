'use client';

import React from 'react';
import { UserPlus, Upload } from 'lucide-react';
import { EmployeeFilters } from '@/components/hr/employees/EmployeeFilters';
import { EmployeeTable } from '@/components/hr/employees/EmployeeTable';

export default function EmployeesPage() {
  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee Directory</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your workforce, view profiles, and update roles.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium shadow-sm transition-colors">
            <Upload size={18} />
            Import
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <UserPlus size={18} />
            Add Employee
          </button>
        </div>
      </div>

      <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex overflow-x-auto no-scrollbar space-x-1">
        <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-50 text-indigo-700 whitespace-nowrap">Directory</button>
        <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 whitespace-nowrap transition-colors">Org Chart</button>
        <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 whitespace-nowrap transition-colors">Departments</button>
      </div>

      <div className="space-y-4">
        <EmployeeFilters />
        <EmployeeTable />
      </div>
    </div>
  );
}
