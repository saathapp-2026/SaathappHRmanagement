import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialCurrentUser,
  initialRoles,
  initialDepartments,
  initialDesignations,
  initialEmployees,
  initialAttendanceRules,
  initialDailyAttendance,
  initialAttendanceCorrections,
  initialLeaveTypes,
  initialLeaveBalances,
  initialLeaveRequests,
  initialConcerns,
  initialDocuments,
  initialCalendarEvents,
  initialAnnouncements,
  initialNotifications,
  initialAuditLogs,
  initialCompanySettings,
  initialProfileChangeRequests
} from '../data/mockData';

const HRContext = createContext(null);

export const HRProvider = ({ children }) => {
  // Helper to load or set default state in localStorage
  const loadInitial = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`saath_hr_clean_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      console.error(`Error loading key saath_hr_clean_${key}:`, e);
      return fallback;
    }
  };

  // Auth State
  const [currentUser, setCurrentUser] = useState(() => loadInitial('currentUser', initialCurrentUser));
  const [isAuthenticated, setIsAuthenticated] = useState(() => loadInitial('isAuthenticated', true));
  const [sessionExpired, setSessionExpired] = useState(false);

  // System Entities State
  const [roles, setRoles] = useState(() => loadInitial('roles', initialRoles));
  const [departments, setDepartments] = useState(() => loadInitial('departments', initialDepartments));
  const [designations, setDesignations] = useState(() => loadInitial('designations', initialDesignations));
  const [employees, setEmployees] = useState(() => loadInitial('employees', initialEmployees));
  
  // Attendance & Leave State
  const [attendanceRules, setAttendanceRules] = useState(() => loadInitial('attendanceRules', initialAttendanceRules));
  const [dailyAttendance, setDailyAttendance] = useState(() => loadInitial('dailyAttendance', initialDailyAttendance));
  const [attendanceCorrections, setAttendanceCorrections] = useState(() => loadInitial('attendanceCorrections', initialAttendanceCorrections));
  const [leaveTypes, setLeaveTypes] = useState(() => loadInitial('leaveTypes', initialLeaveTypes));
  const [leaveBalances, setLeaveBalances] = useState(() => loadInitial('leaveBalances', initialLeaveBalances));
  const [leaveRequests, setLeaveRequests] = useState(() => loadInitial('leaveRequests', initialLeaveRequests));
  
  // HR Support & Docs State
  const [concerns, setConcerns] = useState(() => loadInitial('concerns', initialConcerns));
  const [documents, setDocuments] = useState(() => loadInitial('documents', initialDocuments));
  const [calendarEvents, setCalendarEvents] = useState(() => loadInitial('calendarEvents', initialCalendarEvents));
  const [announcements, setAnnouncements] = useState(() => loadInitial('announcements', initialAnnouncements));
  
  // System Logs & Settings
  const [notifications, setNotifications] = useState(() => loadInitial('notifications', initialNotifications));
  const [auditLogs, setAuditLogs] = useState(() => loadInitial('auditLogs', initialAuditLogs));
  const [companySettings, setCompanySettings] = useState(() => loadInitial('companySettings', initialCompanySettings));

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('saath_hr_clean_currentUser', JSON.stringify(currentUser));
      localStorage.setItem('saath_hr_clean_isAuthenticated', JSON.stringify(isAuthenticated));
      localStorage.setItem('saath_hr_clean_roles', JSON.stringify(roles));
      localStorage.setItem('saath_hr_clean_departments', JSON.stringify(departments));
      localStorage.setItem('saath_hr_clean_designations', JSON.stringify(designations));
      localStorage.setItem('saath_hr_clean_employees', JSON.stringify(employees));
      localStorage.setItem('saath_hr_clean_attendanceRules', JSON.stringify(attendanceRules));
      localStorage.setItem('saath_hr_clean_dailyAttendance', JSON.stringify(dailyAttendance));
      localStorage.setItem('saath_hr_clean_attendanceCorrections', JSON.stringify(attendanceCorrections));
      localStorage.setItem('saath_hr_clean_leaveTypes', JSON.stringify(leaveTypes));
      localStorage.setItem('saath_hr_clean_leaveBalances', JSON.stringify(leaveBalances));
      localStorage.setItem('saath_hr_clean_leaveRequests', JSON.stringify(leaveRequests));
      localStorage.setItem('saath_hr_clean_concerns', JSON.stringify(concerns));
      localStorage.setItem('saath_hr_clean_documents', JSON.stringify(documents));
      localStorage.setItem('saath_hr_clean_calendarEvents', JSON.stringify(calendarEvents));
      localStorage.setItem('saath_hr_clean_announcements', JSON.stringify(announcements));
      localStorage.setItem('saath_hr_clean_notifications', JSON.stringify(notifications));
      localStorage.setItem('saath_hr_clean_auditLogs', JSON.stringify(auditLogs));
      localStorage.setItem('saath_hr_clean_companySettings', JSON.stringify(companySettings));
    } catch (e) {
      console.error("Error saving to localStorage", e);
    }
  }, [
    currentUser, isAuthenticated, roles, departments, designations, employees,
    attendanceRules, dailyAttendance, attendanceCorrections, leaveTypes, leaveBalances,
    leaveRequests, concerns, documents, calendarEvents, announcements, notifications,
    auditLogs, companySettings
  ]);

  // Mandatory Audit Logging Function
  const addAuditLog = (action, affectedEntity, oldValue, newValue, reason = 'Administrative update') => {
    const newLog = {
      id: `AUD-${Date.now()}`,
      action,
      affectedEntity,
      oldValue: oldValue || 'N/A',
      newValue: newValue || 'N/A',
      changedBy: currentUser ? currentUser.fullName : 'System Admin',
      adminRole: currentUser ? currentUser.role : 'Super Admin',
      date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      reason,
      ipAddress: '192.168.1.100',
      sessionInfo: 'Chrome / Windows 11'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Notification helper
  const addNotification = (title, message, type = 'system', targetUrl = '/dashboard') => {
    const newNotif = {
      id: `NTF-${Date.now()}`,
      title,
      message,
      date: 'Just now',
      isRead: false,
      type,
      targetUrl
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Auth Methods
  const login = (email, password, remember = true) => {
    if (email === 'admin@saathhr.com' && password === 'admin123') {
      setCurrentUser(initialCurrentUser);
      setIsAuthenticated(true);
      setSessionExpired(false);
      addAuditLog('Admin Login', 'User Session', 'Logged Out', 'Logged In', 'Successful admin authentication');
      return { success: true };
    }
    // Allow manager/hr role testing credentials
    if (email === 'hr@saathhr.com' && password === 'hr123') {
      const hrUser = { ...initialCurrentUser, id: 'ADM-002', fullName: 'Priya Mehta', email: 'hr@saathhr.com', role: 'HR/Admin' };
      setCurrentUser(hrUser);
      setIsAuthenticated(true);
      setSessionExpired(false);
      addAuditLog('HR Login', 'User Session', 'Logged Out', 'Logged In', 'Successful HR login');
      return { success: true };
    }
    if (email === 'manager@saathhr.com' && password === 'manager123') {
      const mgrUser = { ...initialCurrentUser, id: 'ADM-003', fullName: 'Vikram Malhotra', email: 'manager@saathhr.com', role: 'Department Manager', departmentId: 'DEP-001' };
      setCurrentUser(mgrUser);
      setIsAuthenticated(true);
      setSessionExpired(false);
      addAuditLog('Manager Login', 'User Session', 'Logged Out', 'Logged In', 'Successful Manager login');
      return { success: true };
    }
    return { success: false, message: 'Invalid official email or password.' };
  };

  const logout = () => {
    addAuditLog('Admin Logout', 'User Session', 'Active Session', 'Logged Out', 'User initiated logout');
    setIsAuthenticated(false);
  };

  const switchRole = (newRole) => {
    const updatedUser = { ...currentUser, role: newRole };
    setCurrentUser(updatedUser);
    addAuditLog('Role Switch (Demo)', 'Admin User', currentUser.role, newRole, 'Admin preview mode switch');
  };

  // Employee Actions
  const addEmployee = (newEmp) => {
    const generatedId = `EMP-2026-${String(employees.length + 1).padStart(3, '0')}`;
    const fullEmpRecord = {
      id: generatedId,
      ...newEmp,
      accountStatus: 'Invited',
      attendanceStatus: 'Not Checked In',
      avatar: newEmp.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };
    setEmployees(prev => [fullEmpRecord, ...prev]);
    // Initialize default leave balance
    setLeaveBalances(prev => [
      ...prev,
      { employeeId: generatedId, casualAllocated: 12, casualUsed: 0, sickAllocated: 12, sickUsed: 0, earnedAllocated: 15, earnedUsed: 0, emergencyAllocated: 5, emergencyUsed: 0, unpaidUsed: 0 }
    ]);
    addAuditLog('Employee Created', `${generatedId} (${newEmp.fullName})`, 'None', 'Invited', `Added employee to ${newEmp.departmentName}`);
    addNotification('New Employee Created', `${newEmp.fullName} (${generatedId}) invited to Saath HR`, 'system', '/employees');
    return fullEmpRecord;
  };

  const updateEmployeeStatus = (employeeId, newStatus, reason) => {
    const emp = employees.find(e => e.id === employeeId);
    if (!emp) return;
    const oldStatus = emp.accountStatus;
    setEmployees(prev => prev.map(e => e.id === employeeId ? { ...e, accountStatus: newStatus } : e));
    addAuditLog(`Employee Status ${newStatus}`, `${employeeId} (${emp.fullName})`, oldStatus, newStatus, reason);
    addNotification('Employee Status Changed', `${emp.fullName}'s account status updated to ${newStatus}`, 'system', '/employees');
  };

  const resendInvitation = (employeeId) => {
    const emp = employees.find(e => e.id === employeeId);
    if (emp) {
      addAuditLog('Invitation Resent', `${employeeId} (${emp.fullName})`, 'Invited', 'Invited', 'Admin manually resent onboarding invitation email');
      addNotification('Invitation Sent', `Onboarding email resent to ${emp.officialEmail}`, 'system', '/employees');
    }
  };

  const verifyEmployeeProfile = (employeeId) => {
    const emp = employees.find(e => e.id === employeeId);
    if (emp) {
      setEmployees(prev => prev.map(e => e.id === employeeId ? { ...e, accountStatus: 'Active' } : e));
      addAuditLog('Profile Verified', `${employeeId} (${emp.fullName})`, emp.accountStatus, 'Active', 'Admin verified employee profile information');
      addNotification('Profile Verified', `${emp.fullName}'s account is now Active`, 'system', '/employees');
    }
  };

  // Department & Designation Actions
  const addDepartment = (deptData) => {
    const newDept = {
      id: `DEP-${String(departments.length + 1).padStart(3, '0')}`,
      ...deptData,
      employeeCount: 0,
      status: 'Active',
      createdDate: new Date().toISOString().split('T')[0]
    };
    setDepartments(prev => [...prev, newDept]);
    addAuditLog('Department Created', newDept.name, 'None', 'Active', 'New department created');
  };

  const addDesignation = (desigData) => {
    const newDesig = {
      id: `DES-${String(designations.length + 1).padStart(3, '0')}`,
      ...desigData,
      employeeCount: 0
    };
    setDesignations(prev => [...prev, newDesig]);
    addAuditLog('Designation Created', newDesig.name, 'None', 'Active', 'New designation created');
  };

  // Attendance Actions
  const addManualAttendance = (recordData) => {
    const newAtt = {
      id: `ATT-2026-${String(dailyAttendance.length + 1).padStart(3, '0')}`,
      ...recordData,
      correctionStatus: 'None'
    };
    setDailyAttendance(prev => [newAtt, ...prev]);
    addAuditLog('Manual Attendance Created', `${newAtt.employeeId} on ${newAtt.date}`, 'None', newAtt.status, recordData.reason || 'Manually added by Admin');
    addNotification('Manual Attendance Added', `Marked ${newAtt.employeeName} as ${newAtt.status} for ${newAtt.date}`, 'attendance', '/attendance');
    return newAtt;
  };

  const updateAttendanceRecord = (attendanceId, newStatus, checkIn, checkOut, reason) => {
    const rec = dailyAttendance.find(a => a.id === attendanceId);
    if (!rec) return;
    const oldStatus = rec.status;
    setDailyAttendance(prev => prev.map(a => a.id === attendanceId ? { ...a, status: newStatus, checkIn, checkOut } : a));
    addAuditLog('Attendance Override', `${rec.employeeId} on ${rec.date}`, oldStatus, newStatus, reason);
    addNotification('Attendance Record Updated', `Marked ${rec.employeeName} as ${newStatus}`, 'attendance', '/attendance');
  };

  const addAttendanceAdminNote = (attendanceId, adminNote) => {
    const rec = dailyAttendance.find(a => a.id === attendanceId);
    if (!rec) return;
    setDailyAttendance(prev => prev.map(a => a.id === attendanceId ? { ...a, adminNote } : a));
    addAuditLog('Attendance Note Added', `${rec.employeeId} on ${rec.date}`, 'No Note', adminNote, 'Admin added administrative note');
  };

  const requestCorrectionInfo = (correctionId, promptMessage) => {
    const cor = attendanceCorrections.find(c => c.id === correctionId);
    if (!cor) return;
    setAttendanceCorrections(prev => prev.map(c => c.id === correctionId ? {
      ...c,
      status: 'Under Review',
      reviewNote: promptMessage,
      reviewerName: currentUser.fullName,
      reviewDate: new Date().toLocaleString()
    } : c));
    addAuditLog('Correction Info Requested', `${cor.employeeId} on ${cor.date}`, 'Pending', 'Under Review', promptMessage);
    addNotification('Info Requested', `HR requested details for attendance correction on ${cor.date}`, 'attendance', '/attendance');
  };

  const approveAttendanceCorrection = (correctionId, reviewNote) => {
    const cor = attendanceCorrections.find(c => c.id === correctionId);
    if (!cor) return;
    setAttendanceCorrections(prev => prev.map(c => c.id === correctionId ? {
      ...c,
      status: 'Approved',
      reviewNote,
      reviewerName: currentUser.fullName,
      reviewDate: new Date().toLocaleString()
    } : c));

    // Update main daily attendance record
    setDailyAttendance(prev => prev.map(a => a.id === cor.attendanceId ? {
      ...a,
      status: 'Present',
      checkIn: cor.requestedCheckIn,
      checkOut: cor.requestedCheckOut,
      correctionStatus: 'Approved'
    } : a));

    addAuditLog('Attendance Correction Approved', `${cor.employeeId} date ${cor.date}`, cor.existingStatus, 'Present', reviewNote || 'Correction request verified and approved');
    addNotification('Correction Approved', `Approved attendance correction for ${cor.employeeName}`, 'attendance', '/approvals');
  };

  const rejectAttendanceCorrection = (correctionId, reviewNote) => {
    const cor = attendanceCorrections.find(c => c.id === correctionId);
    if (!cor) return;
    setAttendanceCorrections(prev => prev.map(c => c.id === correctionId ? {
      ...c,
      status: 'Rejected',
      reviewNote,
      reviewerName: currentUser.fullName,
      reviewDate: new Date().toLocaleString()
    } : c));

    setDailyAttendance(prev => prev.map(a => a.id === cor.attendanceId ? { ...a, correctionStatus: 'Rejected' } : a));
    addAuditLog('Attendance Correction Rejected', `${cor.employeeId} date ${cor.date}`, 'Pending', 'Rejected', reviewNote || 'Insufficient proof provided');
    addNotification('Correction Rejected', `Rejected attendance correction for ${cor.employeeName}`, 'attendance', '/approvals');
  };

  // Leave Actions
  const approveLeaveRequest = (requestId) => {
    const req = leaveRequests.find(r => r.id === requestId);
    if (!req) return;

    setLeaveRequests(prev => prev.map(r => r.id === requestId ? {
      ...r,
      status: 'Approved',
      reviewerName: currentUser.fullName,
      reviewDate: new Date().toLocaleString()
    } : r));

    // Deduct leave balance
    setLeaveBalances(prev => prev.map(b => {
      if (b.employeeId === req.employeeId) {
        if (req.leaveTypeName.includes('Casual')) return { ...b, casualUsed: b.casualUsed + req.daysCount };
        if (req.leaveTypeName.includes('Sick')) return { ...b, sickUsed: b.sickUsed + req.daysCount };
        if (req.leaveTypeName.includes('Earned')) return { ...b, earnedUsed: b.earnedUsed + req.daysCount };
        if (req.leaveTypeName.includes('Emergency')) return { ...b, emergencyUsed: b.emergencyUsed + req.daysCount };
      }
      return b;
    }));

    // Add to Calendar
    setCalendarEvents(prev => [...prev, {
      id: `CAL-LEAVE-${req.id}`,
      title: `${req.employeeName} (${req.leaveTypeName})`,
      eventType: 'Leave',
      startDate: req.startDate,
      endDate: req.endDate,
      targetAudience: 'Department',
      departmentId: req.departmentName,
      description: `Approved leave for ${req.daysCount} day(s)`
    }]);

    addAuditLog('Leave Request Approved', `${req.employeeName} (${req.leaveTypeName})`, 'Pending Approval', 'Approved', `Approved for period ${req.startDate} to ${req.endDate}`);
    addNotification('Leave Approved', `Approved leave request for ${req.employeeName}`, 'leave', '/approvals');
  };

  const rejectLeaveRequest = (requestId, rejectionReason) => {
    const req = leaveRequests.find(r => r.id === requestId);
    if (!req) return;

    setLeaveRequests(prev => prev.map(r => r.id === requestId ? {
      ...r,
      status: 'Rejected',
      reviewerName: currentUser.fullName,
      reviewDate: new Date().toLocaleString(),
      rejectionReason
    } : r));

    addAuditLog('Leave Request Rejected', `${req.employeeName} (${req.leaveTypeName})`, 'Pending Approval', 'Rejected', rejectionReason || 'Operational constraint');
    addNotification('Leave Rejected', `Rejected leave request for ${req.employeeName}`, 'leave', '/approvals');
  };

  const submitLeaveRequest = (reqData) => {
    const generatedId = `LEV-2026-${String(leaveRequests.length + 1).padStart(4, '0')}`;
    const fullReq = {
      id: generatedId,
      ...reqData,
      status: 'Pending',
      submissionDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      reviewerName: '',
      reviewDate: '',
      rejectionReason: ''
    };
    setLeaveRequests(prev => [fullReq, ...prev]);
    addAuditLog('Leave Request Submitted', `${fullReq.employeeName} (${fullReq.leaveTypeName})`, 'None', 'Pending Approval', `Period: ${fullReq.startDate} to ${fullReq.endDate} (${fullReq.daysCount} days)`);
    addNotification('New Leave Request', `${fullReq.employeeName} submitted ${fullReq.leaveTypeName} request for ${fullReq.daysCount} day(s)`, 'leave', '/approvals');
    return fullReq;
  };

  const cancelLeaveRequest = (requestId, cancellationReason) => {
    const req = leaveRequests.find(r => r.id === requestId);
    if (!req) return;

    setLeaveRequests(prev => prev.map(r => r.id === requestId ? {
      ...r,
      status: 'Cancelled',
      cancellationReason,
      reviewDate: new Date().toLocaleString()
    } : r));

    addAuditLog('Leave Request Cancelled', `${req.employeeName} (${req.id})`, req.status, 'Cancelled', cancellationReason || 'Cancelled by employee/admin');
    addNotification('Leave Request Cancelled', `Leave request ${req.id} was cancelled`, 'leave', '/leave');
  };

  const adjustLeaveBalance = (employeeId, leaveTypeKey, newAllocated, reason) => {
    setLeaveBalances(prev => prev.map(b => b.employeeId === employeeId ? { ...b, [leaveTypeKey]: Number(newAllocated) } : b));
    addAuditLog('Leave Balance Adjusted', `Employee ${employeeId} - ${leaveTypeKey}`, 'Previous Allocation', newAllocated, reason);
  };

  // Concerns & Help Desk Actions
  const updateConcernStatus = (ticketId, newStatus, internalNote = '') => {
    setConcerns(prev => prev.map(c => {
      if (c.id === ticketId) {
        const notes = internalNote ? [...c.internalNotes, { author: currentUser.fullName, note: internalNote, date: new Date().toLocaleString() }] : c.internalNotes;
        return { ...c, status: newStatus, internalNotes: notes, updatedDate: new Date().toLocaleString() };
      }
      return c;
    }));
    addAuditLog('Ticket Status Changed', ticketId, 'Status Update', newStatus, internalNote || 'Ticket workflow update');
    addNotification('Ticket Updated', `Ticket ${ticketId} status changed to ${newStatus}`, 'concern', '/concerns');
  };

  const addPublicResponseToConcern = (ticketId, responseText) => {
    setConcerns(prev => prev.map(c => {
      if (c.id === ticketId) {
        const resps = [...c.publicResponses, { sender: `${currentUser.fullName} (${currentUser.role})`, text: responseText, date: new Date().toLocaleString() }];
        return { ...c, publicResponses: resps, updatedDate: new Date().toLocaleString() };
      }
      return c;
    }));
    addAuditLog('Ticket Response Added', ticketId, 'Open', 'Responded', 'Posted public HR reply to employee');
  };

  const submitConcern = (concernData) => {
    const generatedId = `CON-2026-${String(concerns.filter(c => c.type === 'Concern').length + 128).padStart(6, '0')}`;
    const newTicket = {
      id: generatedId,
      type: 'Concern',
      status: 'Open',
      createdDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      updatedDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      publicResponses: [],
      internalNotes: [],
      ...concernData
    };
    setConcerns(prev => [newTicket, ...prev]);
    addAuditLog('Concern Ticket Created', generatedId, 'None', 'Open', `Subject: ${newTicket.subject}`);
    addNotification('New Formal Concern', `Concern ${generatedId} filed by ${newTicket.employeeName}`, 'concern', '/concerns');
    return newTicket;
  };

  const submitHelpRequest = (helpData) => {
    const generatedId = `HLP-2026-${String(concerns.filter(c => c.type === 'Help').length + 15).padStart(4, '0')}`;
    const newTicket = {
      id: generatedId,
      type: 'Help',
      status: 'Submitted',
      createdDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      updatedDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      publicResponses: [],
      internalNotes: [],
      ...helpData
    };
    setConcerns(prev => [newTicket, ...prev]);
    addAuditLog('Help Request Submitted', generatedId, 'None', 'Submitted', `Category: ${newTicket.category}`);
    addNotification('New Help Request', `Help Request ${generatedId} submitted by ${newTicket.employeeName}`, 'concern', '/concerns');
    return newTicket;
  };

  const assignHrRepresentative = (ticketId, hrEmpId, hrEmpName) => {
    setConcerns(prev => prev.map(c => {
      if (c.id === ticketId) {
        return {
          ...c,
          assignedHrId: hrEmpId,
          assignedHrName: hrEmpName,
          status: c.status === 'Submitted' ? 'Assigned' : c.status,
          updatedDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
        };
      }
      return c;
    }));
    addAuditLog('Ticket Representative Assigned', ticketId, 'Unassigned', hrEmpName, 'Assigned HR representative to ticket');
  };

  const requestMoreInfo = (ticketId, infoPromptText) => {
    setConcerns(prev => prev.map(c => {
      if (c.id === ticketId) {
        const resps = [...c.publicResponses, {
          sender: `${currentUser.fullName} (${currentUser.role})`,
          text: `[INFORMATION REQUIRED]: ${infoPromptText}`,
          date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
        }];
        return {
          ...c,
          status: 'Under Review',
          publicResponses: resps,
          updatedDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
        };
      }
      return c;
    }));
    addAuditLog('Requested Information on Ticket', ticketId, 'Open', 'Under Review', infoPromptText);
    addNotification('Information Requested', `HR requested additional details for ticket ${ticketId}`, 'concern', '/concerns');
  };

  // Document Verification Actions
  const verifyDocument = (docId, note) => {
    const doc = documents.find(d => d.id === docId);
    if (!doc) return;

    setDocuments(prev => prev.map(d => d.id === docId ? {
      ...d,
      status: 'Verified',
      verifiedBy: currentUser.fullName,
      verificationDate: new Date().toISOString().split('T')[0],
      note
    } : d));

    addAuditLog('Document Verified', `${doc.fileName} (${doc.employeeName})`, doc.status, 'Verified', note || 'Document verified by HR');
    addNotification('Document Verified', `Verified ${doc.documentType} for ${doc.employeeName}`, 'document', '/documents');
  };

  const rejectDocument = (docId, note) => {
    const doc = documents.find(d => d.id === docId);
    if (!doc) return;

    setDocuments(prev => prev.map(d => d.id === docId ? {
      ...d,
      status: 'Rejected',
      verifiedBy: currentUser.fullName,
      verificationDate: new Date().toISOString().split('T')[0],
      note
    } : d));

    addAuditLog('Document Rejected', `${doc.fileName} (${doc.employeeName})`, doc.status, 'Rejected', note || 'Rejection reason recorded');
    addNotification('Document Rejected', `Rejected ${doc.documentType} for ${doc.employeeName}`, 'document', '/documents');
  };

  const uploadDocument = (docData) => {
    const newDoc = {
      id: `DOC-2026-${String(documents.length + 1).padStart(2, '0')}`,
      ...docData,
      uploadDate: new Date().toISOString().split('T')[0],
      status: docData.status || 'Pending Verification',
      verifiedBy: docData.status === 'Verified' ? currentUser.fullName : '',
      verificationDate: docData.status === 'Verified' ? new Date().toISOString().split('T')[0] : '',
      note: docData.note || 'Uploaded by Admin'
    };
    setDocuments(prev => [newDoc, ...prev]);
    addAuditLog('Document Uploaded', `${newDoc.fileName} (${newDoc.employeeName})`, 'None', newDoc.status, `Uploaded ${newDoc.documentType}`);
    addNotification('Document Uploaded', `Uploaded ${newDoc.documentType} for ${newDoc.employeeName}`, 'document', `/documents`);
    return newDoc;
  };

  // Calendar & Announcements
  const addCalendarEvent = (eventData) => {
    const newEvt = { id: `CAL-${Date.now()}`, ...eventData };
    setCalendarEvents(prev => [...prev, newEvt]);
    addAuditLog('Calendar Event Created', newEvt.title, 'None', newEvt.eventType, `Target audience: ${newEvt.targetAudience}`);
    addNotification('Calendar Event Added', `${newEvt.title} scheduled for ${newEvt.startDate}`, 'system', '/calendar');
  };

  const addAnnouncement = (annData) => {
    const newAnn = {
      id: `ANC-2026-${String(announcements.length + 1).padStart(2, '0')}`,
      ...annData,
      publishedDate: new Date().toLocaleString(),
      authorName: `${currentUser.fullName} (${currentUser.role})`
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    addAuditLog('Announcement Published', newAnn.title, 'Draft', 'Published', `Target audience: ${newAnn.audience}`);
    addNotification('New Company Announcement', newAnn.title, 'system', '/announcements');
  };

  // Profile Change Requests State
  const [profileChangeRequests, setProfileChangeRequests] = useState(() => loadInitial('profileChangeRequests', initialProfileChangeRequests));

  // Additional sync
  useEffect(() => {
    try {
      localStorage.setItem('saath_hr_profileChangeRequests', JSON.stringify(profileChangeRequests));
    } catch (e) {
      console.error("Error saving profileChangeRequests to localStorage", e);
    }
  }, [profileChangeRequests]);

  // Admin Direct Edit of Restricted Employee Fields
  const updateEmployeeRestrictedFields = (employeeId, fieldsObj, reason) => {
    const emp = employees.find(e => e.id === employeeId);
    if (!emp) return;

    setEmployees(prev => prev.map(e => e.id === employeeId ? { ...e, ...fieldsObj } : e));
    addAuditLog(
      'Restricted Profile Fields Updated',
      `${employeeId} (${emp.fullName})`,
      'Previous Admin Fields',
      JSON.stringify(fieldsObj),
      reason || 'Direct Admin edit of restricted fields'
    );
    addNotification('Employee Profile Updated', `Restricted fields updated for ${emp.fullName}`, 'system', `/employees/${employeeId}`);
  };

  // Approve Profile Field Change Request
  const approveProfileChangeRequest = (requestId) => {
    const req = profileChangeRequests.find(r => r.id === requestId);
    if (!req) return;

    setProfileChangeRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'Approved' } : r));

    // Map field change to employee
    let fieldKey = 'designationName';
    if (req.fieldName === 'Department') fieldKey = 'departmentName';
    if (req.fieldName === 'Salary') fieldKey = 'salary';
    if (req.fieldName === 'Joining Date') fieldKey = 'joiningDate';
    if (req.fieldName === 'Work Location') fieldKey = 'workLocation';

    setEmployees(prev => prev.map(e => e.id === req.employeeId ? { ...e, [fieldKey]: req.requestedValue } : e));

    addAuditLog('Profile Change Request Approved', `${req.employeeId} (${req.employeeName})`, `${req.fieldName}: ${req.oldValue}`, `New Value: ${req.requestedValue}`, 'Approved by Admin');
    addNotification('Profile Change Approved', `Approved ${req.fieldName} update for ${req.employeeName}`, 'system', `/employees/${req.employeeId}`);
  };

  // Reject Profile Field Change Request
  const rejectProfileChangeRequest = (requestId, rejectionReason) => {
    const req = profileChangeRequests.find(r => r.id === requestId);
    if (!req) return;

    setProfileChangeRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'Rejected', rejectionReason } : r));
    addAuditLog('Profile Change Request Rejected', `${req.employeeId} (${req.employeeName})`, 'Pending Approval', 'Rejected', rejectionReason || 'Operational rejection');
    addNotification('Profile Change Rejected', `Rejected ${req.fieldName} change request for ${req.employeeName}`, 'system', `/employees/${req.employeeId}`);
  };

  // Notification methods
  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  // RBAC Permission Check
  const hasPermission = (moduleName) => {
    if (!isAuthenticated) return false;
    if (currentUser.role === 'Super Admin') return true;
    if (currentUser.role === 'HR/Admin') {
      const allowedModules = ['dashboard', 'employees', 'attendance', 'leave', 'approvals', 'concerns', 'documents', 'calendar', 'announcements', 'reports'];
      return allowedModules.includes(moduleName);
    }
    if (currentUser.role === 'Department Manager') {
      const allowedModules = ['dashboard', 'employees', 'attendance', 'leave', 'approvals', 'calendar', 'concerns'];
      return allowedModules.includes(moduleName);
    }
    return false;
  };

  return (
    <HRContext.Provider
      value={{
        // State
        currentUser,
        isAuthenticated,
        sessionExpired,
        roles,
        departments,
        designations,
        employees,
        attendanceRules,
        dailyAttendance,
        attendanceCorrections,
        leaveTypes,
        leaveBalances,
        leaveRequests,
        concerns,
        documents,
        calendarEvents,
        announcements,
        notifications,
        auditLogs,
        companySettings,
        profileChangeRequests,

        // Auth
        login,
        logout,
        switchRole,
        setSessionExpired,
        hasPermission,

        // Mutations
        addAuditLog,
        addNotification,
        addEmployee,
        updateEmployeeStatus,
        resendInvitation,
        verifyEmployeeProfile,
        addDepartment,
        addDesignation,
        addManualAttendance,
        updateAttendanceRecord,
        addAttendanceAdminNote,
        requestCorrectionInfo,
        approveAttendanceCorrection,
        rejectAttendanceCorrection,
        setAttendanceRules,
        approveLeaveRequest,
        rejectLeaveRequest,
        submitLeaveRequest,
        cancelLeaveRequest,
        adjustLeaveBalance,
        updateConcernStatus,
        addPublicResponseToConcern,
        submitConcern,
        submitHelpRequest,
        assignHrRepresentative,
        requestMoreInfo,
        verifyDocument,
        rejectDocument,
        uploadDocument,
        addCalendarEvent,
        addAnnouncement,
        markNotificationRead,
        markAllNotificationsRead,
        setCompanySettings,
        updateEmployeeRestrictedFields,
        approveProfileChangeRequest,
        rejectProfileChangeRequest
      }}
    >
      {children}
    </HRContext.Provider>
  );
};

export const useHR = () => {
  const context = useContext(HRContext);
  if (!context) throw new Error('useHR must be used within an HRProvider');
  return context;
};
