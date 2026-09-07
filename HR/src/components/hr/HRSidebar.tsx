import React from 'react';
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
  active?: boolean;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

export function HRSidebar({ mobileOpen, setMobileOpen }: HRSidebarProps) {
  const navGroups: NavGroup[] = [
    {
      title: '',
      items: [
        { name: 'Dashboard', icon: LayoutDashboard, active: true },
      ]
    },
    {
      title: 'PEOPLE',
      items: [
        { name: 'Employees', icon: Users },
        { name: 'Onboarding', icon: UserPlus },
        { name: 'Organization', icon: Network },
        { name: 'Probation', icon: ClipboardCheck },
      ]
    },
    {
      title: 'TIME & ATTENDANCE',
      items: [
        { name: 'Attendance', icon: Clock },
        { name: 'Corrections', icon: CheckCircle },
        { name: 'Leave', icon: CalendarOff },
        { name: 'Calendar', icon: Calendar },
      ]
    },
    {
      title: 'EMPLOYEE SERVICES',
      items: [
        { name: 'Concerns', icon: MessageSquareWarning },
        { name: 'Help Requests', icon: HelpCircle },
        { name: 'Profile Requests', icon: UserCog },
        { name: 'Documents', icon: FileText },
      ]
    },
    {
      title: 'HR OPERATIONS',
      items: [
        { name: 'Payroll', icon: DollarSign },
        { name: 'Performance', icon: TrendingUp },
        { name: 'Recruitment', icon: Briefcase },
        { name: 'Offboarding', icon: UserMinus },
        { name: 'Assets', icon: Monitor },
      ]
    },
    {
      title: 'COMMUNICATION',
      items: [
        { name: 'Announcements', icon: Megaphone },
        { name: 'Notifications', icon: Bell },
      ]
    },
    {
      title: 'INSIGHTS',
      items: [
        { name: 'Reports', icon: PieChart },
        { name: 'Analytics', icon: BarChart2 },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { name: 'Audit Logs', icon: Shield },
        { name: 'HR Settings', icon: Settings },
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
                {group.items.map((item, iIdx) => (
                  <button
                    key={iIdx}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      item.active 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon size={18} className={`mr-3 ${item.active ? 'text-indigo-700' : 'text-gray-400'}`} />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
