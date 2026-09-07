import React from 'react';
import { Eye, Check, X } from 'lucide-react';

export function DocumentChecklist() {
  const docs = [
    { name: 'Aadhaar', status: 'Verified' },
    { name: 'PAN', status: 'Pending Verification' },
    { name: 'Resume', status: 'Verified' },
    { name: 'Degree Certificate', status: 'Missing' },
    { name: 'Experience Letter', status: 'Not Required' },
    { name: 'Passport Photo', status: 'Missing' },
  ];

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Verified': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending Verification': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Missing': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Received': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Document Checklist</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {docs.map((doc, idx) => (
          <div key={idx} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50/50 transition-colors">
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">{doc.name}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className={`inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusStyle(doc.status)}`}>
                {doc.status}
              </span>
              <div className="flex gap-1">
                {doc.status === 'Pending Verification' && (
                  <>
                    <button className="p-1.5 text-gray-500 hover:text-indigo-600 bg-white border border-gray-200 rounded shadow-sm" title="View"><Eye size={14}/></button>
                    <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 bg-white border border-gray-200 rounded shadow-sm" title="Verify"><Check size={14}/></button>
                    <button className="p-1.5 text-rose-600 hover:bg-rose-50 bg-white border border-gray-200 rounded shadow-sm" title="Reject"><X size={14}/></button>
                  </>
                )}
                {doc.status === 'Verified' && (
                  <button className="p-1.5 text-gray-500 hover:text-indigo-600 bg-white border border-gray-200 rounded shadow-sm" title="View"><Eye size={14}/></button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
