import React from 'react';
import { Edit2, MapPin } from 'lucide-react';

export function EmploymentDetails() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Employment Information</h3>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5">
            <Edit2 size={14} /> Edit Details
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Employee ID</p>
            <p className="text-sm font-semibold text-gray-900">EMP001</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Department</p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">Engineering</p>
              <button className="text-xs text-indigo-600 font-medium hover:underline">Change</button>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Designation</p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">Software Developer</p>
              <button className="text-xs text-indigo-600 font-medium hover:underline">Change</button>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Reporting Manager</p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px]">VS</span>
                Vikram Sharma
              </p>
              <button className="text-xs text-indigo-600 font-medium hover:underline">Change</button>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Employment Type</p>
            <p className="text-sm font-semibold text-gray-900">Full-Time</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Employment Status</p>
            <p className="text-sm font-semibold text-gray-900"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">Active</span></p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6 border-b border-gray-100 pb-4">Joining Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Date of Joining</p>
            <p className="text-sm font-semibold text-gray-900">01 Aug 2026</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Probation Period</p>
            <p className="text-sm font-semibold text-gray-900">6 Months</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Probation End Date</p>
            <p className="text-sm font-semibold text-gray-900">31 Jan 2027</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Confirmation Date</p>
            <p className="text-sm font-semibold text-amber-600">Pending</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6 border-b border-gray-100 pb-4">Work Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Work Location</p>
            <p className="text-sm font-semibold text-gray-900 flex items-center gap-1.5"><MapPin size={14} className="text-gray-400"/> Bengaluru HQ</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Work Mode</p>
            <p className="text-sm font-semibold text-gray-900">Hybrid</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Shift</p>
            <p className="text-sm font-semibold text-gray-900">General Shift</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Working Hours</p>
            <p className="text-sm font-semibold text-gray-900">09:30 AM – 06:30 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
