import React from 'react';
import { HRSettings } from '@/data/hr/settings';
import { SettingsSectionHeader } from './SettingsSectionHeader';

export function GeneralSettings({ data, onChange }: { data: HRSettings['general'], onChange: (key: string, val: unknown) => void }) {
  return (
    <div>
      <SettingsSectionHeader title="General HR Settings" description="Core operational defaults for the HR module." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Default HR Owner</label>
          <input type="text" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={data.defaultHrOwner} onChange={e => onChange('defaultHrOwner', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Default Work Location</label>
          <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={data.defaultWorkLocation} onChange={e => onChange('defaultWorkLocation', e.target.value)}>
            <option>Bengaluru HQ</option>
            <option>Mumbai Office</option>
            <option>Delhi Office</option>
            <option>Remote</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Employee ID Prefix</label>
          <input type="text" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={data.employeeIdPrefix} onChange={e => onChange('employeeIdPrefix', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">ID Number Length</label>
          <input type="number" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={data.employeeIdNumberLength} onChange={e => onChange('employeeIdNumberLength', parseInt(e.target.value))} />
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-lg max-w-4xl">
        <p className="text-sm text-indigo-800 font-semibold mb-1">Next Employee ID Preview</p>
        <p className="text-2xl font-bold text-indigo-900">{data.employeeIdPrefix}{'1'.padStart(data.employeeIdNumberLength, '0')}</p>
      </div>
    </div>
  );
}
