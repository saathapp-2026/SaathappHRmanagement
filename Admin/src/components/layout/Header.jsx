import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useHR } from '../../context/HRContext';
import {
  Search,
  Bell,
  CheckCheck,
  ChevronDown,
  Menu,
  Shield,
  User,
  LogOut,
  ExternalLink,
  Clock,
  Sparkles
} from 'lucide-react';

export const Header = ({ setIsMobileOpen, onOpenLogoutModal }) => {
  const { currentUser, notifications, markNotificationRead, markAllNotificationsRead, switchRole } = useHR();
  const location = useLocation();
  const navigate = useNavigate();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setIsNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setIsProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format Path Name for Breadcrumbs & Title
  const getPageTitle = () => {
    const path = location.pathname.substring(1);
    if (!path || path === 'dashboard') return 'Dashboard Overview';
    return path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/employees?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 md:px-6 backdrop-blur-md shadow-sm">
      {/* Left: Mobile Menu & Page Title / Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 lg:hidden transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Admin Portal</span>
            <span>/</span>
            <span className="text-saath-600 font-semibold">{getPageTitle()}</span>
          </div>
          <h1 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight leading-none mt-0.5">
            {getPageTitle()}
          </h1>
        </div>
      </div>

      {/* Right: Global Search, Notifications & Admin Profile */}
      <div className="flex items-center gap-3">
        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block w-64 lg:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search employees, ID, tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2 pl-9 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:border-saath-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-saath-500/20 transition-all"
          />
        </form>

        {/* Notification Bell Center */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-saath-600 transition-colors shadow-sm"
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-extrabold text-white ring-2 ring-white animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Drawer */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-sm">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-saath-100 px-2 py-0.5 text-xs font-semibold text-saath-700">
                      {unreadCount} unread
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="flex items-center gap-1 text-xs font-semibold text-saath-600 hover:text-saath-800 transition-colors"
                  >
                    <CheckCheck className="h-3.5 w-3.5" />
                    Mark all read
                  </button>
                )}
              </div>

              {/* Notification Items List */}
              <div className="mt-3 max-h-80 overflow-y-auto space-y-2 pr-1">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    No notifications available.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markNotificationRead(notif.id);
                        setIsNotifOpen(false);
                        navigate(notif.targetUrl);
                      }}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        !notif.isRead
                          ? 'border-saath-200 bg-saath-50/50 hover:bg-saath-50'
                          : 'border-slate-100 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-slate-900">{notif.title}</span>
                        <span className="text-[10px] font-medium text-slate-400 shrink-0">{notif.date}</span>
                      </div>
                      <p className="text-slate-600 mt-1 line-clamp-2 leading-relaxed">{notif.message}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 text-center">
                <button
                  onClick={() => { setIsNotifOpen(false); navigate('/approvals'); }}
                  className="text-xs font-bold text-saath-600 hover:text-saath-800 inline-flex items-center gap-1"
                >
                  View Approval Center <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile & Role Switcher Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-1.5 pr-3 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <img
              src={currentUser?.avatar}
              alt={currentUser?.fullName}
              className="h-8 w-8 rounded-lg object-cover ring-2 ring-saath-500/20"
            />
            <div className="hidden text-left sm:block">
              <p className="text-xs font-bold text-slate-900 leading-tight">{currentUser?.fullName}</p>
              <p className="text-[10px] font-semibold text-saath-600 leading-tight">{currentUser?.role}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400 hidden sm:block" />
          </button>

          {/* Profile Dropdown Modal */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl z-50 animate-fade-in">
              <div className="p-2 border-b border-slate-100">
                <p className="text-sm font-bold text-slate-900">{currentUser?.fullName}</p>
                <p className="text-xs text-slate-500">{currentUser?.email}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-saath-50 px-2 py-1 text-[11px] font-semibold text-saath-700 border border-saath-200/50">
                  <Shield className="h-3 w-3" />
                  {currentUser?.role}
                </div>
              </div>

              {/* Role Switcher Demo Control */}
              <div className="my-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-amber-500" /> Switch Role (Demo Testing):
                </p>
                <div className="space-y-1">
                  {['Super Admin', 'HR/Admin', 'Department Manager'].map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        switchRole(role);
                        setIsProfileOpen(false);
                      }}
                      className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        currentUser?.role === role
                          ? 'bg-saath-600 text-white font-bold'
                          : 'text-slate-700 hover:bg-slate-200/60'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-1 space-y-1">
                <button
                  onClick={() => { setIsProfileOpen(false); navigate('/settings'); }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <User className="h-4 w-4 text-slate-400" />
                  Admin Account Settings
                </button>
                <button
                  onClick={() => { setIsProfileOpen(false); onOpenLogoutModal(); }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="h-4 w-4 text-rose-500" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
