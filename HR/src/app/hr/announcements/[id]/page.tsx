// @ts-nocheck

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnnouncementForm } from '@/components/hr/announcements/AnnouncementForm';
import { AnnouncementDetail } from '@/components/hr/announcements/AnnouncementDetail';
import { mockAnnouncements } from '@/data/hr/announcements';

export default function AnnouncementDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [isEditMode, setIsEditMode] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('edit') === 'true') {
        setIsEditMode(true);
      }
    }
  }, []);
  
  const announcement = mockAnnouncements.find(a => a.id === id);

  if (!announcement) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Announcement Not Found</h1>
        <p className="text-muted-foreground">The announcement you are looking for does not exist.</p>
        <Link href="/hr/announcements">
          <Button>Return to Announcements</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <Link href="/hr/announcements">
          <Button variant="ghost" size="sm" className="-ml-2 mb-2 text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Announcements
          </Button>
        </Link>
        {!isEditMode && (
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Announcement Details
          </h2>
        )}
        {isEditMode && (
          <div className="flex justify-between items-center">
             <h1 className="text-2xl font-bold tracking-tight">Edit Announcement</h1>
             <Button variant="outline" size="sm" onClick={() => setIsEditMode(false)}>Cancel Edit</Button>
          </div>
        )}
      </div>

      {isEditMode ? (
        <AnnouncementForm initialData={announcement} isEdit={true} />
      ) : (
        <AnnouncementDetail 
          announcement={announcement} 
          onEdit={() => setIsEditMode(true)} 
        />
      )}
    </div>
  );
}
