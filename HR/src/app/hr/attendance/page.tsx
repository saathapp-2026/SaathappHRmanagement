'use client';
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Download, Info, CheckSquare } from 'lucide-react';
import { AttendanceStats } from '@/components/hr/attendance/AttendanceStats';
import { AttendanceOverviewChart } from '@/components/hr/attendance/AttendanceOverviewChart';
import { AttendanceFilters } from '@/components/hr/attendance/AttendanceFilters';
import { AttendanceTable } from '@/components/hr/attendance/AttendanceTable';
import { AttendanceHistory } from '@/components/hr/attendance/AttendanceHistory';
import { MonthlyAttendanceSummary } from '@/components/hr/attendance/MonthlyAttendanceSummary';
import { AttendanceAttentionCard } from '@/components/hr/attendance/AttendanceAttentionCard';
import { MarkAttendanceModal } from '@/components/hr/attendance/MarkAttendanceModal';
import { AttendancePolicyDrawer } from '@/components/hr/attendance/AttendancePolicyDrawer';

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState('Today');
  const [isMarkModalOpen, setIsMarkModalOpen] = useState(false);
  const [isPolicyDrawerOpen, setIsPolicyDrawerOpen] = useState(false);
  
  const tabs = ['Today', 'History', 'Monthly Summary'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Today':
        return (
          <>
            <AttendanceFilters />
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              <div className="xl:col-span-8">
                <AttendanceTable />
              </div>
              <div className="xl:col-span-4 space-y-6">
                <AttendanceOverviewChart />
                <AttendanceAttentionCard />
              </div>
            </div>
          </>
        );
      case 'History':
        return (
          <>
            <AttendanceFilters />
            <AttendanceHistory />
          </>
        );
      case 'Monthly Summary':
        return (
          <>
            <AttendanceFilters />
            <MonthlyAttendanceSummary />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor daily attendance, working hours, and punctuality across your workforce.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={() => setIsPolicyDrawerOpen(true)} className="px-3 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
            <Info size={16} /> Policy
          </button>
          <button onClick={() => setIsMarkModalOpen(true)} className="px-3 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
            <CheckSquare size={16} /> Mark Attendance
          </button>
          <button className="px-3 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
            <CalendarIcon size={16} /> Today
          </button>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <AttendanceStats />

      {/* Tabs */}
      <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex overflow-x-auto no-scrollbar space-x-1 mb-6">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {tab === 'Today' ? "Today's Attendance" : tab === 'History' ? 'Attendance History' : tab}
          </button>
        ))}
      </div>

      {renderContent()}

      <MarkAttendanceModal isOpen={isMarkModalOpen} onClose={() => setIsMarkModalOpen(false)} onSave={() => setIsMarkModalOpen(false)} />
      <AttendancePolicyDrawer isOpen={isPolicyDrawerOpen} onClose={() => setIsPolicyDrawerOpen(false)} />
    </div>
  );
}
