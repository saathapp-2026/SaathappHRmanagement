import React from 'react';
import { Announcement } from '@/data/hr/announcements';

interface AnnouncementStatusTabsProps {
  announcements: Announcement[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AnnouncementStatusTabs({ announcements, activeTab, onTabChange }: AnnouncementStatusTabsProps) {
  const tabs = [
    { id: 'Active', label: 'Active', statuses: ['Published'] },
    { id: 'Scheduled', label: 'Scheduled', statuses: ['Scheduled'] },
    { id: 'Drafts', label: 'Drafts', statuses: ['Draft'] },
    { id: 'Expired', label: 'Expired', statuses: ['Expired'] },
    { id: 'Archived', label: 'Archived', statuses: ['Archived'] },
    { id: 'All', label: 'All', statuses: [] },
  ];

  const getCount = (statuses: string[]) => {
    if (statuses.length === 0) return announcements.length;
    return announcements.filter(a => statuses.includes(a.status)).length;
  };

  return (
    <div className="flex border-b overflow-x-auto no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center space-x-2 px-4 py-3 border-b-2 text-sm font-medium whitespace-nowrap transition-colors
            ${activeTab === tab.id 
              ? 'border-primary text-primary' 
              : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
        >
          <span>{tab.label}</span>
          <span className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold
            ${activeTab === tab.id ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
            {getCount(tab.statuses)}
          </span>
        </button>
      ))}
    </div>
  );
}
