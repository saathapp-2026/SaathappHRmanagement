import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { Megaphone, Plus, Bell, Eye, Send, Filter, Search, AlertTriangle, Calendar, User, Shield, Check, X } from 'lucide-react';

export const AnnouncementsPage = () => {
  const { announcements, addAnnouncement, currentUser } = useHR();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [form, setForm] = useState({
    title: '',
    content: '',
    type: 'Policy',
    priority: 'High',
    audience: 'Everyone'
  });

  const handlePublish = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;

    addAnnouncement({
      ...form,
      status: 'Published',
      authorName: `${currentUser?.fullName || 'Rajesh Sharma'} (${currentUser?.role || 'HR Director'})`
    });

    setIsModalOpen(false);
    setForm({ title: '', content: '', type: 'Policy', priority: 'High', audience: 'Everyone' });
  };

  const filteredAnnouncements = announcements.filter(ann => {
    const matchesSearch = ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ann.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || ann.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Megaphone className="h-6 w-6 text-saath-600" /> Company Announcements
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Publish official HR notices, policy updates, and emergency alerts (dispatches in-app notifications).
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-saath-600 hover:bg-saath-700 text-white font-bold text-xs shadow-lg shadow-saath-600/30 transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="h-4 w-4" /> Create Announcement
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-1 overflow-x-auto">
          {['All', 'Policy', 'Holiday', 'Meeting', 'Emergency', 'Notice'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                filterType === type
                  ? 'bg-saath-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="h-3.5 w-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search notices..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:border-saath-500"
          />
        </div>
      </div>

      {/* Announcements Stream */}
      <div className="space-y-4">
        {filteredAnnouncements.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2">
            <Megaphone className="h-10 w-10 text-slate-300 mx-auto" />
            <h4 className="text-xs font-extrabold text-slate-700">No Announcements Found</h4>
            <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
              No company announcements match your selected filter ({filterType}).
            </p>
          </div>
        ) : (
          filteredAnnouncements.map(ann => (
            <div key={ann.id} className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full font-extrabold text-[10px] ${
                    ann.type === 'Emergency' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                    ann.type === 'Holiday' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                    ann.type === 'Policy' ? 'bg-saath-100 text-saath-800 border border-saath-200' :
                    'bg-slate-100 text-slate-800 border border-slate-200'
                  }`}>
                    {ann.type} Notice
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-400">{ann.id}</span>
                </div>
                <span className="text-xs text-slate-400 font-medium">{ann.publishedDate}</span>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 text-base md:text-lg">{ann.title}</h3>
                <p className="text-xs text-slate-700 leading-relaxed mt-1.5 whitespace-pre-wrap">{ann.content}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <User className="h-3.5 w-3.5 text-saath-600" /> Author: <strong className="text-slate-800">{ann.authorName}</strong>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold text-[10px]">
                  Target: {ann.audience}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CREATE ANNOUNCEMENT MODAL — BULLETPROOF TOP & BOTTOM SCROLLING LAYOUT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="flex min-h-full items-start sm:items-center justify-center p-4">
            <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 my-8 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">Publish New Announcement</h3>
                  <p className="text-xs text-slate-500">Dispatch company-wide policy notices and team alerts.</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handlePublish} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">Announcement Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Updated Attendance Grace Period Guidelines 2026"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    className="w-full rounded-xl border p-2.5 font-medium focus:border-saath-500"
                  />
                </div>

                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">Notice Content *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide full announcement body text and key guidelines..."
                    value={form.content}
                    onChange={e => setForm({ ...form, content: e.target.value })}
                    className="w-full rounded-xl border p-2.5 font-medium focus:border-saath-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-extrabold text-slate-700 mb-1">Notice Category</label>
                    <select
                      value={form.type}
                      onChange={e => setForm({ ...form, type: e.target.value })}
                      className="w-full rounded-xl border p-2.5 font-bold bg-white"
                    >
                      <option value="Policy">HR Policy</option>
                      <option value="Holiday">Holiday Notice</option>
                      <option value="Meeting">Meeting / Town Hall</option>
                      <option value="Emergency">Emergency Alert</option>
                      <option value="Notice">General Notice</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-extrabold text-slate-700 mb-1">Target Audience</label>
                    <select
                      value={form.audience}
                      onChange={e => setForm({ ...form, audience: e.target.value })}
                      className="w-full rounded-xl border p-2.5 font-bold bg-white"
                    >
                      <option value="Everyone">Everyone (All Staff)</option>
                      <option value="Department">Department Specific</option>
                      <option value="Managers Only">Managers Only</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-saath-600 text-white font-bold shadow-md shadow-saath-600/30 hover:bg-saath-700 flex items-center gap-1.5"
                  >
                    <Send className="h-3.5 w-3.5" /> Publish & Send Notification
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
