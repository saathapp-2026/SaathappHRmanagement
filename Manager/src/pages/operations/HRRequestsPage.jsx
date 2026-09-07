import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { HelpCircle, Plus } from 'lucide-react';

export const HRRequestsPage = () => {
  const { hrRequests, createHRRequest } = useHR();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    category: 'Employee Issue',
    categoryLabel: 'Employee Issue',
    priority: 'Medium',
    subject: '',
    description: ''
  });

  const categories = [
    'Employee Issue',
    'Recruitment Requirement',
    'Replacement Request',
    'Team Transfer',
    'Promotion Recommendation',
    'Salary Revision Recommendation',
    'Probation',
    'Performance Issue',
    'Disciplinary Issue',
    'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.subject.trim() && form.description.trim()) {
      createHRRequest(form);
      setForm({ category: 'Employee Issue', categoryLabel: 'Employee Issue', priority: 'Medium', subject: '', description: '' });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Manager Requests to HR</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Submit formal requests for transfers, disciplinary matters, promotions, and employee intervention
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-saath-600 hover:bg-saath-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-md shadow-saath-600/30"
        >
          <Plus className="h-4 w-4" /> Raise HR Request
        </button>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {hrRequests.map(r => (
          <div key={r.id} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-saath-100 text-saath-800 text-[10px] font-extrabold">
                  {r.categoryLabel || r.category}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">{r.subject}</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                {r.status}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{r.description}</p>
            {r.hrResponse && (
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                <strong>HR Response:</strong> {r.hrResponse}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900">Raise Request to HR</h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Category *</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value, categoryLabel: e.target.value })}
                  className="w-full rounded-xl border p-2.5 font-medium"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subject / Summary *</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  className="w-full rounded-xl border p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Description *</label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
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
