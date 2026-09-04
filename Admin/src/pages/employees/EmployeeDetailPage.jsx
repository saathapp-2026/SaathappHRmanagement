import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHR } from '../../context/HRContext';
import {
  ArrowLeft,
  User,
  Briefcase,
  Clock,
  CalendarDays,
  HelpCircle,
  FileText,
  History,
  Shield,
  Lock,
  Eye,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Check,
  X,
  ShieldAlert,
  Calendar,
  Building2,
  Award,
  FileCheck,
  TrendingUp,
  Upload
} from 'lucide-react';

export const EmployeeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    employees,
    dailyAttendance,
    attendanceCorrections,
    leaveBalances,
    leaveRequests,
    concerns,
    documents,
    auditLogs,
    departments,
    designations,
    profileChangeRequests,
    currentUser,
    updateEmployeeRestrictedFields,
    approveProfileChangeRequest,
    rejectProfileChangeRequest,
    verifyDocument,
    rejectDocument,
    uploadDocument
  } = useHR();

  const [activeTab, setActiveTab] = useState('personal');
  const [showSalary, setShowSalary] = useState(false);
  const [leaveFilter, setLeaveFilter] = useState('all'); // all, pending, approved, rejected

  // Admin Edit Restricted Fields Modal State
  const [isAdminEditModalOpen, setIsAdminEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    id: '',
    departmentId: '',
    departmentName: '',
    designationId: '',
    designationName: '',
    reportingManagerId: '',
    reportingManagerName: '',
    joiningDate: '',
    employmentType: '',
    workLocation: '',
    accountStatus: '',
    salary: ''
  });
  const [editReason, setEditReason] = useState('');

  // Rejection Modal State
  const [rejectReqId, setRejectReqId] = useState(null);
  const [rejectionReasonText, setRejectionReasonText] = useState('');

  // Upload Document Modal State
  const [isUploadDocModalOpen, setIsUploadDocModalOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    documentType: 'Offer Letter',
    fileName: '',
    status: 'Pending Verification',
    note: ''
  });

  const emp = employees.find(e => e.id === id) || employees[0];
  if (!emp) return <div className="p-8 text-center text-slate-500">Employee record not found.</div>;

  const handleSaveUpload = (e) => {
    e.preventDefault();
    if (!uploadForm.fileName.trim()) return;

    uploadDocument({
      employeeId: emp.id,
      employeeName: emp.fullName,
      documentType: uploadForm.documentType,
      fileName: uploadForm.fileName,
      fileUrl: '#',
      status: uploadForm.status,
      note: uploadForm.note || 'Uploaded by Admin'
    });

    setIsUploadDocModalOpen(false);
    setUploadForm({
      documentType: 'Offer Letter',
      fileName: '',
      status: 'Pending Verification',
      note: ''
    });
  };

  // Data Filtering for this specific employee
  const empAttendance = dailyAttendance.filter(a => a.employeeId === emp.id);
  const empCorrections = attendanceCorrections.filter(c => c.employeeId === emp.id);
  const empLeaveBalance = leaveBalances.find(b => b.employeeId === emp.id) || {
    casualAllocated: 12, casualUsed: 0, sickAllocated: 12, sickUsed: 0, earnedAllocated: 15, earnedUsed: 0, emergencyAllocated: 5, emergencyUsed: 0, unpaidUsed: 0
  };
  const empLeaveRequests = leaveRequests.filter(r => r.employeeId === emp.id);
  const empConcerns = concerns.filter(c => c.employeeId === emp.id);
  const empDocs = documents.filter(d => d.employeeId === emp.id);
  const empAuditLogs = auditLogs.filter(l => l.affectedEntity.includes(emp.id));
  const empChangeRequests = (profileChangeRequests || []).filter(r => r.employeeId === emp.id);

  // Today's attendance record
  const todayRecord = empAttendance.find(a => a.date === '2026-09-04') || {
    status: emp.attendanceStatus || 'Not Checked In',
    checkIn: '09:00 AM',
    checkOut: 'Still Working',
    duration: '5h 15m'
  };

  // Monthly Attendance Statistics
  const totalDays = 22;
  const presentDays = empAttendance.filter(a => a.status === 'Present').length;
  const lateDays = empAttendance.filter(a => a.status === 'Late').length;
  const absentDays = empAttendance.filter(a => a.status === 'Absent').length;
  const leaveDays = empAttendance.filter(a => a.status === 'On Leave').length;
  const attendancePercentage = Math.round(((presentDays + lateDays) / totalDays) * 100);

  // Filtered Leave History
  const filteredLeaveHistory = empLeaveRequests.filter(r => {
    if (leaveFilter === 'pending') return r.status === 'Pending';
    if (leaveFilter === 'approved') return r.status === 'Approved';
    if (leaveFilter === 'rejected') return r.status === 'Rejected';
    return true;
  });

  const canAccessSalary = currentUser.role === 'Super Admin' || currentUser.role === 'HR/Admin';

  const handleOpenAdminEdit = () => {
    setEditForm({
      id: emp.id,
      departmentId: emp.departmentId,
      departmentName: emp.departmentName,
      designationId: emp.designationId,
      designationName: emp.designationName,
      reportingManagerId: emp.reportingManagerId,
      reportingManagerName: emp.reportingManagerName,
      joiningDate: emp.joiningDate,
      employmentType: emp.employmentType,
      workLocation: emp.workLocation,
      accountStatus: emp.accountStatus,
      salary: emp.salary
    });
    setEditReason('');
    setIsAdminEditModalOpen(true);
  };

  const handleSaveAdminEdit = (e) => {
    e.preventDefault();
    if (!editReason.trim()) return;

    const deptObj = departments.find(d => d.id === editForm.departmentId);
    const desigObj = designations.find(d => d.id === editForm.designationId);
    const mgrObj = employees.find(m => m.id === editForm.reportingManagerId);

    updateEmployeeRestrictedFields(emp.id, {
      ...editForm,
      departmentName: deptObj ? deptObj.name : editForm.departmentName,
      designationName: desigObj ? desigObj.name : editForm.designationName,
      reportingManagerName: mgrObj ? mgrObj.fullName : editForm.reportingManagerName
    }, editReason);

    setIsAdminEditModalOpen(false);
  };

  const tabs = [
    { id: 'personal', name: 'Personal Information', icon: User },
    { id: 'employment', name: 'Employment Information', icon: Briefcase },
    { id: 'attendance', name: 'Attendance & Corrections', icon: Clock },
    { id: 'leave', name: 'Leave & Balances', icon: CalendarDays },
    { id: 'concerns', name: 'Concerns & Help Desk', icon: HelpCircle },
    { id: 'documents', name: 'Documents & Verification', icon: FileText },
    { id: 'history', name: 'Activity History', icon: History }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/employees')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-saath-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Employee Directory
        </button>

        <button
          onClick={handleOpenAdminEdit}
          className="px-4 py-2.5 rounded-xl bg-saath-600 hover:bg-saath-700 text-white font-bold text-xs shadow-lg shadow-saath-600/30 transition-all flex items-center gap-2"
        >
          <Edit3 className="h-4 w-4" /> Edit Restricted Admin Fields
        </button>
      </div>

      {/* Header Profile Summary Card */}
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={emp.avatar}
            alt={emp.fullName}
            className="h-20 w-20 rounded-2xl object-cover ring-4 ring-saath-50 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">{emp.fullName}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-saath-50 text-saath-700 font-extrabold text-xs font-mono border border-saath-200">
                {emp.id}
              </span>
            </div>
            <p className="text-xs font-bold text-slate-600 mt-0.5">{emp.designationName} • {emp.departmentName}</p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5 text-slate-400" /> {emp.officialEmail}</span>
              <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5 text-slate-400" /> {emp.mobileNumber}</span>
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-slate-400" /> {emp.workLocation}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className={`px-3 py-1 rounded-full font-extrabold text-xs border ${
            emp.accountStatus === 'Active' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
            emp.accountStatus === 'Suspended' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-slate-100 text-slate-800 border-slate-200'
          }`}>
            Account Status: {emp.accountStatus}
          </span>
          <span className="text-[11px] font-semibold text-slate-400">Joining Date: {emp.joiningDate}</span>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="flex border-b border-slate-200 overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-saath-600 text-saath-600 bg-saath-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Main Tab Panels */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">

        {/* TAB 1: Personal Information */}
        {activeTab === 'personal' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <User className="h-4 w-4 text-saath-600" /> Personal Details & Emergency Contacts
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-400 uppercase text-[10px]">Full Legal Name</span>
                <p className="font-extrabold text-slate-900 text-sm mt-1">{emp.fullName}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-400 uppercase text-[10px]">Official Email</span>
                <p className="font-extrabold text-slate-900 text-sm mt-1">{emp.officialEmail}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-400 uppercase text-[10px]">Mobile Contact</span>
                <p className="font-extrabold text-slate-900 text-sm mt-1">{emp.mobileNumber}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 lg:col-span-2">
                <span className="font-bold text-slate-400 uppercase text-[10px]">Residential Address</span>
                <p className="font-bold text-slate-800 text-xs mt-1 leading-relaxed">{emp.address || 'Registered residential address recorded in employee portal'}</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60">
                <span className="font-bold text-amber-800 uppercase text-[10px]">Emergency Contact</span>
                <p className="font-extrabold text-slate-900 text-xs mt-1">{emp.emergencyContact || 'Not specified'}</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Employment Information */}
        {activeTab === 'employment' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-saath-600" /> Official Employment Details & Restricted Fields
              </h3>
              <span className="text-xs font-semibold text-slate-400">Admin-Controlled Fields</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Employee ID</span>
                <p className="font-mono font-extrabold text-saath-700 text-sm mt-1">{emp.id}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Department</span>
                <p className="font-extrabold text-slate-900 text-sm mt-1">{emp.departmentName}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Designation</span>
                <p className="font-extrabold text-slate-900 text-sm mt-1">{emp.designationName}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Reporting Manager</span>
                <p className="font-extrabold text-slate-900 text-sm mt-1">{emp.reportingManagerName}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Joining Date</span>
                <p className="font-extrabold text-slate-900 text-sm mt-1">{emp.joiningDate}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Employment Type</span>
                <p className="font-extrabold text-slate-900 text-sm mt-1">{emp.employmentType}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Work Location</span>
                <p className="font-extrabold text-slate-900 text-sm mt-1">{emp.workLocation}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Account Status</span>
                <p className="font-extrabold text-emerald-700 text-sm mt-1">{emp.accountStatus}</p>
              </div>
            </div>

            {/* Confidential Salary Access */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-xs flex items-center gap-2">
                  <Shield className="h-4 w-4 text-amber-400" /> Restricted Salary & Compensation Package
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Salary details are confidential and restricted to authorized Super Admin & HR Admin roles.
                </p>
              </div>

              {canAccessSalary ? (
                <div className="flex items-center gap-3">
                  {showSalary && <span className="font-mono font-extrabold text-emerald-400 text-sm">{emp.salary}</span>}
                  <button
                    onClick={() => setShowSalary(!showSalary)}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-bold text-white transition-colors flex items-center gap-1.5"
                  >
                    {showSalary ? <Lock className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    {showSalary ? 'Hide Salary' : 'Reveal Compensation'}
                  </button>
                </div>
              ) : (
                <span className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-300 font-bold text-xs">Permission Restricted</span>
              )}
            </div>

            {/* Employee Restricted Field Change Requests */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" /> Pending Restricted Field Change Requests
              </h4>

              {empChangeRequests.length === 0 ? (
                <p className="text-xs text-slate-400 py-2">No pending field change requests submitted by this employee.</p>
              ) : (
                empChangeRequests.map(req => (
                  <div key={req.id} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 flex items-center justify-between gap-4 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-saath-700">{req.id}</span>
                        <span className="font-extrabold text-slate-900">Requested {req.fieldName} Change</span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">{req.status}</span>
                      </div>
                      <p className="text-slate-600 mt-1">
                        Current: <span className="text-slate-400">{req.oldValue}</span> → Proposed: <strong className="text-saath-700">{req.requestedValue}</strong>
                      </p>
                      <p className="text-slate-500 text-[11px] mt-0.5">Reason: "{req.reason}"</p>
                    </div>

                    {req.status === 'Pending' && (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setRejectReqId(req.id)}
                          className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => approveProfileChangeRequest(req.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-600/30"
                        >
                          Approve Change
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: Attendance & Corrections */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            {/* Today's Status Banner */}
            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-extrabold text-slate-400 uppercase">Today's Attendance Status</span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">{todayRecord.status}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Check-in: <strong>{todayRecord.checkIn}</strong> • Check-out: <strong>{todayRecord.checkOut}</strong></p>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-extrabold text-slate-400 uppercase">Working Hours Today</span>
                <p className="text-lg font-black text-saath-700 mt-0.5">{todayRecord.duration}</p>
              </div>
            </div>

            {/* Monthly Attendance Summary Grid */}
            <div>
              <h4 className="text-xs font-extrabold text-slate-900 mb-3">Monthly Attendance Performance</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-saath-50 border border-saath-200">
                  <span className="text-[10px] font-bold text-saath-800">Working Days</span>
                  <p className="text-lg font-black text-slate-900 mt-1">{totalDays}</p>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[10px] font-bold text-emerald-800">Present Days</span>
                  <p className="text-lg font-black text-slate-900 mt-1">{presentDays}</p>
                </div>
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200">
                  <span className="text-[10px] font-bold text-amber-800">Late Days</span>
                  <p className="text-lg font-black text-slate-900 mt-1">{lateDays}</p>
                </div>
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200">
                  <span className="text-[10px] font-bold text-rose-800">Absent Days</span>
                  <p className="text-lg font-black text-slate-900 mt-1">{absentDays}</p>
                </div>
                <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200">
                  <span className="text-[10px] font-bold text-purple-800">Leave Days</span>
                  <p className="text-lg font-black text-slate-900 mt-1">{leaveDays}</p>
                </div>
                <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200">
                  <span className="text-[10px] font-bold text-teal-800">Attendance Rate</span>
                  <p className="text-lg font-black text-teal-900 mt-1">{attendancePercentage}%</p>
                </div>
              </div>
            </div>

            {/* Attendance History Table */}
            <div>
              <h4 className="text-xs font-extrabold text-slate-900 mb-3">Attendance History Log</h4>
              <div className="rounded-2xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b text-slate-500 font-extrabold">
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Check In</th>
                      <th className="py-2.5 px-3">Check Out</th>
                      <th className="py-2.5 px-3">Duration</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {empAttendance.map(a => (
                      <tr key={a.id}>
                        <td className="py-2.5 px-3 font-bold text-slate-900">{a.date}</td>
                        <td className="py-2.5 px-3 font-mono">{a.checkIn}</td>
                        <td className="py-2.5 px-3 font-mono">{a.checkOut}</td>
                        <td className="py-2.5 px-3 font-bold text-saath-700">{a.duration}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            a.status === 'Present' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>{a.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Correction History */}
            <div className="pt-2">
              <h4 className="text-xs font-extrabold text-slate-900 mb-3">Attendance Correction Requests History</h4>
              {empCorrections.length === 0 ? (
                <p className="text-xs text-slate-400">No attendance corrections submitted.</p>
              ) : (
                empCorrections.map(c => (
                  <div key={c.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center justify-between font-bold">
                      <span>{c.date} — Req Check-in: {c.requestedCheckIn}</span>
                      <span className="px-2 py-0.5 rounded-full bg-saath-100 text-saath-700 text-[10px]">{c.status}</span>
                    </div>
                    <p className="text-slate-600 mt-1">Reason: "{c.reason}"</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 4: Leave & Balances */}
        {activeTab === 'leave' && (
          <div className="space-y-6">
            {/* Balances Grid */}
            <div>
              <h4 className="text-xs font-extrabold text-slate-900 mb-3">Current Leave Balances</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-saath-50 border border-saath-200">
                  <span className="text-[10px] font-bold text-saath-800">Casual Leave (CL)</span>
                  <p className="text-xl font-black text-slate-900 mt-1">{empLeaveBalance.casualAllocated - empLeaveBalance.casualUsed} <span className="text-xs font-normal text-slate-500">/ {empLeaveBalance.casualAllocated}</span></p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[10px] font-bold text-emerald-800">Sick Leave (SL)</span>
                  <p className="text-xl font-black text-slate-900 mt-1">{empLeaveBalance.sickAllocated - empLeaveBalance.sickUsed} <span className="text-xs font-normal text-slate-500">/ {empLeaveBalance.sickAllocated}</span></p>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                  <span className="text-[10px] font-bold text-purple-800">Earned Leave (EL)</span>
                  <p className="text-xl font-black text-slate-900 mt-1">{empLeaveBalance.earnedAllocated - empLeaveBalance.earnedUsed} <span className="text-xs font-normal text-slate-500">/ {empLeaveBalance.earnedAllocated}</span></p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <span className="text-[10px] font-bold text-amber-800">Emergency Leave</span>
                  <p className="text-xl font-black text-slate-900 mt-1">{empLeaveBalance.emergencyAllocated - empLeaveBalance.emergencyUsed} <span className="text-xs font-normal text-slate-500">/ {empLeaveBalance.emergencyAllocated}</span></p>
                </div>
              </div>
            </div>

            {/* Leave History Sub-Filter Header */}
            <div>
              <div className="flex items-center justify-between mb-3 border-b pb-2">
                <h4 className="text-xs font-extrabold text-slate-900">Leave Applications History</h4>
                <div className="flex items-center gap-1.5 text-xs">
                  <button onClick={() => setLeaveFilter('all')} className={`px-2.5 py-1 rounded-lg font-bold ${leaveFilter === 'all' ? 'bg-saath-600 text-white' : 'bg-slate-100 text-slate-600'}`}>All</button>
                  <button onClick={() => setLeaveFilter('pending')} className={`px-2.5 py-1 rounded-lg font-bold ${leaveFilter === 'pending' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'}`}>Pending</button>
                  <button onClick={() => setLeaveFilter('approved')} className={`px-2.5 py-1 rounded-lg font-bold ${leaveFilter === 'approved' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>Approved</button>
                  <button onClick={() => setLeaveFilter('rejected')} className={`px-2.5 py-1 rounded-lg font-bold ${leaveFilter === 'rejected' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'}`}>Rejected</button>
                </div>
              </div>

              <div className="space-y-3">
                {filteredLeaveHistory.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">No leave applications match filter.</p>
                ) : (
                  filteredLeaveHistory.map(req => (
                    <div key={req.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-saath-700">{req.id}</span>
                          <span className="font-extrabold text-slate-900">{req.leaveTypeName}</span>
                          <span className="text-slate-400">({req.daysCount} days)</span>
                        </div>
                        <p className="text-slate-600 mt-1 font-medium">{req.startDate} to {req.endDate} — "{req.reason}"</p>
                      </div>

                      <span className={`px-3 py-1 rounded-full font-extrabold text-xs ${
                        req.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                        req.status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Concerns and Help */}
        {activeTab === 'concerns' && (
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 border-b pb-2">Submitted Concerns & Help Desk Tickets</h3>
            {empConcerns.length === 0 ? (
              <p className="text-xs text-slate-400 py-4">No concerns or help desk tickets raised by employee.</p>
            ) : (
              empConcerns.map(c => (
                <div key={c.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-saath-700">{c.id}</span>
                      <span>{c.subject}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-saath-100 text-saath-700 text-[10px]">{c.status}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{c.description}</p>
                  <p className="text-[11px] text-slate-400 font-semibold">Assigned HR: {c.assignedHrName}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 6: Documents */}
        {activeTab === 'documents' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Employee Documents & Verification Status</h3>
                <p className="text-[11px] text-slate-500 font-medium">{empDocs.length} Total Document(s) Uploaded</p>
              </div>

              <button
                onClick={() => {
                  setUploadForm({ documentType: 'Offer Letter', fileName: '', status: 'Pending Verification', note: '' });
                  setIsUploadDocModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-saath-600 hover:bg-saath-700 text-white font-bold text-xs shadow-md shadow-saath-600/30 transition-all flex items-center gap-1.5 shrink-0"
              >
                <Upload className="h-4 w-4" /> Upload Document
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {['Offer Letter', 'Joining Documents', 'Education Documents', 'Experience Documents', 'Other HR Documents'].map(cat => {
                const docItem = empDocs.find(d => d.documentType === cat);
                return (
                  <div key={cat} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-saath-300 transition-all flex flex-col justify-between space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-extrabold text-slate-900 text-xs block">{cat}</span>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">{docItem ? docItem.fileName : 'Awaiting upload'}</p>
                      </div>

                      {docItem ? (
                        <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                          docItem.status === 'Verified' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                          docItem.status === 'Rejected' ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}>
                          {docItem.status}
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-slate-200 text-slate-600 font-bold text-[10px]">
                          Pending
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                      <span className="text-[10px] text-slate-400 font-medium">
                        {docItem ? `Uploaded: ${docItem.uploadDate}` : 'No file attached'}
                      </span>

                      <button
                        onClick={() => {
                          setUploadForm({
                            documentType: cat,
                            fileName: docItem ? docItem.fileName : `${emp.fullName.replace(/\s+/g, '_')}_${cat.replace(/\s+/g, '_')}.pdf`,
                            status: 'Pending Verification',
                            note: ''
                          });
                          setIsUploadDocModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-saath-700 hover:bg-saath-50 font-bold text-xs shadow-sm transition-colors flex items-center gap-1"
                      >
                        <Upload className="h-3.5 w-3.5 text-saath-600" />
                        {docItem ? 'Replace File' : 'Upload File'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 7: Activity History */}
        {activeTab === 'history' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-extrabold text-slate-900 border-b pb-2">Chronological Activity & Administrative Log</h3>
            {empAuditLogs.length === 0 ? (
              <p className="text-slate-400 py-4">No audit log records found for this employee.</p>
            ) : (
              empAuditLogs.map(l => (
                <div key={l.id} className="p-3 rounded-2xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{l.action}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{l.date}</span>
                  </div>
                  <p className="text-slate-600 mt-1">Changed By: <strong>{l.changedBy}</strong> ({l.adminRole})</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Reason: "{l.reason}"</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Admin Edit Restricted Fields Modal */}
      {isAdminEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 my-8">
            <h3 className="text-lg font-extrabold text-slate-900">Edit Restricted Admin Fields</h3>
            <p className="text-xs text-slate-500 mt-1">
              Modifying restricted administrative fields for <strong className="text-slate-900">{emp.fullName}</strong> ({emp.id}).
            </p>

            <form onSubmit={handleSaveAdminEdit} className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Employee ID</label>
                  <input type="text" value={editForm.id} onChange={e => setEditForm({...editForm, id: e.target.value})} className="w-full rounded-xl border p-2 font-mono" />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Salary / CTC</label>
                  <input type="text" value={editForm.salary} onChange={e => setEditForm({...editForm, salary: e.target.value})} className="w-full rounded-xl border p-2 font-bold" />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department</label>
                  <select value={editForm.departmentId} onChange={e => setEditForm({...editForm, departmentId: e.target.value})} className="w-full rounded-xl border p-2 bg-white">
                    {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Designation</label>
                  <select value={editForm.designationId} onChange={e => setEditForm({...editForm, designationId: e.target.value})} className="w-full rounded-xl border p-2 bg-white">
                    {designations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Joining Date</label>
                  <input type="date" value={editForm.joiningDate} onChange={e => setEditForm({...editForm, joiningDate: e.target.value})} className="w-full rounded-xl border p-2" />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Employment Status</label>
                  <select value={editForm.accountStatus} onChange={e => setEditForm({...editForm, accountStatus: e.target.value})} className="w-full rounded-xl border p-2 bg-white">
                    <option value="Active">Active</option>
                    <option value="Invited">Invited</option>
                    <option value="Profile Pending">Profile Pending</option>
                    <option value="Under Verification">Under Verification</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Deactivated">Deactivated</option>
                    <option value="Terminated">Terminated</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mandatory Audit Reason *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Specify administrative compliance reason for updating restricted profile fields..."
                  value={editReason}
                  onChange={e => setEditReason(e.target.value)}
                  className="w-full rounded-xl border p-2 font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setIsAdminEditModalOpen(false)} className="px-4 py-2 rounded-xl border font-bold text-slate-600">Cancel</button>
                <button type="submit" disabled={!editReason.trim()} className="px-4 py-2 rounded-xl bg-saath-600 text-white font-bold disabled:opacity-50">
                  Save Changes & Log Audit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reject Request Modal */}
      {rejectReqId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">Reject Restricted Field Request</h3>
            <textarea
              rows={3}
              placeholder="Rejection reason for audit log..."
              value={rejectionReasonText}
              onChange={e => setRejectionReasonText(e.target.value)}
              className="w-full rounded-xl border p-2.5 text-xs mt-3"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setRejectReqId(null)} className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-600">Cancel</button>
              <button
                onClick={() => { rejectProfileChangeRequest(rejectReqId, rejectionReasonText); setRejectReqId(null); setRejectionReasonText(''); }}
                className="px-4 py-2 rounded-xl bg-rose-600 text-xs font-bold text-white"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      {isUploadDocModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-saath-100 text-saath-600">
                <Upload className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Upload Employee Document</h3>
                <p className="text-[11px] text-slate-500 font-medium">Attaching file for {emp.fullName} ({emp.id})</p>
              </div>
            </div>

            <form onSubmit={handleSaveUpload} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Document Category *</label>
                <select
                  value={uploadForm.documentType}
                  onChange={e => setUploadForm({ ...uploadForm, documentType: e.target.value })}
                  className="w-full rounded-xl border p-2.5 bg-white font-medium focus:border-saath-500"
                >
                  <option value="Offer Letter">Offer Letter</option>
                  <option value="Joining Documents">Joining Documents</option>
                  <option value="Education Documents">Education Documents</option>
                  <option value="Experience Documents">Experience Documents</option>
                  <option value="Other HR Documents">Other HR Documents</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Document File Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh_Sharma_Offer_Letter.pdf"
                  value={uploadForm.fileName}
                  onChange={e => setUploadForm({ ...uploadForm, fileName: e.target.value })}
                  className="w-full rounded-xl border p-2.5 font-medium focus:border-saath-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Initial Verification Status</label>
                <select
                  value={uploadForm.status}
                  onChange={e => setUploadForm({ ...uploadForm, status: e.target.value })}
                  className="w-full rounded-xl border p-2.5 bg-white font-medium focus:border-saath-500"
                >
                  <option value="Pending Verification">Pending Verification</option>
                  <option value="Verified">Verified Immediately</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Verification / Administrative Note</label>
                <textarea
                  rows={2}
                  placeholder="Optional verification details or file description..."
                  value={uploadForm.note}
                  onChange={e => setUploadForm({ ...uploadForm, note: e.target.value })}
                  className="w-full rounded-xl border p-2.5 font-medium focus:border-saath-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsUploadDocModalOpen(false)}
                  className="px-4 py-2 rounded-xl border font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!uploadForm.fileName.trim()}
                  className="px-5 py-2 rounded-xl bg-saath-600 hover:bg-saath-700 text-white font-bold shadow-md shadow-saath-600/30 transition-all disabled:opacity-50"
                >
                  Upload & Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
