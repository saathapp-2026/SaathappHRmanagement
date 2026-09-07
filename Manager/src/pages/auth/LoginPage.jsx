import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHR } from '../../context/HRContext';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';

export const LoginPage = () => {
  const { login, isAuthenticated, authLoading } = useHR();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@saathhr.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  // If already authenticated, navigate to dashboard
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const res = await login(email, password, remember);
      setIsLoading(false);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setErrorMessage(res.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-8 relative overflow-hidden">
      {/* Dynamic Background Glow & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-saath-800/30 via-navy-900 to-navy-950 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-saath-600/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />

      {/* Main Card */}
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-slate-100 z-10 animate-fade-in">
        {/* Header Branding */}
        <div className="text-center mb-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-saath-600 to-saath-400 text-white shadow-xl shadow-saath-600/30 font-extrabold text-2xl tracking-tight mb-3">
            S
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Saath <span className="text-saath-600">HR</span> Portal
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Authorized Admin & HR Management Access
          </p>
        </div>

        {/* Demo Credentials Quick Switch Banner */}
        <div className="mb-6 rounded-2xl bg-saath-50/80 p-3 border border-saath-200/60 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-saath-900 mb-1">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Demo Accounts Quick Fill:
          </div>
          <div className="grid grid-cols-3 gap-1.5 mt-2">
            <button
              type="button"
              onClick={() => { setEmail('admin@saathhr.com'); setPassword('admin123'); }}
              className="px-2 py-1 rounded-lg bg-white border border-saath-200 text-[11px] font-semibold text-saath-700 hover:bg-saath-600 hover:text-white transition-colors truncate"
              title="Super Admin Credentials"
            >
              Super Admin
            </button>
            <button
              type="button"
              onClick={() => { setEmail('hr@saathhr.com'); setPassword('hr123'); }}
              className="px-2 py-1 rounded-lg bg-white border border-saath-200 text-[11px] font-semibold text-saath-700 hover:bg-saath-600 hover:text-white transition-colors truncate"
              title="HR Manager Credentials"
            >
              HR/Admin
            </button>
            <button
              type="button"
              onClick={() => { setEmail('manager@saathhr.com'); setPassword('manager123'); }}
              className="px-2 py-1 rounded-lg bg-white border border-saath-200 text-[11px] font-semibold text-saath-700 hover:bg-saath-600 hover:text-white transition-colors truncate"
              title="Dept Manager Credentials"
            >
              Dept Manager
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-rose-50 p-3 border border-rose-200 text-xs font-semibold text-rose-700 animate-fade-in">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Official Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="admin@saathhr.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm font-medium text-slate-900 focus:border-saath-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-saath-500/20 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">Password</label>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="text-xs font-semibold text-saath-600 hover:text-saath-800 transition-colors"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-10 text-sm font-medium text-slate-900 focus:border-saath-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-saath-500/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-saath-600 focus:ring-saath-500"
              />
              <span className="text-xs font-medium text-slate-600">Remember session</span>
            </label>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400">
              <ShieldCheck className="h-3 w-3 text-emerald-500" /> SSL Encrypted
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-saath-600 text-white font-bold text-sm shadow-lg shadow-saath-600/30 hover:bg-saath-700 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Sign In to Admin Portal <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-[11px] text-slate-400">
          Saath HR Enterprise Security v2.4 • Confidential HR System
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />
    </div>
  );
};
