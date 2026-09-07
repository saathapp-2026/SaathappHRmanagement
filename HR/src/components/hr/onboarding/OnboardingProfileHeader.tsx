import React from 'react';
import { OnboardingEmployee } from '@/data/hr/onboarding';

export function OnboardingProfileHeader({ employee }: { employee: OnboardingEmployee }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold text-gray-500 flex-shrink-0">
          {employee.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{employee.name}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 font-medium">
            <span className="text-gray-900">{employee.id}</span>
            <span className="text-gray-300">•</span>
            <span>{employee.designation}</span>
            <span className="text-gray-300">•</span>
            <span>{employee.department}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-6 w-full sm:w-auto bg-gray-50 p-4 rounded-lg border border-gray-100">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1">Status</p>
          <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">{employee.status}</span>
        </div>
        <div className="w-px bg-gray-200"></div>
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1">Joining</p>
          <p className="text-sm font-bold text-gray-900">{employee.joiningDate}</p>
        </div>
      </div>
    </div>
  );
}
