'use client';
import React, { useState } from 'react';
import { CheckSquare } from 'lucide-react';
import { OffboardingRecord } from '@/data/hr/offboarding';

export function FinalOffboardingChecklist({ record, onUpdate }: { record: OffboardingRecord, onUpdate: (record: Partial<OffboardingRecord>) => void }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmCheck, setConfirmCheck] = useState(false);

  const isResignationReviewed = record.hrReview.completed;
  const isManagerDecisionRecorded = record.managerDecision.status !== 'Pending';
  const isKTCompleted = record.ktTasks.length === 0 || record.ktTasks.every(t => t.status === 'Completed' || t.status === ('Not Applicable' as any));
  const isClearanceCompleted = record.clearanceChecklist.every(c => c.status === 'Cleared' || c.status === 'Not Applicable');
  const isSettlementProcessed = record.finalSettlement.status === 'Processed';
  const isAccountDeactivated = record.accountDeactivation.status === 'Scheduled' || record.accountDeactivation.status === 'Deactivated';

  const checks = [
    { label: 'HR Review Completed', done: isResignationReviewed },
    { label: 'Manager Decision Recorded', done: isManagerDecisionRecorded },
    { label: 'KT Completed', done: isKTCompleted },
    { label: 'Clearance Completed', done: isClearanceCompleted },
    { label: 'Settlement Processed', done: isSettlementProcessed },
    { label: 'Account Deactivation Scheduled', done: isAccountDeactivated },
  ];

  const completedChecks = checks.filter(c => c.done).length;
  const totalChecks = checks.length;
  const canComplete = completedChecks === totalChecks;

  const handleComplete = () => {
    onUpdate({
      status: 'Completed',
      progress: 100,
      internalNotes: [
        {
          id: Date.now().toString(),
          author: record.hrOwner || 'HR Admin',
          timestamp: new Date().toLocaleString(),
          note: 'Employee offboarding process fully completed.'
        },
        ...record.internalNotes
      ]
    });
    setIsConfirming(false);
  };

  if (record.status === 'Completed') {
    return (
      <div className="bg-green-50 rounded-xl border border-green-200 p-6 flex flex-col items-center justify-center text-center">
        <CheckSquare className="w-12 h-12 text-green-600 mb-3" />
        <h3 className="text-lg font-bold text-green-900 mb-1">Offboarding Completed</h3>
        <p className="text-sm text-green-700">The offboarding process for {record.employeeName} was successfully completed.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">Final Offboarding Checklist</h3>
        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
          {completedChecks} / {totalChecks} Complete
        </span>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {checks.map((check, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                check.done ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'
              }`}>
                {check.done && <CheckSquare className="w-2.5 h-2.5" />}
              </span>
              <span className={check.done ? 'text-gray-900' : 'text-gray-500'}>{check.label}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button 
            onClick={() => setIsConfirming(true)}
            disabled={!canComplete}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Complete Offboarding
          </button>
        </div>
      </div>

      {isConfirming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Complete Employee Offboarding?</h2>
            <p className="text-sm text-gray-600 mb-4">
              You are about to complete the offboarding process for <strong>{record.employeeName}</strong>. 
              This action will mark the workflow as finished. (Mock frontend action)
            </p>
            <label className="flex items-start gap-2 mb-6 cursor-pointer">
              <input 
                type="checkbox" 
                checked={confirmCheck}
                onChange={e => setConfirmCheck(e.target.checked)}
                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">I confirm mandatory clearance and exit actions are complete.</span>
            </label>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsConfirming(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-300"
              >
                Cancel
              </button>
              <button 
                onClick={handleComplete}
                disabled={!confirmCheck}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
              >
                Complete Offboarding
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
