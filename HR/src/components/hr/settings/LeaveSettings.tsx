import React from 'react';
import { HRSettings } from '@/data/hr/settings';
import { SettingsSectionHeader } from './SettingsSectionHeader';

export function LeaveSettings({ data, onChange }: { data: HRSettings['leave'], onChange: (key: string, val: unknown) => void }) {
  return (
    <div>
      <SettingsSectionHeader title="Leave Settings" description="Configure leave types, allocations, and approval workflows." />
      
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Leave Types</h3>
          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">+ Add Leave Type</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider bg-white">
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">Allocation</th>
                <th className="px-5 py-3 font-semibold">Carry Forward</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {data.types.map(t => (
                <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3 font-semibold text-gray-900 text-sm">{t.name}</td>
                  <td className="px-5 py-3 text-gray-600 text-sm">{t.annualAllocation} days</td>
                  <td className="px-5 py-3 text-gray-600 text-sm">{t.carryForward ? `Yes (Max: ${t.maxCarryForward})` : 'No'}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${t.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold mr-3 transition-colors">Edit</button>
                    <button className="text-gray-400 hover:text-amber-600 text-sm font-semibold transition-colors">Deactivate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Global Rules</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Approval Workflow</label>
          <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={data.approvalWorkflow} onChange={e => onChange('approvalWorkflow', e.target.value)}>
            <option>Manager</option>
            <option>HR</option>
            <option>Manager + HR</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Balance Reset</label>
          <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={data.balanceReset} onChange={e => onChange('balanceReset', e.target.value)}>
            <option>Calendar Year</option>
            <option>Financial Year</option>
            <option>Joining Anniversary</option>
          </select>
        </div>
      </div>
    </div>
  );
}
