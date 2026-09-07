'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, UserPlus, Network, ClipboardCheck, 
  Clock, CheckCircle, CalendarOff, Calendar, 
  MessageSquareWarning, HelpCircle, UserCog, FileText,
  DollarSign, TrendingUp, Briefcase, UserMinus, Monitor,
  Megaphone, Bell, PieChart, BarChart2, Shield, Settings,
  X, LucideIcon
} from 'lucide-react';

interface HRSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

type NavItem = {
  name: string;
  icon: LucideIcon;
  href: string;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

export function HRSidebar({ mobileOpen, setMobileOpen }: HRSidebarProps) {
  const pathname = usePathname();

  const navGroups: NavGroup[] = [
    {
      title: '',
      items: [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/hr/dashboard' },
      ]
    },
    {
      title: 'PEOPLE',
      items: [
        { name: 'Employees', icon: Users, href: '/hr/employees' },
        { name: 'Onboarding', icon: UserPlus, href: '/hr/onboarding' },
        { name: 'Organization', icon: Network, href: '/hr/organization' },
        { name: 'Probation', icon: ClipboardCheck, href: '/hr/probation' },
      ]
    },
    {
      title: 'TIME & ATTENDANCE',
      items: [
        { name: 'Attendance', icon: Clock, href: '/hr/attendance' },
        { name: 'Corrections', icon: CheckCircle, href: '/hr/corrections' },
        { name: 'Leave', icon: CalendarOff, href: '/hr/leave' },
        { name: 'Calendar', icon: Calendar, href: '/hr/calendar' },
      ]
    },
    {
      title: 'EMPLOYEE SERVICES',
      items: [
        { name: 'Concerns', icon: MessageSquareWarning, href: '/hr/concerns' },
        { name: 'Help Requests', icon: HelpCircle, href: '/hr/help-requests' },
        { name: 'Profile Requests', icon: UserCog, href: '/hr/profile-requests' },
        { name: 'Documents', icon: FileText, href: '/hr/documents' },
      ]
    },
    {
      title: 'HR OPERATIONS',
      items: [
        { name: 'Payroll', icon: DollarSign, href: '/hr/payroll' },
        { name: 'Performance', icon: TrendingUp, href: '/hr/performance' },
        { name: 'Recruitment', icon: Briefcase, href: '/hr/recruitment' },
        { name: 'Offboarding', icon: UserMinus, href: '/hr/offboarding' },
        { name: 'Assets', icon: Monitor, href: '/hr/assets' },
      ]
    },
    {
      title: 'COMMUNICATION',
      items: [
        { name: 'Announcements', icon: Megaphone, href: '/hr/announcements' },
        { name: 'Notifications', icon: Bell, href: '/hr/notifications' },
      ]
    },
    {
      title: 'INSIGHTS',
      items: [
        { name: 'Reports & Analytics', icon: PieChart, href: '/hr/reports' },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { name: 'Audit Logs', icon: Shield, href: '/hr/audit-logs' },
        { name: 'HR Settings', icon: Settings, href: '/hr/settings' },
      ]
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 bottom-0 w-[260px] bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
          <h1 className="text-xl font-bold text-indigo-900">SAATHAPP HR</h1>
          <button className="lg:hidden text-gray-500 hover:text-gray-900" onClick={() => setMobileOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {navGroups.map((group, idx) => (
            <div key={idx}>
              {group.title && (
                <h3 className="px-3 text-xs font-semibold text-gray-400 mb-2 tracking-wider">
                  {group.title}
                </h3>
              )}
              <div className="space-y-1">
                {group.items.map((item, iIdx) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={iIdx}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-indigo-50 text-indigo-700' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon size={18} className={`mr-3 ${isActive ? 'text-indigo-700' : 'text-gray-400'}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
