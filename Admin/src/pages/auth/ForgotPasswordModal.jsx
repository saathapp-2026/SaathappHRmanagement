import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowLeft, KeyRound } from 'lucide-react';

export const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid official email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 my-auto max-h-[90vh] overflow-y-auto">
        {!submitted ? (
          <>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-saath-100 text-saath-600 mb-4">
              <KeyRound className="h-6 w-6" />
            </div>

            <h3 className="text-xl font-bold text-slate-900">Reset Admin Password</h3>
            <p className="text-xs text-slate-500 mt-1">
              Enter your official Saath HR email address below. We will dispatch a password reset token link.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Official Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="admin@saathhr.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-saath-500 focus:outline-none focus:ring-2 focus:ring-saath-500/20"
                  />
                </div>
                {error && <p className="text-xs text-rose-600 mt-1">{error}</p>}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-saath-600 text-xs font-bold text-white hover:bg-saath-700 shadow-md shadow-saath-600/30 transition-all"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-3">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Reset Email Dispatched</h3>
            <p className="text-xs text-slate-500 mt-1">
              Instructions to reset your password have been sent to <span className="font-semibold text-slate-800">{email}</span>.
            </p>
            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
            >
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
