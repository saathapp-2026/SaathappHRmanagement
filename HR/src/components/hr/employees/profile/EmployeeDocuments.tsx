import React from 'react';
import { UploadCloud, Eye, Download, ShieldCheck, ShieldAlert, FileText, MoreVertical } from 'lucide-react';

export function EmployeeDocuments() {
  const documents = [
    { name: 'Aadhaar Card', category: 'Identity', date: '02 Aug 2026', status: 'Verified' },
    { name: 'PAN Card', category: 'Identity', date: '02 Aug 2026', status: 'Verified' },
    { name: 'Degree Certificate', category: 'Education', date: '03 Aug 2026', status: 'Pending Verification' },
    { name: 'Previous Experience Letter', category: 'Experience', date: '03 Aug 2026', status: 'Verified' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Verified': return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"><ShieldCheck size={12}/> Verified</span>;
      case 'Pending Verification': return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200"><ShieldAlert size={12}/> Pending</span>;
      default: return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200">{status}</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">HR Documents</h3>
        <button className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors">
          <UploadCloud size={16} /> Upload HR Document
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-4 whitespace-nowrap">Document</th>
              <th className="px-6 py-4 whitespace-nowrap">Category</th>
              <th className="px-6 py-4 whitespace-nowrap">Uploaded</th>
              <th className="px-6 py-4 whitespace-nowrap">Status</th>
              <th className="px-6 py-4 whitespace-nowrap">Expiry</th>
              <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {documents.map((doc, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><FileText size={16} /></div>
                    <span className="text-sm font-semibold text-gray-900">{doc.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{doc.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(doc.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">—</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="View"><Eye size={16}/></button>
                    <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Download"><Download size={16}/></button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors" title="More"><MoreVertical size={16}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
