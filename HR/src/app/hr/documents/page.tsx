'use client';
import React, { useState } from 'react';
import { UploadCloud, Search, Filter } from 'lucide-react';
import { mockEmployeeDocuments, mockCompanyDocuments, EmployeeDocument } from '@/data/hr/documents';

import { DocumentsTabs } from '@/components/hr/documents/DocumentsTabs';
import { EmployeeDocumentsTable } from '@/components/hr/documents/EmployeeDocumentsTable';
import { CompanyDocumentsTable } from '@/components/hr/documents/CompanyDocumentsTable';
import { DocumentVerificationModal } from '@/components/hr/documents/DocumentVerificationModal';
import { UploadCompanyDocumentModal } from '@/components/hr/documents/UploadCompanyDocumentModal';

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState('Pending Verification');
  
  const [selectedDoc, setSelectedDoc] = useState<EmployeeDocument | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const pendingDocs = mockEmployeeDocuments.filter(d => d.status === 'Pending');

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
          <p className="text-sm text-gray-500 mt-1">Verify employee submissions and manage company-wide policies and templates.</p>
        </div>
        
        {activeTab === 'Company Policies & Templates' && (
          <button 
            onClick={() => setIsUploadOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2"
          >
            <UploadCloud size={16} /> Upload Policy
          </button>
        )}
      </div>

      <DocumentsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 bg-white p-3 border border-gray-200 rounded-xl shadow-sm mb-6">
        <div className="relative flex-1 w-full xl:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search documents or employees..." 
            className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto">
          <select className="px-3 py-1.5 bg-gray-50 border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 font-medium">
            <option>All Categories</option>
            <option>Identity</option>
            <option>Education</option>
            <option>Experience</option>
            <option>Policy</option>
          </select>
          <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">
            <Filter size={16} />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      {activeTab === 'Pending Verification' && (
        <EmployeeDocumentsTable documents={pendingDocs} onView={setSelectedDoc} />
      )}
      
      {activeTab === 'All Employee Documents' && (
        <EmployeeDocumentsTable documents={mockEmployeeDocuments} onView={setSelectedDoc} />
      )}

      {activeTab === 'Company Policies & Templates' && (
        <CompanyDocumentsTable documents={mockCompanyDocuments} />
      )}

      <DocumentVerificationModal isOpen={!!selectedDoc} onClose={() => setSelectedDoc(null)} document={selectedDoc} />
      <UploadCompanyDocumentModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </div>
  );
}
