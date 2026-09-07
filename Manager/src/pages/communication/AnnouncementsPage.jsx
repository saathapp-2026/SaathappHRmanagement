import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { Megaphone, Plus, ShieldAlert } from 'lucide-react';

export const AnnouncementsPage = () => {
  const { announcements, addTeamAnnouncement, currentUser } = useHR();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', content: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.title.trim() && form.content.trim()) {
      addTeamAnnouncement(form);
      setForm({ title: '', content: '' });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Announcements & Bulletins</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Company-wide broadcasts and team specific announcements
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-saath-600 hover:bg-saath-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-md shadow-saath-600/30"
        >
          <Plus className="h-4 w-4" /> Create Team Announcement
        </button>
      </div>

      {/* Permission Restriction Alert */}
      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium flex items-center gap-2">
        <ShieldAlert className="h-4 w-4 text-saath-600 shrink-0" />
        <span>Team Announcements created by Managers are automatically restricted to your department audience ({currentUser?.departmentName} Team).</span>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {announcements.map(a => (
          <div key={a.id} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-saath-100 text-saath-800 text-[10px] font-extrabold">
                {a.audience}
              </span>
              <span className="text-xs text-slate-400 font-medium">{a.createdDate}</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900">{a.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{a.content}</p>
            <span className="text-[10px] text-slate-400 block pt-2">— Posted by {a.createdBy}</span>
          </div>
        ))}
      </div>

      {/* Create Team Announcement Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900">Create Team Announcement</h3>
            <p className="text-xs text-slate-500">Audience: {currentUser?.departmentName} Team</p>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Stand-up rescheduled"
                  className="w-full rounded-xl border p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Content *</label>
                <textarea
                  rows={3}
                  required
                  value={form.content}
                  onChange={e => setForm({ ...form, content: e.target.value })}
                  placeholder="Announcement message details..."
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
                  Post Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
