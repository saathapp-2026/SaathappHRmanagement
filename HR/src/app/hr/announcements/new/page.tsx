// @ts-nocheck

"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnnouncementForm } from '@/components/hr/announcements/AnnouncementForm';

export default function NewAnnouncementPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <Link href="/hr/announcements">
          <Button variant="ghost" size="sm" className="-ml-2 mb-2 text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Announcements
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Create Announcement</h1>
      </div>

      <AnnouncementForm />
    </div>
  );
}
