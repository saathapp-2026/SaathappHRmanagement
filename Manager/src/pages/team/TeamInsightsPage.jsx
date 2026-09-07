import React from 'react';
import { useHR } from '../../context/HRContext';
import { BarChart3, TrendingUp, Users, Calendar, Award, ShieldAlert } from 'lucide-react';

export const TeamInsightsPage = () => {
  const { teamMembers, dailyAttendance } = useHR();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Team Insights & Analytics</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Analytics scoped strictly to your authorized reporting hierarchy
          </p>
        </div>
      </div>

      {/* Security Scope Notice */}
      <div className="p-3 rounded-2xl bg-saath-50 border border-saath-200 text-xs text-saath-800 font-medium flex items-center gap-2">
        <ShieldAlert className="h-4 w-4 text-saath-600 shrink-0" />
        <span>Manager analytics cover only your direct reports and authorized team members.</span>
      </div>

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Attendance Trend */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900">Attendance Trend</h3>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-600 mb-1 font-bold">
                <span>Present</span>
                <span>72%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '72%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-slate-600 mb-1 font-bold">
                <span>Late Arrivals</span>
                <span>11%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '11%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-slate-600 mb-1 font-bold">
                <span>On Leave</span>
                <span>11%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '11%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-slate-600 mb-1 font-bold">
                <span>Absent</span>
                <span>6%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-rose-500 h-2 rounded-full" style={{ width: '6%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Team Availability */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900">Team Availability</h3>
            <Users className="h-4 w-4 text-saath-600" />
          </div>
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
              <span className="text-[10px] font-bold text-emerald-600 uppercase">Office</span>
              <p className="text-xl font-black text-emerald-700 mt-1">12</p>
            </div>
            <div className="p-3 rounded-2xl bg-purple-50 border border-purple-100">
              <span className="text-[10px] font-bold text-purple-600 uppercase">Remote</span>
              <p className="text-xl font-black text-purple-700 mt-1">4</p>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100">
              <span className="text-[10px] font-bold text-amber-600 uppercase">Leave</span>
              <p className="text-xl font-black text-amber-700 mt-1">2</p>
            </div>
          </div>
        </div>

        {/* Performance Distribution */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900">Performance Rating Distribution</h3>
            <Award className="h-4 w-4 text-purple-600" />
          </div>
          <div className="space-y-2 text-xs font-medium">
            <div className="flex justify-between p-2 rounded-xl bg-purple-50 text-purple-900">
              <span>Outstanding</span>
              <span className="font-extrabold">3 Employees</span>
            </div>
            <div className="flex justify-between p-2 rounded-xl bg-emerald-50 text-emerald-900">
              <span>Exceeds Expectations</span>
              <span className="font-extrabold">5 Employees</span>
            </div>
            <div className="flex justify-between p-2 rounded-xl bg-slate-50 text-slate-800">
              <span>Meets Expectations</span>
              <span className="font-extrabold">8 Employees</span>
            </div>
            <div className="flex justify-between p-2 rounded-xl bg-amber-50 text-amber-900">
              <span>Needs Improvement</span>
              <span className="font-extrabold">2 Employees</span>
            </div>
          </div>
        </div>

        {/* Team Strength */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4 md:col-span-2 lg:col-span-3">
          <h3 className="text-sm font-extrabold text-slate-900">Team Composition & Strength</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Total Team</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{teamMembers.length}</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
              <span className="text-[10px] font-bold text-emerald-600 uppercase">Active</span>
              <p className="text-2xl font-black text-emerald-700 mt-1">{teamMembers.length}</p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
              <span className="text-[10px] font-bold text-purple-600 uppercase">New Joiners</span>
              <p className="text-2xl font-black text-purple-700 mt-1">2</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
              <span className="text-[10px] font-bold text-amber-600 uppercase">In Probation</span>
              <p className="text-2xl font-black text-amber-700 mt-1">3</p>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100">
              <span className="text-[10px] font-bold text-rose-600 uppercase">Notice Period</span>
              <p className="text-2xl font-black text-rose-700 mt-1">1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
