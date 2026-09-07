'use client';

import React, { useState } from 'react';
import { HRSidebar } from '@/components/hr/HRSidebar';
import { HRHeader } from '@/components/hr/HRHeader';

export default function HRLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <HRSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      
      <div className="flex-1 flex flex-col lg:pl-[260px] transition-all duration-300 ease-in-out">
        <HRHeader setMobileOpen={setMobileOpen} />
        <main className="flex-1 overflow-x-hidden">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
