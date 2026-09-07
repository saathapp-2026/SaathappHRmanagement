import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { Settings, Shield, Building2, Clock, CalendarDays, KeyRound, Check } from 'lucide-react';

export const SettingsPage = () => {
  const { companySettings, setCompanySettings, roles, attendanceRules, setAttendanceRules } = useHR();

  const [activeTab, setActiveTab] = useState('company');
  const [form, setForm] = useState(companySettings);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setCompanySettings(form);
    setSaveMessage('Company and security settings saved successfully.');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
          Admin Portal & System Settings
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Configure organization profiles, role permission matrices, security rules, and system defaults.
        </p>
      </div>

      {saveMessage && (
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2 animate-fade-in">
          <Check className="h-4 w-4" /> {saveMessage}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('company')}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 ${activeTab === 'company' ? 'border-saath-600 text-saath-600 bg-saath-50/50' : 'border-transparent text-slate-500'}`}
        >
          <Building2 className="h-4 w-4" /> Company Profile
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 ${activeTab === 'roles' ? 'border-saath-600 text-saath-600 bg-saath-50/50' : 'border-transparent text-slate-500'}`}
        >
          <Shield className="h-4 w-4" /> Roles & Permissions Matrix
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 ${activeTab === 'security' ? 'border-saath-600 text-saath-600 bg-saath-50/50' : 'border-transparent text-slate-500'}`}
        >
          <KeyRound className="h-4 w-4" /> Security & Session Controls
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
        {activeTab === 'company' && (
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Organization Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-1">Company Name</label>
                <input type="text" value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})} className="w-full rounded-xl border p-2.5 font-medium" />
              </div>
              <div>
                <label className="block font-bold mb-1">Official Contact Email</label>
                <input type="email" value={form.contactEmail} onChange={e => setForm({...form, contactEmail: e.target.value})} className="w-full rounded-xl border p-2.5 font-medium" />
              </div>
              <div>
                <label className="block font-bold mb-1">Phone Number</label>
                <input type="text" value={form.contactPhone} onChange={e => setForm({...form, contactPhone: e.target.value})} className="w-full rounded-xl border p-2.5 font-medium" />
              </div>
              <div>
                <label className="block font-bold mb-1">System Timezone</label>
                <input type="text" value={form.timeZone} onChange={e => setForm({...form, timeZone: e.target.value})} className="w-full rounded-xl border p-2.5 font-medium" />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-bold mb-1">Headquarters Address</label>
                <input type="text" value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="w-full rounded-xl border p-2.5 font-medium" />
              </div>
            </div>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-saath-600 text-white font-bold text-xs shadow-md">
              Save Company Profile
            </button>
          </form>
        )}

        {activeTab === 'roles' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 border-b pb-2">System User Roles & Access Rights</h3>
            <div className="space-y-3">
              {roles.map(r => (
                <div key={r.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">{r.name}</h4>
                    <p className="text-slate-600 mt-0.5">{r.description}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-saath-100 text-saath-800 font-extrabold text-xs">
                    {r.userCount} Active Users
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Security Rules & Session Duration</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-1">Session Timeout (Minutes)</label>
                <input type="number" value={form.sessionTimeoutMinutes} onChange={e => setForm({...form, sessionTimeoutMinutes: Number(e.target.value)})} className="w-full rounded-xl border p-2.5" />
              </div>
              <div>
                <label className="block font-bold mb-1">Failed Login Lockout Threshold</label>
                <input type="number" value={form.failedLoginThreshold} onChange={e => setForm({...form, failedLoginThreshold: Number(e.target.value)})} className="w-full rounded-xl border p-2.5" />
              </div>
            </div>
            <div className="pt-2">
              <label className="flex items-center gap-2 font-bold cursor-pointer">
                <input type="checkbox" checked={form.require2FA} onChange={e => setForm({...form, require2FA: e.target.checked})} className="h-4 w-4 rounded text-saath-600" />
                Enable Mandatory 2-Factor Authentication (2FA Readiness)
              </label>
            </div>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-saath-600 text-white font-bold text-xs shadow-md">
              Save Security Rules
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
