import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHR } from '../../context/HRContext';
import {
  LayoutDashboard,
  Users,
  Clock,
  CalendarDays,
  CheckCircle2,
  HelpCircle,
  Building2,
  Calendar,
  Megaphone,
  BarChart3,
  FileText,
  ShieldAlert,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const Sidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen, onOpenLogoutModal }) => {
  const { currentUser, hasPermission } = useHR();

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, module: 'dashboard' },
    { name: 'Employees', path: '/employees', icon: Users, module: 'employees' },
    { name: 'Attendance', path: '/attendance', icon: Clock, module: 'attendance' },
    { name: 'Leave Management', path: '/leave', icon: CalendarDays, module: 'leave' },
    { name: 'Approvals', path: '/approvals', icon: CheckCircle2, module: 'approvals', badge: 'Pending' },
    { name: 'Concerns & Help', path: '/concerns', icon: HelpCircle, module: 'concerns' },
    { name: 'Departments', path: '/departments', icon: Building2, module: 'employees' },
    { name: 'Calendar', path: '/calendar', icon: Calendar, module: 'calendar' },
    { name: 'Announcements', path: '/announcements', icon: Megaphone, module: 'announcements' },
    { name: 'Reports', path: '/reports', icon: BarChart3, module: 'reports' },
    { name: 'Documents', path: '/documents', icon: FileText, module: 'documents' },
    { name: 'Audit Logs', path: '/audit-logs', icon: ShieldAlert, module: 'dashboard' },
    { name: 'Settings', path: '/settings', icon: Settings, module: 'dashboard' },
  ];

  const filteredNav = navigationItems.filter(item => hasPermission(item.module));

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-navy-900 text-slate-300 transition-all duration-300 ease-in-out border-r border-slate-800 shadow-xl
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand Logo Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800 bg-navy-950/50">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-saath-600 to-saath-400 text-white shadow-lg shadow-saath-600/30 font-extrabold text-xl tracking-tight">
              S
            </div>
            {!isCollapsed && (
              <div className="flex flex-col animate-fade-in">
                <span className="font-extrabold text-lg tracking-tight text-white leading-none">
                  Saath <span className="text-saath-400">HR</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase mt-0.5">
                  Admin & HR Portal
                </span>
              </div>
            )}
          </div>

          {/* Desktop Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Current User Role Badge */}
        {!isCollapsed && (
          <div className="mx-3 mt-3 px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2 truncate">
              <ShieldCheck className="h-4 w-4 text-saath-400 shrink-0" />
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">{currentUser?.fullName}</p>
                <p className="text-[10px] text-saath-300 font-medium">{currentUser?.role}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {filteredNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative
                  ${isActive
                    ? 'bg-saath-600 text-white shadow-md shadow-saath-600/30'
                    : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100'
                  }
                `}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className={`h-5 w-5 shrink-0 transition-transform group-hover:scale-110 ${isCollapsed ? 'mx-auto' : ''}`} />
                
                {!isCollapsed && (
                  <span className="truncate flex-1">{item.name}</span>
                )}

                {/* Badge for Pending Items */}
                {!isCollapsed && item.name === 'Approvals' && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    4 New
                  </span>
                )}

                {/* Tooltip on Collapsed Hover */}
                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-2 py-1 bg-slate-900 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg border border-slate-700 z-50">
                    {item.name}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="p-3 border-t border-slate-800 bg-navy-950/40">
          <button
            onClick={onOpenLogoutModal}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors group ${isCollapsed ? 'justify-center' : ''}`}
            title="Logout of Admin Portal"
          >
            <LogOut className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-x-0.5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
