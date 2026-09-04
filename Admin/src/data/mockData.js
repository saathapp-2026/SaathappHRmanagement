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

export const initialDepartments = [
  { id: 'DEP-001', name: 'Engineering & Technology', code: 'ENG', headEmployeeId: '', headName: '', employeeCount: 0, status: 'Active', createdDate: '2025-01-15' },
  { id: 'DEP-002', name: 'Human Resources', code: 'HR', headEmployeeId: 'EMP-2026-001', headName: 'Rajesh Sharma', employeeCount: 1, status: 'Active', createdDate: '2025-01-15' },
  { id: 'DEP-003', name: 'Operations & Logistics', code: 'OPS', headEmployeeId: '', headName: '', employeeCount: 0, status: 'Active', createdDate: '2025-02-01' },
  { id: 'DEP-004', name: 'Sales & Business Dev', code: 'SBD', headEmployeeId: '', headName: '', employeeCount: 0, status: 'Active', createdDate: '2025-02-10' },
  { id: 'DEP-005', name: 'Finance & Accounting', code: 'FIN', headEmployeeId: '', headName: '', employeeCount: 0, status: 'Active', createdDate: '2025-03-01' }
];

export const initialDesignations = [
  { id: 'DES-001', name: 'Chief Technology Officer', departmentId: 'DEP-001', departmentName: 'Engineering & Technology', level: 'Executive', employeeCount: 0 },
  { id: 'DES-002', name: 'Senior Software Engineer', departmentId: 'DEP-001', departmentName: 'Engineering & Technology', level: 'Senior', employeeCount: 0 },
  { id: 'DES-003', name: 'Frontend Developer', departmentId: 'DEP-001', departmentName: 'Engineering & Technology', level: 'Mid', employeeCount: 0 },
  { id: 'DES-004', name: 'HR Manager', departmentId: 'DEP-002', departmentName: 'Human Resources', level: 'Lead', employeeCount: 1 },
  { id: 'DES-005', name: 'HR Executive', departmentId: 'DEP-002', departmentName: 'Human Resources', level: 'Mid', employeeCount: 0 },
  { id: 'DES-006', name: 'Operations Lead', departmentId: 'DEP-003', departmentName: 'Operations & Logistics', level: 'Lead', employeeCount: 0 },
  { id: 'DES-007', name: 'Logistics Executive', departmentId: 'DEP-003', departmentName: 'Operations & Logistics', level: 'Junior', employeeCount: 0 },
  { id: 'DES-008', name: 'Sales Director', departmentId: 'DEP-004', departmentName: 'Sales & Business Dev', level: 'Executive', employeeCount: 0 },
  { id: 'DES-009', name: 'Business Dev Executive', departmentId: 'DEP-004', departmentName: 'Sales & Business Dev', level: 'Mid', employeeCount: 0 }
];

export const initialEmployees = [
  {
    id: 'EMP-2026-001',
    fullName: 'Rajesh Sharma',
    officialEmail: 'admin@saathhr.com',
    mobileNumber: '+91 98765 43210',
    departmentId: 'DEP-002',
    departmentName: 'Human Resources',
    designationId: 'DES-004',
    designationName: 'HR Director',
    reportingManagerId: 'EMP-2026-001',
    reportingManagerName: 'Self (Super Admin)',
    joiningDate: '2024-01-10',
    employmentType: 'Full-Time',
    workLocation: 'Head Office - Mumbai',
    accountStatus: 'Active',
    attendanceStatus: 'Present',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    address: 'Flat 402, Sea View Apartments, Bandra West, Mumbai - 400050',
    emergencyContact: 'Sunita Sharma (Wife) - +91 98765 43211',
    salary: '₹ 18,50,000 / annum'
  }
];

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
