'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';

import { EmployeeLeaveHeader } from '@/components/hr/leave/EmployeeLeaveHeader';
import { EmployeeLeaveBalances } from '@/components/hr/leave/EmployeeLeaveBalances';
import { BalanceAdjustmentHistory } from '@/components/hr/leave/BalanceAdjustmentHistory';
import { AdjustBalanceModal } from '@/components/hr/leave/AdjustBalanceModal';

export default function EmployeeLeaveDetailPage() {
  const params = useParams();
  const employeeId = params.employeeId as string;
  const [isAdjustOpen, setIsAdjustOpen] = useState(false);

  return (
    <div className="space-y-6 pb-12">
      <Link href="/hr/leave" className="text-sm text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-2 font-medium w-fit">
        <ArrowLeft size={16} /> Back to Leave Management
      </Link>

      <EmployeeLeaveHeader employeeId={employeeId} />

      <div className="flex justify-between items-end">
        <h2 className="text-lg font-bold text-gray-900">Leave Balances</h2>
        <button 
          onClick={() => setIsAdjustOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2"
        >
          <SlidersHorizontal size={16} /> Adjust Balance
        </button>
      </div>

      <EmployeeLeaveBalances />
      <BalanceAdjustmentHistory />

      <AdjustBalanceModal isOpen={isAdjustOpen} onClose={() => setIsAdjustOpen(false)} />
    </div>
  );
}
