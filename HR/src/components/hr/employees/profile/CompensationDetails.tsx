import React from 'react';
import { Lock, History, DollarSign } from 'lucide-react';

export function CompensationDetails() {
  return (
    <div className="space-y-6">
      <div className="bg-amber-50 rounded-lg p-3 flex items-start gap-3 border border-amber-200">
        <Lock size={18} className="text-amber-600 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-800">Restricted HR Information</p>
          <p className="text-xs text-amber-700 mt-0.5">Compensation information is visible only to authorized HR personnel.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Current Compensation</h3>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5">
            <History size={14} /> View Salary History
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Annual CTC</p>
            <p className="text-2xl font-bold text-gray-900">₹8,40,000</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Monthly Gross</p>
            <p className="text-2xl font-bold text-gray-900">₹70,000</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Effective Date</p>
            <p className="text-sm font-semibold text-gray-900 mt-2">01 Aug 2026</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Payroll Status</p>
            <p className="mt-1.5"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">Active</span></p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2"><DollarSign size={16} className="text-gray-500"/> Salary Structure Breakdown</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 font-medium">Basic</span>
              <span className="font-semibold text-gray-900">₹35,000</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 font-medium">HRA</span>
              <span className="font-semibold text-gray-900">₹17,500</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 font-medium">Special Allowance</span>
              <span className="font-semibold text-gray-900">₹12,500</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 font-medium">Other Allowance</span>
              <span className="font-semibold text-gray-900">₹5,000</span>
            </div>
            <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between items-center text-sm">
              <span className="text-gray-900 font-bold">Total Monthly Gross</span>
              <span className="font-bold text-indigo-700 text-base">₹70,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
