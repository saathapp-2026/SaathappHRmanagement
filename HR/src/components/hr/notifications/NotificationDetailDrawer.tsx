import React from 'react';
import { HRNotification } from '@/types/hr/notifications';
import { X, Calendar, Clock, AlertTriangle, FileText, UserPlus, Info } from 'lucide-react';
import Link from 'next/link';

interface Props {
  notification: HRNotification | null;
  isOpen: boolean;
  onClose: () => void;
  onMarkRead: (id: string) => void;
  onMarkUnread: (id: string) => void;
  onArchive: (id: string) => void;
}

export function NotificationDetailDrawer({ notification, isOpen, onClose, onMarkRead, onMarkUnread, onArchive }: Props) {
  if (!isOpen || !notification) return null;

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(d);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
          <div className="pointer-events-auto w-screen max-w-md transform transition-all">
            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
              <div className="flex items-center justify-between px-4 py-6 sm:px-6 border-b border-gray-100">
                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Notification Details</h2>
                <div className="ml-3 flex h-7 items-center">
                  <button type="button" className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={onClose}>
                    <span className="absolute -inset-2.5"></span>
                    <span className="sr-only">Close panel</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="relative flex-1 px-4 py-6 sm:px-6">
                
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{notification.title}</h3>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm mb-6">
                  <div>
                    <p className="text-gray-500">Category</p>
                    <p className="font-medium text-gray-900">{notification.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Priority</p>
                    <p className={`font-medium ${notification.priority === 'Urgent' ? 'text-red-600' : notification.priority === 'Important' ? 'text-orange-600' : 'text-gray-900'}`}>
                      {notification.priority}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <p className="font-medium text-gray-900">{notification.isRead ? 'Read' : 'Unread'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Created</p>
                    <p className="font-medium text-gray-900">{formatDate(notification.createdAt)}</p>
                  </div>
                  {notification.employeeName && (
                    <div>
                      <p className="text-gray-500">Employee</p>
                      <p className="font-medium text-gray-900">{notification.employeeName}</p>
                    </div>
                  )}
                  {notification.relatedEntityId && (
                    <div>
                      <p className="text-gray-500">Related Record</p>
                      <p className="font-medium text-gray-900">{notification.relatedEntityId}</p>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    {notification.description}
                  </p>
                </div>

                {notification.metadata && Object.keys(notification.metadata).length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Context</h4>
                    <div className="bg-gray-50 rounded-lg border border-gray-100 p-3 space-y-2">
                      {Object.entries(notification.metadata).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="font-medium text-gray-900">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3 mt-8">
                  {notification.relatedRoute ? (
                    <Link href={notification.relatedRoute} className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                      {notification.requiresAction ? 'Review Record' : 'View Record'}
                    </Link>
                  ) : (
                    <button disabled className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-300 cursor-not-allowed">
                      Action Unavailable
                    </button>
                  )}

                  {notification.isRead ? (
                    <button onClick={() => onMarkUnread(notification.id)} className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Mark as Unread
                    </button>
                  ) : (
                    <button onClick={() => onMarkRead(notification.id)} className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Mark as Read
                    </button>
                  )}
                  
                  <button onClick={() => { onArchive(notification.id); onClose(); }} className="w-full inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                    {notification.isArchived ? 'Restore Notification' : 'Archive Notification'}
                  </button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
