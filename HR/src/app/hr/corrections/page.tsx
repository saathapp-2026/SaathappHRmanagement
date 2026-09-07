'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Download, Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';
import { CorrectionStats } from '@/components/hr/corrections/CorrectionStats';
import { CorrectionStatusTabs } from '@/components/hr/corrections/CorrectionStatusTabs';
import { CorrectionFilters } from '@/components/hr/corrections/CorrectionFilters';
import { CorrectionTable } from '@/components/hr/corrections/CorrectionTable';
import { CorrectionAttentionCard } from '@/components/hr/corrections/CorrectionAttentionCard';

export default function CorrectionsPage() {
  const [activeTab, setActiveTab] = useState('Pending');

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link href="/hr/attendance" className="text-sm text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-2 font-medium w-fit">
            <ArrowLeft size={16} /> Back to Attendance
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Corrections</h1>
          <p className="text-sm text-gray-500 mt-1">Review employee requests to correct attendance records.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-3 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
            <CalendarIcon size={16} /> Date Range
          </button>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <CorrectionStats />
      
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-6">
        <div className="xl:col-span-3">
          <CorrectionStatusTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <CorrectionFilters />
        </div>
        <div className="xl:col-span-1 hidden xl:block">
          {/* Spacing alignment for layout */}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <CorrectionTable />
        </div>
        <div className="xl:col-span-1">
          <CorrectionAttentionCard />
        </div>
      </div>
    </div>
  );
}
