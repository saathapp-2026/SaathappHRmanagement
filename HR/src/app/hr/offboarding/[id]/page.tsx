'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { mockOffboardingRecords, OffboardingRecord } from '@/data/hr/offboarding';
import { OffboardingHeader } from '@/components/hr/offboarding/OffboardingHeader';
import { OffboardingEmployeeCard } from '@/components/hr/offboarding/OffboardingEmployeeCard';
import { OffboardingProgress } from '@/components/hr/offboarding/OffboardingProgress';
import { ResignationDetailsCard } from '@/components/hr/offboarding/ResignationDetailsCard';
import { HRReviewCard } from '@/components/hr/offboarding/HRReviewCard';
import { ManagerDecisionCard } from '@/components/hr/offboarding/ManagerDecisionCard';
import { NoticePeriodCard } from '@/components/hr/offboarding/NoticePeriodCard';
import { KnowledgeTransferSection } from '@/components/hr/offboarding/KnowledgeTransferSection';
import { ClearanceSection } from '@/components/hr/offboarding/ClearanceSection';
import { AssetReturnSummary } from '@/components/hr/offboarding/AssetReturnSummary';
import { ExitInterviewCard } from '@/components/hr/offboarding/ExitInterviewCard';
import { FinalSettlementCard } from '@/components/hr/offboarding/FinalSettlementCard';
import { ExitDocumentsCard } from '@/components/hr/offboarding/ExitDocumentsCard';
import { AccountAccessCard } from '@/components/hr/offboarding/AccountAccessCard';
import { FinalOffboardingChecklist } from '@/components/hr/offboarding/FinalOffboardingChecklist';
import { OffboardingTimeline } from '@/components/hr/offboarding/OffboardingTimeline';
import { OffboardingInternalNotes } from '@/components/hr/offboarding/OffboardingInternalNotes';

export default function OffboardingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [record, setRecord] = useState<OffboardingRecord | undefined>(mockOffboardingRecords.find(r => r.id === id));

  if (!record) return notFound();

  const handleUpdate = (updatedRecord: Partial<OffboardingRecord>) => {
    setRecord({ ...record, ...updatedRecord });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Link href="/hr/offboarding" className="hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Back to Offboarding
        </Link>
      </div>

      <OffboardingHeader record={record} onUpdate={handleUpdate} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Main Process Workspace */}
        <div className="xl:col-span-8 lg:col-span-7 space-y-6">
          <OffboardingProgress progress={record.progress} />
          
          <ResignationDetailsCard record={record} />
          <HRReviewCard record={record} onUpdate={handleUpdate} />
          <ManagerDecisionCard record={record} onUpdate={handleUpdate} />
          <NoticePeriodCard record={record} onUpdate={handleUpdate} />
          <KnowledgeTransferSection record={record} onUpdate={handleUpdate} />
          <ClearanceSection record={record} onUpdate={handleUpdate} />
          
          <ExitInterviewCard record={record} onUpdate={handleUpdate} />
          <FinalSettlementCard record={record} onUpdate={handleUpdate} />
          <ExitDocumentsCard record={record} onUpdate={handleUpdate} />
          <AccountAccessCard record={record} onUpdate={handleUpdate} />
          <FinalOffboardingChecklist record={record} onUpdate={handleUpdate} />
        </div>

        {/* Side Info Workspace */}
        <div className="xl:col-span-4 lg:col-span-5 space-y-6">
          <OffboardingEmployeeCard record={record} />
          <AssetReturnSummary assets={record.assignedAssets} />
          
          {/* Quick Context Links */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm">Context</h3>
            <div className="space-y-2">
              <Link href={`/hr/attendance/${record.employeeId}`} className="block text-sm text-blue-600 hover:underline">
                View Attendance
              </Link>
              <Link href={`/hr/leave/employee/${record.employeeId}`} className="block text-sm text-blue-600 hover:underline">
                View Leave History
              </Link>
            </div>
          </div>

          <OffboardingTimeline events={record.timeline} />
          <OffboardingInternalNotes notes={record.internalNotes} />
        </div>
      </div>
    </div>
  );
}
