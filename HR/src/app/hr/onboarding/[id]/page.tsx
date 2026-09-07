'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, MoreHorizontal, Mail, CheckCircle2, UserX, User } from 'lucide-react';
import { mockOnboardingEmployees } from '@/data/hr/onboarding';
import { OnboardingProfileHeader } from '@/components/hr/onboarding/OnboardingProfileHeader';
import { OnboardingStepper } from '@/components/hr/onboarding/OnboardingStepper';
import { ProfileCompletionCard } from '@/components/hr/onboarding/ProfileCompletionCard';
import { DocumentChecklist } from '@/components/hr/onboarding/DocumentChecklist';
import { VerificationCard } from '@/components/hr/onboarding/VerificationCard';
import { JoiningReadinessCard } from '@/components/hr/onboarding/JoiningReadinessCard';
import { OnboardingActivity } from '@/components/hr/onboarding/OnboardingActivity';

export default function OnboardingDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const employee = mockOnboardingEmployees.find(e => e.id === id) || mockOnboardingEmployees[0];

  const [showMoreActions, setShowMoreActions] = useState(false);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link href="/hr/onboarding" className="text-sm text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-2 font-medium w-fit">
            <ArrowLeft size={16} /> Back to Onboarding
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Onboarding Details</h1>
        </div>
        
        <div className="flex items-center gap-3 relative">
          <button className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm transition-colors flex items-center gap-2">
            <CheckCircle2 size={16} /> Mark Onboarding Complete
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowMoreActions(!showMoreActions)}
              className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm transition-colors flex items-center gap-2"
            >
              <MoreHorizontal size={18} />
            </button>
            {showMoreActions && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"><Mail size={16}/> Resend Invitation</button>
                <Link href={`/hr/employees/${employee.id}`} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"><User size={16}/> View Employee Profile</Link>
                <div className="h-px bg-gray-100 my-1"></div>
                <button className="w-full text-left px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"><UserX size={16}/> Cancel Onboarding</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <OnboardingProfileHeader employee={employee} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <OnboardingStepper />
          <DocumentChecklist />
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <JoiningReadinessCard />
            <ProfileCompletionCard />
          </div>
          <VerificationCard />
          <OnboardingActivity />
        </div>
      </div>
    </div>
  );
}
