'use client';
import React, { useState } from 'react';
import { Download, Calendar as CalendarIcon, Info } from 'lucide-react';
import { LeaveStats } from '@/components/hr/leave/LeaveStats';
import { LeaveTabs } from '@/components/hr/leave/LeaveTabs';
import { LeaveStatusTabs } from '@/components/hr/leave/LeaveStatusTabs';
import { LeaveFilters } from '@/components/hr/leave/LeaveFilters';
import { LeaveRequestTable } from '@/components/hr/leave/LeaveRequestTable';
import { LeaveAttentionCard } from '@/components/hr/leave/LeaveAttentionCard';
import { LeaveConflictCard } from '@/components/hr/leave/LeaveConflictCard';
import { EmployeesOnLeave } from '@/components/hr/leave/EmployeesOnLeave';
import { UpcomingLeave } from '@/components/hr/leave/UpcomingLeave';
import { LeaveBalancesTable } from '@/components/hr/leave/LeaveBalancesTable';

export default function LeaveManagementPage() {
  const [activeTab, setActiveTab] = useState('Requests');
  const [requestStatus, setRequestStatus] = useState('Pending');

  const renderContent = () => {
    switch (activeTab) {
      case 'Requests':
        return (
          <>
            <LeaveStatusTabs activeTab={requestStatus} setActiveTab={setRequestStatus} />
            <LeaveFilters />
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3">
                <LeaveRequestTable />
              </div>
              <div className="xl:col-span-1 space-y-6">
                <LeaveAttentionCard />
                <LeaveConflictCard />
              </div>
            </div>
          </>
        );
      case 'On Leave':
        return (
          <>
            <LeaveFilters />
            <EmployeesOnLeave />
          </>
        );
      case 'Upcoming':
        return (
          <>
            <LeaveFilters />
            <UpcomingLeave />
          </>
        );
      case 'Balances':
        return (
          <>
            <LeaveFilters />
            <LeaveBalancesTable />
          </>
        );
      case 'History':
        return (
          <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
            <p className="text-gray-500">History view implementation (re-uses request table with generic state)</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-sm text-gray-500 mt-1">Review leave requests, monitor employee availability, and balances.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-3 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
            <Info size={16} /> Leave Policy
          </button>
          <button className="px-3 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
            <CalendarIcon size={16} /> Date Range
          </button>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <LeaveStats />
      <LeaveTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  );
}
