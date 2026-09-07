'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MoreHorizontal, UserX, LogOut, Download } from 'lucide-react';
import { mockEmployee } from '@/data/hr/employees';
import { EmployeeProfileHeader } from '@/components/hr/employees/profile/EmployeeProfileHeader';
import { EmployeeOverview } from '@/components/hr/employees/profile/EmployeeOverview';
import { PersonalDetails } from '@/components/hr/employees/profile/PersonalDetails';
import { EmploymentDetails } from '@/components/hr/employees/profile/EmploymentDetails';
import { CompensationDetails } from '@/components/hr/employees/profile/CompensationDetails';
import { EmployeeDocuments } from '@/components/hr/employees/profile/EmployeeDocuments';
import { EmployeeHistory } from '@/components/hr/employees/profile/EmployeeHistory';

export default function EmployeeProfilePage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [showMoreActions, setShowMoreActions] = useState(false);

  const tabs = ['Overview', 'Personal', 'Employment', 'Compensation', 'Documents', 'History'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview': return <EmployeeOverview />;
      case 'Personal': return <PersonalDetails />;
      case 'Employment': return <EmploymentDetails />;
      case 'Compensation': return <CompensationDetails />;
      case 'Documents': return <EmployeeDocuments />;
      case 'History': return <EmployeeHistory />;
      default: return <EmployeeOverview />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link href="/hr/employees" className="text-sm text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-2 font-medium">
            <ArrowLeft size={16} /> Back to Employees
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/hr/employees" className="hover:text-gray-900">Employees</Link>
            <span>/</span>
            <span className="font-semibold text-gray-900">{mockEmployee.name}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 relative">
          <button className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm transition-colors">
            Edit Employee
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
                <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"><Download size={16}/> Download Info</button>
                <div className="h-px bg-gray-100 my-1"></div>
                <button className="w-full text-left px-4 py-2.5 text-sm text-amber-700 hover:bg-amber-50 flex items-center gap-2"><LogOut size={16}/> Start Offboarding</button>
                <button className="w-full text-left px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"><UserX size={16}/> Deactivate Employee</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <EmployeeProfileHeader />

      {/* Tabs */}
      <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex overflow-x-auto no-scrollbar space-x-1">
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
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
}
