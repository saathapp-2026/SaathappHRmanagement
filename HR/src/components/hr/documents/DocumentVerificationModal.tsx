import React, { useState } from 'react';
import { X, CheckCircle, XCircle, FileText } from 'lucide-react';
import { EmployeeDocument } from '@/data/hr/documents';

export function DocumentVerificationModal({ isOpen, onClose, document }: { isOpen: boolean, onClose: () => void, document: EmployeeDocument | null }) {
  const [rejectReason, setRejectReason] = useState('');
  const [mode, setMode] = useState<'view' | 'reject'>('view');

  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Mock Document Viewer Side */}
        <div className="w-full md:w-2/3 bg-slate-100 border-r border-gray-200 flex flex-col min-h-[300px] md:min-h-[600px]">
          <div className="p-3 border-b border-gray-200 bg-white flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700 truncate pr-4">{document.documentName}</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{document.fileType}</span>
          </div>
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full h-full bg-white shadow-sm border border-gray-200 flex flex-col items-center justify-center text-gray-400 rounded-lg">
              <FileText size={64} className="mb-4 opacity-50" />
              <p className="text-sm font-medium">Document Preview Sandbox</p>
              <p className="text-xs mt-2">({document.fileSize})</p>
            </div>
          </div>
        </div>

        {/* Action Panel Side */}
        <div className="w-full md:w-1/3 bg-white flex flex-col relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors z-10"><X size={20}/></button>
          
          <div className="p-6 pt-10 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 leading-tight mb-4">Document Review</h2>
            
            <div className="space-y-3 text-sm">
              <div><span className="text-gray-500 block text-xs">Employee</span><span className="font-semibold text-gray-900">{document.employeeName}</span></div>
              <div><span className="text-gray-500 block text-xs">Employee ID</span><span className="font-semibold text-gray-900">{document.employeeId}</span></div>
              <div><span className="text-gray-500 block text-xs">Category</span><span className="font-semibold text-indigo-700">{document.category}</span></div>
              <div><span className="text-gray-500 block text-xs">Uploaded</span><span className="font-semibold text-gray-900">{document.uploadDate}</span></div>
              <div>
                <span className="text-gray-500 block text-xs mb-0.5">Status</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                  document.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  document.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                  'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {document.status}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 flex-1 overflow-y-auto">
            {document.status === 'Pending' && mode === 'view' && (
              <div className="space-y-3">
                <button onClick={onClose} className="w-full py-2.5 bg-emerald-600 text-white font-semibold rounded-lg text-sm hover:bg-emerald-700 transition-colors flex justify-center items-center gap-2 shadow-sm">
                  <CheckCircle size={18} /> Approve Document
                </button>
                <button onClick={() => setMode('reject')} className="w-full py-2.5 bg-white border border-rose-200 text-rose-600 font-semibold rounded-lg text-sm hover:bg-rose-50 transition-colors flex justify-center items-center gap-2 shadow-sm">
                  <XCircle size={18} /> Reject Document
                </button>
              </div>
            )}

            {document.status === 'Pending' && mode === 'reject' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Reason for Rejection <span className="text-rose-500">*</span></label>
                  <textarea 
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    rows={4}
                    placeholder="E.g. Document is blurred..."
                    className="w-full p-3 border border-rose-300 bg-rose-50/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">This will be sent to the employee.</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setMode('view')} className="flex-1 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg text-sm hover:bg-gray-200 transition-colors">Cancel</button>
                  <button onClick={onClose} className="flex-1 py-2 bg-rose-600 text-white font-semibold rounded-lg text-sm hover:bg-rose-700 transition-colors shadow-sm">Confirm Reject</button>
                </div>
              </div>
            )}

            {document.status === 'Rejected' && (
              <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl">
                <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-2">Rejection Reason</h4>
                <p className="text-sm text-rose-800 leading-relaxed">{document.rejectionReason}</p>
                <p className="text-xs text-rose-600/70 mt-3 font-medium">Reviewed by {document.reviewerName}</p>
              </div>
            )}

            {document.status === 'Approved' && (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center">
                <CheckCircle size={32} className="text-emerald-500 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-emerald-900 mb-1">Document Approved</h4>
                <p className="text-xs text-emerald-700 font-medium">Reviewed by {document.reviewerName}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
