'use client';
import React from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import { OffboardingRecord } from '@/data/hr/offboarding';

export function ExitDocumentsCard({ record, onUpdate }: { record: OffboardingRecord, onUpdate: (record: Partial<OffboardingRecord>) => void }) {
  const handleGenerate = (docId: string) => {
    alert('Document generation will be connected later.');
    const updatedDocs = record.exitDocuments.map(d => d.id === docId ? { ...d, status: 'Generated' as const, generatedDate: new Date().toLocaleDateString('en-GB') } : d);
    onUpdate({ exitDocuments: updatedDocs });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-gray-900">Exit Documents</h3>
      </div>
      
      <div className="p-0 divide-y divide-gray-100">
        {record.exitDocuments.length === 0 ? (
          <div className="p-4 text-center text-sm text-gray-500">No documents configured.</div>
        ) : (
          record.exitDocuments.map(doc => (
            <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{doc.type}</h4>
                  <p className="text-xs text-gray-500">
                    Status: <span className={doc.status === 'Generated' || doc.status === 'Issued' ? 'text-green-600 font-medium' : ''}>{doc.status}</span>
                    {doc.generatedDate && ` · Generated on ${doc.generatedDate}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {doc.status === 'Not Generated' ? (
                  <button onClick={() => handleGenerate(doc.id)} className="px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg">
                    Generate
                  </button>
                ) : (
                  <>
                    <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Preview">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Download">
                      <Download className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
