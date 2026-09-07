import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { Target, Plus, CheckCircle2, AlertCircle } from 'lucide-react';

export const GoalsPage = () => {
  const { goals, createGoal, updateGoalProgress, teamMembers } = useHR();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    employeeId: teamMembers[0]?.id || '',
    employeeName: teamMembers[0]?.fullName || '',
    title: '',
    description: '',
    target: '',
    due: new Date().toISOString().split('T')[0],
    weight: 20,
    priority: 'Medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.title.trim()) {
      createGoal(form);
      setForm({ employeeId: teamMembers[0]?.id || '', employeeName: teamMembers[0]?.fullName || '', title: '', description: '', target: '', due: new Date().toISOString().split('T')[0], weight: 20, priority: 'Medium' });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Team Goals & KRAs</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Assign, track, and review team performance deliverables
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-saath-600 hover:bg-saath-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-md shadow-saath-600/30"
        >
          <Plus className="h-4 w-4" /> Create & Assign Goal
        </button>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map(g => (
          <div key={g.id} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-saath-100 text-saath-800 text-[10px] font-extrabold">
                    {g.priority} Priority
                  </span>
                  <span className="font-mono text-xs text-slate-400">{g.id}</span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">{g.title}</h3>
                <p className="text-xs text-slate-500 font-medium">Assigned to: <strong>{g.employeeName}</strong></p>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                g.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                g.status === 'In Progress' ? 'bg-saath-100 text-saath-800' : 'bg-slate-100 text-slate-700'
              }`}>
                {g.status} ({g.progress}%)
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{g.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200/60 font-medium">
              <div><span className="text-slate-400 block text-[10px]">Target</span><span className="font-bold text-slate-800">{g.target}</span></div>
              <div><span className="text-slate-400 block text-[10px]">Due Date</span><span className="font-bold text-slate-800">{g.due}</span></div>
              <div><span className="text-slate-400 block text-[10px]">Weight</span><span className="font-bold text-slate-800">{g.weight}%</span></div>
            </div>

            {/* Progress Slider */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Progress: {g.progress}%</span>
                <span>Weight: {g.weight}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-saath-600 h-2 rounded-full transition-all" style={{ width: `${g.progress}%` }} />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => updateGoalProgress(g.id, Math.min(100, g.progress + 25), g.progress + 25 >= 100 ? 'Completed' : 'In Progress')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                +25% Progress
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900">Create & Assign Goal</h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Assign to Employee *</label>
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
                <label className="block font-bold text-slate-700 mb-1">Goal Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Complete Backend API Refactoring"
                  className="w-full rounded-xl border p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Target *</label>
                <input
                  type="text"
                  required
                  value={form.target}
                  onChange={e => setForm({ ...form, target: e.target.value })}
                  placeholder="e.g. 100% Code Coverage"
                  className="w-full rounded-xl border p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Due Date *</label>
                <input
                  type="date"
                  required
                  value={form.due}
                  onChange={e => setForm({ ...form, due: e.target.value })}
                  className="w-full rounded-xl border p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Weight (%)</label>
                <input
                  type="number"
                  value={form.weight}
                  onChange={e => setForm({ ...form, weight: parseInt(e.target.value) || 0 })}
                  className="w-full rounded-xl border p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
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
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
