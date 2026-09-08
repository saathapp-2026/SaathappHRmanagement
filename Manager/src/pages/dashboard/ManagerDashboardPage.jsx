import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHR } from '../../context/HRContext';
import {
  Users,
  Clock,
  UserX,
  CalendarDays,
  AlertCircle,
  Laptop,
  CheckCircle2,
  HelpCircle,
  Search,
  Bell,
  Sparkles,
  ArrowRight,
  Plus,
  Calendar,
  Gift,
  Award,
  ChevronRight,
  MessageSquare,
  Target,
  Megaphone
} from 'lucide-react';

export const ManagerDashboardPage = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    teamMembers,
    dailyAttendance,
    leaveRequests,
    attendanceCorrections,
    remoteWorkRequests,
    probationReviews,
    announcements,
    notifications,
    calendarEvents,
    approveLeaveRequest,
    rejectLeaveRequest,
    approveCorrection,
    rejectCorrection,
    approveRemoteWork,
    rejectRemoteWork
  } = useHR();

  const [searchQuery, setSearchQuery] = useState('');
  const todayDateStr = new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  // Compute KPI metrics dynamically from backend data
  const totalTeamCount = teamMembers.length;
  const presentCount = dailyAttendance.filter(a => a.status === 'Present').length;
  const lateCount = dailyAttendance.filter(a => a.status === 'Late').length;
  const onLeaveCount = dailyAttendance.filter(a => a.status === 'On Leave').length;
  const absentCount = dailyAttendance.filter(a => a.status === 'Absent').length;
  const remoteCount = dailyAttendance.filter(a => a.location === 'Remote' || a.status === 'Remote').length;

  const pendingLeaves = leaveRequests.filter(l => l.status === 'Pending');
  const pendingCorrections = attendanceCorrections.filter(c => c.status === 'Pending');
  const pendingWFH = remoteWorkRequests.filter(w => w.status === 'Pending');
  const pendingApprovalsCount = pendingLeaves.length + pendingCorrections.length + pendingWFH.length;

  // Filtered members for header search
  const filteredTeam = searchQuery.trim()
    ? teamMembers.filter(m => m.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || m.employeeId.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, {currentUser?.fullName || 'Manager'}!
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Here's what's happening with your team today, {todayDateStr}.
          </p>
        </div>

        {/* Header Right Actions & Search */}
        <div className="flex items-center gap-3 relative">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-saath-500 bg-slate-50/50"
            />
            {filteredTeam.length > 0 && (
              <div className="absolute top-11 left-0 right-0 z-20 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 space-y-1">
                {filteredTeam.map(m => (
                  <div
                    key={m.id}
                    onClick={() => navigate(`/team/${m.id}`)}
                    className="p-2 hover:bg-slate-50 rounded-xl cursor-pointer flex items-center justify-between text-xs"
                  >
                    <span className="font-bold text-slate-800">{m.fullName}</span>
                    <span className="text-[10px] text-slate-400">{m.designationName}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => navigate('/notifications')}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 relative"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            {notifications.filter(n => !n.isRead).length > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            )}
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <img src={currentUser?.avatar} alt="Profile" className="h-9 w-9 rounded-full object-cover ring-2 ring-saath-500/30" />
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-slate-800 leading-none">{currentUser?.fullName}</p>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">{currentUser?.departmentName} Team</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Team Members</span>
            <Users className="h-4 w-4 text-saath-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{totalTeamCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-600">
            <span className="text-[11px] font-bold uppercase">Present Today</span>
            <Clock className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-700 mt-2">{presentCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-rose-600">
            <span className="text-[11px] font-bold uppercase">Absent Today</span>
            <UserX className="h-4 w-4 text-rose-600" />
          </div>
          <p className="text-2xl font-black text-rose-700 mt-2">{absentCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-amber-600">
            <span className="text-[11px] font-bold uppercase">On Leave</span>
            <CalendarDays className="h-4 w-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-amber-700 mt-2">{onLeaveCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-orange-600">
            <span className="text-[11px] font-bold uppercase">Late Today</span>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </div>
          <p className="text-2xl font-black text-orange-700 mt-2">{lateCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-purple-600">
            <span className="text-[11px] font-bold uppercase">Remote</span>
            <Laptop className="h-4 w-4 text-purple-600" />
          </div>
          <p className="text-2xl font-black text-purple-700 mt-2">{remoteCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-indigo-600">
            <span className="text-[11px] font-bold uppercase">Pending Approvals</span>
            <CheckCircle2 className="h-4 w-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-indigo-700 mt-2">{pendingApprovalsCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase">Open HR Requests</span>
            <HelpCircle className="h-4 w-4 text-slate-600" />
          </div>
          <p className="text-2xl font-black text-slate-800 mt-2">1</p>
        </div>
      </div>

      {/* 3. Quick Actions */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
        <h2 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            onClick={() => navigate('/leave')}
            className="p-3 rounded-2xl bg-slate-50 hover:bg-saath-50 border border-slate-200/80 hover:border-saath-200 text-slate-700 hover:text-saath-700 transition-all font-bold text-xs flex items-center justify-center gap-2"
          >
            <CalendarDays className="h-4 w-4 text-saath-600" /> Review Leave
          </button>
          <button
            onClick={() => navigate('/corrections')}
            className="p-3 rounded-2xl bg-slate-50 hover:bg-saath-50 border border-slate-200/80 hover:border-saath-200 text-slate-700 hover:text-saath-700 transition-all font-bold text-xs flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4 text-saath-600" /> Attendance Approvals
          </button>
          <button
            onClick={() => navigate('/team')}
            className="p-3 rounded-2xl bg-slate-50 hover:bg-saath-50 border border-slate-200/80 hover:border-saath-200 text-slate-700 hover:text-saath-700 transition-all font-bold text-xs flex items-center justify-center gap-2"
          >
            <Users className="h-4 w-4 text-saath-600" /> View Team
          </button>
          <button
            onClick={() => navigate('/feedback')}
            className="p-3 rounded-2xl bg-slate-50 hover:bg-saath-50 border border-slate-200/80 hover:border-saath-200 text-slate-700 hover:text-saath-700 transition-all font-bold text-xs flex items-center justify-center gap-2"
          >
            <MessageSquare className="h-4 w-4 text-saath-600" /> Give Feedback
          </button>
          <button
            onClick={() => navigate('/goals')}
            className="p-3 rounded-2xl bg-slate-50 hover:bg-saath-50 border border-slate-200/80 hover:border-saath-200 text-slate-700 hover:text-saath-700 transition-all font-bold text-xs flex items-center justify-center gap-2"
          >
            <Target className="h-4 w-4 text-saath-600" /> Create Task/Goal
          </button>
          <button
            onClick={() => navigate('/hr-requests')}
            className="p-3 rounded-2xl bg-slate-50 hover:bg-saath-50 border border-slate-200/80 hover:border-saath-200 text-slate-700 hover:text-saath-700 transition-all font-bold text-xs flex items-center justify-center gap-2"
          >
            <HelpCircle className="h-4 w-4 text-saath-600" /> Raise HR Request
          </button>
        </div>
      </div>

      {/* 4. Main Dashboard Grid Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Attendance & Approvals */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Team Attendance Breakdown */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Today's Team Attendance</h3>
                <p className="text-xs text-slate-500">Live check-in breakdown for your team</p>
              </div>
              <button onClick={() => navigate('/attendance')} className="text-xs font-bold text-saath-600 hover:underline flex items-center gap-1">
                View Details <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                <span className="text-[10px] font-bold text-emerald-600 uppercase">Present</span>
                <p className="text-xl font-black text-emerald-700 mt-1">{presentCount}</p>
              </div>
              <div className="p-3 rounded-2xl bg-orange-50 border border-orange-100">
                <span className="text-[10px] font-bold text-orange-600 uppercase">Late</span>
                <p className="text-xl font-black text-orange-700 mt-1">{lateCount}</p>
              </div>
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100">
                <span className="text-[10px] font-bold text-amber-600 uppercase">On Leave</span>
                <p className="text-xl font-black text-amber-700 mt-1">{onLeaveCount}</p>
              </div>
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100">
                <span className="text-[10px] font-bold text-rose-600 uppercase">Absent</span>
                <p className="text-xl font-black text-rose-700 mt-1">{absentCount}</p>
              </div>
            </div>
          </div>

          {/* Pending Approvals Widget */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Pending Approvals</h3>
                <p className="text-xs text-slate-500">Requires your review and approval</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-extrabold text-[10px]">
                {pendingApprovalsCount} Pending
              </span>
            </div>

            {pendingApprovalsCount === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs font-medium">
                No pending approval requests.
              </div>
            ) : (
              <div className="space-y-3">
                {pendingLeaves.map(l => (
                  <div key={l.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-saath-100 text-saath-800 text-[10px] font-bold">Leave Request</span>
                        <span className="text-xs font-bold text-slate-900">{l.employeeName}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{l.leaveType} • {l.startDate} to {l.endDate} ({l.daysCount} days)</p>
                      <p className="text-[11px] text-slate-600 italic">"{l.reason}"</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => rejectLeaveRequest(l.id)} className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 text-xs font-bold hover:bg-rose-50">Reject</button>
                      <button onClick={() => approveLeaveRequest(l.id)} className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700">Approve</button>
                    </div>
                  </div>
                ))}

                {pendingCorrections.map(c => (
                  <div key={c.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">Attendance Correction</span>
                        <span className="text-xs font-bold text-slate-900">{c.employeeName}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Date: {c.date} • Req Check-Out: {c.requestedCheckOut}</p>
                      <p className="text-[11px] text-slate-600 italic">"{c.reason}"</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => rejectCorrection(c.id)} className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 text-xs font-bold hover:bg-rose-50">Reject</button>
                      <button onClick={() => approveCorrection(c.id)} className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700">Approve</button>
                    </div>
                  </div>
                ))}

                {pendingWFH.map(w => (
                  <div key={w.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-bold">Remote Work Request</span>
                        <span className="text-xs font-bold text-slate-900">{w.employeeName}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Date: {w.requestedDates} • Location: {w.location}</p>
                      <p className="text-[11px] text-slate-600 italic">"{w.reason}"</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => rejectRemoteWork(w.id)} className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 text-xs font-bold hover:bg-rose-50">Reject</button>
                      <button onClick={() => approveRemoteWork(w.id)} className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700">Approve</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Team Members on Leave Widget */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900">Team Members on Leave Today</h3>
            <div className="divide-y divide-slate-100">
              {leaveRequests.filter(l => l.status === 'Approved').length === 0 ? (
                <p className="py-4 text-center text-xs text-slate-400 font-medium">No team members on leave today.</p>
              ) : (
                leaveRequests.filter(l => l.status === 'Approved').map(l => (
                  <div key={l.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-800">{l.employeeName}</p>
                      <p className="text-[10px] text-slate-400">{l.leaveType}</p>
                    </div>
                    <span className="text-slate-500 font-medium">{l.startDate} - {l.endDate}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Approved</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Upcoming Events & Activity */}
        <div className="space-y-6">
          {/* Upcoming Birthdays & Work Anniversaries */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Gift className="h-4 w-4 text-saath-600" /> Upcoming Events & Birthdays
            </h3>
            <div className="space-y-3">
              {(calendarEvents || []).slice(0, 3).map(evt => (
                <div key={evt.id} className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {evt.type === 'Birthday' ? <Gift className="h-4 w-4 text-purple-600" /> : <Award className="h-4 w-4 text-amber-600" />}
                    <div>
                      <p className="font-bold text-slate-800">{evt.title}</p>
                      <p className="text-[10px] text-purple-700 font-medium">{evt.date} • {evt.type}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">{evt.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Team Activity */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900">Recent Team Activity</h3>
            <div className="space-y-3 text-xs">
              {notifications.length === 0 ? (
                <p className="text-center text-slate-400 py-4 font-medium">No recent team activity logged.</p>
              ) : (
                notifications.slice(0, 4).map(n => (
                  <div key={n.id} className="flex items-start gap-2.5 text-slate-600">
                    <div className="h-2 w-2 rounded-full bg-saath-500 mt-1.5 shrink-0" />
                    <p><strong className="text-slate-800">{n.title}:</strong> {n.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Company Announcements */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-saath-600" /> Announcements
              </h3>
              <button onClick={() => navigate('/announcements')} className="text-xs font-bold text-saath-600 hover:underline">View All</button>
            </div>
            {announcements.map(a => (
              <div key={a.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                <p className="font-bold text-slate-900">{a.title}</p>
                <p className="text-slate-600 leading-snug">{a.content}</p>
                <span className="text-[10px] text-slate-400 block pt-1">{a.createdDate} • {a.createdBy}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
