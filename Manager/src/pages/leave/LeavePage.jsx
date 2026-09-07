import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import {
  CalendarDays,
  Plus,
  Filter,
  Edit3,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Clock,
  FileText,
  AlertCircle,
  Send,
  Eye,
  Check,
  X,
  HelpCircle,
  Phone,
  ArrowRight,
  TrendingUp,
  Ban
} from 'lucide-react';

export const LeavePage = () => {
  const {
    leaveTypes,
    leaveBalances,
    leaveRequests,
    employees,
    currentUser,
    submitLeaveRequest,
    cancelLeaveRequest,
    approveLeaveRequest,
    rejectLeaveRequest,
    adjustLeaveBalance
  } = useHR();

  // Primary Tabs (Balances vs History)
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, history, adjust

  // Section 13 History Sub-Tabs (ALL 7 REQUIRED TABS)
  const [historyTab, setHistoryTab] = useState('All'); // All, Pending, Approved, Rejected, Cancelled, Upcoming, Completed

  // Filter State
  const [selectedEmpFilter, setSelectedEmpFilter] = useState('All');

  // Modals State
  const [isApplyModal, setIsApplyModal] = useState(false);
  const [isPreSubmitSummaryModal, setIsPreSubmitSummaryModal] = useState(false);
  const [cancelModalReq, setCancelModalReq] = useState(null);
  const [cancelReasonText, setCancelReasonText] = useState('');
  const [viewReqModal, setViewReqModal] = useState(null);

  // Admin Adjustment Modal State
  const [adjustModalEmp, setAdjustModalEmp] = useState(null);
  const [adjustTypeKey, setAdjustTypeKey] = useState('casualAllocated');
  const [adjustNewVal, setAdjustNewVal] = useState(12);
  const [adjustReason, setAdjustReason] = useState('');

  // Apply Form State
  const [applyForm, setApplyForm] = useState({
    employeeId: currentUser?.employeeId || employees[0]?.id || 'EMP-2026-001',
    leaveTypeId: leaveTypes[0]?.id || 'LT-001',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    isHalfDay: false,
    halfDaySession: 'First Half (09:00 AM - 01:30 PM)',
    reason: '',
    attachmentUrl: '',
    emergencyContact: ''
  });

  const [validationError, setValidationError] = useState('');
  const [calcSummary, setCalcSummary] = useState(null);

  // Selected Employee object
  const currentEmpObj = employees.find(e => e.id === applyForm.employeeId) || employees[0];
  const currentEmpBalance = leaveBalances.find(b => b.employeeId === applyForm.employeeId) || {
    casualAllocated: 12, casualUsed: 0, sickAllocated: 12, sickUsed: 0, earnedAllocated: 15, earnedUsed: 0, emergencyAllocated: 5, emergencyUsed: 0, unpaidUsed: 0
  };

  // Section 11 Metrics Calculations for current employee or company-wide
  const relevantLeaveRequests = leaveRequests.filter(r => {
    if (selectedEmpFilter === 'All') return true;
    return r.employeeId === selectedEmpFilter;
  });

  const totalAllocatedCount = currentEmpBalance.casualAllocated + currentEmpBalance.sickAllocated + currentEmpBalance.earnedAllocated + currentEmpBalance.emergencyAllocated;
  const totalUsedCount = currentEmpBalance.casualUsed + currentEmpBalance.sickUsed + currentEmpBalance.earnedUsed + currentEmpBalance.emergencyUsed;
  const totalRemainingCount = totalAllocatedCount - totalUsedCount;

  const pendingCount = relevantLeaveRequests.filter(r => r.status === 'Pending').length;
  const approvedCount = relevantLeaveRequests.filter(r => r.status === 'Approved').length;
  const rejectedCount = relevantLeaveRequests.filter(r => r.status === 'Rejected').length;
  const upcomingCount = relevantLeaveRequests.filter(r => r.status === 'Approved' && r.startDate > new Date().toISOString().split('T')[0]).length;

  const summaryCards = [
    { title: 'Total Allocated', count: `${totalAllocatedCount} Days`, color: 'bg-saath-50 text-saath-800 border-saath-200' },
    { title: 'Used Leave', count: `${totalUsedCount} Days`, color: 'bg-amber-50 text-amber-800 border-amber-200' },
    { title: 'Remaining Balance', count: `${totalRemainingCount} Days`, color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    { title: 'Pending Approval', count: pendingCount, color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
    { title: 'Approved', count: approvedCount, color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    { title: 'Rejected', count: rejectedCount, color: 'bg-rose-50 text-rose-800 border-rose-200' },
    { title: 'Upcoming Scheduled', count: upcomingCount, color: 'bg-purple-50 text-purple-800 border-purple-200' }
  ];

  // Section 13 Filtered History Requests
  const todayStr = new Date().toISOString().split('T')[0];
  const filteredRequestsByTab = relevantLeaveRequests.filter(req => {
    if (historyTab === 'All') return true;
    if (historyTab === 'Pending') return req.status === 'Pending';
    if (historyTab === 'Approved') return req.status === 'Approved';
    if (historyTab === 'Rejected') return req.status === 'Rejected';
    if (historyTab === 'Cancelled') return req.status === 'Cancelled';
    if (historyTab === 'Upcoming') return req.status === 'Approved' && req.startDate > todayStr;
    if (historyTab === 'Completed') return req.status === 'Approved' && req.endDate < todayStr;
    return true;
  });

  // Pre-Submission Validation Logic
  const handleProceedToSummary = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!applyForm.reason.trim()) {
      setValidationError('Please specify a valid reason for your leave request.');
      return;
    }

    if (applyForm.startDate > applyForm.endDate) {
      setValidationError('Start Date cannot be after End Date.');
      return;
    }

    // Check for Overlapping Dates / Duplicate Requests
    const hasOverlap = leaveRequests.some(r => {
      if (r.employeeId === applyForm.employeeId && (r.status === 'Pending' || r.status === 'Approved')) {
        return (applyForm.startDate <= r.endDate && applyForm.endDate >= r.startDate);
      }
      return false;
    });

    if (hasOverlap) {
      setValidationError('An active or approved leave request already exists for these overlapping dates.');
      return;
    }

    // Calculate requested duration
    const start = new Date(applyForm.startDate);
    const end = new Date(applyForm.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const requestedDays = applyForm.isHalfDay ? 0.5 : diffDays;

    // Remaining Balance Check
    const leaveTypeObj = leaveTypes.find(t => t.id === applyForm.leaveTypeId) || leaveTypes[0];
    let availableBal = 12;
    if (leaveTypeObj.name.includes('Casual')) availableBal = currentEmpBalance.casualAllocated - currentEmpBalance.casualUsed;
    if (leaveTypeObj.name.includes('Sick')) availableBal = currentEmpBalance.sickAllocated - currentEmpBalance.sickUsed;
    if (leaveTypeObj.name.includes('Earned')) availableBal = currentEmpBalance.earnedAllocated - currentEmpBalance.earnedUsed;
    if (leaveTypeObj.name.includes('Emergency')) availableBal = currentEmpBalance.emergencyAllocated - currentEmpBalance.emergencyUsed;

    if (requestedDays > availableBal && !leaveTypeObj.name.includes('Unpaid')) {
      setValidationError(`Insufficient leave balance! You requested ${requestedDays} day(s), but only ${availableBal} day(s) remain for ${leaveTypeObj.name}.`);
      return;
    }

    // Attachment check if required
    if (leaveTypeObj.requiresAttachment && requestedDays > 2 && !applyForm.attachmentUrl.trim()) {
      setValidationError(`${leaveTypeObj.name} exceeding 2 consecutive days requires a supporting medical/document attachment.`);
      return;
    }

    // Set calculation summary for pre-submission confirmation modal
    setCalcSummary({
      leaveTypeName: leaveTypeObj.name,
      requestedDays,
      currentBalance: availableBal,
      balanceAfterApproval: Math.max(0, availableBal - requestedDays),
      approvalHierarchy: `${currentEmpObj.reportingManagerName || 'Reporting Manager'} → HR Director`
    });

    setIsApplyModal(false);
    setIsPreSubmitSummaryModal(true);
  };

  const handleConfirmFinalSubmit = () => {
    const leaveTypeObj = leaveTypes.find(t => t.id === applyForm.leaveTypeId) || leaveTypes[0];

    submitLeaveRequest({
      employeeId: applyForm.employeeId,
      employeeName: currentEmpObj.fullName,
      departmentName: currentEmpObj.departmentName,
      leaveTypeId: applyForm.leaveTypeId,
      leaveTypeName: leaveTypeObj.name,
      startDate: applyForm.startDate,
      endDate: applyForm.endDate,
      isHalfDay: applyForm.isHalfDay,
      halfDaySession: applyForm.isHalfDay ? applyForm.halfDaySession : 'Full Day',
      daysCount: calcSummary.requestedDays,
      reason: applyForm.reason,
      attachmentUrl: applyForm.attachmentUrl,
      emergencyContact: applyForm.emergencyContact || currentEmpObj.mobileNumber
    });

    setIsPreSubmitSummaryModal(false);
    setActiveTab('history');
    setHistoryTab('Pending');
  };

  const handleConfirmCancelReq = () => {
    if (!cancelModalReq) return;
    cancelLeaveRequest(cancelModalReq.id, cancelReasonText || 'Cancelled by employee');
    setCancelModalReq(null);
    setCancelReasonText('');
  };

  const handleConfirmAdjustment = () => {
    if (!adjustReason.trim() || !adjustModalEmp) return;
    adjustLeaveBalance(adjustModalEmp.employeeId, adjustTypeKey, adjustNewVal, adjustReason);
    setAdjustModalEmp(null);
    setAdjustReason('');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header & Primary Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            Employee Leave Portal
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Monitor annual allocations, submit new leave applications, and track request status progression.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setValidationError('');
              setIsApplyModal(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-saath-600 hover:bg-saath-700 text-white font-bold text-xs shadow-lg shadow-saath-600/30 transition-all flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Apply for Leave
          </button>
        </div>
      </div>

      {/* SECTION 11: LEAVE SUMMARY CARDS (ALL 7 METRIC CARDS REQUIRED IN SECTION 11) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {summaryCards.map((card, idx) => (
          <div key={idx} className={`p-3 rounded-2xl border bg-white shadow-sm ${card.color}`}>
            <div className="text-lg font-black text-slate-900 tracking-tight">{card.count}</div>
            <div className="text-[11px] font-bold text-slate-600 mt-0.5 truncate">{card.title}</div>
          </div>
        ))}
      </div>

      {/* SECTION 11: LEAVE BALANCES FORMAT (Allocated → Used → Remaining) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-slate-900 flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-saath-600" /> Current Leave Balances (Allocated → Used → Remaining)
          </h3>
          <span className="text-[11px] font-semibold text-slate-400">Employee: {currentEmpObj.fullName} ({currentEmpObj.id})</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs">
          {/* Casual Leave */}
          <div className="p-3.5 rounded-2xl bg-saath-50/70 border border-saath-200">
            <span className="font-extrabold text-saath-900 text-xs">Casual Leave (CL)</span>
            <div className="text-[11px] text-slate-600 mt-1 font-medium">
              Allocated: <strong>{currentEmpBalance.casualAllocated}</strong> • Used: <strong>{currentEmpBalance.casualUsed}</strong>
            </div>
            <p className="text-base font-black text-slate-900 mt-1.5">
              {currentEmpBalance.casualAllocated - currentEmpBalance.casualUsed} <span className="text-xs text-slate-400 font-normal">days remaining</span>
            </p>
          </div>

          {/* Sick Leave */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <span className="font-extrabold text-emerald-900 text-xs">Sick Leave (SL)</span>
            <div className="text-[11px] text-slate-600 mt-1 font-medium">
              Allocated: <strong>{currentEmpBalance.sickAllocated}</strong> • Used: <strong>{currentEmpBalance.sickUsed}</strong>
            </div>
            <p className="text-base font-black text-slate-900 mt-1.5">
              {currentEmpBalance.sickAllocated - currentEmpBalance.sickUsed} <span className="text-xs text-slate-400 font-normal">days remaining</span>
            </p>
          </div>

          {/* Earned Leave */}
          <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200">
            <span className="font-extrabold text-purple-900 text-xs">Earned Leave (EL)</span>
            <div className="text-[11px] text-slate-600 mt-1 font-medium">
              Allocated: <strong>{currentEmpBalance.earnedAllocated}</strong> • Used: <strong>{currentEmpBalance.earnedUsed}</strong>
            </div>
            <p className="text-base font-black text-slate-900 mt-1.5">
              {currentEmpBalance.earnedAllocated - currentEmpBalance.earnedUsed} <span className="text-xs text-slate-400 font-normal">days remaining</span>
            </p>
          </div>

          {/* Emergency Leave */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
            <span className="font-extrabold text-amber-900 text-xs">Emergency Leave</span>
            <div className="text-[11px] text-slate-600 mt-1 font-medium">
              Allocated: <strong>{currentEmpBalance.emergencyAllocated}</strong> • Used: <strong>{currentEmpBalance.emergencyUsed}</strong>
            </div>
            <p className="text-base font-black text-slate-900 mt-1.5">
              {currentEmpBalance.emergencyAllocated - currentEmpBalance.emergencyUsed} <span className="text-xs text-slate-400 font-normal">days remaining</span>
            </p>
          </div>

          {/* Unpaid Leave */}
          <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200">
            <span className="font-extrabold text-slate-800 text-xs">Unpaid Leave (LWP)</span>
            <div className="text-[11px] text-slate-600 mt-1 font-medium">
              Policy Applicable
            </div>
            <p className="text-base font-black text-slate-900 mt-1.5">
              {currentEmpBalance.unpaidUsed} <span className="text-xs text-slate-400 font-normal">days used</span>
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 13: LEAVE HISTORY & STATUS TABS (ALL 7 TABS REQUIRED IN SECTION 13) */}
      <div className="space-y-4">
        <div className="flex border-b border-slate-200 overflow-x-auto">
          {['All', 'Pending', 'Approved', 'Rejected', 'Cancelled', 'Upcoming', 'Completed'].map(tabName => (
            <button
              key={tabName}
              onClick={() => { setActiveTab('history'); setHistoryTab(tabName); }}
              className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
                historyTab === tabName && activeTab === 'history'
                  ? 'border-saath-600 text-saath-600 bg-saath-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tabName} Requests
            </button>
          ))}
        </div>

        {/* Requests List Cards / Rows */}
        <div className="space-y-3">
          {filteredRequestsByTab.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-slate-200/80 shadow-sm text-slate-400 text-xs font-medium">
              No leave requests in the "{historyTab}" tab.
            </div>
          ) : (
            filteredRequestsByTab.map(req => (
              <div key={req.id} className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-saath-700 font-bold text-xs">{req.id}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-saath-100 text-saath-800 font-extrabold text-[10px]">
                      {req.leaveTypeName}
                    </span>
                    <span className="text-xs text-slate-400">• Submitted {req.submissionDate}</span>
                  </div>

                  <div className="font-extrabold text-sm text-slate-900">
                    {req.employeeName} <span className="font-medium text-xs text-slate-500">({req.departmentName})</span>
                  </div>

                  <p className="text-xs text-slate-700 font-medium">
                    <strong>Period:</strong> {req.startDate} to {req.endDate} ({req.daysCount} day(s) • {req.isHalfDay ? req.halfDaySession : 'Full Day'})
                  </p>

                  <p className="text-xs text-slate-600">
                    <strong>Reason:</strong> "{req.reason}"
                  </p>

                  {req.reviewerName && (
                    <p className="text-[11px] text-slate-500 font-semibold pt-1">
                      Approver: <strong>{req.reviewerName}</strong> on {req.reviewDate}
                    </p>
                  )}

                  {req.rejectionReason && (
                    <p className="text-xs text-rose-700 font-bold bg-rose-50 p-2 rounded-xl border border-rose-200 mt-1">
                      Rejection Reason: "{req.rejectionReason}"
                    </p>
                  )}

                  {req.attachmentUrl && (
                    <a href={req.attachmentUrl} target="_blank" rel="noreferrer" className="text-xs text-saath-600 font-bold underline inline-flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5" /> View Attached Proof Document
                    </a>
                  )}
                </div>

                {/* Status & Actions */}
                <div className="flex flex-col sm:items-end gap-2 shrink-0">
                  <span className={`px-3 py-1 rounded-full font-extrabold text-xs border ${
                    req.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                    req.status === 'Rejected' ? 'bg-rose-100 text-rose-800 border-rose-200' :
                    req.status === 'Cancelled' ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-amber-100 text-amber-800 border-amber-200'
                  }`}>
                    {req.status === 'Pending' ? 'Submitted (Pending Approval)' : req.status}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setViewReqModal(req)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-xs text-slate-700 transition-colors flex items-center gap-1"
                    >
                      <Eye className="h-3.5 w-3.5" /> View Details
                    </button>

                    {req.status === 'Pending' && (
                      <button
                        onClick={() => setCancelModalReq(req)}
                        className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs transition-colors"
                      >
                        Cancel Request
                      </button>
                    )}

                    {req.status === 'Rejected' && (
                      <button
                        onClick={() => {
                          setApplyForm({
                            employeeId: req.employeeId,
                            leaveTypeId: req.leaveTypeId,
                            startDate: req.startDate,
                            endDate: req.endDate,
                            isHalfDay: req.isHalfDay,
                            halfDaySession: req.halfDaySession || 'First Half',
                            reason: req.reason,
                            attachmentUrl: req.attachmentUrl || '',
                            emergencyContact: ''
                          });
                          setIsApplyModal(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-saath-600 text-white font-bold text-xs"
                      >
                        Reapply Request
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL 1: SECTION 12 — APPLY FOR LEAVE FORM */}
      {isApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 my-8">
            <h3 className="text-lg font-extrabold text-slate-900">Apply for Leave</h3>
            <p className="text-xs text-slate-500 mt-0.5">Submit new leave request for manager review and balance deduction.</p>

            {validationError && (
              <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                {validationError}
              </div>
            )}

            <form onSubmit={handleProceedToSummary} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Leave Type *</label>
                <select
                  value={applyForm.leaveTypeId}
                  onChange={e => setApplyForm({ ...applyForm, leaveTypeId: e.target.value })}
                  className="w-full rounded-xl border p-2.5 bg-white font-medium focus:border-saath-500"
                >
                  {leaveTypes.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.code})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={applyForm.startDate}
                    onChange={e => setApplyForm({ ...applyForm, startDate: e.target.value })}
                    className="w-full rounded-xl border p-2.5 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">End Date *</label>
                  <input
                    type="date"
                    required
                    value={applyForm.endDate}
                    onChange={e => setApplyForm({ ...applyForm, endDate: e.target.value })}
                    className="w-full rounded-xl border p-2.5 font-medium"
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="block font-bold text-slate-700">Duration Option</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="halfDay"
                      checked={!applyForm.isHalfDay}
                      onChange={() => setApplyForm({ ...applyForm, isHalfDay: false })}
                      className="h-4 w-4 text-saath-600"
                    />
                    Full Day
                  </label>
                  <label className="flex items-center gap-1.5 font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="halfDay"
                      checked={applyForm.isHalfDay}
                      onChange={() => setApplyForm({ ...applyForm, isHalfDay: true })}
                      className="h-4 w-4 text-saath-600"
                    />
                    Half Day (0.5 Day)
                  </label>
                </div>

                {applyForm.isHalfDay && (
                  <div className="pt-2">
                    <label className="block font-bold text-slate-700 mb-1">Half Day Session</label>
                    <select
                      value={applyForm.halfDaySession}
                      onChange={e => setApplyForm({ ...applyForm, halfDaySession: e.target.value })}
                      className="w-full rounded-xl border p-2 bg-white font-medium"
                    >
                      <option value="First Half (09:00 AM - 01:30 PM)">First Half (09:00 AM - 01:30 PM)</option>
                      <option value="Second Half (01:30 PM - 06:00 PM)">Second Half (01:30 PM - 06:00 PM)</option>
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Reason for Leave *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detailed reason for leave request..."
                  value={applyForm.reason}
                  onChange={e => setApplyForm({ ...applyForm, reason: e.target.value })}
                  className="w-full rounded-xl border p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Supporting Document URL / Proof (If Required)</label>
                <input
                  type="text"
                  placeholder="https://example.com/docs/medical_certificate.pdf"
                  value={applyForm.attachmentUrl}
                  onChange={e => setApplyForm({ ...applyForm, attachmentUrl: e.target.value })}
                  className="w-full rounded-xl border p-2.5 font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsApplyModal(false)}
                  className="px-4 py-2 rounded-xl border font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-saath-600 text-white font-bold shadow-md shadow-saath-600/30 flex items-center gap-1.5"
                >
                  Review Summary <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: SECTION 12 — PRE-SUBMISSION SUMMARY CONFIRMATION MODAL */}
      {isPreSubmitSummaryModal && calcSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 text-xs space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" /> Pre-Submission Summary Review
            </h3>
            <p className="text-slate-500">Verify your leave request details and balance impact before final submission.</p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div><strong className="text-slate-500">Leave Type:</strong> <span className="font-extrabold text-slate-900">{calcSummary.leaveTypeName}</span></div>
              <div><strong className="text-slate-500">Selected Dates:</strong> <span className="font-bold text-slate-800">{applyForm.startDate} to {applyForm.endDate}</span></div>
              <div><strong className="text-slate-500">Duration:</strong> <span className="font-extrabold text-saath-700">{calcSummary.requestedDays} Day(s)</span></div>
              <div><strong className="text-slate-500">Current Balance:</strong> <span className="font-bold text-slate-800">{calcSummary.currentBalance} Days</span></div>
              <div><strong className="text-slate-500">Balance After Approval:</strong> <span className="font-extrabold text-emerald-700">{calcSummary.balanceAfterApproval} Days remaining</span></div>
              <div><strong className="text-slate-500">Approval Hierarchy Path:</strong> <span className="font-bold text-slate-800">{calcSummary.approvalHierarchy}</span></div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                onClick={() => { setIsPreSubmitSummaryModal(false); setIsApplyModal(true); }}
                className="px-4 py-2 rounded-xl border font-bold text-slate-600"
              >
                Back to Form
              </button>
              <button
                onClick={handleConfirmFinalSubmit}
                className="px-5 py-2 rounded-xl bg-saath-600 text-white font-bold shadow-lg shadow-saath-600/30"
              >
                Submit Leave Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: CANCEL LEAVE REQUEST CONFIRMATION */}
      {cancelModalReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 text-xs">
            <h3 className="text-base font-extrabold text-slate-900">Cancel Leave Request ({cancelModalReq.id})</h3>
            <p className="text-slate-500 mt-1">Are you sure you want to cancel this pending request for {cancelModalReq.leaveTypeName}?</p>

            <div className="mt-4">
              <label className="block font-bold text-slate-700 mb-1">Mandatory Cancellation Reason</label>
              <textarea
                rows={2}
                placeholder="Specify reason for cancelling request..."
                value={cancelReasonText}
                onChange={e => setCancelReasonText(e.target.value)}
                className="w-full rounded-xl border p-2.5 font-medium"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
              <button onClick={() => setCancelModalReq(null)} className="px-4 py-2 rounded-xl border font-bold text-slate-600">No, Keep Request</button>
              <button onClick={handleConfirmCancelReq} className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold">Confirm Cancellation</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: VIEW DETAILS */}
      {viewReqModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 text-xs space-y-3">
            <h3 className="text-base font-extrabold text-slate-900 border-b pb-2">Leave Request Details</h3>
            <div><strong className="text-slate-500">Request ID:</strong> <span className="font-mono font-bold text-saath-700">{viewReqModal.id}</span></div>
            <div><strong className="text-slate-500">Employee:</strong> <span className="font-bold text-slate-900">{viewReqModal.employeeName} ({viewReqModal.departmentName})</span></div>
            <div><strong className="text-slate-500">Leave Type:</strong> <span className="font-bold text-slate-900">{viewReqModal.leaveTypeName}</span></div>
            <div><strong className="text-slate-500">Dates:</strong> <span className="font-bold text-slate-900">{viewReqModal.startDate} to {viewReqModal.endDate}</span></div>
            <div><strong className="text-slate-500">Duration:</strong> <span className="font-bold text-slate-900">{viewReqModal.daysCount} Day(s) ({viewReqModal.isHalfDay ? viewReqModal.halfDaySession : 'Full Day'})</span></div>
            <div><strong className="text-slate-500">Reason:</strong> <p className="text-slate-800 mt-1">{viewReqModal.reason}</p></div>
            <div><strong className="text-slate-500">Current Status:</strong> <span className="font-extrabold text-saath-700">{viewReqModal.status}</span></div>
            {viewReqModal.reviewerName && <div><strong className="text-slate-500">Approver:</strong> <span className="font-bold text-slate-900">{viewReqModal.reviewerName} on {viewReqModal.reviewDate}</span></div>}
            <div className="flex justify-end pt-3">
              <button onClick={() => setViewReqModal(null)} className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
