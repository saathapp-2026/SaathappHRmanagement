import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { Laptop, Plus, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export const RemoteWorkPage = () => {
  const { remoteWorkRequests, approveRemoteWork, rejectRemoteWork, addRemoteWorkRequest, currentUser, teamMembers, leaveRequests } = useHR();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form, setForm] = useState({
    employeeName: currentUser?.fullName || '',
    requestedDates: new Date().toISOString().split('T')[0],
    reason: '',
    location: 'Bengaluru Residence'
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (form.reason.trim()) {
      addRemoteWorkRequest(form);
      setForm({ employeeName: currentUser?.fullName || '', requestedDates: new Date().toISOString().split('T')[0], reason: '', location: 'Bengaluru Residence' });
      setIsAddModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Work From Home / Remote Work Management</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Review and approve remote work and hybrid work requests from your team
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-saath-600 hover:bg-saath-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-md shadow-saath-600/30"
        >
          <Plus className="h-4 w-4" /> Submit Remote Work Request
        </button>
      </div>

      {/* Breakdown Cards */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
          <span className="text-[10px] font-bold text-emerald-600 uppercase">Working Office</span>
          <p className="text-2xl font-black text-emerald-700 mt-1">{teamMembers.length}</p>
        </div>
        <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
          <span className="text-[10px] font-bold text-purple-600 uppercase">Working Remote</span>
          <p className="text-2xl font-black text-purple-700 mt-1">{remoteWorkRequests.filter(r => r.status === 'Approved').length}</p>
        </div>
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
          <span className="text-[10px] font-bold text-amber-600 uppercase">On Leave</span>
          <p className="text-2xl font-black text-amber-700 mt-1">{leaveRequests.filter(l => l.status === 'Approved').length}</p>
        </div>
      </div>

      {/* Requests Queue */}
      <div className="space-y-4">
        {remoteWorkRequests.length === 0 ? (
          <div className="p-12 text-center text-slate-400 bg-white rounded-3xl border border-slate-200/80">
            No WFH requests submitted.
          </div>
        ) : (
          remoteWorkRequests.map(req => (
            <div key={req.id} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-extrabold">
                    WFH Request
                  </span>
                  <span className="font-mono text-xs text-slate-400">{req.id}</span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900">{req.employeeName}</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Requested Date: <strong>{req.requestedDates}</strong> • Location: <strong>{req.location}</strong>
                </p>
                <p className="text-xs text-slate-600 italic">"{req.reason}"</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {req.status === 'Pending' ? (
                  <>
                    <button
                      onClick={() => rejectRemoteWork(req.id)}
                      className="px-3.5 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => approveRemoteWork(req.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30"
                    >
                      Approve WFH
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
          ))
        )}
      </div>

      {/* Add WFH Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900">Submit Remote Work Request</h3>
            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Employee Name *</label>
                <input
                  type="text"
                  required
                  value={form.employeeName}
                  onChange={e => setForm({ ...form, employeeName: e.target.value })}
                  className="w-full rounded-xl border p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Requested Date *</label>
                <input
                  type="date"
                  required
                  value={form.requestedDates}
                  onChange={e => setForm({ ...form, requestedDates: e.target.value })}
                  className="w-full rounded-xl border p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Location *</label>
                <input
                  type="text"
                  required
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  className="w-full rounded-xl border p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Reason *</label>
                <textarea
                  rows={2}
                  required
                  value={form.reason}
                  onChange={e => setForm({ ...form, reason: e.target.value })}
                  className="w-full rounded-xl border p-2.5 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-saath-600 text-white font-bold"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
