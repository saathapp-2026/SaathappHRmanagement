'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle2, XCircle, MessageSquareQuote } from 'lucide-react';
import { mockCorrections } from '@/data/hr/corrections';

import { CorrectionDetailHeader } from '@/components/hr/corrections/CorrectionDetailHeader';
import { AttendanceComparison } from '@/components/hr/corrections/AttendanceComparison';
import { EmployeeReasonCard } from '@/components/hr/corrections/EmployeeReasonCard';
import { EvidenceCard } from '@/components/hr/corrections/EvidenceCard';
import { AttendanceContextCard } from '@/components/hr/corrections/AttendanceContextCard';
import { CorrectionPolicyCard } from '@/components/hr/corrections/CorrectionPolicyCard';
import { CorrectionTimeline } from '@/components/hr/corrections/CorrectionTimeline';
import { CorrectionSummaryCard } from '@/components/hr/corrections/CorrectionSummaryCard';
import { InternalHRNote } from '@/components/hr/corrections/InternalHRNote';

import { ApproveCorrectionModal } from '@/components/hr/corrections/ApproveCorrectionModal';
import { RejectCorrectionModal } from '@/components/hr/corrections/RejectCorrectionModal';
import { RequestInformationModal } from '@/components/hr/corrections/RequestInformationModal';

export default function CorrectionDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const correction = mockCorrections.find(c => c.id === id) || mockCorrections[0];

  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isRequestInfoOpen, setIsRequestInfoOpen] = useState(false);

  return (
    <div className="space-y-6 pb-24 sm:pb-12">
      <Link href="/hr/corrections" className="text-sm text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-2 font-medium w-fit">
        <ArrowLeft size={16} /> Back to Corrections
      </Link>

      <CorrectionDetailHeader correction={correction} />
      
      {/* HEART OF THE PAGE: The Comparison */}
      <AttendanceComparison correction={correction} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <EmployeeReasonCard correction={correction} />
          <EvidenceCard correction={correction} />
          <CorrectionTimeline correction={correction} />
          <InternalHRNote />
        </div>
        <div className="space-y-6">
          <CorrectionSummaryCard correction={correction} />
          <AttendanceContextCard />
          <CorrectionPolicyCard />
        </div>
      </div>

      {/* Sticky Bottom Actions on Mobile, Normal layout on Desktop */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 sm:static sm:bg-transparent sm:border-0 sm:p-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 justify-end">
          <button onClick={() => setIsRequestInfoOpen(true)} className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
            <MessageSquareQuote size={18}/> Request Info
          </button>
          <button onClick={() => setIsRejectOpen(true)} className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors flex items-center justify-center gap-2">
            <XCircle size={18}/> Reject
          </button>
          <button onClick={() => setIsApproveOpen(true)} className="flex-[2] sm:flex-none px-6 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-sm transition-colors flex items-center justify-center gap-2">
            <CheckCircle2 size={18}/> Approve
          </button>
        </div>
      </div>

      <ApproveCorrectionModal isOpen={isApproveOpen} onClose={() => setIsApproveOpen(false)} correction={correction} />
      <RejectCorrectionModal isOpen={isRejectOpen} onClose={() => setIsRejectOpen(false)} />
      <RequestInformationModal isOpen={isRequestInfoOpen} onClose={() => setIsRequestInfoOpen(false)} />
    </div>
  );
}
