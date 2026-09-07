'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { mockConcerns } from '@/data/hr/concerns';

import { ConcernDetailHeader } from '@/components/hr/concerns/ConcernDetailHeader';
import { ConcernConfidentialityBanner } from '@/components/hr/concerns/ConcernConfidentialityBanner';
import { ConcernSummary } from '@/components/hr/concerns/ConcernSummary';
import { ConcernAttachments } from '@/components/hr/concerns/ConcernAttachments';
import { ConcernConversation } from '@/components/hr/concerns/ConcernConversation';
import { ConcernReplyComposer } from '@/components/hr/concerns/ConcernReplyComposer';
import { InternalNotes } from '@/components/hr/concerns/InternalNotes';
import { ConcernTimeline } from '@/components/hr/concerns/ConcernTimeline';
import { EmployeeContextCard } from '@/components/hr/concerns/EmployeeContextCard';
import { RelatedRecordsCard } from '@/components/hr/concerns/RelatedRecordsCard';

import { AssignConcernModal } from '@/components/hr/concerns/AssignConcernModal';
import { RequestConcernInfoModal } from '@/components/hr/concerns/RequestConcernInfoModal';
import { ResolveConcernModal } from '@/components/hr/concerns/ResolveConcernModal';
import { AddInternalNoteModal } from '@/components/hr/concerns/AddInternalNoteModal';

export default function ConcernDetailPage() {
  const params = useParams();
  const caseId = params?.id as string;
  const caseData = mockConcerns.find(c => c.id === caseId) || null;

  // Modal states
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isRequestInfoOpen, setIsRequestInfoOpen] = useState(false);
  const [isResolveOpen, setIsResolveOpen] = useState(false);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);

  if (!caseData) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-gray-500 font-medium">Concern not found.</p>
      </div>
    );
  }

  return (
    <div className="pb-12 bg-slate-50/30 min-h-screen -mx-6 -my-6">
      <ConcernDetailHeader 
        caseData={caseData} 
        onAssign={() => setIsAssignOpen(true)}
        onRequestInfo={() => setIsRequestInfoOpen(true)}
        onResolve={() => setIsResolveOpen(true)}
        onMoreActions={() => {}} 
      />
      
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <ConcernConfidentialityBanner category={caseData.category} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ConcernSummary caseData={caseData} />
              <ConcernAttachments attachments={caseData.attachments} />
              
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="p-5">
                  <ConcernConversation messages={caseData.messages} />
                  <ConcernReplyComposer onReply={() => {}} />
                </div>
              </div>
              
              <InternalNotes notes={caseData.internalNotes} onAddNote={() => setIsAddNoteOpen(true)} />
              
              <ConcernTimeline timeline={caseData.timeline} />
            </div>
            
            <div className="lg:col-span-1 space-y-6">
              <EmployeeContextCard caseData={caseData} />
              <RelatedRecordsCard />
            </div>
          </div>
        </div>
      </div>

      <AssignConcernModal isOpen={isAssignOpen} onClose={() => setIsAssignOpen(false)} />
      <RequestConcernInfoModal isOpen={isRequestInfoOpen} onClose={() => setIsRequestInfoOpen(false)} />
      <ResolveConcernModal isOpen={isResolveOpen} onClose={() => setIsResolveOpen(false)} />
      <AddInternalNoteModal isOpen={isAddNoteOpen} onClose={() => setIsAddNoteOpen(false)} />
    </div>
  );
}
