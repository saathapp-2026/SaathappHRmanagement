'use client';
import React, { useState } from 'react';
import { Shield, Clock } from 'lucide-react';
import { OffboardingRecord } from '@/data/hr/offboarding';

export function AccountAccessCard({ record, onUpdate }: { record: OffboardingRecord, onUpdate: (record: Partial<OffboardingRecord>) => void }) {
  const acc = record.accountDeactivation;
  const [isScheduling, setIsScheduling] = useState(false);

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      accountDeactivation: {
        ...acc,
        status: 'Scheduled',
        scheduledDate: ((e.currentTarget as any)).date.value,
        scheduledTime: ((e.currentTarget as any)).time.value,
        accessTypes: {
          employeePortal: 'Scheduled',
          email: 'Scheduled',
          hrPortal: 'Scheduled',
          vpn: 'Scheduled',
          internalTools: 'Scheduled'
        }
      }
    });
    setIsScheduling(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-gray-500" />
          <h3 className="font-semibold text-gray-900">Account & Access</h3>
        </div>
        {!isScheduling && acc.status !== 'Deactivated' && (
          <button onClick={() => setIsScheduling(true)} className="text-sm font-medium text-blue-600 hover:text-blue-800">
            Schedule Deactivation
          </button>
        )}
      </div>

      <div className="p-4">
        {isScheduling ? (
          <form onSubmit={handleSchedule} className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Schedule Deactivation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Effective Date</label>
                <input name="date" type="date" required defaultValue={record.adjustedLastWorkingDate} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input name="time" type="time" required defaultValue="18:30" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500" />
              </div>
            </div>
            <p className="text-xs text-gray-500 italic mt-2">Note: This action mocks scheduling in frontend only.</p>
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
              <button type="button" onClick={() => setIsScheduling(false)} className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg">Cancel</button>
              <button type="submit" className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">Confirm Schedule</button>
            </div>
          </form>
        ) : null}

        {acc.status === 'Scheduled' && (
          <div className="flex items-center gap-2 bg-blue-50 text-blue-800 p-3 rounded-lg border border-blue-200 text-sm mb-4">
            <Clock className="w-4 h-4" />
            <p>Deactivation scheduled for <span className="font-medium">{acc.scheduledDate} · {acc.scheduledTime}</span></p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
          {Object.entries(acc.accessTypes).map(([key, val]) => (
            <div key={key} className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                val === 'Active' ? 'bg-green-100 text-green-800' :
                val === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
              }`}>{val as string}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
