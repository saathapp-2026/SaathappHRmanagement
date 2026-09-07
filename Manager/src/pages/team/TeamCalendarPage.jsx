import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { Calendar, Plus, ChevronLeft, ChevronRight, Gift, Award, CalendarDays, Users, Laptop } from 'lucide-react';

export const TeamCalendarPage = () => {
  const { calendarEvents, addCalendarEvent } = useHR();
  const [viewMode, setViewMode] = useState('Month'); // 'Month', 'Week', 'List'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'Team Event',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (newEvent.title.trim()) {
      addCalendarEvent(newEvent);
      setNewEvent({ title: '', type: 'Team Event', date: new Date().toISOString().split('T')[0], description: '' });
      setIsAddModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Team Availability & Events Calendar</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Track team leave, holidays, birthdays, work anniversaries, meetings, training, and reviews
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
            {['Month', 'Week', 'List'].map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === mode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-saath-600 hover:bg-saath-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-md shadow-saath-600/30"
          >
            <Plus className="h-4 w-4" /> Add Team Event
          </button>
        </div>
      </div>

      {/* View Content */}
      {viewMode === 'List' ? (
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900">Upcoming Team Events & Milestones</h3>
          <div className="space-y-3">
            {calendarEvents.map(e => (
              <div key={e.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 font-bold text-saath-600 text-center min-w-[50px]">
                    <span className="block text-[10px] uppercase text-slate-400">{e.date.split('-')[1]}</span>
                    <span className="text-sm font-black text-slate-800">{e.date.split('-')[2]}</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{e.title}</p>
                    <p className="text-slate-500">{e.description}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-saath-100 text-saath-800 text-[10px] font-bold">
                  {e.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-extrabold text-slate-900">June 2026</h3>
            <div className="flex items-center gap-1 text-slate-400">
              <button className="p-1 rounded-lg hover:bg-slate-100"><ChevronLeft className="h-4 w-4" /></button>
              <button className="p-1 rounded-lg hover:bg-slate-100"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 uppercase py-2">
            <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-xs">
            {Array.from({ length: 30 }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `2026-06-${dayNum < 10 ? '0' + dayNum : dayNum}`;
              const eventsForDay = calendarEvents.filter(e => e.date === dateStr);

              return (
                <div key={i} className="min-h-[90px] p-2 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col justify-between">
                  <span className="font-bold text-slate-700 text-[11px]">{dayNum}</span>
                  <div className="space-y-1">
                    {eventsForDay.map(ev => (
                      <span key={ev.id} className="block px-1.5 py-0.5 rounded bg-saath-100 text-saath-800 font-extrabold text-[9px] truncate">
                        {ev.title}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900">Add Team Event</h3>
            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={newEvent.title}
                  onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="e.g. Sprint Planning / Team Lunch"
                  className="w-full rounded-xl border p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Event Type</label>
                <select
                  value={newEvent.type}
                  onChange={e => setNewEvent({ ...newEvent, type: e.target.value })}
                  className="w-full rounded-xl border p-2.5 font-medium"
                >
                  <option value="Team Event">Team Event</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Training">Training</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Event Date *</label>
                <input
                  type="date"
                  required
                  value={newEvent.date}
                  onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="w-full rounded-xl border p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newEvent.description}
                  onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Brief details..."
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
                  className="px-4 py-2 rounded-xl bg-saath-600 hover:bg-saath-700 text-white font-bold"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
