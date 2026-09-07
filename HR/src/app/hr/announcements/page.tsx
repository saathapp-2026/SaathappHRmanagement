// @ts-nocheck

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnnouncementStats } from '@/components/hr/announcements/AnnouncementStats';
import { AnnouncementStatusTabs } from '@/components/hr/announcements/AnnouncementStatusTabs';
import { AnnouncementFilters } from '@/components/hr/announcements/AnnouncementFilters';
import { AnnouncementsTable } from '@/components/hr/announcements/AnnouncementsTable';
import { mockAnnouncements } from '@/data/hr/announcements';

export default function AnnouncementsPage() {
  const [activeTab, setActiveTab] = useState('Active');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredAnnouncements = mockAnnouncements.filter((announcement) => {
    // Tab Filter
    if (activeTab === 'Active' && announcement.status !== 'Published') return false;
    if (activeTab === 'Scheduled' && announcement.status !== 'Scheduled') return false;
    if (activeTab === 'Drafts' && announcement.status !== 'Draft') return false;
    if (activeTab === 'Expired' && announcement.status !== 'Expired') return false;
    if (activeTab === 'Archived' && announcement.status !== 'Archived') return false;
    
    // Category Filter
    if (categoryFilter !== 'all' && announcement.category !== categoryFilter) return false;
    
    // Priority Filter
    if (priorityFilter !== 'all' && announcement.priority !== priorityFilter) return false;
    
    // Search Filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        announcement.title.toLowerCase().includes(searchLower) ||
        announcement.id.toLowerCase().includes(searchLower) ||
        announcement.createdByName.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setPriorityFilter('all');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Announcements</h1>
          <p className="text-muted-foreground mt-1">
            Create, schedule and manage employee communications across the organization.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Link href="/hr/announcements/new">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Create Announcement
            </Button>
          </Link>
        </div>
      </div>

      <AnnouncementStats announcements={mockAnnouncements} />

      <div className="bg-card rounded-lg border shadow-sm">
        <AnnouncementStatusTabs 
          announcements={mockAnnouncements} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        <div className="p-4 space-y-4">
          <AnnouncementFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={(v) => setCategoryFilter(v || 'all')}
            priorityFilter={priorityFilter}
            onPriorityFilterChange={(v) => setPriorityFilter(v || 'all')}
            onReset={handleResetFilters}
          />
          
          <AnnouncementsTable announcements={filteredAnnouncements} />
        </div>
      </div>
    </div>
  );
}
