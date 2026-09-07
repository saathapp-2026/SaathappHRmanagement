import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { Bell, CheckCheck, Filter } from 'lucide-react';

export const NotificationsPage = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useHR();
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Approvals', 'Attendance', 'Leave', 'Performance', 'HR'];

  const filtered = notifications.filter(n => filterCategory === 'All' || n.category === filterCategory);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Manager Notifications Center</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Real-time updates regarding team approvals, attendance, leave, performance and HR actions
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs inline-flex items-center gap-1.5 transition-colors"
        >
          <CheckCheck className="h-4 w-4 text-saath-600" /> Mark All as Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-bold text-slate-500 overflow-x-auto pb-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2.5 rounded-xl transition-all ${
              filterCategory === cat
                ? 'bg-saath-600 text-white shadow-md shadow-saath-600/30'
                : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notifications Feed */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 bg-white rounded-3xl border border-slate-200/80">
            No notifications in this category.
          </div>
        ) : (
          filtered.map(n => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                n.isRead ? 'bg-white border-slate-200/80' : 'bg-saath-50/50 border-saath-200/80 ring-1 ring-saath-500/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-2xl shrink-0 ${n.isRead ? 'bg-slate-100 text-slate-500' : 'bg-saath-600 text-white'}`}>
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{n.title}</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                      {n.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{n.message}</p>
                  <span className="text-[10px] text-slate-400 block mt-1">{n.time}</span>
                </div>
              </div>

              {!n.isRead && (
                <span className="h-2.5 w-2.5 rounded-full bg-saath-600 shrink-0" title="Unread" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
