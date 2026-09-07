'use client';
import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { OffboardingRecord, SettlementStatus } from '@/data/hr/offboarding';

export function FinalSettlementCard({ record, onUpdate }: { record: OffboardingRecord, onUpdate: (record: Partial<OffboardingRecord>) => void }) {
  const fs = record.finalSettlement;
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState<SettlementStatus>(fs.status);

  const handleUpdate = () => {
    onUpdate({
      finalSettlement: {
        ...fs,
        status,
        salaryInputsStatus: status === 'Ready' || status === 'Processed' ? 'Processed' : fs.salaryInputsStatus,
        leaveEncashmentStatus: status === 'Ready' || status === 'Processed' ? 'Processed' : fs.leaveEncashmentStatus,
        expenseReimbursementsStatus: status === 'Ready' || status === 'Processed' ? 'Processed' : fs.expenseReimbursementsStatus,
        deductionsStatus: status === 'Ready' || status === 'Processed' ? 'Processed' : fs.deductionsStatus,
      }
    });
    setIsUpdating(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-gray-900">Final Settlement</h3>
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
            fs.status === 'Processed' ? 'bg-green-100 text-green-800' :
            fs.status === 'Ready' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {fs.status}
          </span>
        </div>
        {!isUpdating && (
          <button onClick={() => setIsUpdating(true)} className="text-sm font-medium text-blue-600 hover:text-blue-800">
            Update Status
          </button>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start gap-2 bg-yellow-50 text-yellow-800 p-3 rounded-lg border border-yellow-200 text-xs mb-4">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>Final settlement values are tracking placeholders in the frontend. Payroll calculations will be handled by the Payroll module/backend.</p>
        </div>

        {isUpdating ? (
          <div className="flex items-end gap-3 mb-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Settlement Status</label>
              <select 
                value={status}
                onChange={e => setStatus(e.target.value as SettlementStatus)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Not Started">Not Started</option>
                <option value="Inputs Pending">Inputs Pending</option>
                <option value="Under Review">Under Review</option>
                <option value="Ready">Ready</option>
                <option value="Processed">Processed</option>
              </select>
            </div>
            <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg">Save</button>
            <button onClick={() => setIsUpdating(false)} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg">Cancel</button>
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-gray-600">Salary Inputs</span>
            <span className={`font-medium ${fs.salaryInputsStatus === 'Processed' ? 'text-green-600' : 'text-gray-900'}`}>{fs.salaryInputsStatus}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-gray-600">Leave Encashment</span>
            <span className={`font-medium ${fs.leaveEncashmentStatus === 'Processed' ? 'text-green-600' : 'text-gray-900'}`}>{fs.leaveEncashmentStatus}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-gray-600">Notice Recovery/Waiver</span>
            <span className="font-medium text-gray-900">{fs.noticeRecoveryWaiverStatus}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-gray-600">Expense Reimbursements</span>
            <span className={`font-medium ${fs.expenseReimbursementsStatus === 'Processed' ? 'text-green-600' : 'text-gray-900'}`}>
              {fs.expenseReimbursementAmount ? `₹${fs.expenseReimbursementAmount} ` : ''}{fs.expenseReimbursementsStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
