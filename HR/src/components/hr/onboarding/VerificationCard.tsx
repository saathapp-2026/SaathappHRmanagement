import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

export function VerificationCard() {
  const [checked, setChecked] = useState({
    profile: false,
    docs: false,
    employment: false,
    manager: false,
    location: false
  });

  const allChecked = Object.values(checked).every(Boolean);

  return (
    <div className="bg-amber-50 rounded-xl border border-amber-200 shadow-sm p-6 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-32 h-32 bg-amber-100 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
      <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wider mb-2">Ready for HR Verification</h3>
      <p className="text-xs text-amber-700 mb-6 font-medium">Please review and confirm all onboarding information before finalizing.</p>
      
      <div className="space-y-3 mb-6 relative z-10">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input type="checkbox" className="w-4 h-4 text-amber-600 rounded border-amber-300 focus:ring-amber-500" checked={checked.profile} onChange={(e) => setChecked({...checked, profile: e.target.checked})} />
          <span className="text-sm font-medium text-amber-900 group-hover:text-amber-700">Profile reviewed</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input type="checkbox" className="w-4 h-4 text-amber-600 rounded border-amber-300 focus:ring-amber-500" checked={checked.docs} onChange={(e) => setChecked({...checked, docs: e.target.checked})} />
          <span className="text-sm font-medium text-amber-900 group-hover:text-amber-700">Documents reviewed</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input type="checkbox" className="w-4 h-4 text-amber-600 rounded border-amber-300 focus:ring-amber-500" checked={checked.employment} onChange={(e) => setChecked({...checked, employment: e.target.checked})} />
          <span className="text-sm font-medium text-amber-900 group-hover:text-amber-700">Employment details confirmed</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input type="checkbox" className="w-4 h-4 text-amber-600 rounded border-amber-300 focus:ring-amber-500" checked={checked.manager} onChange={(e) => setChecked({...checked, manager: e.target.checked})} />
          <span className="text-sm font-medium text-amber-900 group-hover:text-amber-700">Manager assigned</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input type="checkbox" className="w-4 h-4 text-amber-600 rounded border-amber-300 focus:ring-amber-500" checked={checked.location} onChange={(e) => setChecked({...checked, location: e.target.checked})} />
          <span className="text-sm font-medium text-amber-900 group-hover:text-amber-700">Work location assigned</span>
        </label>
      </div>

      <button className={`w-full py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2 relative z-10 ${allChecked ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-amber-200 text-amber-500 cursor-not-allowed'}`} disabled={!allChecked}>
        <CheckCircle size={18} /> Complete HR Verification
      </button>
    </div>
  );
}
