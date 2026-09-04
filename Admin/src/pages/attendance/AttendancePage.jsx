import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useHR } from '../../context/HRContext';
import {
  Clock,
  Calendar as CalendarIcon,
  Filter,
  CheckCircle2,
  AlertCircle,
  UserX,
  Edit3,
  Settings,
  RotateCcw,
  Search,
  Check,
  X,
  Plus,
  Users,
  Building2,
  MapPin,
  Laptop,
  HelpCircle,
  FileText,
  ShieldCheck,
  Eye,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

export const AttendancePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    employees,
    departments,
    dailyAttendance,
    attendanceRules,
    attendanceCorrections,
    addManualAttendance,
    updateAttendanceRecord,
    addAttendanceAdminNote,
    setAttendanceRules,
    approveAttendanceCorrection,
    rejectAttendanceCorrection,
    requestCorrectionInfo
  } = useHR();

  // Primary Tab State
  const [activeTab, setActiveTab] = useState('monitoring'); // monitoring, corrections, rules

  // Comprehensive Filter Suite State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-09-04');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedManager, setSelectedManager] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || 'All');
  const [selectedCheckInStatus, setSelectedCheckInStatus] = useState('All');
  const [selectedCorrectionStatus, setSelectedCorrectionStatus] = useState('All');

  // Modals State
  const [isAddManualModal, setIsAddManualModal] = useState(false);
  const [isRulesModal, setIsRulesModal] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [viewRecord, setViewRecord] = useState(null);
  const [adminNoteRecord, setAdminNoteRecord] = useState(null);
  const [processCorrectionModal, setProcessCorrectionModal] = useState(null);

  // Form States
  const [manualForm, setManualForm] = useState({
    employeeId: employees[0]?.id || 'EMP-2026-001',
    date: new Date().toISOString().split('T')[0],
    status: 'Present',
    checkIn: '09:00 AM',
    checkOut: '06:00 PM',
    duration: '9h 0m',
    location: 'Head Office - Mumbai',
    reason: ''
  });

  const [editStatus, setEditStatus] = useState('Present');
  const [editCheckIn, setEditCheckIn] = useState('09:00 AM');
  const [editCheckOut, setEditCheckOut] = useState('06:00 PM');
  const [editReason, setEditReason] = useState('');

  const [adminNoteText, setAdminNoteText] = useState('');

  const [rulesForm, setRulesForm] = useState(attendanceRules);

  const [correctionActionType, setCorrectionActionType] = useState('approve');
  const [correctionReviewNote, setCorrectionReviewNote] = useState('');

  // Metrics Calculations for ALL 11 Overview Cards Required in Section 10
  const totalEmployeesCount = employees.length;
  const presentCount = dailyAttendance.filter(a => a.status === 'Present').length;
  const absentCount = dailyAttendance.filter(a => a.status === 'Absent').length;
  const lateCount = dailyAttendance.filter(a => a.status === 'Late').length;
  const halfDayCount = dailyAttendance.filter(a => a.status === 'Half Day').length;
  const onLeaveCount = dailyAttendance.filter(a => a.status === 'On Leave').length;
  const holidayCount = dailyAttendance.filter(a => a.status === 'Holiday').length;
  const weeklyOffCount = dailyAttendance.filter(a => a.status === 'Weekly Off').length;
  const wfhCount = dailyAttendance.filter(a => a.status === 'Work From Home' || a.location === 'Remote').length;
  const notCheckedInCount = dailyAttendance.filter(a => a.status === 'Not Checked In').length;
  const checkedOutCount = dailyAttendance.filter(a => a.checkOut && a.checkOut !== 'Still Working' && a.checkOut !== '-').length;

  const overviewCards = [
    { title: 'Total Employees', count: totalEmployeesCount, statusKey: 'All', color: 'bg-saath-50 text-saath-800 border-saath-200' },
    { title: 'Present', count: presentCount, statusKey: 'Present', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    { title: 'Absent', count: absentCount, statusKey: 'Absent', color: 'bg-rose-50 text-rose-800 border-rose-200' },
    { title: 'Late', count: lateCount, statusKey: 'Late', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    { title: 'Half Day', count: halfDayCount, statusKey: 'Half Day', color: 'bg-orange-50 text-orange-800 border-orange-200' },
    { title: 'On Leave', count: onLeaveCount, statusKey: 'On Leave', color: 'bg-purple-50 text-purple-800 border-purple-200' },
    { title: 'Holiday', count: holidayCount, statusKey: 'Holiday', color: 'bg-blue-50 text-blue-800 border-blue-200' },
    { title: 'Weekly Off', count: weeklyOffCount, statusKey: 'Weekly Off', color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
    { title: 'Work From Home', count: wfhCount, statusKey: 'Work From Home', color: 'bg-teal-50 text-teal-800 border-teal-200' },
    { title: 'Not Checked In', count: notCheckedInCount, statusKey: 'Not Checked In', color: 'bg-slate-100 text-slate-700 border-slate-200' },
    { title: 'Checked Out', count: checkedOutCount, statusKey: 'Checked Out', color: 'bg-slate-100 text-slate-900 border-slate-200' }
  ];

  // Filtering Logic
  const filteredAttendance = dailyAttendance.filter(rec => {
    const emp = employees.find(e => e.id === rec.employeeId);
    
    // Search
    const matchesSearch =
      rec.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.employeeId.toLowerCase().includes(searchTerm.toLowerCase());

    // Single Date or Date Range
    let matchesDate = true;
    if (startDate && endDate) {
      matchesDate = rec.date >= startDate && rec.date <= endDate;
    } else if (selectedDate) {
      matchesDate = rec.date === selectedDate;
    }

    // Department & Manager
    const matchesDept = selectedDept === 'All' || rec.departmentName === selectedDept;
    const matchesManager = selectedManager === 'All' || (emp && emp.reportingManagerName === selectedManager);
    const matchesLocation = selectedLocation === 'All' || rec.location === selectedLocation;

    // Status Filters
    let matchesStatus = true;
    if (selectedStatus === 'Checked Out') {
      matchesStatus = rec.checkOut && rec.checkOut !== 'Still Working' && rec.checkOut !== '-';
    } else if (selectedStatus !== 'All') {
      matchesStatus = rec.status === selectedStatus;
    }

    // Check-in status filter
    let matchesCheckInStatus = true;
    if (selectedCheckInStatus === 'checked_in') matchesStatus = rec.checkIn && rec.checkIn !== '-';
    if (selectedCheckInStatus === 'not_checked_in') matchesStatus = !rec.checkIn || rec.checkIn === '-';
    if (selectedCheckInStatus === 'checked_out') matchesStatus = rec.checkOut && rec.checkOut !== 'Still Working' && rec.checkOut !== '-';

    // Correction Status
    const matchesCorrection = selectedCorrectionStatus === 'All' || rec.correctionStatus === selectedCorrectionStatus;

    return matchesSearch && matchesDate && matchesDept && matchesManager && matchesLocation && matchesStatus && matchesCheckInStatus && matchesCorrection;
  });

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDate('2026-09-04');
    setStartDate('');
    setEndDate('');
    setSelectedDept('All');
    setSelectedManager('All');
    setSelectedLocation('All');
    setSelectedStatus('All');
    setSelectedCheckInStatus('All');
    setSelectedCorrectionStatus('All');
  };

  // Handlers for Admin Actions
  const handleAddManualSubmit = (e) => {
    e.preventDefault();
    if (!manualForm.reason.trim()) return;

    const empObj = employees.find(e => e.id === manualForm.employeeId);
    addManualAttendance({
      ...manualForm,
      employeeName: empObj ? empObj.fullName : 'Employee',
      departmentName: empObj ? empObj.departmentName : 'General'
    });

    setIsAddManualModal(false);
    setManualForm({
      employeeId: employees[0]?.id || 'EMP-2026-001',
      date: new Date().toISOString().split('T')[0],
      status: 'Present',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
      duration: '9h 0m',
      location: 'Head Office - Mumbai',
      reason: ''
    });
  };

  const handleSaveEdit = () => {
    if (!editReason.trim() || !editRecord) return;
    updateAttendanceRecord(editRecord.id, editStatus, editCheckIn, editCheckOut, editReason);
    setEditRecord(null);
    setEditReason('');
  };

  const handleSaveAdminNote = () => {
    if (!adminNoteRecord) return;
    addAttendanceAdminNote(adminNoteRecord.id, adminNoteText);
    setAdminNoteRecord(null);
    setAdminNoteText('');
  };

  const handleProcessCorrection = () => {
    if (!processCorrectionModal) return;

    if (correctionActionType === 'approve') {
      approveAttendanceCorrection(processCorrectionModal.id, correctionReviewNote || 'Approved by Admin');
    } else if (correctionActionType === 'reject') {
      rejectAttendanceCorrection(processCorrectionModal.id, correctionReviewNote || 'Insufficient proof provided');
    } else if (correctionActionType === 'request_info') {
      requestCorrectionInfo(processCorrectionModal.id, correctionReviewNote || 'Please provide additional transit or medical proof.');
    }

    setProcessCorrectionModal(null);
    setCorrectionReviewNote('');
  };

  const handleSaveRulesSubmit = (e) => {
    e.preventDefault();
    setAttendanceRules(rulesForm);
    setIsRulesModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header & Primary Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            Attendance Management Portal
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Monitor daily check-ins, process correction requests, and configure enterprise attendance rules.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsAddManualModal(true)}
            className="px-4 py-2.5 rounded-xl bg-saath-600 hover:bg-saath-700 text-white font-bold text-xs shadow-lg shadow-saath-600/30 transition-all flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Attendance Manually
          </button>
          <button
            onClick={() => setIsRulesModal(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2"
          >
            <Settings className="h-4 w-4" /> Configure Attendance Rules
          </button>
        </div>
      </div>

      {/* Main Sub-Tabs Header */}
      <div className="flex border-b border-slate-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('monitoring')}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'monitoring' ? 'border-saath-600 text-saath-600 bg-saath-50/50' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Clock className="h-4 w-4" /> Today's Attendance Monitoring ({filteredAttendance.length})
        </button>
        <button
          onClick={() => setActiveTab('corrections')}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'corrections' ? 'border-saath-600 text-saath-600 bg-saath-50/50' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <AlertCircle className="h-4 w-4 text-amber-500" /> Attendance Correction Requests Queue ({attendanceCorrections.length})
        </button>
      </div>

      {/* SUB-TAB 1: TODAY'S ATTENDANCE MONITORING */}
      {activeTab === 'monitoring' && (
        <div className="space-y-6">
          {/* SECTION 10: TODAY'S ATTENDANCE OVERVIEW CARDS (ALL 11 REQUIRED CARDS) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                Today's Operations Breakdown (11 Metrics)
              </h2>
              <span className="text-[11px] font-semibold text-slate-400">Click any card to filter list</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {overviewCards.map((card, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedStatus(card.statusKey)}
                  className={`p-3 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all cursor-pointer group ${
                    selectedStatus === card.statusKey ? 'ring-2 ring-saath-500 border-saath-500' : ''
                  }`}
                >
                  <div className="text-lg font-black text-slate-900 tracking-tight">{card.count}</div>
                  <div className="text-[11px] font-bold text-slate-600 mt-0.5 truncate">{card.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 10: ATTENDANCE FILTERS BAR (FULL FILTER SUITE) */}
          <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search name, ID..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border py-2 pl-9 pr-3 text-xs font-medium focus:border-saath-500 focus:outline-none"
                />
              </div>

              {/* Single Date */}
              <input
                type="date"
                value={selectedDate}
                onChange={e => { setSelectedDate(e.target.value); setStartDate(''); setEndDate(''); }}
                className="w-full rounded-xl border py-2 px-3 text-xs font-medium bg-white focus:border-saath-500"
              />

              {/* Start Date Range */}
              <input
                type="date"
                placeholder="Range Start Date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full rounded-xl border py-2 px-3 text-xs font-medium bg-white focus:border-saath-500"
              />

              {/* End Date Range */}
              <input
                type="date"
                placeholder="Range End Date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-full rounded-xl border py-2 px-3 text-xs font-medium bg-white focus:border-saath-500"
              />

              {/* Department */}
              <select value={selectedDept} onChange={e => setSelectedDept(e.target.value)} className="w-full rounded-xl border py-2 px-3 text-xs font-medium bg-white">
                <option value="All">All Departments</option>
                {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>

              {/* Manager */}
              <select value={selectedManager} onChange={e => setSelectedManager(e.target.value)} className="w-full rounded-xl border py-2 px-3 text-xs font-medium bg-white">
                <option value="All">All Managers</option>
                {employees.map(m => <option key={m.id} value={m.fullName}>{m.fullName}</option>)}
              </select>

              {/* Location */}
              <select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)} className="w-full rounded-xl border py-2 px-3 text-xs font-medium bg-white">
                <option value="All">All Work Locations</option>
                <option value="Head Office - Mumbai">Head Office - Mumbai</option>
                <option value="Tech Hub - Bengaluru">Tech Hub - Bengaluru</option>
                <option value="Remote">Remote</option>
              </select>

              {/* Status */}
              <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} className="w-full rounded-xl border py-2 px-3 text-xs font-medium bg-white">
                <option value="All">All Attendance Statuses</option>
                <option value="Present">Present</option>
                <option value="Late">Late</option>
                <option value="Absent">Absent</option>
                <option value="Half Day">Half Day</option>
                <option value="On Leave">On Leave</option>
                <option value="Holiday">Holiday</option>
                <option value="Weekly Off">Weekly Off</option>
                <option value="Work From Home">Work From Home</option>
                <option value="Not Checked In">Not Checked In</option>
                <option value="Checked Out">Checked Out</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500 font-semibold">Filtered Results: {filteredAttendance.length} records</span>
              <button onClick={handleResetFilters} className="text-saath-600 font-bold hover:underline flex items-center gap-1">
                <RotateCcw className="h-3.5 w-3.5" /> Reset All Filters
              </button>
            </div>
          </div>

          {/* SECTION 10: ATTENDANCE TABLE */}
          <div className="rounded-3xl bg-white border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b text-slate-500 font-extrabold uppercase">
                    <th className="py-3.5 px-4">Employee</th>
                    <th className="py-3.5 px-4">Department & Location</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Check-In / Out</th>
                    <th className="py-3.5 px-4">Duration</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Correction Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAttendance.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-12 text-center text-slate-400 font-medium">
                        No attendance records match your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredAttendance.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-extrabold text-slate-900 text-xs">{rec.employeeName}</div>
                          <div className="font-mono text-[11px] text-saath-700 font-bold">{rec.employeeId}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-800">{rec.departmentName}</div>
                          <div className="text-[11px] text-slate-400 font-medium">{rec.location}</div>
                        </td>

                        <td className="py-3.5 px-4 font-bold text-slate-800">{rec.date}</td>

                        <td className="py-3.5 px-4">
                          <div className="font-mono font-bold text-slate-900">{rec.checkIn}</div>
                          <div className="font-mono text-[11px] text-slate-400">{rec.checkOut}</div>
                        </td>

                        <td className="py-3.5 px-4 font-extrabold text-saath-700">{rec.duration}</td>

                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full font-extrabold text-[11px] ${
                            rec.status === 'Present' ? 'bg-emerald-100 text-emerald-800' :
                            rec.status === 'Late' ? 'bg-amber-100 text-amber-800' :
                            rec.status === 'Absent' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {rec.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          {rec.correctionStatus !== 'None' ? (
                            <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                              rec.correctionStatus === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              Correction: {rec.correctionStatus}
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[11px]">None</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setViewRecord(rec)}
                              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>

                            <button
                              onClick={() => {
                                setEditRecord(rec);
                                setEditStatus(rec.status);
                                setEditCheckIn(rec.checkIn !== '-' ? rec.checkIn : '09:00 AM');
                                setEditCheckOut(rec.checkOut !== '-' ? rec.checkOut : '06:00 PM');
                              }}
                              className="p-2 rounded-xl text-saath-600 hover:bg-saath-50 transition-colors"
                              title="Edit Record & Status"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>

                            <button
                              onClick={() => {
                                setAdminNoteRecord(rec);
                                setAdminNoteText(rec.adminNote || '');
                              }}
                              className="p-2 rounded-xl text-amber-600 hover:bg-amber-50 transition-colors"
                              title="Add Administrative Note"
                            >
                              <MessageSquare className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: ATTENDANCE CORRECTION REQUESTS QUEUE (SECTION 12 WORKFLOW) */}
      {activeTab === 'corrections' && (
        <div className="space-y-4">
          <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Pending Employee Attendance Correction Requests ({attendanceCorrections.length})</span>
            <span className="text-[11px] font-semibold text-slate-400">Workflow: Pending → Under Review → Approved/Rejected</span>
          </div>

          <div className="space-y-3">
            {attendanceCorrections.map(cor => (
              <div key={cor.id} className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold text-[10px]">
                      Correction Request
                    </span>
                    <span className="font-mono font-bold text-saath-700 text-xs">{cor.id}</span>
                    <span className="text-xs text-slate-400">• Submitted {cor.submissionDate}</span>
                  </div>

                  <div className="font-extrabold text-sm text-slate-900">
                    {cor.employeeName} <span className="font-medium text-xs text-slate-500">({cor.departmentName} • {cor.employeeId})</span>
                  </div>

                  <div className="text-xs text-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-medium">
                    <div>
                      <span className="text-slate-400">Existing Record ({cor.date}):</span> <span className="font-bold text-rose-600">{cor.existingStatus} ({cor.existingCheckIn} - {cor.existingCheckOut})</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Requested Correction:</span> <span className="font-bold text-emerald-700">Present ({cor.requestedCheckIn} - {cor.requestedCheckOut})</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 pt-1">
                    <strong>Reason:</strong> "{cor.reason}"
                  </p>
                  {cor.supportingDoc && (
                    <a href={cor.supportingDoc} target="_blank" rel="noreferrer" className="text-xs text-saath-600 font-bold underline inline-flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5" /> View Supporting Transit/Medical Proof Document
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setProcessCorrectionModal(cor);
                      setCorrectionActionType('reject');
                    }}
                    className="px-3.5 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      setProcessCorrectionModal(cor);
                      setCorrectionActionType('request_info');
                    }}
                    className="px-3.5 py-2 rounded-xl border border-amber-200 text-amber-700 hover:bg-amber-50 font-bold text-xs"
                  >
                    Request Info
                  </button>
                  <button
                    onClick={() => {
                      setProcessCorrectionModal(cor);
                      setCorrectionActionType('approve');
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-xs shadow-md shadow-emerald-600/30"
                  >
                    Approve Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: ADD ATTENDANCE MANUALLY */}
      {isAddManualModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-extrabold text-slate-900">Add Attendance Record Manually</h3>
            <p className="text-xs text-slate-500 mt-1">Create an administrative attendance record for an employee.</p>

            <form onSubmit={handleAddManualSubmit} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Employee *</label>
                <select
                  value={manualForm.employeeId}
                  onChange={e => setManualForm({...manualForm, employeeId: e.target.value})}
                  className="w-full rounded-xl border p-2.5 bg-white font-medium"
                >
                  {employees.map(e => <option key={e.id} value={e.id}>{e.fullName} ({e.id})</option>)}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Date *</label>
                <input type="date" value={manualForm.date} onChange={e => setManualForm({...manualForm, date: e.target.value})} className="w-full rounded-xl border p-2.5" />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Status</label>
                <select value={manualForm.status} onChange={e => setManualForm({...manualForm, status: e.target.value})} className="w-full rounded-xl border p-2.5 bg-white">
                  <option value="Present">Present</option>
                  <option value="Late">Late</option>
                  <option value="Half Day">Half Day</option>
                  <option value="Absent">Absent</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Work From Home">Work From Home</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Check-In Time</label>
                  <input type="text" value={manualForm.checkIn} onChange={e => setManualForm({...manualForm, checkIn: e.target.value})} className="w-full rounded-xl border p-2" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Check-Out Time</label>
                  <input type="text" value={manualForm.checkOut} onChange={e => setManualForm({...manualForm, checkOut: e.target.value})} className="w-full rounded-xl border p-2" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mandatory Administrative Reason *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Reason for manual attendance creation for audit log..."
                  value={manualForm.reason}
                  onChange={e => setManualForm({...manualForm, reason: e.target.value})}
                  className="w-full rounded-xl border p-2 font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setIsAddManualModal(false)} className="px-4 py-2 rounded-xl border font-bold text-slate-600">Cancel</button>
                <button type="submit" disabled={!manualForm.reason.trim()} className="px-4 py-2 rounded-xl bg-saath-600 text-white font-bold disabled:opacity-50">Create Record</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT ATTENDANCE / QUICK MARK STATUS */}
      {editRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-extrabold text-slate-900">Admin Attendance Override</h3>
            <p className="text-xs text-slate-500 mt-1">Record: {editRecord.employeeName} on {editRecord.date}</p>

            <div className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Quick Mark Status</label>
                <select value={editStatus} onChange={e => setEditStatus(e.target.value)} className="w-full rounded-xl border p-2.5 bg-white font-bold">
                  <option value="Present">Present</option>
                  <option value="Late">Late</option>
                  <option value="Half Day">Half Day</option>
                  <option value="Absent">Absent</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Work From Home">Work From Home</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Check-In Time</label>
                  <input type="text" value={editCheckIn} onChange={e => setEditCheckIn(e.target.value)} className="w-full rounded-xl border p-2 font-mono" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Check-Out Time</label>
                  <input type="text" value={editCheckOut} onChange={e => setEditCheckOut(e.target.value)} className="w-full rounded-xl border p-2 font-mono" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mandatory Override Reason *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Specify reason for audit log entry..."
                  value={editReason}
                  onChange={e => setEditReason(e.target.value)}
                  className="w-full rounded-xl border p-2 font-medium"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
              <button onClick={() => setEditRecord(null)} className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-600">Cancel</button>
              <button onClick={handleSaveEdit} disabled={!editReason.trim()} className="px-4 py-2 rounded-xl bg-saath-600 text-xs font-bold text-white disabled:opacity-50">Save Override</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: VIEW ATTENDANCE DETAILS */}
      {viewRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 text-xs space-y-3">
            <h3 className="text-base font-extrabold text-slate-900 border-b pb-2">Attendance Detailed View</h3>
            <div><strong className="text-slate-500">Employee:</strong> <span className="font-bold text-slate-900">{viewRecord.employeeName} ({viewRecord.employeeId})</span></div>
            <div><strong className="text-slate-500">Date:</strong> <span className="font-bold text-slate-900">{viewRecord.date}</span></div>
            <div><strong className="text-slate-500">Check-in / Check-out:</strong> <span className="font-mono font-bold text-saath-700">{viewRecord.checkIn} - {viewRecord.checkOut}</span></div>
            <div><strong className="text-slate-500">Duration:</strong> <span className="font-bold text-slate-900">{viewRecord.duration}</span></div>
            <div><strong className="text-slate-500">Status:</strong> <span className="font-bold text-emerald-700">{viewRecord.status}</span></div>
            <div><strong className="text-slate-500">Geo & IP Info:</strong> <span className="font-mono text-slate-700">{viewRecord.location} (IP 192.168.1.45)</span></div>
            {viewRecord.adminNote && <div><strong className="text-slate-500">Admin Note:</strong> <p className="p-2 rounded-xl bg-amber-50 text-amber-900 font-medium mt-1">{viewRecord.adminNote}</p></div>}
            <div className="flex justify-end pt-3">
              <button onClick={() => setViewRecord(null)} className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: ADD ADMINISTRATIVE NOTE */}
      {adminNoteRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 text-xs">
            <h3 className="text-base font-extrabold text-slate-900">Add Administrative Note</h3>
            <p className="text-slate-500 mt-0.5">Note for {adminNoteRecord.employeeName} on {adminNoteRecord.date}</p>
            <textarea
              rows={3}
              placeholder="Type persistent administrative note..."
              value={adminNoteText}
              onChange={e => setAdminNoteText(e.target.value)}
              className="w-full rounded-xl border p-2.5 font-medium mt-3"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setAdminNoteRecord(null)} className="px-4 py-2 rounded-xl border font-bold text-slate-600">Cancel</button>
              <button onClick={handleSaveAdminNote} className="px-4 py-2 rounded-xl bg-saath-600 text-white font-bold">Save Note</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: SECTION 11 — ATTENDANCE RULES CONFIGURATION */}
      {isRulesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 my-8">
            <h3 className="text-lg font-extrabold text-slate-900">Section 11 — Enterprise Attendance Rules Config</h3>
            <p className="text-xs text-slate-500 mt-0.5">Configure office start/end times, grace period, WFH rules, auto absence, and location checks.</p>

            <form onSubmit={handleSaveRulesSubmit} className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Office Start Time</label>
                  <input type="time" value={rulesForm.officeStartTime} onChange={e => setRulesForm({...rulesForm, officeStartTime: e.target.value})} className="w-full rounded-xl border p-2" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Office End Time</label>
                  <input type="time" value={rulesForm.officeEndTime} onChange={e => setRulesForm({...rulesForm, officeEndTime: e.target.value})} className="w-full rounded-xl border p-2" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Grace Period (Minutes)</label>
                  <input type="number" value={rulesForm.gracePeriodMinutes} onChange={e => setRulesForm({...rulesForm, gracePeriodMinutes: Number(e.target.value)})} className="w-full rounded-xl border p-2" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Auto Absence Time</label>
                  <input type="time" value={rulesForm.autoAbsenceTime} onChange={e => setRulesForm({...rulesForm, autoAbsenceTime: e.target.value})} className="w-full rounded-xl border p-2" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Min Full-Day Working Hours</label>
                  <input type="number" value={rulesForm.minFullDayHours} onChange={e => setRulesForm({...rulesForm, minFullDayHours: Number(e.target.value)})} className="w-full rounded-xl border p-2" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Min Half-Day Working Hours</label>
                  <input type="number" value={rulesForm.minHalfDayHours} onChange={e => setRulesForm({...rulesForm, minHalfDayHours: Number(e.target.value)})} className="w-full rounded-xl border p-2" />
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t">
                <label className="flex items-center gap-2 font-bold cursor-pointer">
                  <input type="checkbox" checked={rulesForm.allowWFH} onChange={e => setRulesForm({...rulesForm, allowWFH: e.target.checked})} className="h-4 w-4 rounded text-saath-600" />
                  Allow Work From Home (WFH) Status Marking
                </label>
                <label className="flex items-center gap-2 font-bold cursor-pointer">
                  <input type="checkbox" checked={rulesForm.strictLocationCheck} onChange={e => setRulesForm({...rulesForm, strictLocationCheck: e.target.checked})} className="h-4 w-4 rounded text-saath-600" />
                  Enforce Strict Geo-Location & WiFi Session Capture
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button type="button" onClick={() => setIsRulesModal(false)} className="px-4 py-2 rounded-xl border font-bold text-slate-600">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-saath-600 text-white font-bold">Save Company Settings</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 6: SECTION 12 — PROCESS CORRECTION WORKFLOW */}
      {processCorrectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 text-xs">
            <h3 className="text-base font-extrabold text-slate-900">Process Attendance Correction Request</h3>
            <p className="text-slate-500 mt-0.5">{processCorrectionModal.employeeName} ({processCorrectionModal.date})</p>

            <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <p><strong>Existing:</strong> {processCorrectionModal.existingStatus} ({processCorrectionModal.existingCheckIn})</p>
              <p><strong>Requested:</strong> Present ({processCorrectionModal.requestedCheckIn})</p>
              <p><strong>Reason:</strong> "{processCorrectionModal.reason}"</p>
            </div>

            <div className="mt-3">
              <label className="block font-bold text-slate-700 mb-1">Administrative Review Note / Instructions *</label>
              <textarea
                rows={3}
                placeholder="Review note for audit log..."
                value={correctionReviewNote}
                onChange={e => setCorrectionReviewNote(e.target.value)}
                className="w-full rounded-xl border p-2.5 font-medium"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setProcessCorrectionModal(null)} className="px-4 py-2 rounded-xl border font-bold text-slate-600">Cancel</button>
              <button onClick={handleProcessCorrection} className="px-4 py-2 rounded-xl bg-saath-600 text-white font-bold">Confirm Action</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
