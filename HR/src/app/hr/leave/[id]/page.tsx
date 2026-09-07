'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle2, XCircle, MessageSquareQuote } from 'lucide-react';
import { mockLeaveRequests } from '@/data/hr/leave';

import { LeaveRequestHeader } from '@/components/hr/leave/LeaveRequestHeader';
import { LeaveRequestSummary } from '@/components/hr/leave/LeaveRequestSummary';
import { LeaveDateBreakdown } from '@/components/hr/leave/LeaveDateBreakdown';
import { LeaveBalanceContext } from '@/components/hr/leave/LeaveBalanceContext';
import { TeamAvailabilityCard } from '@/components/hr/leave/TeamAvailabilityCard';
import { LeavePolicyCard } from '@/components/hr/leave/LeavePolicyCard';
import { LeaveAttachmentCard } from '@/components/hr/leave/LeaveAttachmentCard';
import { LeaveTimeline } from '@/components/hr/leave/LeaveTimeline';
import { InternalHRNote } from '@/components/hr/leave/InternalHRNote';

import { ApproveLeaveModal } from '@/components/hr/leave/ApproveLeaveModal';
import { RejectLeaveModal } from '@/components/hr/leave/RejectLeaveModal';
import { RequestClarificationModal } from '@/components/hr/leave/RequestClarificationModal';

export default function LeaveRequestDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const request = mockLeaveRequests.find(r => r.id === id) || mockLeaveRequests[0];

  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isRequestInfoOpen, setIsRequestInfoOpen] = useState(false);

  return (
    <div className="space-y-6 pb-24 sm:pb-12">
      <Link href="/hr/leave" className="text-sm text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-2 font-medium w-fit">
        <ArrowLeft size={16} /> Back to Leave Management
      </Link>

      <LeaveRequestHeader request={request} />

      {/* Primary Context Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeaveBalanceContext request={request} />
        <TeamAvailabilityCard />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <LeaveRequestSummary request={request} />
          <LeaveDateBreakdown />
          <LeaveAttachmentCard request={request} />
          <LeaveTimeline request={request} />
          <InternalHRNote />
        </div>
        <div className="space-y-6">
          <LeavePolicyCard request={request} />
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 sm:static sm:bg-transparent sm:border-0 sm:p-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 justify-end">
          <button onClick={() => setIsRequestInfoOpen(true)} className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
            <MessageSquareQuote size={18}/> Request Clarification
          </button>
          <button onClick={() => setIsRejectOpen(true)} className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors flex items-center justify-center gap-2">
            <XCircle size={18}/> Reject
          </button>
          <button onClick={() => setIsApproveOpen(true)} className="flex-[2] sm:flex-none px-6 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-sm transition-colors flex items-center justify-center gap-2">
            <CheckCircle2 size={18}/> Approve
          </button>
        </div>
      </div>

      <ApproveLeaveModal isOpen={isApproveOpen} onClose={() => setIsApproveOpen(false)} request={request} />
      <RejectLeaveModal isOpen={isRejectOpen} onClose={() => setIsRejectOpen(false)} />
      <RequestClarificationModal isOpen={isRequestInfoOpen} onClose={() => setIsRequestInfoOpen(false)} />
    </div>
  );
}
