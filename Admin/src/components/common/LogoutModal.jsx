import React from 'react';
import { LogOut, AlertTriangle } from 'lucide-react';
import { useHR } from '../../context/HRContext';

export const LogoutModal = ({ isOpen, onClose }) => {
  const { logout } = useHR();

  if (!isOpen) return null;

  const handleConfirmLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 my-auto max-h-[90vh] overflow-y-auto">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 mb-4">
          <LogOut className="h-6 w-6" />
        </div>

        <h3 className="text-lg font-bold text-slate-900">Confirm Admin Logout</h3>
        <p className="text-sm text-slate-500 mt-1 leading-relaxed">
          Are you sure you want to end your current administrative session? You will be redirected to the secure admin login portal.
        </p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmLogout}
            className="px-4 py-2.5 rounded-xl bg-rose-600 text-sm font-semibold text-white hover:bg-rose-700 shadow-lg shadow-rose-600/30 transition-all flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
};
