import React from 'react';
import { useHR } from '../../context/HRContext';
import { UserX, CheckCircle2, AlertCircle } from 'lucide-react';

export const OffboardingPage = () => {
  const { offboardingRequests, updateOffboardingClearance } = useHR();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Team Offboarding & Handover Clearance</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Track resignations, knowledge transfer (KT) milestones, and team project clearances
          </p>
        </div>
      </div>

      {/* Offboarding Queue */}
      <div className="space-y-4">
        {offboardingRequests.length === 0 ? (
          <div className="p-12 text-center text-slate-400 bg-white rounded-3xl border border-slate-200/80">
            No active team resignations or offboarding requests.
          </div>
        ) : (
          offboardingRequests.map(off => (
            <div key={off.id} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-extrabold">
                    Resignation Process
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1">{off.employeeName}</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                  {off.status}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200/60 font-medium">
                <div><span className="text-slate-400 block text-[10px]">Resignation Date</span><span className="font-bold text-slate-800">{off.resignationDate}</span></div>
                <div><span className="text-slate-400 block text-[10px]">Proposed LWD</span><span className="font-bold text-slate-800">{off.proposedLWD}</span></div>
                <div><span className="text-slate-400 block text-[10px]">Notice Period</span><span className="font-bold text-slate-800">{off.noticePeriod}</span></div>
                <div><span className="text-slate-400 block text-[10px]">Reason</span><span className="font-bold text-slate-800">{off.reason}</span></div>
              </div>

              {/* Clearance Status Controls */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <h4 className="font-bold text-slate-800">Manager Handover & KT Clearance Checklist:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span>Knowledge Transfer (KT)</span>
                    <button
                      onClick={() => updateOffboardingClearance(off.id, 'ktStatus', off.ktStatus === 'Completed' ? 'In Progress' : 'Completed')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                        off.ktStatus === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {off.ktStatus}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span>Project Handover</span>
                    <button
                      onClick={() => updateOffboardingClearance(off.id, 'handoverStatus', off.handoverStatus === 'Completed' ? 'In Progress' : 'Completed')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                        off.handoverStatus === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {off.handoverStatus}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span>Team Clearance</span>
                    <button
                      onClick={() => updateOffboardingClearance(off.id, 'managerClearance', off.managerClearance === 'Cleared' ? 'Pending' : 'Cleared')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                        off.managerClearance === 'Cleared' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {off.managerClearance}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
