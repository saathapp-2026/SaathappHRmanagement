import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHR } from '../../context/HRContext';
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  CalendarDays,
  AlertCircle,
  HelpCircle,
  FileCheck,
  UserPlus,
  ArrowUpRight,
  TrendingUp,
  Building2,
  Calendar,
  Megaphone,
  CheckCircle2,
  Plus,
  ShieldCheck,
  ChevronRight,
  Gift,
  Award
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    employees,
    dailyAttendance,
    leaveRequests,
    attendanceCorrections,
    concerns,
    documents,
    calendarEvents,
    announcements,
    auditLogs
  } = useHR();

  // Metrics Calculations
  const totalEmployees = employees.length;
  const presentCount = dailyAttendance.filter(a => a.status === 'Present').length;
  const absentCount = dailyAttendance.filter(a => a.status === 'Absent').length;
  const lateCount = dailyAttendance.filter(a => a.status === 'Late').length;
  const halfDayCount = dailyAttendance.filter(a => a.status === 'Half Day').length;
  const onLeaveCount = dailyAttendance.filter(a => a.status === 'On Leave').length;
  const notCheckedInCount = dailyAttendance.filter(a => a.status === 'Not Checked In').length;
  const checkedOutCount = dailyAttendance.filter(a => a.checkOut && a.checkOut !== 'Still Working' && a.checkOut !== '-').length;

  const pendingLeaveCount = leaveRequests.filter(r => r.status === 'Pending').length;
  const pendingCorrectionsCount = attendanceCorrections.filter(c => c.status === 'Pending').length;
  const openConcernsCount = concerns.filter(c => c.type === 'Concern' && (c.status === 'Open' || c.status === 'Under Review')).length;
  const unresolvedHelpCount = concerns.filter(c => c.type === 'Help' && c.status !== 'Resolved' && c.status !== 'Closed').length;
  const pendingDocsCount = documents.filter(d => d.status === 'Pending Verification').length;
  const newEmployeesCount = employees.filter(e => e.accountStatus === 'Invited' || e.accountStatus === 'Profile Pending' || e.accountStatus === 'Under Verification').length;

  // Chart Data
  const attendancePieData = [
    { name: 'Present', value: presentCount, color: '#16A34A' },
    { name: 'Late', value: lateCount, color: '#F97316' },
    { name: 'Absent', value: absentCount, color: '#DC2626' },
    { name: 'On Leave', value: onLeaveCount, color: '#9333EA' },
    { name: 'Not Checked In', value: notCheckedInCount, color: '#64748B' }
  ];

  const weeklyTrendData = [
    { day: 'Mon', present: 42, late: 3, absent: 2, leave: 1 },
    { day: 'Tue', present: 40, late: 4, absent: 3, leave: 1 },
    { day: 'Wed', present: 44, late: 1, absent: 1, leave: 2 },
    { day: 'Thu', present: 41, late: 2, absent: 2, leave: 3 },
    { day: 'Fri (Today)', present: presentCount, late: lateCount, absent: absentCount, leave: onLeaveCount }
  ];

  const departmentComparisonData = [
    { dept: 'ENG', present: 88, absent: 6, leave: 6 },
    { dept: 'HR', present: 100, absent: 0, leave: 0 },
    { dept: 'OPS', present: 75, absent: 15, leave: 10 },
    { dept: 'SBD', present: 90, absent: 10, leave: 0 },
    { dept: 'FIN', present: 100, absent: 0, leave: 0 }
  ];

  const overviewCards = [
    { title: 'Total Employees', count: totalEmployees, icon: Users, color: 'text-saath-600 bg-saath-50 border-saath-200', link: '/employees' },
    { title: 'Present Today', count: presentCount, icon: UserCheck, color: 'text-emerald-600 bg-emerald-50 border-emerald-200', link: '/attendance?status=Present' },
    { title: 'Absent Today', count: absentCount, icon: UserX, color: 'text-rose-600 bg-rose-50 border-rose-200', link: '/attendance?status=Absent' },
    { title: 'Late Arrivals', count: lateCount, icon: Clock, color: 'text-amber-600 bg-amber-50 border-amber-200', link: '/attendance?status=Late' },
    { title: 'On Leave', count: onLeaveCount, icon: CalendarDays, color: 'text-purple-600 bg-purple-50 border-purple-200', link: '/attendance?status=On Leave' },
    { title: 'Pending Leave Requests', count: pendingLeaveCount, icon: CalendarDays, color: 'text-indigo-600 bg-indigo-50 border-indigo-200', link: '/approvals?type=leave' },
    { title: 'Pending Corrections', count: pendingCorrectionsCount, icon: CheckCircle2, color: 'text-amber-600 bg-amber-50 border-amber-200', link: '/approvals?type=attendance' },
    { title: 'Open HR Concerns', count: openConcernsCount, icon: AlertCircle, color: 'text-rose-600 bg-rose-50 border-rose-200', link: '/concerns?status=Open' },
    { title: 'Unresolved Help Desk', count: unresolvedHelpCount, icon: HelpCircle, color: 'text-blue-600 bg-blue-50 border-blue-200', link: '/concerns?type=Help' },
    { title: 'Docs Pending Verification', count: pendingDocsCount, icon: FileCheck, color: 'text-teal-600 bg-teal-50 border-teal-200', link: '/documents?status=Pending' },
    { title: 'New Employee Onboarding', count: newEmployeesCount, icon: UserPlus, color: 'text-saath-600 bg-saath-50 border-saath-200', link: '/employees?status=Pending' },
    { title: 'Checked Out Today', count: checkedOutCount, icon: UserCheck, color: 'text-slate-600 bg-slate-50 border-slate-200', link: '/attendance' }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-navy-900 via-saath-900 to-navy-950 p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-saath-500/20 to-transparent pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-saath-300 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-emerald-400" /> Administrative Workspace • {currentUser?.role}
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1">
              Good Morning, {currentUser?.fullName}! 👋
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Here is your daily Saath HR operations summary for {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => navigate('/employees')}
              className="px-4 py-2.5 rounded-xl bg-saath-600 hover:bg-saath-500 text-white font-bold text-xs shadow-lg shadow-saath-600/30 transition-all flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" /> Add Employee
            </button>
            <button
              onClick={() => navigate('/approvals')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs backdrop-blur-md transition-all flex items-center gap-2 border border-white/10"
            >
              <CheckCircle2 className="h-4 w-4 text-amber-400" /> Review Approvals ({pendingLeaveCount + pendingCorrectionsCount})
            </button>
          </div>
        </div>
      </div>

      {/* Today's Overview Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-saath-600" /> Today's Operations Overview
          </h2>
          <span className="text-xs font-semibold text-slate-400">Click any card to filter list</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {overviewCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                onClick={() => navigate(card.link)}
                className={`p-3.5 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5 ${card.color}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-xl bg-white shadow-sm border border-slate-100`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                </div>
                <div className="text-xl font-black text-slate-900 tracking-tight">{card.count}</div>
                <div className="text-[11px] font-bold text-slate-600 mt-0.5 truncate">{card.title}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Charts & Approval Center Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Breakdown & Weekly Trend */}
        <div className="lg:col-span-2 space-y-6">
          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Today's Attendance Distribution */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
                <span>Today's Attendance Status</span>
                <span className="text-[11px] font-semibold text-saath-600">{presentCount + lateCount} Checked In</span>
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={attendancePieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {attendancePieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 text-[11px] font-semibold">
                {attendancePieData.map((d, i) => (
                  <div key={i} className="flex items-center gap-1.5 truncate">
                    <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-slate-600 truncate">{d.name}: <strong className="text-slate-900">{d.value}</strong></span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Attendance Trend */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Weekly Attendance Trend</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyTrendData}>
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={10} />
                    <YAxis stroke="#94a3b8" fontSize={10} />
                    <Tooltip />
                    <Bar dataKey="present" fill="#16A34A" radius={[4, 4, 0, 0]} stackId="a" />
                    <Bar dataKey="late" fill="#F97316" radius={[4, 4, 0, 0]} stackId="a" />
                    <Bar dataKey="absent" fill="#DC2626" radius={[4, 4, 0, 0]} stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[11px] text-slate-400 text-center mt-2 font-medium">92% average presence rate this week</p>
            </div>
          </div>

          {/* Recent Actionable Items List */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-500" /> Pending Approvals & Requests
              </h3>
              <button
                onClick={() => navigate('/approvals')}
                className="text-xs font-bold text-saath-600 hover:text-saath-800 flex items-center gap-1"
              >
                View All Approvals <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {leaveRequests.filter(r => r.status === 'Pending').map(req => (
                <div key={req.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 font-bold text-[10px]">Leave Request</span>
                      <span className="font-bold text-xs text-slate-900">{req.employeeName}</span>
                      <span className="text-[11px] text-slate-400">({req.departmentName})</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 font-medium">{req.leaveTypeName}: {req.startDate} to {req.endDate} ({req.daysCount} days)</p>
                  </div>
                  <button
                    onClick={() => navigate('/approvals')}
                    className="px-3 py-1.5 rounded-xl bg-saath-600 text-white font-bold text-xs hover:bg-saath-700 transition-colors shrink-0"
                  >
                    Process
                  </button>
                </div>
              ))}

              {attendanceCorrections.filter(c => c.status === 'Pending').map(cor => (
                <div key={cor.id} className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/60 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-[10px]">Attendance Correction</span>
                      <span className="font-bold text-xs text-slate-900">{cor.employeeName}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 font-medium">Req Check-in: {cor.requestedCheckIn} on {cor.date}</p>
                  </div>
                  <button
                    onClick={() => navigate('/approvals')}
                    className="px-3 py-1.5 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition-colors shrink-0"
                  >
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Events, Announcements & Audit Activity */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-gradient-to-br from-saath-900 to-navy-900 p-5 rounded-3xl text-white shadow-lg">
            <h3 className="text-sm font-extrabold mb-3 flex items-center gap-2">
              <Plus className="h-4 w-4 text-saath-400" /> Admin Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button onClick={() => navigate('/employees')} className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-left transition-colors">
                + Add Employee
              </button>
              <button onClick={() => navigate('/announcements')} className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-left transition-colors">
                + Announcement
              </button>
              <button onClick={() => navigate('/attendance')} className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-left transition-colors">
                Mark Attendance
              </button>
              <button onClick={() => navigate('/reports')} className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-left transition-colors">
                Export Reports
              </button>
            </div>
          </div>

          {/* Upcoming Events & Anniversaries */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Gift className="h-4 w-4 text-rose-500" /> Upcoming Events & Birthdays
            </h3>
            <div className="space-y-3">
              {calendarEvents.slice(0, 3).map(evt => (
                <div key={evt.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="h-8 w-8 rounded-lg bg-saath-100 text-saath-700 font-bold flex items-center justify-center shrink-0">
                    {evt.startDate.split('-')[2]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{evt.title}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{evt.eventType} • {evt.startDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Audit Activity */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Recent Admin Activity</h3>
              <button onClick={() => navigate('/audit-logs')} className="text-xs font-bold text-saath-600 hover:underline">
                View Log
              </button>
            </div>
            <div className="space-y-2 text-xs">
              {auditLogs.slice(0, 3).map(log => (
                <div key={log.id} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span>{log.action}</span>
                    <span className="text-[10px] text-slate-400">{log.date.split(',')[1]}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{log.affectedEntity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
