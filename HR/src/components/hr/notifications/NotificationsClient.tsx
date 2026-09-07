"use client";

import React, { useState, useMemo } from 'react';
import { mockNotifications } from '@/data/hr/notifications';
import { HRNotification, NotificationCategory } from '@/types/hr/notifications';
import { NotificationItem } from './NotificationItem';
import { NotificationDetailDrawer } from './NotificationDetailDrawer';
import { Bell, Search, Filter, Archive, Check, Trash2, CheckSquare, AlertTriangle } from 'lucide-react';
import { isToday, isYesterday, isThisWeek, parseISO } from 'date-fns';

const TABS = ['All', 'Unread', 'Approvals', 'Attendance', 'Leave', 'Employees', 'Concerns', 'System', 'Archived'];

export default function NotificationsClient() {
  const [notifications, setNotifications] = useState<HRNotification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectedNotification, setSelectedNotification] = useState<HRNotification | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Stats
  const unreadCount = notifications.filter(n => !n.isRead && !n.isArchived).length;
  const actionCount = notifications.filter(n => n.requiresAction && !n.isRead && !n.isArchived).length;
  const highPriorityCount = notifications.filter(n => (n.priority === 'Urgent' || n.priority === 'Important') && !n.isRead && !n.isArchived).length;

  // Filtering
  const filteredNotifications = useMemo(() => {
    let result = notifications;

    if (activeTab === 'Archived') {
      result = result.filter(n => n.isArchived);
    } else {
      result = result.filter(n => !n.isArchived);
      
      switch(activeTab) {
        case 'Unread': result = result.filter(n => !n.isRead); break;
        case 'Approvals': result = result.filter(n => n.requiresAction); break; // Simple proxy for approvals
        case 'Attendance': result = result.filter(n => n.category === 'Attendance' || n.category === 'Attendance Correction'); break;
        case 'Leave': result = result.filter(n => n.category === 'Leave'); break;
        case 'Employees': result = result.filter(n => ['Employee', 'Onboarding', 'Probation', 'Offboarding', 'Account'].includes(n.category)); break;
        case 'Concerns': result = result.filter(n => n.category === 'Concern'); break;
        case 'System': result = result.filter(n => n.category === 'System' || n.category === 'Announcement'); break;
      }
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(n => 
        n.title.toLowerCase().includes(q) || 
        n.description.toLowerCase().includes(q) ||
        (n.employeeName && n.employeeName.toLowerCase().includes(q)) ||
        (n.relatedEntityId && n.relatedEntityId.toLowerCase().includes(q))
      );
    }

    // Sort by date desc
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [notifications, activeTab, searchQuery]);

  // Grouping
  const groupedNotifications = useMemo(() => {
    const groups: { [key: string]: HRNotification[] } = {
      'Today': [],
      'Yesterday': [],
      'Earlier This Week': [],
      'Older': []
    };

    filteredNotifications.forEach(n => {
      const d = parseISO(n.createdAt);
      if (isToday(d)) groups['Today'].push(n);
      else if (isYesterday(d)) groups['Yesterday'].push(n);
      else if (isThisWeek(d)) groups['Earlier This Week'].push(n);
      else groups['Older'].push(n);
    });

    return groups;
  }, [filteredNotifications]);

  // Actions
  const toggleRead = (id: string, isRead: boolean) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => n.isArchived ? n : { ...n, isRead: true }));
  };

  const archiveRead = () => {
    setNotifications(prev => prev.map(n => n.isRead ? { ...n, isArchived: true } : n));
  };

  const handleArchive = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isArchived: !n.isArchived } : n));
  };

  const handleBulkAction = (action: 'read' | 'unread' | 'archive') => {
    setNotifications(prev => prev.map(n => {
      if (selectedIds.has(n.id)) {
        if (action === 'read') return { ...n, isRead: true };
        if (action === 'unread') return { ...n, isRead: false };
        if (action === 'archive') return { ...n, isArchived: true };
      }
      return n;
    }));
    setSelectedIds(new Set());
  };

  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const selectAll = () => {
    if (selectedIds.size === filteredNotifications.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredNotifications.map(n => n.id)));
    }
  };

  const openDetail = (notification: HRNotification) => {
    setSelectedNotification(notification);
    setIsDrawerOpen(true);
    if (!notification.isRead) {
      toggleRead(notification.id, true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-500 mt-1">Stay updated on employee requests, approvals, attendance events and HR operations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={markAllRead} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Mark All as Read
          </button>
          <button onClick={archiveRead} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Archive Read
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm font-medium text-gray-500 mb-1">Unread</div>
          <div className="text-2xl font-bold text-gray-900">{unreadCount}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm font-medium text-gray-500 mb-1">Requires Action</div>
          <div className="text-2xl font-bold text-indigo-600">{actionCount}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm font-medium text-gray-500 mb-1">High Priority</div>
          <div className="text-2xl font-bold text-orange-600">{highPriorityCount}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm font-medium text-gray-500 mb-1">Total Active</div>
          <div className="text-2xl font-bold text-gray-900">{notifications.filter(n => !n.isArchived).length}</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Feed */}
        <div className="flex-1 min-w-0">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6 overflow-x-auto hide-scrollbar">
            <nav className="-mb-px flex space-x-6">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setSelectedIds(new Set()); }}
                  className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab 
                      ? 'border-indigo-500 text-indigo-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search notifications..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Filter size={16} /> Filters
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedIds.size > 0 && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 mb-6 flex items-center justify-between">
              <span className="text-sm font-medium text-indigo-800">{selectedIds.size} selected</span>
              <div className="flex gap-2">
                <button onClick={() => handleBulkAction('read')} className="px-3 py-1.5 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">Mark Read</button>
                <button onClick={() => handleBulkAction('unread')} className="px-3 py-1.5 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">Mark Unread</button>
                <button onClick={() => handleBulkAction('archive')} className="px-3 py-1.5 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">Archive</button>
              </div>
            </div>
          )}

          {/* List */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Select All Row */}
            <div className="bg-gray-50 border-b border-gray-200 p-3 px-4 flex items-center gap-3">
              <input 
                type="checkbox" 
                checked={filteredNotifications.length > 0 && selectedIds.size === filteredNotifications.length}
                onChange={selectAll}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-500">Select All</span>
            </div>

            {filteredNotifications.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <Bell size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-lg font-medium text-gray-900">You&apos;re all caught up</p>
                <p className="text-sm mt-1">No notifications match your current filters.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {Object.entries(groupedNotifications).map(([group, items]) => {
                  if (items.length === 0) return null;
                  return (
                    <div key={group}>
                      <div className="bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {group}
                      </div>
                      <div className="divide-y divide-gray-100">
                        {items.map(notification => (
                          <NotificationItem 
                            key={notification.id}
                            notification={notification}
                            isSelected={selectedIds.has(notification.id)}
                            onSelect={toggleSelection}
                            onToggleRead={toggleRead}
                            onArchive={handleArchive}
                            onClick={openDetail}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Needs Attention */}
        <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-indigo-50 p-4 border-b border-indigo-100">
              <h3 className="font-semibold text-indigo-900 flex items-center gap-2">
                <AlertTriangle size={18} className="text-indigo-600" /> Needs Attention
              </h3>
            </div>
            <div className="p-4 space-y-4">
              {actionCount > 0 ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Overdue Requests</span>
                    <span className="text-sm font-medium text-red-600">{notifications.filter(n => n.category === 'Help Request' && n.requiresAction && !n.isRead).length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Urgent Concerns</span>
                    <span className="text-sm font-medium text-orange-600">{notifications.filter(n => n.priority === 'Urgent' && !n.isRead).length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pending Approvals</span>
                    <span className="text-sm font-medium text-indigo-600">{notifications.filter(n => n.requiresAction && !n.isRead).length}</span>
                  </div>
                </>
              ) : (
                <div className="text-sm text-gray-500 text-center py-4">All urgent items handled.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Drawer */}
      <NotificationDetailDrawer 
        notification={selectedNotification}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onMarkRead={(id) => toggleRead(id, true)}
        onMarkUnread={(id) => { toggleRead(id, false); setIsDrawerOpen(false); }}
        onArchive={(id) => { handleArchive(id); setIsDrawerOpen(false); }}
      />
    </div>
  );
}
