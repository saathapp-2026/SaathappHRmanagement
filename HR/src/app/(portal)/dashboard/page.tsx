/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns";
import { 
  CheckCircle2, Clock, ChevronRight, Bell, Calendar as CalendarIcon, 
  Briefcase, MessageSquare, User, Monitor
} from "lucide-react";
import Link from "next/link";
import { AttendanceService } from "@/services/attendanceService";
import { profileService } from "@/services/employee/profile.service";
import { PortalService } from "@/services/portalService";
import { notificationsService } from "@/services/employee/notifications.service";
import { helpService } from "@/services/employee/help.service";

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState("");
  const [liveDuration, setLiveDuration] = useState("0h 00m");
  const [isProcessing, setIsProcessing] = useState(false);
  const [employeeName, setEmployeeName] = useState("");
  
  // States for real data
  const [todayAttendance, setTodayAttendance] = useState<any>(null);
  const [leaveBalances, setLeaveBalances] = useState<Array<any>>([]);
  const [attendanceHistory, setAttendanceHistory] = useState<Array<any>>([]);
  const [leaveRequests, setLeaveRequests] = useState<Array<any>>([]);
  const [notifications, setNotifications] = useState<Array<any>>([]);
  const [helpRequests, setHelpRequests] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);

  // Time ticker & Live Duration
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      
      const isNoRecord = !todayAttendance || (Array.isArray(todayAttendance) && todayAttendance.length === 0);
      const record = isNoRecord ? null : (Array.isArray(todayAttendance) ? todayAttendance[0] : todayAttendance);

      if (record?.check_in_at) {
        const checkInTime = new Date(record.check_in_at).getTime();
        const endTime = record?.check_out_at ? new Date(record.check_out_at).getTime() : now.getTime();
        const diffMs = Math.max(0, endTime - checkInTime);
        const totalMins = Math.floor(diffMs / 60000);
        const hrs = Math.floor(totalMins / 60);
        const mins = totalMins % 60;
        setLiveDuration(`${hrs.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m`);
      } else {
        setLiveDuration("0h 00m");
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [todayAttendance]);

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Profile
      try {
        const profile = await profileService.getEmployeeProfile();
        if (profile?.full_name) {
          setEmployeeName(profile.full_name.split(' ')[0]);
        }
      } catch (e) {
        console.error("Profile error:", e);
      }

      // 2. Today's Attendance
      try {
        const att = await AttendanceService.getTodayAttendance();
        setTodayAttendance(att);
      } catch (e) {
        console.error("Attendance error:", e);
      }

      // 3. Leave Balances
      try {
        const balances = await PortalService.getLeaveBalances();
        setLeaveBalances(balances || []);
      } catch (e) {
         console.error("Balances error:", e);
      }

      // 4. Attendance History (current month)
      try {
        const start = startOfMonth(new Date()).toISOString();
        const end = endOfMonth(new Date()).toISOString();
        const history = await AttendanceService.getAttendanceHistory(start, end);
        setAttendanceHistory(history?.data || []);
      } catch (e) {
         console.error("History error:", e);
      }

      // 5. Leave Requests
      try {
        const leaves = await PortalService.getLeaveHistory();
        setLeaveRequests(leaves || []);
      } catch (e) {
         console.error("Leaves error:", e);
      }

      // 6. Notifications
      try {
        const notifs = await notificationsService.getNotifications();
        setNotifications((notifs || []).slice(0, 3));
      } catch (e) {
         console.error("Notifications error:", e);
      }

      // 7. Help Requests
      try {
        const helps = await helpService.getHelpRequests();
        setHelpRequests((helps || []).slice(0, 3));
      } catch (e) {
         console.error("Help requests error:", e);
      }

    } catch (e) {
      console.error("Dashboard error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDashboardData();
  }, [loadDashboardData]);

  const handleAttendanceAction = async () => {
    if (isProcessing) return;
    const isNoRecord = !todayAttendance || (Array.isArray(todayAttendance) && todayAttendance.length === 0);
    const record = isNoRecord ? null : (Array.isArray(todayAttendance) ? todayAttendance[0] : todayAttendance);
    if (record?.check_in_at && record?.check_out_at) return;
    
    setIsProcessing(true);
    try {
      if (record?.check_in_at && !record?.check_out_at) {
        await AttendanceService.checkOut();
      } else if (!record?.check_in_at) {
        await AttendanceService.checkIn();
      }
      
      const att = await AttendanceService.getTodayAttendance();
      setTodayAttendance(att);
    } catch (e) {
      console.error("Attendance action error:", e);
      // Let's add a small alert for debugging if needed, though toast would be better.
      alert(`Action Failed: ${(e as any)?.message || 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const now = new Date();
  const currentMonthDays = eachDayOfInterval({ start: startOfMonth(now), end: endOfMonth(now) });
  
  // Total leave balance calc
  const totalBalance = leaveBalances.reduce((acc, curr) => acc + (curr.balance || 0), 0);

  // Get upcoming leaves (approved and start_date > now)
  const upcomingLeaves = leaveRequests.filter(l => 
    l.status === 'approved' && new Date(l.start_date) > new Date()
  ).slice(0, 2);

  const getRelativeTime = (dateStr: string) => {
    const d = new Date(dateStr);
    const diff = Math.floor((new Date().getTime() - d.getTime()) / 1000);
    if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
    return `${Math.floor(diff/86400)}d ago`;
  };

  const getAttendanceStatusColor = (date: Date) => {
    const record = attendanceHistory.find(r => isSameDay(new Date(r.attendance_date), date));
    if (!record) return null;
    switch(record.status) {
      case 'present': return 'bg-green-500';
      case 'half_day': return 'bg-orange-400';
      case 'absent': return 'bg-red-500';
      case 'on_leave': return 'bg-purple-500';
      default: return 'bg-slate-300';
    }
  };

  if (loading) {
     return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header Greeting */}
      <div className="flex justify-between items-end bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-2xl text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
        <div className="relative z-10">
          <p className="text-blue-100 font-medium mb-1">Good morning,</p>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {employeeName || "Employee"}! 👋</h1>
          <p className="text-blue-100/80 text-sm mt-2 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            {format(now, "EEEE, d MMMM yyyy")}
          </p>
        </div>
        <div className="text-right relative z-10 hidden sm:block">
          <div className="text-4xl font-bold tracking-tighter tabular-nums drop-shadow-sm">{currentTime || "--:--"}</div>
          <p className="text-blue-100 text-sm mt-1">Current Time</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Mobile/Tablet Grid Layout */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Today&apos;s Status Card */}
          <Card className="shadow-sm border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0"></div>
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="text-sm font-bold text-slate-800">Today&apos;s Status</CardTitle>
            </CardHeader>
              {/* Compute State Variables */}
              {/* Compute State Variables */}
              {(() => {
                const isNoRecord = !todayAttendance || (Array.isArray(todayAttendance) && todayAttendance.length === 0);
                const record = isNoRecord ? null : (Array.isArray(todayAttendance) ? todayAttendance[0] : todayAttendance);
                
                type AttendanceState = "not_checked_in" | "checked_in" | "checked_out";
                let attendanceState: AttendanceState = "not_checked_in";
                if (!record) {
                  attendanceState = "not_checked_in";
                } else if (record.check_in_at && !record.check_out_at) {
                  attendanceState = "checked_in";
                } else if (record.check_out_at) {
                  attendanceState = "checked_out";
                }

                return (
                  <CardContent className="relative z-10 space-y-6">
                    {/* Status Information */}
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${attendanceState === 'checked_out' ? 'bg-blue-100 text-blue-600' : attendanceState === 'checked_in' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          {attendanceState === 'checked_out' ? 'Checked Out' : attendanceState === 'checked_in' ? 'Checked In' : 'Check In'}
                        </p>
                        <p className="text-lg font-bold text-slate-800 leading-tight">
                          {record?.check_in_at ? `Check In: ${format(new Date(record.check_in_at), 'hh:mm a')}` : 'Not checked in yet'}
                        </p>
                        {attendanceState === 'checked_out' && record?.check_out_at && (
                          <p className="text-sm font-bold text-slate-800 leading-tight mt-1">
                            Check Out: {format(new Date(record.check_out_at), 'hh:mm a')}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Attendance Action Area (always present to reserve space) */}
                    <div className="mt-4 min-h-[48px]">
                      {attendanceState === "not_checked_in" && (
                        <button
                          type="button"
                          onClick={handleAttendanceAction}
                          disabled={isProcessing}
                          className="w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
                        >
                          {isProcessing ? "Checking in..." : "Check In"}
                        </button>
                      )}

                      {attendanceState === "checked_in" && (
                        <button
                          type="button"
                          onClick={handleAttendanceAction}
                          disabled={isProcessing}
                          className="w-full rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                        >
                          {isProcessing ? "Checking out..." : "Check Out"}
                        </button>
                      )}

                      {attendanceState === "checked_out" && (
                        <div className="w-full rounded-xl bg-gray-100 px-4 py-3 text-center font-medium text-gray-600">
                          Attendance Completed
                        </div>
                      )}
                    </div>

                    {/* Stats Area */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50 mt-4">
                      <div>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                          {attendanceState === 'checked_out' ? 'Total Worked' : 'Working Hours'}
                        </p>
                        <p className="text-sm font-bold text-slate-800 leading-tight">{liveDuration}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Leave Balance</p>
                        <p className="text-sm font-bold text-slate-800 leading-tight">{totalBalance} Days</p>
                      </div>
                    </div>
                  </CardContent>
                );
              })()}
            </Card>

            {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Link href="/attendance">
              <Card className="shadow-sm border-slate-100 hover:border-blue-600/40 transition-colors">
                <CardContent className="p-4 flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Attendance</p>
                    <p className="text-[10px] text-slate-500">View history</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/leave/apply">
              <Card className="shadow-sm border-slate-100 hover:border-blue-600/40 transition-colors">
                <CardContent className="p-4 flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Apply Leave</p>
                    <p className="text-[10px] text-slate-500">Submit request</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/concerns/raise">
              <Card className="shadow-sm border-slate-100 hover:border-blue-600/40 transition-colors">
                <CardContent className="p-4 flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 leading-tight">Raise Concern</p>
                    <p className="text-[10px] text-slate-500">Get help</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/profile">
              <Card className="shadow-sm border-slate-100 hover:border-blue-600/40 transition-colors">
                <CardContent className="p-4 flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">My Profile</p>
                    <p className="text-[10px] text-slate-500">View details</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Desktop Grid Layout (Right column) */}
        <div className="lg:col-span-8 space-y-6 hidden lg:block">
          
          <div className="grid grid-cols-2 gap-6">
            
            {/* Attendance History Calendar */}
            <Card className="shadow-sm border-slate-100">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-800">Attendance History</CardTitle>
                <Link href="/attendance">
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-semibold text-slate-700 mb-4">{format(now, "MMMM yyyy")}</div>
                <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center text-xs">
                  <div className="font-medium text-slate-400">Sun</div>
                  <div className="font-medium text-slate-400">Mon</div>
                  <div className="font-medium text-slate-400">Tue</div>
                  <div className="font-medium text-slate-400">Wed</div>
                  <div className="font-medium text-slate-400">Thu</div>
                  <div className="font-medium text-slate-400">Fri</div>
                  <div className="font-medium text-slate-400">Sat</div>
                  
                  {Array.from({ length: currentMonthDays[0].getDay() }).map((_, i) => (
                    <div key={`empty-${i}`} className="text-slate-300"></div>
                  ))}
                  
                  {currentMonthDays.map(day => {
                    const statusColor = getAttendanceStatusColor(day);
                    const isTodayMarker = isToday(day);
                    return (
                      <div key={day.toISOString()} className={`flex flex-col items-center ${isTodayMarker ? 'bg-blue-600 text-white rounded-full w-6 h-6 justify-center mx-auto' : 'text-slate-800'}`}>
                        {format(day, 'd')}
                        {statusColor && !isTodayMarker && <span className={`w-1 h-1 rounded-full mt-1 ${statusColor}`}></span>}
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between items-center mt-6 text-[10px] text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500"></span> Present</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-400"></span> Half Day</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span> Absent</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Leave</div>
                </div>
              </CardContent>
            </Card>

            {/* Leave Requests */}
            <Card className="shadow-sm border-slate-100">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-800">Upcoming Leave</CardTitle>
                <Link href="/leave" className="text-[10px] text-blue-600 font-medium hover:underline">View All</Link>
              </CardHeader>
              <CardContent className="space-y-4 mt-2">
                {upcomingLeaves.length === 0 ? (
                   <p className="text-sm text-slate-500">No upcoming leave</p>
                ) : (
                  upcomingLeaves.map(leave => (
                    <div key={leave.id} className="flex justify-between items-center pb-3 border-b border-slate-50 last:border-0">
                      <div className="flex gap-3 items-center">
                        <div className="w-8 h-8 rounded-md bg-purple-50 flex items-center justify-center">
                          <Briefcase className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{leave.leave_types?.name || 'Leave'}</p>
                          <p className="text-[10px] text-slate-500">{format(new Date(leave.start_date), 'dd MMM yyyy')} - {format(new Date(leave.end_date), 'dd MMM yyyy')}</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-medium rounded-full border border-green-100 capitalize">{leave.status}</span>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* HR Notifications */}
            <Card className="shadow-sm border-slate-100">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-800">HR Notifications</CardTitle>
                <Link href="/notifications" className="text-[10px] text-blue-600 font-medium hover:underline">View All</Link>
              </CardHeader>
              <CardContent className="space-y-4 mt-2">
                {notifications.length === 0 ? (
                  <p className="text-sm text-slate-500">No notifications</p>
                ) : (
                  notifications.map(notif => (
                    <div key={notif.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <Bell className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-xs font-bold text-slate-800">{notif.title}</p>
                          <p className="text-[10px] text-slate-400">{getRelativeTime(notif.created_at)}</p>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{notif.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Ask for Help */}
            <Card className="shadow-sm border-slate-100">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-800">Ask for Help</CardTitle>
                <Link href="/help" className="text-[10px] text-blue-600 font-medium hover:underline">View All</Link>
              </CardHeader>
              <CardContent className="space-y-4 mt-2">
                {helpRequests.length === 0 ? (
                   <p className="text-sm text-slate-500">No help requests yet</p>
                ) : (
                  helpRequests.map(help => (
                    <div key={help.id} className="flex justify-between items-center pb-3 border-b border-slate-50 last:border-0">
                      <div className="flex gap-3 items-center">
                        <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center">
                          <Monitor className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{help.category}</p>
                          <p className="text-[10px] text-slate-500 line-clamp-1">{help.subject}</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-medium rounded-full border border-blue-100 capitalize">{help.status}</span>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
