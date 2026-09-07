import React from 'react';
import { useHR } from '../../context/HRContext';
import { Settings, Bell, Lock, ShieldAlert } from 'lucide-react';

export const SettingsPage = () => {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
        <h1 className="text-xl font-extrabold text-slate-900">Manager Preferences & Settings</h1>
        <p className="text-xs text-slate-500">Configure notification alerts and dashboard defaults</p>

        <div className="space-y-3 text-xs pt-2">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <p className="font-bold text-slate-800">Email Alerts on Leave Applications</p>
              <p className="text-slate-500 text-[10px]">Receive email notifications when team members submit leave requests</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4 text-saath-600 rounded" />
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <p className="font-bold text-slate-800">Attendance Correction Alerts</p>
              <p className="text-slate-500 text-[10px]">Receive alerts for pending attendance corrections</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4 text-saath-600 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};
