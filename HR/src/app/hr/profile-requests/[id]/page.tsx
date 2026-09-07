'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, CheckCircle2, XCircle, AlertCircle, 
  MessageSquare, UserPlus, Clock, FileText, Download,
  ExternalLink, ChevronRight, User
} from 'lucide-react';
import Link from 'next/link';
import { 
  mockProfileRequests, 
  mockAvailableReviewers,
  ProfileChangeRequest, 
  ProfileChangeStatus, 
  ProfileChangeRisk 
} from '@/data/hr/profile-requests';

export default function ProfileRequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [request, setRequest] = useState<ProfileChangeRequest | null>(null);
  const [modal, setModal] = useState<'assign' | 'clarify' | 'approve' | 'reject' | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Form states
  const [selectedReviewer, setSelectedReviewer] = useState('');
  const [clarificationMsg, setClarificationMsg] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [rejectRemarks, setRejectRemarks] = useState('');
  const [approveRemarks, setApproveRemarks] = useState('');
  const [checks, setChecks] = useState({ id: false, match: false, readable: false });

  useEffect(() => {
    if (params.id) {
      const req = mockProfileRequests.find(r => r.id === params.id);
      if (req) setRequest(req);
    }
  }, [params.id]);

  if (!request) return <div className="p-12 text-center text-gray-500">Loading request details...</div>;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getRiskColor = (risk: ProfileChangeRisk) => {
    switch(risk) {
      case 'High': return 'text-red-700 bg-red-100 border-red-200';
      case 'Medium': return 'text-amber-700 bg-amber-100 border-amber-200';
      case 'Low': return 'text-green-700 bg-green-100 border-green-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getStatusColor = (status: ProfileChangeStatus) => {
    switch(status) {
      case 'Pending': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Under Review': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Needs Clarification': return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'Approved': return 'text-green-700 bg-green-50 border-green-200';
      case 'Rejected': return 'text-red-700 bg-red-50 border-red-200';
      case 'Cancelled': return 'text-gray-700 bg-gray-50 border-gray-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const handleAssign = () => {
    setRequest({ ...request, reviewer: selectedReviewer, status: 'Under Review' });
    setModal(null);
    triggerToast(`Reviewer assigned: ${selectedReviewer}`);
  };

  const handleClarify = () => {
    setRequest({ 
      ...request, 
      status: 'Needs Clarification',
      clarifications: [
        ...request.clarifications,
        { id: Date.now().toString(), author: 'Current User', role: 'HR', date: new Date().toISOString(), message: clarificationMsg }
      ]
    });
    setModal(null);
    triggerToast('Clarification requested from employee.');
  };

  const handleApprove = () => {
    setRequest({ ...request, status: 'Approved', decision: { date: new Date().toISOString(), by: 'Current User', remarks: approveRemarks } });
    setModal(null);
    triggerToast('Profile change request approved.');
  };

  const handleReject = () => {
    setRequest({ ...request, status: 'Rejected', decision: { date: new Date().toISOString(), by: 'Current User', remarks: rejectRemarks, reason: rejectReason } });
    setModal(null);
    triggerToast('Profile change request rejected.');
  };

  const canApprove = request.riskLevel !== 'High' || (checks.id && checks.match && checks.readable);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 relative">
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl z-50 flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-3 text-green-400" />
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Link href="/hr/profile-requests" className="hover:text-indigo-600 transition-colors">Profile Requests</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{request.id}</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">Profile Change Request</h1>
            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">{request.id}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm mt-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Employee:</span>
              <span className="font-medium text-gray-900">{request.employeeName}</span>
              <span className="text-gray-400">({request.employeeId})</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full" />
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Type:</span>
              <span className="font-medium text-gray-900">{request.requestType}</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full" />
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Risk:</span>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getRiskColor(request.riskLevel)}`}>
                {request.riskLevel}
              </span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full" />
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Status:</span>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                {request.status}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {request.status !== 'Approved' && request.status !== 'Rejected' && request.status !== 'Cancelled' && (
            <>
              <button onClick={() => setModal('assign')} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors">
                Assign Reviewer
              </button>
              <button onClick={() => setModal('clarify')} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors">
                Request Clarification
              </button>
              <button onClick={() => setModal('reject')} className="px-4 py-2 bg-white border border-red-200 text-red-700 rounded-lg hover:bg-red-50 font-medium text-sm transition-colors">
                Reject
              </button>
              <button onClick={() => setModal('approve')} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm transition-colors shadow-sm">
                Approve
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          
          {/* Comparison Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50">
              <h2 className="font-semibold text-gray-900">Requested Changes</h2>
              {request.requestType === 'Bank Information' && (
                <p className="text-xs text-amber-600 mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Payroll-Sensitive Change: Approved bank information may affect future salary payments.
                </p>
              )}
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Current Information</h3>
                  <div className="space-y-4">
                    {request.fields.map((field, idx) => (
                      <div key={idx} className="pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                        <p className="text-xs text-gray-500 mb-1">{field.name}</p>
                        <p className={`text-sm ${field.changed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{field.oldValue}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-indigo-600 mb-4 uppercase tracking-wider flex items-center">
                    Requested Information
                  </h3>
                  <div className="space-y-4">
                    {request.fields.map((field, idx) => (
                      <div key={idx} className="pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-gray-500">{field.name}</p>
                          {field.changed && <span className="text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded font-medium">Changed</span>}
                        </div>
                        <p className={`text-sm ${field.changed ? 'text-indigo-900 font-medium bg-indigo-50/50 p-1 -ml-1 rounded' : 'text-gray-900'}`}>{field.newValue}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {request.reason && (
              <div className="p-5 border-t border-gray-100 bg-gray-50/50">
                <p className="text-xs text-gray-500 mb-1 font-medium">Employee Reason</p>
                <p className="text-sm text-gray-700 italic">"{request.reason}"</p>
              </div>
            )}
          </div>

          {/* Attachments Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <FileText className="w-4 h-4 mr-2 text-gray-500" />
                Supporting Documents
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {request.attachments.length > 0 ? (
                request.attachments.map(att => (
                  <div key={att.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{att.name}</p>
                        <p className="text-xs text-gray-500">{att.size} • {att.status}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-xs px-3 py-1.5 border border-gray-200 rounded hover:bg-gray-50 font-medium text-gray-700">Preview</button>
                      <button className="text-xs px-3 py-1.5 border border-gray-200 rounded hover:bg-gray-50 text-gray-700"><Download className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500 text-sm">No supporting documents were provided.</div>
              )}
            </div>
          </div>

          {/* Clarifications */}
          {request.clarifications.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2 text-gray-500" />
                  Clarification Thread
                </h3>
              </div>
              <div className="p-4 space-y-4">
                {request.clarifications.map(clar => (
                  <div key={clar.id} className={`flex gap-3 ${clar.role === 'HR' ? '' : 'flex-row-reverse'}`}>
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">
                      {clar.author.charAt(0)}
                    </div>
                    <div className={`flex flex-col ${clar.role === 'HR' ? 'items-start' : 'items-end'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-gray-900">{clar.author}</span>
                        <span className="text-[10px] text-gray-500">{new Date(clar.date).toLocaleDateString()} {new Date(clar.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                      <div className={`p-3 rounded-xl text-sm ${clar.role === 'HR' ? 'bg-gray-100 text-gray-800 rounded-tl-none' : 'bg-indigo-50 text-indigo-900 rounded-tr-none'}`}>
                        {clar.message}
                        {clar.attachment && (
                          <div className="mt-2 pt-2 border-t border-indigo-100 flex items-center gap-2 text-xs">
                            <FileText className="w-3 h-3" /> {clar.attachment.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          <Card>
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <User className="w-4 h-4 mr-2 text-gray-500" />
                Employee Context
              </h3>
            </div>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                  {request.employeeName.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{request.employeeName}</p>
                  <p className="text-xs text-gray-500">{request.employeeId}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm pt-2 border-t border-gray-100">
                <div className="flex justify-between"><span className="text-gray-500">Department</span><span className="font-medium text-gray-900">Engineering</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Location</span><span className="font-medium text-gray-900">Bengaluru HQ</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Manager</span><span className="font-medium text-gray-900">Vikram Sharma</span></div>
              </div>
              <Link href={`/hr/employees/${request.employeeId}`} className="flex items-center justify-center w-full py-2 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
                View Profile <ExternalLink className="w-3.5 h-3.5 ml-2" />
              </Link>
            </CardContent>
          </Card>

          <Card>
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                Review Timeline
              </h3>
            </div>
            <CardContent className="p-4">
              <div className="space-y-4">
                {request.timeline.map((event, idx) => (
                  <div key={event.id} className="relative pl-4 border-l-2 border-gray-200 last:border-l-transparent pb-4 last:pb-0">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 bg-gray-200 border-2 border-white rounded-full"></div>
                    <p className="text-sm font-medium text-gray-900 leading-none mb-1">{event.title}</p>
                    <p className="text-xs text-gray-500 mb-1">{event.actor}</p>
                    <p className="text-[10px] text-gray-400">{new Date(event.date).toLocaleDateString()} {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      {modal === 'assign' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-semibold text-gray-900">Assign Reviewer</h3>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600"><XCircle className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Reviewer</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  value={selectedReviewer}
                  onChange={(e) => setSelectedReviewer(e.target.value)}
                >
                  <option value="">-- Select --</option>
                  {mockAvailableReviewers.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end gap-2 bg-gray-50">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 bg-white rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleAssign} disabled={!selectedReviewer} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50">Assign</button>
            </div>
          </div>
        </div>
      )}

      {modal === 'clarify' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-semibold text-gray-900">Request Clarification</h3>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600"><XCircle className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message to Employee</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  rows={4}
                  placeholder="E.g., Please provide a clearer copy of your cancelled cheque..."
                  value={clarificationMsg}
                  onChange={(e) => setClarificationMsg(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end gap-2 bg-gray-50">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 bg-white rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleClarify} disabled={!clarificationMsg} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50">Send Request</button>
            </div>
          </div>
        </div>
      )}

      {modal === 'approve' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-semibold text-gray-900">Approve Profile Change</h3>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600"><XCircle className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-6">
              <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm border border-blue-100 flex gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <p>This will update the employee's profile records immediately. Ensure you have verified the supporting documentation.</p>
              </div>

              {request.riskLevel === 'High' && (
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-900 mb-2">High Risk Verification Checklist</p>
                  <label className="flex items-start gap-3">
                    <input type="checkbox" checked={checks.id} onChange={(e) => setChecks({...checks, id: e.target.checked})} className="mt-1" />
                    <span className="text-sm text-gray-700">Employee identity verified</span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input type="checkbox" checked={checks.match} onChange={(e) => setChecks({...checks, match: e.target.checked})} className="mt-1" />
                    <span className="text-sm text-gray-700">Requested value matches attachment</span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input type="checkbox" checked={checks.readable} onChange={(e) => setChecks({...checks, readable: e.target.checked})} className="mt-1" />
                    <span className="text-sm text-gray-700">Document readable and authentic</span>
                  </label>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">HR Remarks (Optional)</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  rows={2}
                  placeholder="Internal note about this approval..."
                  value={approveRemarks}
                  onChange={(e) => setApproveRemarks(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end gap-2 bg-gray-50">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 bg-white rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleApprove} disabled={!canApprove} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50">Approve Request</button>
            </div>
          </div>
        </div>
      )}

      {modal === 'reject' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-semibold text-gray-900">Reject Profile Change</h3>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600"><XCircle className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rejection Reason</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="Insufficient Documentation">Insufficient Documentation</option>
                  <option value="Information Does Not Match">Information Does Not Match</option>
                  <option value="Invalid Request">Invalid Request</option>
                  <option value="Duplicate Request">Duplicate Request</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks (Required)</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  rows={3}
                  placeholder="Explain why this request is rejected..."
                  value={rejectRemarks}
                  onChange={(e) => setRejectRemarks(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end gap-2 bg-gray-50">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 bg-white rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleReject} disabled={!rejectReason || !rejectRemarks} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50">Reject Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
