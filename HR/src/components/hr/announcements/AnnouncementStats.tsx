import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Announcement } from '@/data/hr/announcements';

interface AnnouncementStatsProps {
  announcements: Announcement[];
}

export function AnnouncementStats({ announcements }: AnnouncementStatsProps) {
  const activeCount = announcements.filter(a => a.status === 'Published').length;
  const scheduledCount = announcements.filter(a => a.status === 'Scheduled').length;
  const draftCount = announcements.filter(a => a.status === 'Draft').length;
  
  // Calculate total reach for active announcements
  const totalReach = announcements
    .filter(a => a.status === 'Published' && a.readStats)
    .reduce((sum, a) => sum + (a.readStats?.delivered || 0), 0);
    
  const unreadCount = announcements
    .filter(a => a.status === 'Published' && a.readStats)
    .reduce((sum, a) => sum + (a.readStats?.unread || 0), 0);

  // Mock value for "Published This Month"
  const publishedThisMonth = announcements.filter(a => a.status === 'Published' || a.status === 'Expired' || a.status === 'Archived').length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Active Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeCount}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Scheduled</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{scheduledCount}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Drafts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{draftCount}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Published This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{publishedThisMonth}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Reach</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalReach}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Unread</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{unreadCount}</div>
        </CardContent>
      </Card>
    </div>
  );
}
