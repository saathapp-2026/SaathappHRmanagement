import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  initialCurrentUser,
  initialRoles,
  initialDepartments,
  initialDesignations,
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
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);

  // System Entities State
  const [roles, setRoles] = useState(() => loadInitial('roles', initialRoles));

  // Supabase Departments & Designations State
  const [departments, setDepartments] = useState([]);
  const [departmentsLoading, setDepartmentsLoading] = useState(true);
  const [departmentsError, setDepartmentsError] = useState(null);

  const [designations, setDesignations] = useState([]);
  const [designationsLoading, setDesignationsLoading] = useState(true);
  const [designationsError, setDesignationsError] = useState(null);

  // Supabase Employees State
  const [employees, setEmployees] = useState([]);
  const [employeesLoading, setEmployeesLoading] = useState(true);
  const [employeesError, setEmployeesError] = useState(null);

  const fetchDepartments = async () => {
    setDepartmentsLoading(true);
    setDepartmentsError(null);
    try {
      const { data, error } = await supabase
        .from('departments')
        .select('*, employee_profiles(full_name)')
        .order('name');

      if (error) {
        console.error('Error fetching departments from Supabase:', error);
        setDepartmentsError(error.message || 'Failed to fetch departments');
        setDepartments([]);
      } else {
        const formatted = (data || []).map(dept => ({
          id: dept.id,
          name: dept.name || '',
          code: dept.code || (dept.name ? dept.name.substring(0, 3).toUpperCase() : 'DEP'),
          headEmployeeId: dept.head_employee_id || dept.headEmployeeId || '',
          headName: dept.employee_profiles?.full_name || dept.head_name || dept.headName || 'Unassigned',
          status: 'Active',
          createdDate: dept.created_at ? dept.created_at.split('T')[0] : '2026-01-01',
          ...dept
        }));
        setDepartments(formatted);
      }
    } catch (err) {
      console.error('Unexpected error fetching departments:', err);
      setDepartmentsError(err.message || 'Failed to fetch departments');
      setDepartments([]);
    } finally {
      setDepartmentsLoading(false);
    }
  };

  const fetchDesignations = async () => {
    setDesignationsLoading(true);
    setDesignationsError(null);
    try {
      const { data, error } = await supabase
        .from('designations')
        .select('*, departments(id, name)')
        .order('name');

      if (error) {
        console.error('Error fetching designations from Supabase:', error);
        setDesignationsError(error.message || 'Failed to fetch designations');
        setDesignations([]);
      } else {
        const formatted = (data || []).map(desig => ({
          id: desig.id,
          name: desig.name || '',
          departmentId: desig.department_id || desig.departmentId || desig.departments?.id || '',
          departmentName: desig.departments?.name || desig.department_name || desig.departmentName || 'General',
          level: desig.level || 'Mid',
          ...desig
        }));
        setDesignations(formatted);
      }
    } catch (err) {
      console.error('Unexpected error fetching designations:', err);
      setDesignationsError(err.message || 'Failed to fetch designations');
      setDesignations([]);
    } finally {
      setDesignationsLoading(false);
    }
  };

  const fetchEmployees = async () => {
    setEmployeesLoading(true);
    setEmployeesError(null);
    try {
      const { data, error } = await supabase
        .from('employee_profiles')
        .select(`
          *,
          departments ( id, name ),
          designations ( id, name )
        `);

      if (error) {
        console.error('Error fetching employees from Supabase:', error);
        setEmployeesError(error.message || 'Failed to fetch employees');
        setEmployees([]);
      } else {
        const formatted = (data || []).map(emp => ({
          id: emp.id,
          fullName: emp.full_name || emp.fullName || '',
          officialEmail: emp.official_email || emp.officialEmail || '',
          mobileNumber: emp.mobile_number || emp.mobileNumber || '',
          departmentId: emp.department_id || emp.departmentId || emp.departments?.id || '',
          departmentName: emp.departments?.name || emp.department_name || emp.departmentName || '',
          designationId: emp.designation_id || emp.designationId || emp.designations?.id || '',
          designationName: emp.designations?.name || emp.designation_name || emp.designationName || '',
          reportingManagerId: emp.reporting_manager_id || emp.reportingManagerId || '',
          reportingManagerName: emp.reporting_manager_name || emp.reportingManagerName || '',
          joiningDate: emp.joining_date || emp.joiningDate || '',
          employmentType: emp.employment_type || emp.employmentType || '',
          workLocation: emp.work_location || emp.workLocation || '',
          accountStatus: emp.account_status || emp.accountStatus || 'Active',
          avatar: emp.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          ...emp
        }));
        setEmployees(formatted);
      }
    } catch (err) {
      console.error('Unexpected error fetching employees:', err);
      setEmployeesError(err.message || 'Failed to fetch employees');
      setEmployees([]);
    } finally {
      setEmployeesLoading(false);
    }
  };

  const fetchAllData = async () => {
    await Promise.all([
      fetchEmployees(),
      fetchDepartments(),
      fetchDesignations(),
      fetchAttendanceRecords(),
      fetchAttendanceCorrections()
    ]);
  };

  useEffect(() => {
    const checkSession = async () => {
      setAuthLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const authUser = session.user;
          const { data: profile } = await supabase
            .from('employee_profiles')
            .select('*, departments ( id, name ), designations ( id, name )')
            .eq('user_id', authUser.id)
            .maybeSingle();

          const loggedInUser = {
            id: profile?.id || authUser.id,
            userId: authUser.id,
            employeeId: profile?.employee_id || profile?.id || 'ADM-001',
            fullName: profile?.full_name || profile?.fullName || authUser.email?.split('@')[0] || 'Admin User',
            email: profile?.official_email || authUser.email,
            role: profile?.role || 'Super Admin',
            departmentId: profile?.department_id || profile?.departments?.id || '',
            departmentName: profile?.departments?.name || profile?.department_name || '',
            designationName: profile?.designations?.name || profile?.designation_name || '',
            avatar: profile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            permissions: ['all']
          };

          setCurrentUser(loggedInUser);
          setIsAuthenticated(true);
          await fetchAllData();
        } else {
          setIsAuthenticated(false);
          setCurrentUser(null);
          setEmployees([]);
          setEmployeesLoading(false);
          setDepartments([]);
          setDepartmentsLoading(false);
          setDesignations([]);
          setDesignationsLoading(false);
          setDailyAttendance([]);
          setAttendanceLoading(false);
          setAttendanceCorrections([]);
          setCorrectionsLoading(false);
        }
      } catch (e) {
        console.error('Session check error:', e);
        setIsAuthenticated(false);
        setCurrentUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setIsAuthenticated(false);
        setCurrentUser(null);
        setEmployees([]);
        setDepartments([]);
        setDesignations([]);
        setDailyAttendance([]);
        setAttendanceCorrections([]);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);


  // Attendance & Leave State
  const [attendanceRules, setAttendanceRules] = useState(() => loadInitial('attendanceRules', initialAttendanceRules));
  
  // Supabase Attendance & Corrections State
  const [dailyAttendance, setDailyAttendance] = useState([]);
  const [attendanceLoading, setAttendanceLoading] = useState(true);
  const [attendanceError, setAttendanceError] = useState(null);

  const [attendanceCorrections, setAttendanceCorrections] = useState([]);
  const [correctionsLoading, setCorrectionsLoading] = useState(true);
  const [correctionsError, setCorrectionsError] = useState(null);

  const fetchAttendanceRecords = async () => {
    setAttendanceLoading(true);
    setAttendanceError(null);
    try {
      const { data, error } = await supabase
        .from('attendance_records')
        .select(`
          *,
          employee_profiles ( id, full_name, employee_code, departments ( name ) )
        `)
        .order('attendance_date', { ascending: false });

      if (error) {
        console.error('Error fetching attendance_records from Supabase:', error);
        setAttendanceError(error.message || 'Failed to fetch attendance records');
        setDailyAttendance([]);
      } else {
        const formatted = (data || []).map(rec => ({
          id: rec.id,
          employeeId: rec.employee_profiles?.id || rec.employee_id || '',
          employeeName: rec.employee_profiles?.full_name || rec.employee_name || 'Employee',
          employeeCode: rec.employee_profiles?.employee_code || rec.employeeId || '',
          departmentName: rec.employee_profiles?.departments?.name || rec.department_name || 'General',
          date: rec.attendance_date || rec.date || '',
          checkIn: rec.check_in || rec.checkIn || '-',
          checkOut: rec.check_out || rec.checkOut || '-',
          duration: rec.duration || rec.total_hours || '0h 0m',
          status: rec.status || 'Present',
          location: rec.work_location || rec.location || 'Head Office - Mumbai',
          correctionStatus: rec.correction_status || rec.correctionStatus || 'None',
          adminNote: rec.admin_note || rec.adminNote || '',
          ...rec
        }));
        setDailyAttendance(formatted);
      }
    } catch (err) {
      console.error('Unexpected error fetching attendance records:', err);
      setAttendanceError(err.message || 'Failed to fetch attendance records');
      setDailyAttendance([]);
    } finally {
      setAttendanceLoading(false);
    }
  };

  const fetchAttendanceCorrections = async () => {
    setCorrectionsLoading(true);
    setCorrectionsError(null);
    try {
      const { data, error } = await supabase
        .from('attendance_corrections')
        .select(`
          *,
          employee_profiles ( id, full_name, departments ( name ) )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching attendance_corrections from Supabase:', error);
        setCorrectionsError(error.message || 'Failed to fetch attendance corrections');
        setAttendanceCorrections([]);
      } else {
        const formatted = (data || []).map(cor => ({
          id: cor.id,
          employeeId: cor.employee_profiles?.id || cor.employee_id || '',
          employeeName: cor.employee_profiles?.full_name || cor.employee_name || 'Employee',
          departmentName: cor.employee_profiles?.departments?.name || cor.department_name || 'General',
          attendanceRecordId: cor.attendance_record_id || cor.attendance_id || '',
          date: cor.correction_date || cor.date || '',
          existingStatus: cor.existing_status || 'Absent',
          existingCheckIn: cor.existing_check_in || '-',
          existingCheckOut: cor.existing_check_out || '-',
          requestedCheckIn: cor.requested_check_in || '09:00 AM',
          requestedCheckOut: cor.requested_check_out || '06:00 PM',
          reason: cor.reason || '',
          status: cor.status || 'Pending',
          submissionDate: cor.created_at ? cor.created_at.split('T')[0] : 'Just now',
          reviewNote: cor.review_note || cor.review_reason || '',
          ...cor
        }));
        setAttendanceCorrections(formatted);
      }
    } catch (err) {
      console.error('Unexpected error fetching attendance corrections:', err);
      setCorrectionsError(err.message || 'Failed to fetch attendance corrections');
      setAttendanceCorrections([]);
    } finally {
      setCorrectionsLoading(false);
    }
  };
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
  const login = async (email, password, remember = true) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        return { success: false, message: error.message || 'Invalid official email or password.' };
      }

      const { data: userData } = await supabase.auth.getUser();
      const authUser = userData?.user || data?.user;

      if (authUser) {
        const { data: profile } = await supabase
          .from('employee_profiles')
          .select('*, departments ( id, name ), designations ( id, name )')
          .eq('user_id', authUser.id)
          .maybeSingle();

        const loggedInUser = {
          id: profile?.id || authUser.id,
          userId: authUser.id,
          employeeId: profile?.employee_id || profile?.id || 'ADM-001',
          fullName: profile?.full_name || profile?.fullName || authUser.email?.split('@')[0] || 'Admin User',
          email: profile?.official_email || authUser.email,
          role: profile?.role || 'Super Admin',
          departmentId: profile?.department_id || profile?.departments?.id || '',
          departmentName: profile?.departments?.name || profile?.department_name || '',
          designationName: profile?.designations?.name || profile?.designation_name || '',
          avatar: profile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          permissions: ['all']
        };

        setCurrentUser(loggedInUser);
        setIsAuthenticated(true);
        setSessionExpired(false);
        addAuditLog('Admin Login', 'User Session', 'Logged Out', 'Logged In', `Successful Supabase Auth login for ${authUser.email}`);
        
        await fetchEmployees();
        return { success: true };
      }

      return { success: false, message: 'User session could not be established.' };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, message: err.message || 'Authentication error.' };
    }
  };

  const logout = async () => {
    addAuditLog('Admin Logout', 'User Session', 'Active Session', 'Logged Out', 'User initiated logout');
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setEmployees([]);
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
  const addDepartment = async (deptData) => {
    try {
      const payload = {
        name: deptData.name,
        code: deptData.code || deptData.name.substring(0, 3).toUpperCase()
      };
      if (deptData.headEmployeeId) {
        payload.head_employee_id = deptData.headEmployeeId;
      }
      const { data, error } = await supabase
        .from('departments')
        .insert([payload])
        .select('*, employee_profiles(full_name)');

      if (error) {
        console.error('Error adding department to Supabase:', error);
        throw error;
      }

      addAuditLog('Department Created', deptData.name, 'None', 'Active', 'New department created in database');
      await fetchDepartments();
      return data?.[0];
    } catch (err) {
      console.error('Failed to add department:', err);
      throw err;
    }
  };

  const addDesignation = async (desigData) => {
    try {
      const payload = {
        name: desigData.name,
        department_id: desigData.departmentId || null,
        level: desigData.level || 'Mid'
      };
      const { data, error } = await supabase
        .from('designations')
        .insert([payload])
        .select('*, departments(id, name)');

      if (error) {
        console.error('Error adding designation to Supabase:', error);
        throw error;
      }

      addAuditLog('Designation Created', desigData.name, 'None', 'Active', 'New designation created in database');
      await fetchDesignations();
      return data?.[0];
    } catch (err) {
      console.error('Failed to add designation:', err);
      throw err;
    }
  };

  // Attendance Actions
  const addManualAttendance = async (recordData) => {
    try {
      const payload = {
        employee_id: recordData.employeeId,
        attendance_date: recordData.date || new Date().toISOString().split('T')[0],
        status: recordData.status || 'Present'
      };
      const { data, error } = await supabase
        .from('attendance_records')
        .insert([payload])
        .select(`
          *,
          employee_profiles ( id, full_name, employee_code, departments ( name ) )
        `);

      if (error) {
        console.error('Error adding attendance record to Supabase:', error);
        throw error;
      }

      addAuditLog('Manual Attendance Created', `${recordData.employeeId} on ${recordData.date}`, 'None', recordData.status, recordData.reason || 'Manually added by Admin');
      addNotification('Manual Attendance Added', `Marked ${recordData.employeeName || 'employee'} as ${recordData.status} for ${recordData.date}`, 'attendance', '/attendance');
      await fetchAttendanceRecords();
      return data?.[0];
    } catch (err) {
      console.error('Failed to add manual attendance:', err);
      throw err;
    }
  };

  const updateAttendanceRecord = async (attendanceId, newStatus, checkIn, checkOut, reason) => {
    try {
      const { error } = await supabase
        .from('attendance_records')
        .update({
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', attendanceId);

      if (error) {
        console.error('Error updating attendance record in Supabase:', error);
        throw error;
      }

      addAuditLog('Attendance Override', `Record ${attendanceId}`, 'Previous Status', newStatus, reason);
      addNotification('Attendance Record Updated', `Status updated to ${newStatus}`, 'attendance', '/attendance');
      await fetchAttendanceRecords();
    } catch (err) {
      console.error('Failed to update attendance record:', err);
      throw err;
    }
  };

  const addAttendanceAdminNote = (attendanceId, adminNote) => {
    const rec = dailyAttendance.find(a => a.id === attendanceId);
    if (!rec) return;
    setDailyAttendance(prev => prev.map(a => a.id === attendanceId ? { ...a, adminNote } : a));
    addAuditLog('Attendance Note Added', `${rec.employeeId} on ${rec.date}`, 'No Note', adminNote, 'Admin added administrative note');
  };

  const requestCorrectionInfo = async (correctionId, promptMessage) => {
    try {
      const { error } = await supabase
        .from('attendance_corrections')
        .update({
          status: 'Under Review',
          updated_at: new Date().toISOString()
        })
        .eq('id', correctionId);

      if (error) {
        console.error('Error requesting info for correction in Supabase:', error);
        throw error;
      }

      addAuditLog('Correction Info Requested', `Correction ${correctionId}`, 'Pending', 'Under Review', promptMessage);
      addNotification('Info Requested', `HR requested details for attendance correction ${correctionId}`, 'attendance', '/attendance');
      await fetchAttendanceCorrections();
    } catch (err) {
      console.error('Failed to request correction info:', err);
      throw err;
    }
  };

  const approveAttendanceCorrection = async (correctionId, reviewNote) => {
    try {
      const { error } = await supabase
        .from('attendance_corrections')
        .update({
          status: 'Approved',
          updated_at: new Date().toISOString()
        })
        .eq('id', correctionId);

      if (error) {
        console.error('Error approving attendance correction in Supabase:', error);
        throw error;
      }

      addAuditLog('Attendance Correction Approved', `Correction ${correctionId}`, 'Pending', 'Approved', reviewNote || 'Correction verified and approved');
      addNotification('Correction Approved', `Approved attendance correction ${correctionId}`, 'attendance', '/approvals');
      await Promise.all([
        fetchAttendanceCorrections(),
        fetchAttendanceRecords()
      ]);
    } catch (err) {
      console.error('Failed to approve attendance correction:', err);
      throw err;
    }
  };

  const rejectAttendanceCorrection = async (correctionId, reviewNote) => {
    try {
      const { error } = await supabase
        .from('attendance_corrections')
        .update({
          status: 'Rejected',
          updated_at: new Date().toISOString()
        })
        .eq('id', correctionId);

      if (error) {
        console.error('Error rejecting attendance correction in Supabase:', error);
        throw error;
      }

      addAuditLog('Attendance Correction Rejected', `Correction ${correctionId}`, 'Pending', 'Rejected', reviewNote || 'Insufficient proof provided');
      addNotification('Correction Rejected', `Rejected attendance correction ${correctionId}`, 'attendance', '/approvals');
      await fetchAttendanceCorrections();
    } catch (err) {
      console.error('Failed to reject attendance correction:', err);
      throw err;
    }
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
    if (!isAuthenticated || !currentUser) return false;
    const role = (currentUser.role || '').toLowerCase().trim();

    // Super Admin has full access to all modules
    if (role === 'super_admin' || role === 'super admin') return true;

    // HR Admin permissions
    if (role === 'hr_admin' || role === 'hr/admin' || role === 'hr admin') {
      const allowedModules = ['dashboard', 'employees', 'attendance', 'leave', 'approvals', 'concerns', 'documents', 'calendar', 'announcements', 'reports'];
      return allowedModules.includes(moduleName);
    }

    // Department Manager permissions
    if (role === 'department_manager' || role === 'department manager') {
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
        authLoading,
        sessionExpired,
        roles,
        departments,
        departmentsLoading,
        departmentsError,
        refetchDepartments: fetchDepartments,
        designations,
        designationsLoading,
        designationsError,
        refetchDesignations: fetchDesignations,
        employees,
        employeesLoading,
        employeesError,
        refetchEmployees: fetchEmployees,
        attendanceRules,
        dailyAttendance,
        attendanceLoading,
        attendanceError,
        refetchAttendanceRecords: fetchAttendanceRecords,
        attendanceCorrections,
        correctionsLoading,
        correctionsError,
        refetchAttendanceCorrections: fetchAttendanceCorrections,
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
