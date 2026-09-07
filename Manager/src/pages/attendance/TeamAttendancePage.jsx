import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { Clock, Search, Filter, Calendar, CheckCircle2, UserX, AlertCircle, Laptop } from 'lucide-react';

export const TeamAttendancePage = () => {
  const { dailyAttendance } = useHR();

  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchEmployee, setSearchEmployee] = useState('');

  const filteredAttendance = dailyAttendance.filter(a => {
    const matchesSearch = a.employeeName.toLowerCase().includes(searchEmployee.toLowerCase());
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Team Attendance Dashboard</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Review daily check-ins and monthly attendance trends for your team
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="date"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Filter by employee name..."
            value={searchEmployee}
            onChange={e => setSearchEmployee(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-saath-500 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 bg-white"
          >
            <option value="All">All Statuses</option>
            <option value="Present">Present</option>
            <option value="Late">Late</option>
            <option value="On Leave">On Leave</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
      </div>

      {/* Today's Team Attendance Table */}
      <div className="rounded-3xl bg-white border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-900">Today's Team Attendance Log</h3>
          <span className="text-xs text-slate-400 font-medium">Managers review records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-4">Employee</th>
                <th className="px-4 py-4">Check In</th>
                <th className="px-4 py-4">Check Out</th>
                <th className="px-4 py-4">Working Hours</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-6 py-4">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredAttendance.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No attendance logs found.
                  </td>
                </tr>
              ) : (
                filteredAttendance.map(a => (
                  <tr key={a.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{a.employeeName}</td>
                    <td className="px-4 py-4 font-mono">{a.checkIn}</td>
                    <td className="px-4 py-4 font-mono">{a.checkOut}</td>
                    <td className="px-4 py-4 font-mono font-bold text-saath-700">{a.hours > 0 ? `${a.hours} hrs` : '-'}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        a.status === 'Present' ? 'bg-emerald-100 text-emerald-800' :
                        a.status === 'Late' ? 'bg-orange-100 text-orange-800' :
                        a.status === 'On Leave' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{a.location}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
