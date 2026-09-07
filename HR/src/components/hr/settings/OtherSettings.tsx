import React from 'react';
import { HRSettings } from '@/data/hr/settings';
import { SettingsSectionHeader } from './SettingsSectionHeader';

export function EmploymentSettings({ data, onChange }: { data: HRSettings['employment'], onChange: (key: string, val: unknown) => void }) {
  return (
    <div>
      <SettingsSectionHeader title="Employment Settings" description="Configure employment types, statuses, and onboarding defaults." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Send Invitation on Employee Creation</label>
          <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={data.sendInvitationOnCreation ? 'Yes' : 'No'} onChange={e => onChange('sendInvitationOnCreation', e.target.value === 'Yes')}>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
      </div>
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Onboarding Requirements</h3>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden max-w-4xl">
        <ul className="divide-y divide-gray-100">
          {data.onboardingRequirements.map(req => (
            <li key={req.id} className="px-5 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors">
              <span className="text-sm font-semibold text-gray-900">{req.name}</span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" checked={req.required} onChange={e => {
                  const updated = data.onboardingRequirements.map(r => r.id === req.id ? { ...r, required: e.target.checked } : r);
                  onChange('onboardingRequirements', updated);
                }} />
                <span className="text-sm text-gray-600 font-medium">Required</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ProbationSettings({ data, onChange }: { data: HRSettings['probation'], onChange: (key: string, val: unknown) => void }) {
  return (
    <div>
      <SettingsSectionHeader title="Probation Settings" description="Configure probation duration, review reminders, and confirmation rules." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Default Duration (days)</label>
          <input type="number" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={data.defaultDuration} onChange={e => onChange('defaultDuration', parseInt(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Max Extensions</label>
          <input type="number" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={data.maxExtensions} onChange={e => onChange('maxExtensions', parseInt(e.target.value))} />
        </div>
      </div>
    </div>
  );
}

export function DocumentSettings({ data, onChange }: { data: HRSettings['documents'], onChange: (key: string, val: unknown) => void }) {
  return (
    <div>
      <SettingsSectionHeader title="Document Settings" description="Configure required employee documents, file types, and expiry reminders." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Max File Size (MB)</label>
          <input type="number" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={data.maxFileSizeMB} onChange={e => onChange('maxFileSizeMB', parseInt(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Verification Required</label>
          <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={data.verificationRequired} onChange={e => onChange('verificationRequired', e.target.value)}>
            <option>No Verification</option>
            <option>HR Verification Required</option>
            <option>HR + Manager Verification</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export function TemplatesSettings({ data, onChange }: { data: HRSettings['templates'], onChange: (key: string, val: unknown) => void }) {
  return (
    <div>
      <SettingsSectionHeader title="Templates Settings" description="Manage HR letter templates (Offer, Relieving, Warning, etc.)." />
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">HR Templates</h3>
          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">+ Create Template</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider bg-white">
                <th className="px-5 py-3 font-semibold">Template Name</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Last Updated</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {data.list.map(t => (
                <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3 font-semibold text-gray-900 text-sm">{t.name}</td>
                  <td className="px-5 py-3 text-gray-600 text-sm">{t.category}</td>
                  <td className="px-5 py-3 text-gray-600 text-sm">{t.lastUpdated}</td>
                  <td className="px-5 py-3 text-right">
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold mr-3 transition-colors">Edit</button>
                    <button className="text-gray-400 hover:text-gray-600 text-sm font-semibold mr-3 transition-colors">Duplicate</button>
                    <button className="text-gray-400 hover:text-amber-600 text-sm font-semibold transition-colors">Archive</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function PayrollSettings({ data, onChange }: { data: HRSettings['payroll'], onChange: (key: string, val: unknown) => void }) {
  return (
    <div>
      <SettingsSectionHeader title="Payroll Settings" description="Configure operational payroll defaults, closing days, and readiness rules." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Payroll Month Closing Day</label>
          <input type="number" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={data.closingDay} onChange={e => onChange('closingDay', parseInt(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Working Day Method</label>
          <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={data.workingDayMethod} onChange={e => onChange('workingDayMethod', e.target.value)}>
            <option>Calendar Working Days</option>
            <option>Attendance Policy Working Days</option>
            <option>Manual Payroll Input</option>
          </select>
        </div>
      </div>
    </div>
  );
}
