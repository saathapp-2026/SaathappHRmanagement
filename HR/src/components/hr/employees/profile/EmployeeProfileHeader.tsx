import React from 'react';
import { mockEmployee } from '@/data/hr/employees';

export function EmployeeProfileHeader() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 font-bold flex items-center justify-center text-2xl flex-shrink-0 shadow-sm border-2 border-white">
          {mockEmployee.avatar}
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{mockEmployee.name}</h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {mockEmployee.status}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 font-medium">
            <span>{mockEmployee.designation}</span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span>{mockEmployee.department}</span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span>ID: {mockEmployee.id}</span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Manager: <span className="text-gray-700 font-medium">{mockEmployee.manager}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start sm:items-end w-full sm:w-auto">
        <div className="flex items-center gap-3 text-sm text-gray-700 font-medium mb-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
          <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>{mockEmployee.status}</span>
          <span className="text-gray-300">|</span>
          <span>{mockEmployee.employmentType}</span>
          <span className="text-gray-300">|</span>
          <span>{mockEmployee.location}</span>
        </div>
        
        <div className="w-full sm:w-48">
          <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
            <span>Profile Completeness</span>
            <span className="text-indigo-600">{mockEmployee.profileCompleteness}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${mockEmployee.profileCompleteness}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
