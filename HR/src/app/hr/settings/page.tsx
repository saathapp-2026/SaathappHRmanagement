'use client';
import React, { useState } from 'react';
import { Search, Save } from 'lucide-react';
import { HRSettings, defaultSettings } from '@/data/hr/settings';

import { GeneralSettings } from '@/components/hr/settings/GeneralSettings';
import { AttendanceSettings } from '@/components/hr/settings/AttendanceSettings';
import { LeaveSettings } from '@/components/hr/settings/LeaveSettings';
import { EmploymentSettings, ProbationSettings, DocumentSettings, TemplatesSettings, PayrollSettings } from '@/components/hr/settings/OtherSettings';

const TABS = [
  'General',
  'Attendance',
  'Leave',
  'Employment',
  'Probation',
  'Documents',
  'Templates',
  'Payroll',
  'Recruitment',
  'Performance',
  'Communication'
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('General');
  const [search, setSearch] = useState('');
  const [settings, setSettings] = useState<HRSettings>(defaultSettings);
  const [isDirty, setIsDirty] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleUpdate = (section: keyof HRSettings, key: string, val: unknown) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: val
      }
    }));
    setIsDirty(true);
  };

  const handleSave = () => {
    setIsDirty(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDiscard = () => {
    if (confirm('Discard unsaved changes?')) {
      setSettings(defaultSettings);
      setIsDirty(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'General':
        return <GeneralSettings data={settings.general} onChange={(k, v) => handleUpdate('general', k, v)} />;
      case 'Attendance':
        return <AttendanceSettings data={settings.attendance} onChange={(k, v) => handleUpdate('attendance', k, v)} />;
      case 'Leave':
        return <LeaveSettings data={settings.leave} onChange={(k, v) => handleUpdate('leave', k, v)} />;
      case 'Employment':
        return <EmploymentSettings data={settings.employment} onChange={(k, v) => handleUpdate('employment', k, v)} />;
      case 'Probation':
        return <ProbationSettings data={settings.probation} onChange={(k, v) => handleUpdate('probation', k, v)} />;
      case 'Documents':
        return <DocumentSettings data={settings.documents} onChange={(k, v) => handleUpdate('documents', k, v)} />;
      case 'Templates':
        return <TemplatesSettings data={settings.templates} onChange={(k, v) => handleUpdate('templates', k, v)} />;
      case 'Payroll':
        return <PayrollSettings data={settings.payroll} onChange={(k, v) => handleUpdate('payroll', k, v)} />;
      default:
        return (
          <div className="p-8 text-center text-gray-500 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{activeTab} Settings</h3>
            <p>This section is a frontend placeholder as requested in the operational settings scope.</p>
          </div>
        );
    }
  };

  return (
    <div className="pb-12 h-[calc(100vh-64px)] flex flex-col -mx-6 -my-6 bg-slate-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sticky top-0 z-10 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">HR Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Configure HR policies, operational defaults and employee lifecycle settings.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex items-center justify-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors shadow-sm whitespace-nowrap">
            View Change History
          </button>
          <button onClick={handleSave} disabled={!isDirty} className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm whitespace-nowrap ${isDirty ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>

      {isDirty && (
        <div className="bg-indigo-50 border-b border-indigo-100 px-6 py-2.5 flex justify-between items-center z-10 sticky top-[73px]">
          <span className="text-sm font-semibold text-indigo-900">You have unsaved changes.</span>
          <div className="flex items-center gap-3">
            <button onClick={handleDiscard} className="text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1">Discard</button>
            <button onClick={handleSave} className="text-sm font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1">Save Changes</button>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in-up">
          <Save size={16} className="text-emerald-400" />
          <span className="text-sm font-medium">HR settings saved locally.</span>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto hidden md:block shrink-0">
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search settings..." 
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <nav className="p-2 space-y-0.5">
            {TABS.filter(t => t.toLowerCase().includes(search.toLowerCase())).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Mobile Nav */}
        <div className="md:hidden bg-white border-b border-gray-200 p-4 shrink-0">
          <select 
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-gray-700"
            value={activeTab}
            onChange={e => setActiveTab(e.target.value)}
          >
            {TABS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
