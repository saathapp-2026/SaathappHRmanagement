import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import {
  Calendar as CalendarIcon,
  Plus,
  Gift,
  Award,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Filter,
  Sparkles,
  Users,
  Clock,
  MapPin,
  X,
  Check
} from 'lucide-react';

export const CalendarPage = () => {
  const { calendarEvents, addCalendarEvent } = useHR();
  const [isAddModal, setIsAddModal] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'grid' or 'list'
  const [filterType, setFilterType] = useState('All'); // All, Public Holiday, Company Event, Meeting, Training, Birthday

  const [eventForm, setEventForm] = useState({
    title: '',
    eventType: 'Public Holiday',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    targetAudience: 'Everyone',
    description: ''
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!eventForm.title.trim()) return;
    addCalendarEvent(eventForm);
    setIsAddModal(false);
    setEventForm({
      title: '',
      eventType: 'Public Holiday',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      targetAudience: 'Everyone',
      description: ''
    });
  };

  const filteredEvents = calendarEvents.filter(evt => {
    if (filterType === 'All') return true;
    return evt.eventType === filterType;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header & Primary Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-saath-600" /> Company Calendar & Holidays
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Public holidays, company events, team trainings, birthdays, and joining anniversaries.
          </p>
        </div>

        <button
          onClick={() => setIsAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-saath-600 hover:bg-saath-700 text-white font-bold text-xs shadow-lg shadow-saath-600/30 transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="h-4 w-4" /> Add Event / Holiday
        </button>
      </div>

      {/* Filter Tabs & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-1 overflow-x-auto">
          {['All', 'Public Holiday', 'Company Event', 'Meeting', 'Training', 'Birthday'].map(type => (
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

        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0 text-xs font-bold">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-saath-700 shadow-sm' : 'text-slate-500'}`}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-saath-700 shadow-sm' : 'text-slate-500'}`}
          >
            Grid Cards
          </button>
        </div>
      </div>

      {/* Events Listing */}
      {filteredEvents.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2">
          <CalendarIcon className="h-10 w-10 text-slate-300 mx-auto" />
          <h4 className="text-xs font-extrabold text-slate-700">No Events Scheduled</h4>
          <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
            No company calendar events match your selected category filter ({filterType}).
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map(evt => (
            <div key={evt.id} className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full font-extrabold text-[10px] ${
                  evt.eventType === 'Public Holiday' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                  evt.eventType === 'Company Event' ? 'bg-saath-100 text-saath-800 border border-saath-200' :
                  evt.eventType === 'Birthday' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                  evt.eventType === 'Training' ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' :
                  'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  {evt.eventType}
                </span>
                <span className="text-xs font-mono font-extrabold text-slate-700">{evt.startDate}</span>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 text-base">{evt.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">{evt.description}</p>
              </div>

              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1 text-slate-500">
                  <Users className="h-3.5 w-3.5 text-saath-600" /> {evt.targetAudience}
                </span>
                <span className="font-mono text-[10px] text-slate-400">{evt.id}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl bg-white border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100">
            {filteredEvents.map(evt => (
              <div key={evt.id} className="p-4 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-saath-600">{evt.id}</span>
                    <span className={`px-2.5 py-0.5 rounded-full font-extrabold text-[10px] ${
                      evt.eventType === 'Public Holiday' ? 'bg-rose-100 text-rose-800' :
                      evt.eventType === 'Company Event' ? 'bg-saath-100 text-saath-800' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {evt.eventType}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{evt.title}</h3>
                  <p className="text-xs text-slate-600">{evt.description}</p>
                </div>

                <div className="flex flex-col sm:items-end gap-1 shrink-0 text-xs">
                  <span className="font-bold text-slate-800">{evt.startDate}</span>
                  <span className="text-[11px] text-slate-400 font-medium">Audience: {evt.targetAudience}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Modal — FIXED OVERFLOW & CENTERING */}
      {isAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="flex min-h-full items-start sm:items-center justify-center p-4">
            <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 my-8 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Add New Event / Holiday</h3>
                  <p className="text-xs text-slate-500">Create a company event or holiday for the employee calendar.</p>
                </div>
                <button onClick={() => setIsAddModal(false)} className="p-1 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">Event Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Diwali Holiday or Q3 All-Hands"
                    value={eventForm.title}
                    onChange={e => setEventForm({ ...eventForm, title: e.target.value })}
                    className="w-full rounded-xl border p-2.5 font-medium focus:border-saath-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-extrabold text-slate-700 mb-1">Event Category</label>
                    <select
                      value={eventForm.eventType}
                      onChange={e => setEventForm({ ...eventForm, eventType: e.target.value })}
                      className="w-full rounded-xl border p-2.5 font-bold bg-white"
                    >
                      <option value="Public Holiday">Public Holiday</option>
                      <option value="Company Event">Company Event</option>
                      <option value="Meeting">Meeting</option>
                      <option value="Training">Training</option>
                      <option value="Birthday">Birthday</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-extrabold text-slate-700 mb-1">Target Audience</label>
                    <select
                      value={eventForm.targetAudience}
                      onChange={e => setEventForm({ ...eventForm, targetAudience: e.target.value })}
                      className="w-full rounded-xl border p-2.5 font-bold bg-white"
                    >
                      <option value="Everyone">Everyone</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Managers Only">Managers Only</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={eventForm.startDate}
                    onChange={e => setEventForm({ ...eventForm, startDate: e.target.value, endDate: e.target.value })}
                    className="w-full rounded-xl border p-2.5 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">Description / Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Provide event details, timing, or holiday guidelines..."
                    value={eventForm.description}
                    onChange={e => setEventForm({ ...eventForm, description: e.target.value })}
                    className="w-full rounded-xl border p-2.5 font-medium"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t">
                  <button
                    type="button"
                    onClick={() => setIsAddModal(false)}
                    className="px-4 py-2 rounded-xl border font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-saath-600 text-white font-bold shadow-md shadow-saath-600/30 hover:bg-saath-700"
                  >
                    Add Event
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
