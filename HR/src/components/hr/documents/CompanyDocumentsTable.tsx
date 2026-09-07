import React from 'react';
import { Download, FileText, Edit, Trash2 } from 'lucide-react';
import { CompanyDocument } from '@/data/hr/documents';

export function CompanyDocumentsTable({ documents }: { documents: CompanyDocument[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-4 py-3 whitespace-nowrap">Document Title</th>
              <th className="px-4 py-3 whitespace-nowrap">Category</th>
              <th className="px-4 py-3 whitespace-nowrap">Shared With</th>
              <th className="px-4 py-3 whitespace-nowrap">Last Updated</th>
              <th className="px-4 py-3 whitespace-nowrap">File Details</th>
              <th className="px-4 py-3 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                      <FileText size={16} />
                    </div>
                    <span className="text-sm font-bold text-gray-900">{doc.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded uppercase tracking-wider">{doc.category}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">
                  {doc.sharedWith}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                  {doc.lastUpdated}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                  {doc.fileType} • {doc.fileSize}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <div className="flex justify-end gap-1">
                    <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-gray-100 rounded transition-colors" title="Download"><Download size={16} /></button>
                    <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-gray-100 rounded transition-colors" title="Edit Metadata"><Edit size={16} /></button>
                    <button className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors" title="Delete"><Trash2 size={16} /></button>
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
