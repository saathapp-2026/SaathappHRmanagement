import React from 'react';
import { HRSettings } from '@/data/hr/settings';
import { Clock, Eye } from 'lucide-react';

export function AttendanceSettings({ data, onChange }: { data: HRSettings['attendance'], onChange: (key: string, val: unknown) => void }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Attendance Settings</h2>
          <p className="text-sm text-gray-500 mt-1">Configure work hours, weekly offs, and attendance correction policies.</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Eye size={16} /> Preview Policy
        </button>
      </div>
      
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Working Hours</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Work Start Time</label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="time" className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={data.workStartTime} onChange={e => onChange('workStartTime', e.target.value)} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Work End Time</label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="time" className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={data.workEndTime} onChange={e => onChange('workEndTime', e.target.value)} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Grace Period (mins)</label>
          <input type="number" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={data.gracePeriod} onChange={e => onChange('gracePeriod', parseInt(e.target.value))} />
        </div>
      </div>

      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Working Days</h3>
      <div className="flex flex-wrap gap-3 max-w-4xl mb-8">
        {Object.keys(data.workingDays).map(day => (
          <label key={day} className={`flex items-center justify-center px-4 py-2 rounded-lg border cursor-pointer text-sm font-semibold transition-colors ${data.workingDays[day] ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-200 text-gray-500'}`}>
            <input type="checkbox" className="hidden" checked={data.workingDays[day]} onChange={e => {
              onChange('workingDays', { ...data.workingDays, [day]: e.target.checked });
            }} />
            {day.substring(0, 3)}
          </label>
        ))}
      </div>

      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Corrections</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Correction Allowed Window (days)</label>
          <input type="number" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={data.correctionAllowedWindow} onChange={e => onChange('correctionAllowedWindow', parseInt(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Require Attachment for Correction</label>
          <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={data.correctionRequireAttachment} onChange={e => onChange('correctionRequireAttachment', e.target.value)}>
            <option>Optional</option>
            <option>Required</option>
            <option>No</option>
          </select>
        </div>
      </div>
    </div>
  );
}
