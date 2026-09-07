import React, { useState } from 'react';
import { X, CheckCircle, XCircle, FileText, ArrowRight } from 'lucide-react';
import { ProfileRequest } from '@/data/hr/profileRequests';

export function ProfileRequestModal({ isOpen, onClose, req }: { isOpen: boolean, onClose: () => void, req: ProfileRequest | null }) {
  const [rejectReason, setRejectReason] = useState('');
  const [mode, setMode] = useState<'view' | 'reject'>('view');

  if (!isOpen || !req) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50/50">
          <div>
            <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">{req.id}</span>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">Profile Update Request</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors"><X size={20}/></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-sm text-gray-500 uppercase tracking-wider font-bold text-[10px]">Employee</p>
              <p className="font-bold text-gray-900">{req.employeeName} ({req.employeeId})</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-sm text-gray-500 uppercase tracking-wider font-bold text-[10px]">Category</p>
              <p className="font-medium text-indigo-700">{req.category}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Requested Changes</h3>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden divide-y divide-gray-100">
              {req.changes.map((change, idx) => (
                <div key={idx} className="p-4 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div className="md:col-span-1">
                    <span className="text-xs font-bold text-gray-700">{change.field}</span>
                  </div>
                  <div className="md:col-span-2 bg-rose-50/50 p-2 rounded border border-rose-100">
                    <span className="text-[10px] font-bold text-rose-500 uppercase block mb-1">Current Value</span>
                    <span className="text-sm text-rose-900 line-through opacity-70">{change.oldValue}</span>
                  </div>
                  <div className="md:col-span-2 bg-emerald-50/50 p-2 rounded border border-emerald-100 relative">
                    <div className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 text-gray-300">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase block mb-1">New Value</span>
                    <span className="text-sm text-emerald-900 font-medium">{change.newValue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {req.evidenceName && (
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Supporting Evidence</h3>
              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                <FileText size={24} className="text-indigo-400" />
                <div>
                  <p className="text-sm font-semibold text-indigo-700">{req.evidenceName}</p>
                  <p className="text-xs text-gray-500">Click to view document</p>
                </div>
              </div>
            </div>
          )}

          {req.status === 'Rejected' && (
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl">
              <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-2">Rejection Reason</h4>
              <p className="text-sm text-rose-800 leading-relaxed">{req.rejectionReason}</p>
            </div>
          )}
        </div>

        {req.status === 'Pending' && (
          <div className="p-5 border-t border-gray-100 bg-gray-50 flex-shrink-0">
            {mode === 'view' ? (
              <div className="flex justify-end gap-3">
                <button onClick={() => setMode('reject')} className="px-4 py-2 bg-white border border-rose-200 text-rose-600 font-semibold rounded-lg text-sm hover:bg-rose-50 transition-colors shadow-sm flex items-center gap-2">
                  <XCircle size={16} /> Reject
                </button>
                <button onClick={onClose} className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg text-sm hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-2">
                  <CheckCircle size={16} /> Approve & Update Profile
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Reason for Rejection <span className="text-rose-500">*</span></label>
                  <textarea 
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    rows={3}
                    placeholder="Explain why this profile update was rejected..."
                    className="w-full p-3 border border-rose-300 bg-rose-50/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  ></textarea>
                </div>
                <div className="flex justify-end gap-2">
                  <button onClick={() => setMode('view')} className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg text-sm hover:bg-gray-200 transition-colors">Cancel</button>
                  <button onClick={onClose} className="px-4 py-2 bg-rose-600 text-white font-semibold rounded-lg text-sm hover:bg-rose-700 transition-colors shadow-sm">Confirm Reject</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
