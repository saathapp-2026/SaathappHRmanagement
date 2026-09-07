import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { MessageSquare, Plus, Award, Star, Heart, ThumbsUp } from 'lucide-react';

export const FeedbackPage = () => {
  const { feedback, addFeedback, teamMembers } = useHR();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    employeeId: teamMembers[0]?.id || '',
    employeeName: teamMembers[0]?.fullName || '',
    type: 'positive',
    category: 'great_performance',
    categoryLabel: 'Great Performance',
    content: ''
  });

  const categories = [
    { value: 'great_performance', label: 'Great Performance' },
    { value: 'outstanding_contribution', label: 'Outstanding Contribution' },
    { value: 'team_player', label: 'Team Player' },
    { value: 'innovation', label: 'Innovation' },
    { value: 'above_and_beyond', label: 'Above & Beyond' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.content.trim()) {
      addFeedback(form);
      setForm({ employeeId: teamMembers[0]?.id || '', employeeName: teamMembers[0]?.fullName || '', type: 'positive', category: 'great_performance', categoryLabel: 'Great Performance', content: '' });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Feedback & Recognition</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Provide ongoing feedback and recognize team achievements without waiting for annual reviews
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-saath-600 hover:bg-saath-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-md shadow-saath-600/30"
        >
          <Plus className="h-4 w-4" /> Give Feedback / Recognition
        </button>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {feedback.map(f => (
          <div key={f.id} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
                ⭐ {f.categoryLabel}
              </span>
              <span className="text-xs text-slate-400 font-medium">{f.createdAt}</span>
            </div>

            <h3 className="text-sm font-extrabold text-slate-900">Feedback for {f.employeeName}</h3>
            <p className="text-xs text-slate-600 italic">"{f.content}"</p>
            <span className="text-[10px] text-slate-400 block pt-1">— Given by {f.givenBy}</span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900">Give Feedback / Recognition</h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Employee *</label>
                <select
                  value={form.employeeId}
                  onChange={e => {
                    const sel = teamMembers.find(m => m.id === e.target.value);
                    setForm({ ...form, employeeId: e.target.value, employeeName: sel?.fullName || '' });
                  }}
                  className="w-full rounded-xl border p-2.5 font-medium"
                >
                  {teamMembers.map(m => (
                    <option key={m.id} value={m.id}>{m.fullName} ({m.designationName})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Recognition Badge Category</label>
                <select
                  value={form.category}
                  onChange={e => {
                    const catObj = categories.find(c => c.value === e.target.value);
                    setForm({ ...form, category: e.target.value, categoryLabel: catObj?.label || 'Great Performance' });
                  }}
                  className="w-full rounded-xl border p-2.5 font-medium"
                >
                  {categories.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Feedback Content *</label>
                <textarea
                  rows={3}
                  required
                  value={form.content}
                  onChange={e => setForm({ ...form, content: e.target.value })}
                  placeholder="Appreciation notes, specific performance examples..."
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
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
