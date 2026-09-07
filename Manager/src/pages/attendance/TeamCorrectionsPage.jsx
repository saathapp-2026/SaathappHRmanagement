import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { CheckCircle2, XCircle, HelpCircle, FileText, AlertCircle } from 'lucide-react';

export const TeamCorrectionsPage = () => {
  const { attendanceCorrections, approveCorrection, rejectCorrection, requestInfoCorrection } = useHR();

  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = attendanceCorrections.filter(c => filterStatus === 'All' || c.status === filterStatus);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Attendance Corrections Approval Queue</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Review and resolve employee attendance correction requests
          </p>
        </div>

        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Queue List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 bg-white rounded-3xl border border-slate-200/80">
            <AlertCircle className="h-10 w-10 mx-auto text-slate-300 mb-2" />
            <p className="font-bold text-sm text-slate-700">No correction requests found</p>
          </div>
        ) : (
          filtered.map(cor => (
            <div key={cor.id} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold">
                    Correction Request
                  </span>
                  <span className="font-mono text-xs text-slate-400">{cor.id}</span>
                  <span className="text-xs text-slate-400">• Submitted {cor.submissionDate}</span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900">
                  {cor.employeeName} <span className="text-xs font-medium text-slate-500">({cor.departmentName})</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Original Record ({cor.date})</span>
                    <span className="font-bold text-rose-600">{cor.existingCheckIn} - {cor.existingCheckOut} ({cor.existingStatus})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Requested Record</span>
                    <span className="font-bold text-emerald-700">{cor.requestedCheckIn} - {cor.requestedCheckOut}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600">
                  <strong>Reason:</strong> "{cor.reason}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                {cor.status === 'Pending' ? (
                  <>
                    <button
                      onClick={() => rejectCorrection(cor.id)}
                      className="px-3.5 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => requestInfoCorrection(cor.id)}
                      className="px-3.5 py-2 rounded-xl border border-amber-200 text-amber-700 hover:bg-amber-50 font-bold text-xs"
                    >
                      Request Info
                    </button>
                    <button
                      onClick={() => approveCorrection(cor.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30"
                    >
                      Approve
                    </button>
                  </>
                ) : (
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                    cor.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {cor.status}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
