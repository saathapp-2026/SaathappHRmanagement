'use client';
import React from 'react';
import Link from 'next/link';
import { UserPlus, Mail } from 'lucide-react';
import { OnboardingStats } from '@/components/hr/onboarding/OnboardingStats';
import { OnboardingPipeline } from '@/components/hr/onboarding/OnboardingPipeline';
import { OnboardingFilters } from '@/components/hr/onboarding/OnboardingFilters';
import { OnboardingTable } from '@/components/hr/onboarding/OnboardingTable';
import { JoiningSoonCard } from '@/components/hr/onboarding/JoiningSoonCard';
import { MissingDocumentsCard } from '@/components/hr/onboarding/MissingDocumentsCard';

export default function OnboardingDashboard() {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee Onboarding</h1>
          <p className="text-sm text-gray-500 mt-1">Track new hires from invitation to complete employee activation.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium shadow-sm transition-colors">
            <Mail size={18} />
            Invite Employee
          </button>
          <Link href="/hr/onboarding/new" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <UserPlus size={18} />
            Add Employee
          </Link>
        </div>
      </div>

      <OnboardingStats />
      
      <OnboardingPipeline />
      
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8">
          <OnboardingFilters />
          <OnboardingTable />
        </div>
        <div className="xl:col-span-4 space-y-6">
          <JoiningSoonCard />
          <MissingDocumentsCard />
        </div>
      </div>
    </div>
  );
}
