import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { UserPlus, Plus } from 'lucide-react';

export const RecruitmentRequestsPage = () => {
  const { recruitmentRequests, createRecruitmentRequest, currentUser } = useHR();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    position: '',
    openings: 1,
    employmentType: 'Full-Time',
    experience: '2-4 Years',
    skills: '',
    priority: 'Medium',
    preferredJoiningDate: new Date().toISOString().split('T')[0],
    reason: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.position.trim() && form.reason.trim()) {
      createRecruitmentRequest(form);
      setForm({ position: '', openings: 1, employmentType: 'Full-Time', experience: '2-4 Years', skills: '', priority: 'Medium', preferredJoiningDate: new Date().toISOString().split('T')[0], reason: '' });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Recruitment Requests</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Raise manpower expansion and replacement hiring requests to HR
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-saath-600 hover:bg-saath-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-md shadow-saath-600/30"
        >
          <Plus className="h-4 w-4" /> Raise Hiring Request
        </button>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {recruitmentRequests.map(r => (
          <div key={r.id} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-saath-100 text-saath-800 text-[10px] font-extrabold">
                  {r.priority} Priority
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">{r.position} ({r.openings} Openings)</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                {r.status}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed"><strong>Reason:</strong> {r.reason}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200/60 font-medium">
              <div><span className="text-slate-400 block text-[10px]">Department</span><span className="font-bold text-slate-800">{r.department}</span></div>
              <div><span className="text-slate-400 block text-[10px]">Experience</span><span className="font-bold text-slate-800">{r.experience}</span></div>
              <div><span className="text-slate-400 block text-[10px]">Employment Type</span><span className="font-bold text-slate-800">{r.employmentType}</span></div>
              <div><span className="text-slate-400 block text-[10px]">Preferred Joining</span><span className="font-bold text-slate-800">{r.preferredJoiningDate}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900">Raise Recruitment Request</h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Position Title *</label>
                <input
                  type="text"
                  required
                  value={form.position}
                  onChange={e => setForm({ ...form, position: e.target.value })}
                  placeholder="e.g. Frontend Developer"
                  className="w-full rounded-xl border p-2.5 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Openings</label>
                  <input
                    type="number"
                    min={1}
                    value={form.openings}
                    onChange={e => setForm({ ...form, openings: parseInt(e.target.value) || 1 })}
                    className="w-full rounded-xl border p-2.5 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Priority</label>
                  <select
                    value={form.priority}
                    onChange={e => setForm({ ...form, priority: e.target.value })}
                    className="w-full rounded-xl border p-2.5 font-medium"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Experience Required</label>
                <input
                  type="text"
                  value={form.experience}
                  onChange={e => setForm({ ...form, experience: e.target.value })}
                  placeholder="e.g. 2 - 4 Years"
                  className="w-full rounded-xl border p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Reason / Business Justification *</label>
                <textarea
                  rows={2}
                  required
                  value={form.reason}
                  onChange={e => setForm({ ...form, reason: e.target.value })}
                  placeholder="Explain team expansion or replacement need..."
                  className="w-full rounded-xl border p-2.5 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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
