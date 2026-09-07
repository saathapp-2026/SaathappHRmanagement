// Initial Dataset for Saath HR Management Admin & HR Portal (Clean State)

export const initialCurrentUser = {
  id: 'ADM-001',
  employeeId: 'EMP-2026-001',
  fullName: 'Rajesh Sharma',
  email: 'admin@saathhr.com',
  role: 'Super Admin', // 'Super Admin', 'HR/Admin', 'Department Manager', 'Employee'
  departmentId: 'DEP-002',
  departmentName: 'Human Resources',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  permissions: ['all']
};

export const initialRoles = [
  { id: 'ROLE-001', name: 'Super Admin', description: 'Complete system control across all modules and security settings', userCount: 1 },
  { id: 'ROLE-002', name: 'HR/Admin', description: 'Manages employee records, attendance, leaves, concerns, and documents', userCount: 0 },
  { id: 'ROLE-003', name: 'Department Manager', description: 'Access to department team attendance, leave approvals, and reviews', userCount: 0 },
  { id: 'ROLE-004', name: 'Employee', description: 'Self-service access only (restricted from Admin portal)', userCount: 0 }
];

export const initialDepartments = [];

export const initialDesignations = [];

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
  { id: 'LT-003', name: 'Earned Leave', code: 'EL', defaultAllocation: 15, carryForwardAllowed: true, maxConsecutiveDays: 10, requiresAttachment: false, status: 'Active' },
  { id: 'LT-004', name: 'Emergency Leave', code: 'EML', defaultAllocation: 5, carryForwardAllowed: false, maxConsecutiveDays: 2, requiresAttachment: false, status: 'Active' },
  { id: 'LT-005', name: 'Unpaid Leave', code: 'LWP', defaultAllocation: 0, carryForwardAllowed: false, maxConsecutiveDays: 30, requiresAttachment: true, status: 'Active' }
];

export const initialLeaveBalances = [
  { employeeId: 'EMP-2026-001', casualAllocated: 12, casualUsed: 0, sickAllocated: 12, sickUsed: 0, earnedAllocated: 15, earnedUsed: 0, emergencyAllocated: 5, emergencyUsed: 0, unpaidUsed: 0 }
];

export const initialLeaveRequests = [];

export const initialConcerns = [];

export const initialDocuments = [];

export const initialCalendarEvents = [];

export const initialAnnouncements = [];

export const initialNotifications = [];

export const initialAuditLogs = [];

export const initialCompanySettings = {
  companyName: 'Saath HR Technologies Pvt Ltd',
  logoUrl: '/saath-logo.png',
  address: '10th Floor, Saath Tower, BKC Financial Center, Mumbai - 400051',
  contactEmail: 'contact@saathhr.com',
  contactPhone: '+91 22 6789 0000',
  timeZone: 'Asia/Kolkata (IST +5:30)',
  dateFormat: 'DD/MM/YYYY',
  workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  passwordMinLength: 8,
  sessionTimeoutMinutes: 60,
  require2FA: false,
  failedLoginThreshold: 5
};

export const initialProfileChangeRequests = [];
