import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  initialCurrentUser,
  initialEmployees,
  initialDailyAttendance,
  initialAttendanceCorrections,
  initialLeaveRequests,
  initialRemoteWorkRequests,
  initialGoals,
  initialPerformanceReviews,
  initialFeedback,
  initialProbationReviews,
  initialRecruitmentRequests,
  initialHRRequests,
  initialOffboardingRequests,
  initialAnnouncements,
  initialNotifications,
  initialCalendarEvents
} from '../data/mockData';

const HRContext = createContext(null);

export const HRProvider = ({ children }) => {
  const loadInitial = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`saath_manager_${key}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        const str = JSON.stringify(parsed);
        if (str.includes('EMP-00') || str.includes('Anjali Mehta') || str.includes('Rahul Das') || str.includes('Priya Nair') || str.includes('Sneha Iyer')) {
          localStorage.removeItem(`saath_manager_${key}`);
          return fallback;
        }
        return parsed;
      }
      return fallback;
    } catch (e) {
      console.error(`Error loading key saath_manager_${key}:`, e);
      return fallback;
    }
  };

  const saveState = (key, val) => {
    try {
      localStorage.setItem(`saath_manager_${key}`, JSON.stringify(val));
    } catch (e) {
      console.error(`Error saving key saath_manager_${key}:`, e);
    }
  };

  // Auth & Current Manager Profile
  const [currentUser, setCurrentUser] = useState(initialCurrentUser);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  // Entities State
  const [teamMembers, setTeamMembers] = useState(() => loadInitial('team_members', initialEmployees));
  const [dailyAttendance, setDailyAttendance] = useState(() => loadInitial('daily_attendance', initialDailyAttendance));
  const [attendanceCorrections, setAttendanceCorrections] = useState(() => loadInitial('attendance_corrections', initialAttendanceCorrections));
  const [leaveRequests, setLeaveRequests] = useState(() => loadInitial('leave_requests', initialLeaveRequests));
  const [remoteWorkRequests, setRemoteWorkRequests] = useState(() => loadInitial('remote_work_requests', initialRemoteWorkRequests));
  const [goals, setGoals] = useState(() => loadInitial('goals', initialGoals));
  const [performanceReviews, setPerformanceReviews] = useState(() => loadInitial('performance_reviews', initialPerformanceReviews));
  const [feedback, setFeedback] = useState(() => loadInitial('feedback', initialFeedback));
  const [probationReviews, setProbationReviews] = useState(() => loadInitial('probation_reviews', initialProbationReviews));
  const [recruitmentRequests, setRecruitmentRequests] = useState(() => loadInitial('recruitment_requests', initialRecruitmentRequests));
  const [hrRequests, setHRRequests] = useState(() => loadInitial('hr_requests', initialHRRequests));
  const [offboardingRequests, setOffboardingRequests] = useState(() => loadInitial('offboarding_requests', initialOffboardingRequests));
  const [announcements, setAnnouncements] = useState(() => loadInitial('announcements', initialAnnouncements));
  const [notifications, setNotifications] = useState(() => loadInitial('notifications', initialNotifications));
  const [calendarEvents, setCalendarEvents] = useState(() => loadInitial('calendar_events', initialCalendarEvents));

  // Sync to Supabase where applicable & fallback to initial dataset
  const fetchSupabaseTeamData = async () => {
    try {
      const { data: dbEmps } = await supabase
        .from('employee_profiles')
        .select('*, departments(name), designations(name)');
      
      if (dbEmps && dbEmps.length > 0) {
        const filtered = dbEmps.map(emp => ({
          id: emp.id,
          employeeId: emp.employee_code || emp.employee_id || emp.id,
          fullName: emp.full_name,
          officialEmail: emp.official_email,
          mobileNumber: emp.mobile_number,
          departmentId: emp.department_id,
          departmentName: emp.departments?.name || 'Engineering',
          designationId: emp.designation_id,
          designationName: emp.designations?.name || 'Developer',
          reportingManagerId: emp.reporting_manager_id,
          joiningDate: emp.joining_date,
          employmentType: emp.employment_type || 'Full-Time',
          workLocation: emp.work_location || 'Bengaluru Tech Hub',
          accountStatus: emp.account_status || 'Active',
          avatar: emp.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          todayStatus: 'Present',
          checkIn: '09:00 AM',
          checkOut: '06:00 PM'
        }));
        setTeamMembers(filtered);
      }
    } catch (e) {
      console.warn('Using local dataset for Manager team data:', e.message);
    }
  };

  useEffect(() => {
    fetchSupabaseTeamData();
  }, []);

  // Helper Methods & Actions
  const hasPermission = () => true;

  // Leave Actions
  const approveLeaveRequest = (id) => {
    const updated = leaveRequests.map(r => r.id === id ? { ...r, status: 'Approved' } : r);
    setLeaveRequests(updated);
    saveState('leave_requests', updated);
  };

  const rejectLeaveRequest = (id) => {
    const updated = leaveRequests.map(r => r.id === id ? { ...r, status: 'Rejected' } : r);
    setLeaveRequests(updated);
    saveState('leave_requests', updated);
  };

  const requestInfoLeaveRequest = (id) => {
    const updated = leaveRequests.map(r => r.id === id ? { ...r, status: 'Info Requested' } : r);
    setLeaveRequests(updated);
    saveState('leave_requests', updated);
  };

  // Correction Actions
  const approveCorrection = (id) => {
    const updated = attendanceCorrections.map(c => c.id === id ? { ...c, status: 'Approved' } : c);
    setAttendanceCorrections(updated);
    saveState('attendance_corrections', updated);
  };

  const rejectCorrection = (id) => {
    const updated = attendanceCorrections.map(c => c.id === id ? { ...c, status: 'Rejected' } : c);
    setAttendanceCorrections(updated);
    saveState('attendance_corrections', updated);
  };

  const requestInfoCorrection = (id) => {
    const updated = attendanceCorrections.map(c => c.id === id ? { ...c, status: 'Info Requested' } : c);
    setAttendanceCorrections(updated);
    saveState('attendance_corrections', updated);
  };

  // Remote Work Actions
  const approveRemoteWork = (id) => {
    const updated = remoteWorkRequests.map(w => w.id === id ? { ...w, status: 'Approved' } : w);
    setRemoteWorkRequests(updated);
    saveState('remote_work_requests', updated);
  };

  const rejectRemoteWork = (id) => {
    const updated = remoteWorkRequests.map(w => w.id === id ? { ...w, status: 'Rejected' } : w);
    setRemoteWorkRequests(updated);
    saveState('remote_work_requests', updated);
  };

  const addRemoteWorkRequest = (req) => {
    const newReq = {
      id: `WFH-${Date.now()}`,
      status: 'Pending',
      appliedOn: new Date().toISOString().split('T')[0],
      ...req
    };
    const updated = [newReq, ...remoteWorkRequests];
    setRemoteWorkRequests(updated);
    saveState('remote_work_requests', updated);
  };

  // Goal Actions
  const createGoal = (goal) => {
    const newGoal = {
      id: `GOL-${Date.now()}`,
      progress: 0,
      status: 'In Progress',
      ...goal
    };
    const updated = [newGoal, ...goals];
    setGoals(updated);
    saveState('goals', updated);
  };

  const updateGoalProgress = (id, progress, status) => {
    const updated = goals.map(g => g.id === id ? { ...g, progress, status: status || g.status } : g);
    setGoals(updated);
    saveState('goals', updated);
  };

  // Feedback Actions
  const addFeedback = (fb) => {
    const newFb = {
      id: `FDB-${Date.now()}`,
      givenBy: currentUser.fullName,
      createdAt: new Date().toISOString().split('T')[0],
      ...fb
    };
    const updated = [newFb, ...feedback];
    setFeedback(updated);
    saveState('feedback', updated);
  };

  // Probation Actions
  const submitProbationRecommendation = (id, recommendation, justification, extensionMonths = 0) => {
    const updated = probationReviews.map(p => p.id === id ? {
      ...p,
      recommendation,
      justification,
      extensionMonths,
      status: 'Submitted to HR'
    } : p);
    setProbationReviews(updated);
    saveState('probation_reviews', updated);
  };

  // Recruitment Actions
  const createRecruitmentRequest = (req) => {
    const newReq = {
      id: `REC-${Date.now()}`,
      department: currentUser.departmentName,
      status: 'Submitted',
      createdDate: new Date().toISOString().split('T')[0],
      ...req
    };
    const updated = [newReq, ...recruitmentRequests];
    setRecruitmentRequests(updated);
    saveState('recruitment_requests', updated);
  };

  // HR Requests Actions
  const createHRRequest = (req) => {
    const newReq = {
      id: `HRR-${Date.now()}`,
      status: 'Submitted',
      createdDate: new Date().toISOString().split('T')[0],
      hrResponse: 'Under HR Review',
      ...req
    };
    const updated = [newReq, ...hrRequests];
    setHRRequests(updated);
    saveState('hr_requests', updated);
  };

  // Offboarding Clearance Actions
  const updateOffboardingClearance = (id, field, value) => {
    const updated = offboardingRequests.map(o => o.id === id ? { ...o, [field]: value } : o);
    setOffboardingRequests(updated);
    saveState('offboarding_requests', updated);
  };

  // Notifications Actions
  const markNotificationRead = (id) => {
    const updated = notifications.map(n => n.id === id ? { ...n, isRead: true } : n);
    setNotifications(updated);
    saveState('notifications', updated);
  };

  const markAllNotificationsRead = () => {
    const updated = notifications.map(n => ({ ...n, isRead: true }));
    setNotifications(updated);
    saveState('notifications', updated);
  };

  // Add Calendar Event
  const addCalendarEvent = (evt) => {
    const newEvt = {
      id: `EVT-${Date.now()}`,
      ...evt
    };
    const updated = [...calendarEvents, newEvt];
    setCalendarEvents(updated);
    saveState('calendar_events', updated);
  };

  // Add Team Announcement
  const addTeamAnnouncement = (ann) => {
    const newAnn = {
      id: `ANC-${Date.now()}`,
      audience: `${currentUser.departmentName} Team`,
      createdBy: currentUser.fullName,
      createdDate: new Date().toISOString().split('T')[0],
      ...ann
    };
    const updated = [newAnn, ...announcements];
    setAnnouncements(updated);
    saveState('announcements', updated);
  };

  return (
    <HRContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAuthenticated,
        authLoading,
        hasPermission,
        employees: teamMembers, // Alias teamMembers as employees for compatibility
        teamMembers,
        dailyAttendance,
        attendanceCorrections,
        leaveRequests,
        remoteWorkRequests,
        goals,
        performanceReviews,
        feedback,
        probationReviews,
        recruitmentRequests,
        hrRequests,
        offboardingRequests,
        announcements,
        notifications,
        calendarEvents,

        // Actions
        approveLeaveRequest,
        rejectLeaveRequest,
        requestInfoLeaveRequest,

        approveCorrection,
        rejectCorrection,
        requestInfoCorrection,

        approveRemoteWork,
        rejectRemoteWork,
        addRemoteWorkRequest,

        createGoal,
        updateGoalProgress,

        addFeedback,
        submitProbationRecommendation,

        createRecruitmentRequest,
        createHRRequest,
        updateOffboardingClearance,

        markNotificationRead,
        markAllNotificationsRead,
        addCalendarEvent,
        addTeamAnnouncement
      }}
    >
      {children}
    </HRContext.Provider>
  );
};

export const useHR = () => {
  const context = useContext(HRContext);
  if (!context) {
    throw new Error('useHR must be used within an HRProvider');
  }
  return context;
};
