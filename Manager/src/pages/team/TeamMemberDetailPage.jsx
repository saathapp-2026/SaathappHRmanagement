import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHR } from '../../context/HRContext';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Clock,
  CalendarDays,
  Target,
  Award,
  MessageSquare,
  ShieldAlert
} from 'lucide-react';

export const TeamMemberDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { teamMembers, goals, performanceReviews, feedback, leaveRequests } = useHR();

  const [activeTab, setActiveTab] = useState('overview');

  const employee = teamMembers.find(m => m.id === id || m.employeeId === id) || teamMembers[0];

  if (!employee) {
    return (
      <div className="p-12 text-center text-slate-500">
        Employee profile not found.
      </div>
    );
  }

  // Filter employee specific goals & reviews
  const empGoals = goals.filter(g => g.employeeId === employee.id || g.employeeName === employee.fullName);
  const empReviews = performanceReviews.filter(r => r.employeeId === employee.id || r.employeeName === employee.fullName);
  const empFeedback = feedback.filter(f => f.employeeId === employee.id || f.employeeName === employee.fullName);
  const empLeaves = leaveRequests.filter(l => l.employeeId === employee.id || l.employeeName === employee.fullName);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Back Button */}
      <button
        onClick={() => navigate('/team')}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Team Directory
      </button>

      {/* Header Profile Card */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img src={employee.avatar} alt="" className="h-20 w-20 rounded-full object-cover ring-4 ring-saath-500/20 shadow-md" />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900">{employee.fullName}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-saath-100 text-saath-800 text-[10px] font-bold">
                {employee.employeeId}
              </span>
            </div>
            <p className="text-xs font-bold text-saath-600">{employee.designationName} • {employee.departmentName}</p>
            <p className="text-xs text-slate-500 font-medium flex items-center gap-2 pt-0.5">
              <span><MapPin className="h-3.5 w-3.5 inline text-slate-400" /> {employee.workLocation}</span>
              <span>•</span>
              <span>Joined {employee.joiningDate}</span>
            </p>
          </div>
        </div>

        {/* Attendance Summary Pill */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-right min-w-[180px]">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Today's Status</span>
          <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold ${
            employee.todayStatus === 'Present' ? 'bg-emerald-100 text-emerald-800' :
            employee.todayStatus === 'Late' ? 'bg-orange-100 text-orange-800' :
            employee.todayStatus === 'On Leave' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
          }`}>
            {employee.todayStatus} ({employee.checkIn || '-'} to {employee.checkOut || '-'})
          </span>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-bold text-slate-500 overflow-x-auto pb-1">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'attendance', label: 'Attendance' },
          { id: 'leave', label: 'Leave' },
          { id: 'performance', label: 'Performance' },
          { id: 'timeline', label: 'Timeline' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl transition-all ${
              activeTab === tab.id
                ? 'bg-saath-600 text-white shadow-md shadow-saath-600/30'
                : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Security Boundary Alert Notice */}
      <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] font-medium text-amber-800 flex items-center gap-2">
        <ShieldAlert className="h-4 w-4 shrink-0 text-amber-600" />
        <span>
          <strong>Manager Permission Boundary:</strong> Confidential fields (Salary/CTC, Bank details, Aadhaar/PAN, confidential HR notes) are restricted.
        </span>
      </div>

      {/* Tab Content 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900">Work Contact Details</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-slate-400" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Official Email</span>
                  <span className="font-bold text-slate-800">{employee.officialEmail}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-slate-400" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Work Mobile</span>
                  <span className="font-bold text-slate-800">{employee.mobileNumber || '+91 98765 43210'}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-slate-400" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Work Location</span>
                  <span className="font-bold text-slate-800">{employee.workLocation}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900">Employment Details</h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Reporting Manager</span>
                <span className="font-bold text-slate-800">{employee.reportingManagerName || 'Rohit Mehta'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Employment Type</span>
                <span className="font-bold text-slate-800">{employee.employmentType}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Joining Date</span>
                <span className="font-bold text-slate-800">{employee.joiningDate}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Attendance */}
      {activeTab === 'attendance' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900">Attendance Metrics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
              <span className="text-[10px] font-bold text-emerald-600 uppercase">Present Rate</span>
              <p className="text-2xl font-black text-emerald-700 mt-1">94%</p>
              <p className="text-[10px] text-emerald-600 mt-1">21 Days</p>
            </div>
            <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100">
              <span className="text-[10px] font-bold text-orange-600 uppercase">Late Arrivals</span>
              <p className="text-2xl font-black text-orange-700 mt-1">2</p>
              <p className="text-[10px] text-orange-600 mt-1">Days</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
              <span className="text-[10px] font-bold text-amber-600 uppercase">Leave Days</span>
              <p className="text-2xl font-black text-amber-700 mt-1">1</p>
              <p className="text-[10px] text-amber-600 mt-1">Day</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-600 uppercase">Absences</span>
              <p className="text-2xl font-black text-slate-700 mt-1">0</p>
              <p className="text-[10px] text-slate-500 mt-1">Days</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 3: Leave */}
      {activeTab === 'leave' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900">Leave Requests & History</h3>
          <div className="space-y-3">
            {empLeaves.map(l => (
              <div key={l.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900">{l.leaveType}</p>
                  <p className="text-slate-500 mt-0.5">{l.startDate} to {l.endDate} ({l.daysCount} days)</p>
                  <p className="text-slate-600 italic mt-1">"{l.reason}"</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  l.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {l.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 4: Performance */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900">Active Goals / KRAs</h3>
            {empGoals.map(g => (
              <div key={g.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{g.title}</span>
                  <span className="px-2 py-0.5 rounded bg-saath-100 text-saath-800 text-[10px] font-bold">{g.status}</span>
                </div>
                <p className="text-slate-600">{g.description}</p>
                <div className="flex items-center gap-4 text-[11px] text-slate-500">
                  <span>Target: {g.target}</span>
                  <span>Due: {g.due}</span>
                  <span>Progress: {g.progress}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900">Manager Feedback History</h3>
            {empFeedback.map(f => (
              <div key={f.id} className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-purple-900">
                  <span>{f.categoryLabel}</span>
                  <span className="text-[10px] text-purple-600">{f.createdAt}</span>
                </div>
                <p className="text-purple-800 italic">"{f.content}"</p>
                <span className="text-[10px] text-slate-400 block pt-1">— Given by {f.givenBy}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 5: Timeline */}
      {activeTab === 'timeline' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900">Employment Milestone Timeline</h3>
          <div className="space-y-4 text-xs pl-4 border-l-2 border-saath-200">
            <div>
              <p className="font-bold text-slate-900">Joined Company</p>
              <p className="text-slate-500">{employee.joiningDate} • Appointed as {employee.designationName}</p>
            </div>
            <div>
              <p className="font-bold text-slate-900">Probation Completion Milestone</p>
              <p className="text-slate-500">Scheduled for {employee.probationEndDate || '15 Sep 2026'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
