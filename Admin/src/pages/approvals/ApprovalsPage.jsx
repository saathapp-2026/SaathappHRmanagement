import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { CheckCircle2, XCircle, AlertTriangle, CalendarDays, Clock, FileCheck, HelpCircle, Check, X } from 'lucide-react';

export const ApprovalsPage = () => {
  const {
    leaveRequests,
    attendanceCorrections,
    documents,
    profileChangeRequests,
    approveLeaveRequest,
    rejectLeaveRequest,
    approveAttendanceCorrection,
    rejectAttendanceCorrection,
    verifyDocument,
    rejectDocument,
    approveProfileChangeRequest,
    rejectProfileChangeRequest
  } = useHR();

  const [activeCategory, setActiveCategory] = useState('all');
  const [rejectModalItem, setRejectModalItem] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const pendingLeaves = leaveRequests.filter(r => r.status === 'Pending').map(r => ({ ...r, reqCategory: 'Leave Request' }));
  const pendingCorrections = attendanceCorrections.filter(c => c.status === 'Pending').map(c => ({ ...c, reqCategory: 'Attendance Correction' }));
  const pendingDocs = documents.filter(d => d.status === 'Pending Verification').map(d => ({ ...d, reqCategory: 'Document Verification' }));
  const pendingProfileChanges = (profileChangeRequests || []).filter(p => p.status === 'Pending').map(p => ({ ...p, reqCategory: 'Profile Change Request' }));

  const allPendingItems = [...pendingLeaves, ...pendingCorrections, ...pendingDocs, ...pendingProfileChanges];

  const filteredItems = allPendingItems.filter(item => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'leave') return item.reqCategory === 'Leave Request';
    if (activeCategory === 'attendance') return item.reqCategory === 'Attendance Correction';
    if (activeCategory === 'documents') return item.reqCategory === 'Document Verification';
    if (activeCategory === 'profile') return item.reqCategory === 'Profile Change Request';
    return true;
  });

  const handleApprove = (item) => {
    if (item.reqCategory === 'Leave Request') approveLeaveRequest(item.id);
    else if (item.reqCategory === 'Attendance Correction') approveAttendanceCorrection(item.id, 'Approved via Central Approval Center');
    else if (item.reqCategory === 'Document Verification') verifyDocument(item.id, 'Verified via Central Approval Center');
    else if (item.reqCategory === 'Profile Change Request') approveProfileChangeRequest(item.id);
  };

  const handleConfirmReject = () => {
    if (!rejectReason.trim() || !rejectModalItem) return;

    if (rejectModalItem.reqCategory === 'Leave Request') {
      rejectLeaveRequest(rejectModalItem.id, rejectReason);
    } else if (rejectModalItem.reqCategory === 'Attendance Correction') {
      rejectAttendanceCorrection(rejectModalItem.id, rejectReason);
    } else if (rejectModalItem.reqCategory === 'Document Verification') {
      rejectDocument(rejectModalItem.id, rejectReason);
    } else if (rejectModalItem.reqCategory === 'Profile Change Request') {
      rejectProfileChangeRequest(rejectModalItem.id, rejectReason);
    }

    setRejectModalItem(null);
    setRejectReason('');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Central Approval Center ({allPendingItems.length})
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Single pane for reviewing leave applications, attendance corrections, and document verification requests.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex border-b border-slate-200 overflow-x-auto">
        <button
          onClick={() => setActiveCategory('all')}
          className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
            activeCategory === 'all' ? 'border-saath-600 text-saath-600 bg-saath-50/50' : 'border-transparent text-slate-500'
          }`}
        >
          All Pending Requests ({allPendingItems.length})
        </button>
        <button
          onClick={() => setActiveCategory('leave')}
          className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
            activeCategory === 'leave' ? 'border-saath-600 text-saath-600 bg-saath-50/50' : 'border-transparent text-slate-500'
          }`}
        >
          Leave Requests ({pendingLeaves.length})
        </button>
        <button
          onClick={() => setActiveCategory('attendance')}
          className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
            activeCategory === 'attendance' ? 'border-saath-600 text-saath-600 bg-saath-50/50' : 'border-transparent text-slate-500'
          }`}
        >
          Attendance Corrections ({pendingCorrections.length})
        </button>
        <button
          onClick={() => setActiveCategory('documents')}
          className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
            activeCategory === 'documents' ? 'border-saath-600 text-saath-600 bg-saath-50/50' : 'border-transparent text-slate-500'
          }`}
        >
          Document Verifications ({pendingDocs.length})
        </button>
        <button
          onClick={() => setActiveCategory('profile')}
          className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
            activeCategory === 'profile' ? 'border-saath-600 text-saath-600 bg-saath-50/50' : 'border-transparent text-slate-500'
          }`}
        >
          Profile Change Requests ({pendingProfileChanges.length})
        </button>
      </div>

      {/* Requests List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-slate-200/80 shadow-sm text-slate-400 text-xs font-medium">
            No pending requests in this category.
          </div>
        ) : (
          filteredItems.map(item => (
            <div key={item.id} className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full font-extrabold text-[10px] ${
                    item.reqCategory === 'Leave Request' ? 'bg-purple-100 text-purple-800' :
                    item.reqCategory === 'Attendance Correction' ? 'bg-amber-100 text-amber-800' :
                    item.reqCategory === 'Document Verification' ? 'bg-teal-100 text-teal-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.reqCategory}
                  </span>
                  <span className="font-mono text-xs font-bold text-saath-700">{item.id}</span>
                  <span className="text-xs text-slate-400">• Submitted {item.submissionDate || item.uploadDate}</span>
                </div>

                <div className="font-extrabold text-sm text-slate-900">
                  {item.employeeName} <span className="font-medium text-xs text-slate-500">({item.departmentName || item.employeeId})</span>
                </div>

                {item.reqCategory === 'Leave Request' && (
                  <p className="text-xs text-slate-600">
                    <strong>{item.leaveTypeName}:</strong> {item.startDate} to {item.endDate} ({item.daysCount} days) — "{item.reason}"
                  </p>
                )}

                {item.reqCategory === 'Attendance Correction' && (
                  <p className="text-xs text-slate-600">
                    <strong>Requested Check-in:</strong> {item.requestedCheckIn} on {item.date} — "{item.reason}"
                  </p>
                )}

                {item.reqCategory === 'Document Verification' && (
                  <p className="text-xs text-slate-600">
                    <strong>{item.documentType}:</strong> {item.fileName} — "{item.note}"
                  </p>
                )}

                {item.reqCategory === 'Profile Change Request' && (
                  <p className="text-xs text-slate-600">
                    <strong>Requested {item.fieldName} Update:</strong> <span className="text-slate-400">{item.oldValue}</span> → <strong className="text-saath-700">{item.requestedValue}</strong> — "{item.reason}"
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setRejectModalItem(item)}
                  className="px-3.5 py-2 rounded-xl border border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100 text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <X className="h-4 w-4" /> Reject
                </button>
                <button
                  onClick={() => handleApprove(item)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold shadow-md shadow-emerald-600/30 transition-all flex items-center gap-1"
                >
                  <Check className="h-4 w-4" /> Approve Request
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reject Modal */}
      {rejectModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-extrabold text-slate-900">Reject Request ({rejectModalItem.id})</h3>
            <p className="text-xs text-slate-500 mt-1">Provide a mandatory reason for rejecting this request.</p>

            <div className="mt-4">
              <label className="block text-xs font-bold text-slate-700 mb-1">Rejection Reason *</label>
              <textarea
                rows={3}
                required
                placeholder="Specify rejection reason for audit log & employee notification..."
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                className="w-full rounded-xl border p-2.5 text-xs font-medium focus:border-saath-500"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setRejectModalItem(null)} className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-600">Cancel</button>
              <button onClick={handleConfirmReject} disabled={!rejectReason.trim()} className="px-4 py-2 rounded-xl bg-rose-600 text-xs font-bold text-white disabled:opacity-50">
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
