import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useHR } from '../../context/HRContext';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';

export const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useHR();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-3xl border border-slate-200 shadow-xl animate-fade-in">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 mb-4">
          <ShieldAlert className="h-8 w-8" />
        </div>

        <h2 className="text-2xl font-extrabold text-slate-900">403 — Access Denied</h2>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          Your current role (<span className="font-bold text-slate-800">{currentUser?.role}</span>) does not possess permission to access this administrative module.
        </p>

        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-left text-xs space-y-1">
          <div className="flex items-center gap-2 text-slate-700 font-semibold">
            <Lock className="h-3.5 w-3.5 text-amber-500" /> Security Restriction Enforced
          </div>
          <p className="text-slate-500 text-[11px]">
            To request elevated access, contact your organization's Super Admin.
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full py-2.5 px-4 rounded-xl bg-saath-600 text-white font-bold text-xs shadow-md shadow-saath-600/30 hover:bg-saath-700 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
