import React from 'react';
import { HRNotification } from '@/types/hr/notifications';
import { Check, Clock, AlertTriangle, Info, Calendar, FileText, UserPlus, Users, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface Props {
  notification: HRNotification;
  onSelect: (id: string) => void;
  isSelected: boolean;
  onToggleRead: (id: string, isRead: boolean) => void;
  onArchive: (id: string) => void;
  onClick: (notification: HRNotification) => void;
}

export function NotificationItem({ notification, onSelect, isSelected, onToggleRead, onArchive, onClick }: Props) {
  const isUnread = !notification.isRead;
  
  const getIcon = () => {
    switch(notification.category) {
      case 'Leave': return <Calendar size={18} className="text-blue-500" />;
      case 'Attendance':
      case 'Attendance Correction': return <Clock size={18} className="text-orange-500" />;
      case 'Concern': return <AlertTriangle size={18} className="text-red-500" />;
      case 'Help Request': return <Info size={18} className="text-indigo-500" />;
      case 'Document': return <FileText size={18} className="text-purple-500" />;
      case 'Employee':
      case 'Onboarding':
      case 'Probation':
      case 'Offboarding': return <UserPlus size={18} className="text-green-500" />;
      case 'Announcement': return <MessageSquare size={18} className="text-pink-500" />;
      default: return <Info size={18} className="text-gray-500" />;
    }
  };

  return (
    <div className={`relative flex items-start gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${isUnread ? 'bg-blue-50/30' : 'bg-white'}`}>
      <div className="pt-1">
        <input 
          type="checkbox" 
          checked={isSelected}
          onChange={() => onSelect(notification.id)}
          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
      </div>
      
      <div className="flex-shrink-0 pt-1 relative" onClick={() => onClick(notification)}>
        {getIcon()}
        {isUnread && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 border-2 border-white rounded-full"></span>
        )}
      </div>

      <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onClick(notification)}>
        <div className="flex items-start justify-between gap-2">
          <p className={`text-sm ${isUnread ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
            {notification.title}
          </p>
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {notification.description}
        </p>
        
        <div className="flex items-center gap-3 mt-2 flex-wrap">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
            {notification.category}
          </span>
          
          {notification.priority === 'Urgent' && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">
              Urgent
            </span>
          )}
          
          {notification.priority === 'Important' && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-700">
              Important
            </span>
          )}

          {notification.requiresAction && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700">
              Action Required
            </span>
          )}
        </div>
      </div>
      
      <div className="flex-shrink-0 pt-1">
        {notification.relatedRoute ? (
          <Link href={notification.relatedRoute} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            {notification.requiresAction ? 'Review' : 'View'}
          </Link>
        ) : (
          <span className="text-sm font-medium text-gray-400 cursor-not-allowed" title="Action unavailable">
             {notification.requiresAction ? 'Review' : 'View'}
          </span>
        )}
      </div>
    </div>
  );
}
