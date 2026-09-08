import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { Calendar, AlertTriangle, CheckCircle2, XCircle, HelpCircle, CalendarDays } from 'lucide-react';

export const TeamLeavePage = () => {
  const { leaveRequests, approveLeaveRequest, rejectLeaveRequest, requestInfoLeaveRequest } = useHR();

  const [activeTab, setActiveTab] = useState('requests'); // 'requests', 'calendar'

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Manager Leave Approval Center</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Review pending leave applications and analyze team availability overlap
          </p>
        </div>

        <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'requests' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Leave Requests
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'calendar' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Team Leave Calendar
          </button>
        </div>
      </div>

      {activeTab === 'requests' ? (
        <div className="space-y-4">
          {leaveRequests.length === 0 ? (
            <div className="p-12 text-center text-slate-400 bg-white rounded-3xl border border-slate-200/80">
              No leave requests found.
            </div>
          ) : (
            leaveRequests.map(req => (
              <div key={req.id} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-saath-100 text-saath-800 text-[10px] font-extrabold">
                        {req.leaveType}
                      </span>
                      <span className="font-mono text-xs text-slate-400">{req.id}</span>
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900 mt-1">{req.employeeName}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Dates: <strong>{req.startDate} to {req.endDate}</strong> ({req.daysCount} days) • Available Balance: <strong>{req.availableBalance || 9} days</strong>
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {req.status === 'Pending' ? (
                      <>
                        <button
                          onClick={() => rejectLeaveRequest(req.id)}
                          className="px-3.5 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => requestInfoLeaveRequest(req.id)}
                          className="px-3.5 py-2 rounded-xl border border-amber-200 text-amber-700 hover:bg-amber-50 font-bold text-xs"
                        >
                          Request Info
                        </button>
                        <button
                          onClick={() => approveLeaveRequest(req.id)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30"
                        >
                          Approve
                        </button>
                      </>
                    ) : (
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                        req.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {req.status}
                      </span>
                    )}
                  </div>
                </div>

                {/* Overlap Warning Box */}
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                  <span>⚠ Other team members are on leave during these requested dates.</span>
                </div>

                <p className="text-xs text-slate-600">
                  <strong>Reason:</strong> "{req.reason}"
                </p>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Team Leave Calendar Visualization */
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900">Weekly Team Availability Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-extrabold uppercase text-[10px] text-slate-500">
                <tr>
                  <th className="px-4 py-3 text-left">Team Member</th>
                  <th className="px-4 py-3">Mon</th>
                  <th className="px-4 py-3">Tue</th>
                  <th className="px-4 py-3">Wed</th>
                  <th className="px-4 py-3">Thu</th>
                  <th className="px-4 py-3">Fri</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                {teamMembers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400 font-normal">No team members registered.</td>
                  </tr>
                ) : (
                  teamMembers.map(m => (
                    <tr key={m.id}>
                      <td className="px-4 py-3 text-left">{m.fullName}</td>
                      <td className="px-4 py-3 text-emerald-600">✓</td>
                      <td className="px-4 py-3 text-emerald-600">✓</td>
                      <td className="px-4 py-3 text-emerald-600">✓</td>
                      <td className="px-4 py-3 text-emerald-600">✓</td>
                      <td className="px-4 py-3 text-emerald-600">✓</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
