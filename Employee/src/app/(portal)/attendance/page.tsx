"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { AttendanceService, MonthlySummary, AttendanceRecord } from "@/services/attendanceService";
import { useRouter } from "next/navigation";

export default function AttendanceHistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<AttendanceRecord[]>([]);
  const [summary, setSummary] = useState<MonthlySummary | null>(null);
  
  const [currentDate, setCurrentDate] = useState(new Date());
  
  useEffect(() => {
    async function loadData() {
      try {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        
        // Month start and end
        const startDate = `${year}-${month}-01`;
        // rough end date for current month
        const endDate = new Date(year, currentDate.getMonth() + 1, 0).toISOString().split('T')[0];

        const records = await AttendanceService.getAttendanceHistory(startDate, endDate);
        setHistory(records?.data || []);
        
        const sum = await AttendanceService.getMonthlySummary(startDate, endDate);
        setSummary(sum);
      } catch (e) {
        console.error(e);
      }
    }
    loadData();
  }, [currentDate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return "text-green-600 bg-green-50 border-green-100";
      case 'late': return "text-orange-600 bg-orange-50 border-orange-100";
      case 'half_day': return "text-orange-600 bg-orange-50 border-orange-100";
      case 'absent': return "text-red-600 bg-red-50 border-red-100";
      case 'on_leave': return "text-purple-600 bg-purple-50 border-purple-100";
      case 'holiday': return "text-blue-600 bg-blue-50 border-blue-100";
      case 'weekly_off': return "text-slate-600 bg-slate-50 border-slate-100";
      case 'work_from_home': return "text-teal-600 bg-teal-50 border-teal-100";
      default: return "text-slate-600 bg-slate-50 border-slate-100";
    }
  };

  const formatTime = (isoString: string | null) => {
    if (!isoString) return "-";
    return new Date(isoString).toLocaleTimeString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Attendance History</h1>
        <p className="text-slate-500 text-sm mt-1">Review your past attendance records and request corrections if needed.</p>
      </div>
      
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">Working Days</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.totalWorkingDays}</div>
              </CardContent>
           </Card>
           <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">Present</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{summary.presentDays}</div>
              </CardContent>
           </Card>
           <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">Absent/Leave</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{summary.absentDays + summary.leaveDays}</div>
              </CardContent>
           </Card>
           <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">Attendance %</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{summary.attendancePercentage}%</div>
              </CardContent>
           </Card>
        </div>
      )}

      <Card className="shadow-sm border-slate-100">
        <CardHeader className="border-b border-slate-50 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg text-slate-800">
                {currentDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
              </CardTitle>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrevMonth}>Previous Month</Button>
              <Button variant="outline" size="sm" onClick={handleNextMonth}>Next Month</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Check In</th>
                  <th className="px-6 py-4 font-medium">Check Out</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {history.map((record, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{formatDate(record.attendance_date)}</td>
                    <td className="px-6 py-4 text-slate-600">{formatTime(record.check_in_at)}</td>
                    <td className="px-6 py-4 text-slate-600">{formatTime(record.check_out_at)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)} capitalize`}>
                        {record.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm" className="text-xs h-8" onClick={() => router.push(`/attendance/correction?recordId=${record.id}&date=${record.attendance_date}`)}>Request Correction</Button>
                    </td>
                  </tr>
                ))}
                {history.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      No attendance records found for this month.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
