'use client';

import React from 'react';
import { Users, UserCheck, CalendarOff, Clock, MessageSquareWarning } from 'lucide-react';
import { StatCard } from '@/components/hr/StatCard';
import { QuickActions } from '@/components/hr/QuickActions';
import { AttendanceOverview } from '@/components/hr/AttendanceOverview';
import { ApprovalQueue } from '@/components/hr/ApprovalQueue';
import { LeaveTodayCard } from '@/components/hr/LeaveTodayCard';
import { NewJoinersCard } from '@/components/hr/NewJoinersCard';
import { CelebrationsCard } from '@/components/hr/CelebrationsCard';
import { AttentionCard } from '@/components/hr/AttentionCard';
import { RecentActivity } from '@/components/hr/RecentActivity';
import { AnnouncementsCard } from '@/components/hr/AnnouncementsCard';
import { UpcomingEvents } from '@/components/hr/UpcomingEvents';

export default function HRDashboard() {
  return (
    <div className="space-y-6 pb-12">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Total Employees" value={248} subtitle="+6 this month" icon={Users} />
        <StatCard title="Present Today" value={182} subtitle="91.4% attendance" icon={UserCheck} />
        <StatCard title="On Leave" value={14} subtitle="6 approved today" icon={CalendarOff} />
        <StatCard title="Pending Approvals" value={11} subtitle="Needs attention" icon={Clock} trend="down" />
        <StatCard title="Open Concerns" value={6} subtitle="2 high priority" icon={MessageSquareWarning} trend="down" />
      </div>

      {/* Secondary Metrics Strip */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-500 font-medium px-1">
        <span className="text-gray-900 font-semibold">Active 236</span>
        <span className="text-gray-300">•</span>
        <span>Absent 12</span>
        <span className="text-gray-300">•</span>
        <span>Late 14</span>
        <span className="text-gray-300">•</span>
        <span>Joining Soon 5</span>
        <span className="text-gray-300">•</span>
        <span>Notice Period 3</span>
      </div>

      <QuickActions />

      {/* Main Grid Layout (8 + 4 columns on large screens) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols) */}
        <div className="xl:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AttendanceOverview />
            <ApprovalQueue />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LeaveTodayCard />
            <NewJoinersCard />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CelebrationsCard />
            <AttentionCard />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecentActivity />
            <AnnouncementsCard />
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="xl:col-span-4 space-y-6">
          <UpcomingEvents />
          
          {/* Bottom Brand Banner */}
          <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl border border-indigo-100 p-6 flex flex-col justify-between h-48 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-indigo-900 mb-2">People make companies grow.</h3>
              <p className="text-sm text-indigo-700/80 leading-relaxed max-w-[200px]">
                Manage your workforce with clarity, consistency and care.
              </p>
            </div>
            
            {/* Subtle Illustration via CSS shapes */}
            <div className="absolute right-0 bottom-0 w-32 h-32 opacity-20 pointer-events-none">
              <div className="absolute right-4 bottom-4 w-16 h-16 rounded-full bg-indigo-500"></div>
              <div className="absolute right-12 bottom-12 w-12 h-12 rounded-full bg-blue-400"></div>
              <div className="absolute right-20 bottom-4 w-10 h-10 rounded-full bg-violet-400"></div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
