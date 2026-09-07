'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, CalendarPlus, CheckCircle, Clock } from 'lucide-react';
import { mockProbationRecords } from '@/data/hr/probation';

import { ProbationEmployeeCard } from '@/components/hr/probation/ProbationEmployeeCard';
import { ProbationDetailsCard } from '@/components/hr/probation/ProbationDetailsCard';
import { ProbationProgressTimeline } from '@/components/hr/probation/ProbationProgressTimeline';
import { ProbationReviewCheckpoints } from '@/components/hr/probation/ProbationReviewCheckpoints';
import { ManagerRecommendationCard } from '@/components/hr/probation/ManagerRecommendationCard';
import { ProbationHRReview } from '@/components/hr/probation/ProbationHRReview';
import { 
  ProbationAttendanceContext, 
  ProbationLeaveContext, 
  ProbationCaseContext 
} from '@/components/hr/probation/ProbationContextCards';
import { ProbationExtensionHistory } from '@/components/hr/probation/ProbationExtensionHistory';

import { ScheduleReviewModal } from '@/components/hr/probation/modals/ScheduleReviewModal';
import { ConfirmEmployeeModal } from '@/components/hr/probation/modals/ConfirmEmployeeModal';
import { ExtendProbationModal } from '@/components/hr/probation/modals/ExtendProbationModal';

export default function ProbationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const employeeId = params.employeeId as string;
  
  const [record, setRecord] = useState(() => mockProbationRecords.find(r => r.employeeId === employeeId));

  // Modal states
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);

  if (!record) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900">Employee not found</h2>
        <button onClick={() => router.push('/hr/probation')} className="mt-4 text-indigo-600">Back to Probation List</button>
      </div>
    );
  }

  const isCompleted = record.status === 'Confirmed' || record.status === 'Cancelled';

  const handleScheduleReview = (data: any) => {
    // Local mock update
    const newRecord = { ...record };
    const revIndex = newRecord.reviews.findIndex(r => r.type === data.type);
    if (revIndex >= 0) {
      newRecord.reviews[revIndex] = {
        ...newRecord.reviews[revIndex],
        scheduledDate: data.date,
        scheduledTime: data.time,
        reviewer: data.reviewer,
        status: 'Scheduled'
      };
    } else {
      newRecord.reviews.push({
        id: `rev-${Date.now()}`,
        type: data.type,
        scheduledDate: data.date,
        scheduledTime: data.time,
        reviewer: data.reviewer,
        status: 'Scheduled',
        remarks: null
      });
    }
    setRecord(newRecord);
  };

  const handleConfirmEmployee = (data: any) => {
    const newRecord = { ...record };
    newRecord.status = 'Confirmed';
    newRecord.hrRemarks = {
      text: data.remarks,
      author: 'Priya Sharma',
      date: new Date().toISOString()
    };
    setRecord(newRecord);
  };

  const handleExtendProbation = (data: any) => {
    const newRecord = { ...record };
    newRecord.status = 'Extended';
    newRecord.currentEndDate = data.newEndDate;
    newRecord.extensions.push({
      id: `ext-${Date.now()}`,
      originalEnd: record.currentEndDate,
      newEnd: data.newEndDate,
      duration: data.duration,
      reason: data.reason,
      decisionBy: 'Priya Sharma',
      date: new Date().toISOString()
    });
    newRecord.hrRemarks = {
      text: data.remarks,
      author: 'Priya Sharma',
      date: new Date().toISOString()
    };
    setRecord(newRecord);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push('/hr/probation')}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Probation Review</h1>
            <p className="text-sm text-gray-500 mt-1">{record.employeeName}</p>
          </div>
        </div>
        
        {!isCompleted && (
          <div className="flex flex-wrap items-center gap-2">
            <button 
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium shadow-sm transition-colors"
              onClick={() => setIsScheduleModalOpen(true)}
            >
              <CalendarPlus size={16} />
              Schedule Review
            </button>
            <button 
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium shadow-sm transition-colors"
              onClick={() => setIsExtendModalOpen(true)}
            >
              <Clock size={16} />
              Extend
            </button>
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors"
              onClick={() => setIsConfirmModalOpen(true)}
            >
              <CheckCircle size={16} />
              Confirm Employee
            </button>
          </div>
        )}
      </div>

      <ProbationEmployeeCard record={record} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProbationDetailsCard record={record} />
          
          <ProbationProgressTimeline record={record} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProbationReviewCheckpoints record={record} />
            <div className="space-y-6">
              <ManagerRecommendationCard record={record} />
              {!isCompleted && <ProbationHRReview />}
            </div>
          </div>
          
          <ProbationExtensionHistory record={record} />
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <ProbationAttendanceContext record={record} />
          <ProbationLeaveContext record={record} />
          <ProbationCaseContext />
          
          {record.hrRemarks && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">HR Remarks</h4>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm text-gray-700">
                "{record.hrRemarks.text}"
              </div>
              <p className="text-xs text-gray-500 mt-2 text-right">- {record.hrRemarks.author}, {new Date(record.hrRemarks.date).toLocaleDateString('en-GB')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ScheduleReviewModal 
        isOpen={isScheduleModalOpen} 
        onClose={() => setIsScheduleModalOpen(false)} 
        onSchedule={handleScheduleReview}
      />
      
      <ConfirmEmployeeModal 
        isOpen={isConfirmModalOpen} 
        onClose={() => setIsConfirmModalOpen(false)} 
        onConfirm={handleConfirmEmployee}
        record={record}
      />
      
      <ExtendProbationModal 
        isOpen={isExtendModalOpen} 
        onClose={() => setIsExtendModalOpen(false)} 
        onExtend={handleExtendProbation}
        record={record}
      />
    </div>
  );
}
