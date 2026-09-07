import React from 'react';
import { Eye, CheckCircle, XCircle } from 'lucide-react';
import { EmployeeDocument } from '@/data/hr/documents';

export function EmployeeDocumentsTable({ documents, onView }: { documents: EmployeeDocument[], onView: (doc: EmployeeDocument) => void }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-4 py-3 whitespace-nowrap">Employee</th>
              <th className="px-4 py-3 whitespace-nowrap">Document Name</th>
              <th className="px-4 py-3 whitespace-nowrap">Category</th>
              <th className="px-4 py-3 whitespace-nowrap">Upload Date</th>
              <th className="px-4 py-3 whitespace-nowrap">File Details</th>
              <th className="px-4 py-3 whitespace-nowrap">Status</th>
              <th className="px-4 py-3 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => onView(doc)}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">{doc.employeeName}</span>
                    <span className="text-xs text-gray-500">{doc.employeeId}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-800">{doc.documentName}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded uppercase tracking-wider">{doc.category}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                  {doc.uploadDate}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                  {doc.fileType} • {doc.fileSize}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                    doc.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    doc.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                    'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {doc.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <button onClick={(e) => { e.stopPropagation(); onView(doc); }} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 rounded-lg text-sm font-semibold transition-colors shadow-sm">
                    <Eye size={14} /> Review
                  </button>
                </td>
              </tr>
            ))}
            {documents.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm text-gray-500">
                  No documents found matching the criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
