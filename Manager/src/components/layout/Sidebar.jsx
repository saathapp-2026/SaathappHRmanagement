import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHR } from '../../context/HRContext';
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  BarChart3,
  Clock,
  CheckCircle2,
  Calendar,
  Laptop,
  Target,
  Award,
  MessageSquare,
  UserCheck,
  UserPlus,
  HelpCircle,
  UserX,
  Megaphone,
  Bell,
  FileText,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  LogOut
} from 'lucide-react';

export const Sidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen, onOpenLogoutModal }) => {
  const { currentUser } = useHR();

  const navigationSections = [
    {
      title: null,
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'MY TEAM',
      items: [
        { name: 'Team Members', path: '/team', icon: Users },
        { name: 'Team Calendar', path: '/team-calendar', icon: CalendarDays },
        { name: 'Team Insights', path: '/team-insights', icon: BarChart3 }
      ]
    },
    {
      title: 'TIME & ATTENDANCE',
      items: [
        { name: 'Attendance', path: '/attendance', icon: Clock },
        { name: 'Corrections', path: '/corrections', icon: CheckCircle2 },
        { name: 'Leave Requests', path: '/leave', icon: Calendar },
        { name: 'Remote Work', path: '/remote-work', icon: Laptop }
      ]
    },
    {
      title: 'PERFORMANCE',
      items: [
        { name: 'Goals', path: '/goals', icon: Target },
        { name: 'Reviews', path: '/reviews', icon: Award },
        { name: 'Feedback', path: '/feedback', icon: MessageSquare },
        { name: 'Probation', path: '/probation', icon: UserCheck }
      ]
    },
    {
      title: 'TEAM OPERATIONS',
      items: [
        { name: 'Recruitment Requests', path: '/recruitment-requests', icon: UserPlus },
        { name: 'HR Requests', path: '/hr-requests', icon: HelpCircle },
        { name: 'Offboarding', path: '/offboarding', icon: UserX }
      ]
    },
    {
      title: 'COMMUNICATION',
      items: [
        { name: 'Announcements', path: '/announcements', icon: Megaphone },
        { name: 'Notifications', path: '/notifications', icon: Bell }
      ]
    },
    {
      title: 'REPORTS',
      items: [
        { name: 'Team Reports', path: '/reports', icon: FileText }
      ]
    }
  ];

  const bottomItems = [
    { name: 'My Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings }
  ];

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
                <span className="text-[10px] font-bold tracking-wider text-saath-300 uppercase mt-0.5">
                  SAATHAPP MANAGER
                </span>
              </div>
            )}
          </div>

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
          <div className="mx-3 mt-3 px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2 truncate">
              <ShieldCheck className="h-4 w-4 text-saath-400 shrink-0" />
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">{currentUser?.fullName}</p>
                <p className="text-[10px] text-saath-300 font-medium">{currentUser?.role}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Links List */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 custom-scrollbar">
          {navigationSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {section.title && !isCollapsed && (
                <div className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase pt-2 pb-1">
                  {section.title}
                </div>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-xs transition-all duration-200 group relative ${
                        isActive
                          ? 'bg-gradient-to-r from-saath-600 to-saath-500 text-white shadow-md shadow-saath-600/30'
                          : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                      }`
                    }
                  >
                    <Icon className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110`} />
                    {!isCollapsed && <span className="truncate">{item.name}</span>}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="p-3 border-t border-slate-800 bg-navy-950/40 space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl font-semibold text-xs transition-all duration-200 ${
                    isActive ? 'bg-saath-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </NavLink>
            );
          })}

          <button
            onClick={onOpenLogoutModal}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold text-xs text-rose-400 hover:bg-rose-950/30 hover:text-rose-300 transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!isCollapsed && <span className="truncate">Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
