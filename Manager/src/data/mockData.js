// Initial Dataset for SaathApp Manager Portal

export const initialCurrentUser = {
  id: 'MGR-001',
  employeeId: 'MGR-001',
  fullName: 'Rohit Mehta',
  email: 'rohit.mehta@saathapp.com',
  role: 'Engineering Manager',
  departmentId: 'DEP-ENG',
  departmentName: 'Engineering',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  permissions: ['manager']
};

export const initialRoles = [
  { id: 'ROLE-003', name: 'Engineering Manager', description: 'Manages engineering team members, attendance, leaves, goals and reviews', userCount: 1 }
];

export const initialDepartments = [
  { id: 'DEP-ENG', name: 'Engineering', code: 'ENG', headEmployeeId: 'MGR-001', headName: 'Rohit Mehta', status: 'Active' }
];

export const initialDesignations = [
  { id: 'DES-ENG-MGR', name: 'Engineering Manager', departmentId: 'DEP-ENG', departmentName: 'Engineering', level: 'Senior' },
  { id: 'DES-SR-DEV', name: 'Senior Software Engineer', departmentId: 'DEP-ENG', departmentName: 'Engineering', level: 'Mid' },
  { id: 'DES-FE-DEV', name: 'Frontend Developer', departmentId: 'DEP-ENG', departmentName: 'Engineering', level: 'Junior' },
  { id: 'DES-QA', name: 'QA Engineer', departmentId: 'DEP-ENG', departmentName: 'Engineering', level: 'Junior' }
];

export const initialEmployees = [];

export const initialAttendanceRules = {
  officeStartTime: '09:00',
  officeEndTime: '18:00',
  gracePeriodMinutes: 15,
  minFullDayHours: 8,
  minHalfDayHours: 4,
  autoAbsenceTime: '11:00',
  defaultWeeklyOffs: ['Saturday', 'Sunday'],
  allowWFH: true,
  strictLocationCheck: true,
  allowedLocations: ['Head Office - Mumbai', 'Tech Hub - Bengaluru', 'Remote']
};

export const initialDailyAttendance = [];

export const initialAttendanceCorrections = [];

export const initialLeaveTypes = [
  { id: 'LT-001', name: 'Casual Leave', code: 'CL', defaultAllocation: 12, carryForwardAllowed: false, maxConsecutiveDays: 3, requiresAttachment: false, status: 'Active' },
  { id: 'LT-002', name: 'Sick Leave', code: 'SL', defaultAllocation: 12, carryForwardAllowed: true, maxConsecutiveDays: 5, requiresAttachment: true, status: 'Active' },
  { id: 'LT-003', name: 'Earned Leave', code: 'EL', defaultAllocation: 15, carryForwardAllowed: true, maxConsecutiveDays: 10, requiresAttachment: false, status: 'Active' }
];

export const initialLeaveBalances = [];

export const initialLeaveRequests = [];

export const initialRemoteWorkRequests = [];

export const initialGoals = [];

export const initialPerformanceReviews = [];

export const initialFeedback = [];

export const initialProbationReviews = [];

export const initialRecruitmentRequests = [];

export const initialHRRequests = [];

export const initialOffboardingRequests = [];

export const initialAnnouncements = [];

export const initialNotifications = [];

export const initialCalendarEvents = [
  { id: 'EVT-001', title: 'Bakrid Holiday', type: 'Holiday', date: '2026-06-17', description: 'Company Holiday' },
  { id: 'EVT-002', title: 'Annual Health Check-up', type: 'Company Event', date: '2026-06-20', description: 'All Employees' },
  { id: 'EVT-003', title: 'Team Building Event', type: 'Team Event', date: '2026-06-28', description: 'Bengaluru Office' }
];
