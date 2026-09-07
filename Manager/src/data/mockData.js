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

export const initialEmployees = [
  {
    id: 'EMP-001',
    employeeId: 'EMP-001',
    fullName: 'Anjali Mehta',
    officialEmail: 'anjali.m@saathapp.com',
    mobileNumber: '+91 98765 43210',
    departmentId: 'DEP-ENG',
    departmentName: 'Engineering',
    designationId: 'DES-FE-DEV',
    designationName: 'Frontend Developer',
    reportingManagerId: 'MGR-001',
    reportingManagerName: 'Rohit Mehta',
    joiningDate: '2023-06-15',
    employmentType: 'Full-Time',
    workLocation: 'Bengaluru Tech Hub',
    accountStatus: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    todayStatus: 'On Leave',
    checkIn: '-',
    checkOut: '-',
    probationEndDate: '2026-09-15'
  },
  {
    id: 'EMP-002',
    employeeId: 'EMP-002',
    fullName: 'Rahul Das',
    officialEmail: 'rahul.d@saathapp.com',
    mobileNumber: '+91 98765 43211',
    departmentId: 'DEP-ENG',
    departmentName: 'Engineering',
    designationId: 'DES-SR-DEV',
    designationName: 'Senior Software Engineer',
    reportingManagerId: 'MGR-001',
    reportingManagerName: 'Rohit Mehta',
    joiningDate: '2022-03-10',
    employmentType: 'Full-Time',
    workLocation: 'Bengaluru Tech Hub',
    accountStatus: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    todayStatus: 'Late',
    checkIn: '09:42 AM',
    checkOut: '06:30 PM',
    probationEndDate: '2026-09-21'
  },
  {
    id: 'EMP-003',
    employeeId: 'EMP-003',
    fullName: 'Priya Nair',
    officialEmail: 'priya.n@saathapp.com',
    mobileNumber: '+91 98765 43212',
    departmentId: 'DEP-ENG',
    departmentName: 'Engineering',
    designationId: 'DES-SR-DEV',
    designationName: 'Senior Software Engineer',
    reportingManagerId: 'MGR-001',
    reportingManagerName: 'Rohit Mehta',
    joiningDate: '2023-01-20',
    employmentType: 'Full-Time',
    workLocation: 'Remote',
    accountStatus: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    todayStatus: 'Present',
    checkIn: '08:55 AM',
    checkOut: '06:00 PM',
    probationEndDate: '2026-10-01'
  },
  {
    id: 'EMP-004',
    employeeId: 'EMP-004',
    fullName: 'Karan Verma',
    officialEmail: 'karan.v@saathapp.com',
    mobileNumber: '+91 98765 43213',
    departmentId: 'DEP-ENG',
    departmentName: 'Engineering',
    designationId: 'DES-QA',
    designationName: 'QA Engineer',
    reportingManagerId: 'MGR-001',
    reportingManagerName: 'Rohit Mehta',
    joiningDate: '2024-02-01',
    employmentType: 'Full-Time',
    workLocation: 'Bengaluru Tech Hub',
    accountStatus: 'Active',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    todayStatus: 'Present',
    checkIn: '09:02 AM',
    checkOut: '06:15 PM',
    probationEndDate: '2026-10-02'
  },
  {
    id: 'EMP-005',
    employeeId: 'EMP-005',
    fullName: 'Sneha Iyer',
    officialEmail: 'sneha.i@saathapp.com',
    mobileNumber: '+91 98765 43214',
    departmentId: 'DEP-ENG',
    departmentName: 'Engineering',
    designationId: 'DES-FE-DEV',
    designationName: 'Frontend Developer',
    reportingManagerId: 'MGR-001',
    reportingManagerName: 'Rohit Mehta',
    joiningDate: '2023-09-01',
    employmentType: 'Full-Time',
    workLocation: 'Bengaluru Tech Hub',
    accountStatus: 'Active',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    todayStatus: 'On Leave',
    checkIn: '-',
    checkOut: '-'
  },
  {
    id: 'EMP-006',
    employeeId: 'EMP-006',
    fullName: 'Vikram Singh',
    officialEmail: 'vikram.s@saathapp.com',
    mobileNumber: '+91 98765 43215',
    departmentId: 'DEP-ENG',
    departmentName: 'Engineering',
    designationId: 'DES-SR-DEV',
    designationName: 'Senior Software Engineer',
    reportingManagerId: 'MGR-001',
    reportingManagerName: 'Rohit Mehta',
    joiningDate: '2021-11-15',
    employmentType: 'Full-Time',
    workLocation: 'Bengaluru Tech Hub',
    accountStatus: 'Active',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    todayStatus: 'On Leave',
    checkIn: '-',
    checkOut: '-'
  },
  {
    id: 'EMP-007',
    employeeId: 'EMP-007',
    fullName: 'Neha Gupta',
    officialEmail: 'neha.g@saathapp.com',
    mobileNumber: '+91 98765 43216',
    departmentId: 'DEP-ENG',
    departmentName: 'Engineering',
    designationId: 'DES-FE-DEV',
    designationName: 'Frontend Developer',
    reportingManagerId: 'MGR-001',
    reportingManagerName: 'Rohit Mehta',
    joiningDate: '2024-01-10',
    employmentType: 'Full-Time',
    workLocation: 'Remote',
    accountStatus: 'Active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    todayStatus: 'Present',
    checkIn: '09:00 AM',
    checkOut: '06:00 PM'
  },
  {
    id: 'EMP-008',
    employeeId: 'EMP-008',
    fullName: 'Amit Patel',
    officialEmail: 'amit.p@saathapp.com',
    mobileNumber: '+91 98765 43217',
    departmentId: 'DEP-ENG',
    departmentName: 'Engineering',
    designationId: 'DES-QA',
    designationName: 'QA Engineer',
    reportingManagerId: 'MGR-001',
    reportingManagerName: 'Rohit Mehta',
    joiningDate: '2023-04-12',
    employmentType: 'Full-Time',
    workLocation: 'Bengaluru Tech Hub',
    accountStatus: 'Active',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    todayStatus: 'Present',
    checkIn: '08:50 AM',
    checkOut: '05:55 PM'
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

export const initialDailyAttendance = [
  { id: 'ATT-101', employeeId: 'EMP-001', employeeName: 'Anjali Mehta', date: '2026-09-07', checkIn: '-', checkOut: '-', hours: 0, status: 'On Leave', location: 'Home' },
  { id: 'ATT-102', employeeId: 'EMP-002', employeeName: 'Rahul Das', date: '2026-09-07', checkIn: '09:42 AM', checkOut: '06:30 PM', hours: 8.8, status: 'Late', location: 'Bengaluru Office' },
  { id: 'ATT-103', employeeId: 'EMP-003', employeeName: 'Priya Nair', date: '2026-09-07', checkIn: '08:55 AM', checkOut: '06:00 PM', hours: 9.0, status: 'Present', location: 'Remote' },
  { id: 'ATT-104', employeeId: 'EMP-004', employeeName: 'Karan Verma', date: '2026-09-07', checkIn: '09:02 AM', checkOut: '06:15 PM', hours: 9.2, status: 'Present', location: 'Bengaluru Office' },
  { id: 'ATT-105', employeeId: 'EMP-005', employeeName: 'Sneha Iyer', date: '2026-09-07', checkIn: '-', checkOut: '-', hours: 0, status: 'On Leave', location: 'Home' },
  { id: 'ATT-106', employeeId: 'EMP-006', employeeName: 'Vikram Singh', date: '2026-09-07', checkIn: '-', checkOut: '-', hours: 0, status: 'On Leave', location: 'Home' },
  { id: 'ATT-107', employeeId: 'EMP-007', employeeName: 'Neha Gupta', date: '2026-09-07', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: 9.0, status: 'Present', location: 'Remote' },
  { id: 'ATT-108', employeeId: 'EMP-008', employeeName: 'Amit Patel', date: '2026-09-07', checkIn: '08:50 AM', checkOut: '05:55 PM', hours: 9.0, status: 'Present', location: 'Bengaluru Office' }
];

export const initialAttendanceCorrections = [
  {
    id: 'COR-001',
    employeeId: 'EMP-007',
    employeeName: 'Neha Gupta',
    departmentName: 'Engineering',
    date: '2026-09-06',
    existingStatus: 'Absent / Missing Out',
    existingCheckIn: '09:00 AM',
    existingCheckOut: 'Missing',
    requestedCheckIn: '09:00 AM',
    requestedCheckOut: '06:15 PM',
    reason: 'Forgot to check out before leaving the remote session',
    submissionDate: '2026-09-07',
    status: 'Pending'
  }
];

export const initialLeaveTypes = [
  { id: 'LT-001', name: 'Casual Leave', code: 'CL', defaultAllocation: 12, carryForwardAllowed: false, maxConsecutiveDays: 3, requiresAttachment: false, status: 'Active' },
  { id: 'LT-002', name: 'Sick Leave', code: 'SL', defaultAllocation: 12, carryForwardAllowed: true, maxConsecutiveDays: 5, requiresAttachment: true, status: 'Active' },
  { id: 'LT-003', name: 'Earned Leave', code: 'EL', defaultAllocation: 15, carryForwardAllowed: true, maxConsecutiveDays: 10, requiresAttachment: false, status: 'Active' }
];

export const initialLeaveBalances = [
  { employeeId: 'EMP-001', casualAllocated: 12, casualUsed: 3, sickAllocated: 12, sickUsed: 1, earnedAllocated: 15, earnedUsed: 4 },
  { employeeId: 'EMP-002', casualAllocated: 12, casualUsed: 2, sickAllocated: 12, sickUsed: 0, earnedAllocated: 15, earnedUsed: 2 }
];

export const initialLeaveRequests = [
  {
    id: 'LR-101',
    employeeId: 'EMP-001',
    employeeName: 'Anjali Mehta',
    leaveType: 'Casual Leave',
    startDate: '2026-06-18',
    endDate: '2026-06-20',
    daysCount: 3,
    reason: 'Family event and personal work',
    status: 'Pending',
    appliedOn: '2026-06-10',
    availableBalance: 9
  },
  {
    id: 'LR-102',
    employeeId: 'EMP-005',
    employeeName: 'Sneha Iyer',
    leaveType: 'Earned Leave',
    startDate: '2026-06-10',
    endDate: '2026-06-12',
    daysCount: 3,
    reason: 'Vacation',
    status: 'Approved',
    appliedOn: '2026-06-01',
    availableBalance: 11
  },
  {
    id: 'LR-103',
    employeeId: 'EMP-006',
    employeeName: 'Vikram Singh',
    leaveType: 'Sick Leave',
    startDate: '2026-06-09',
    endDate: '2026-06-11',
    daysCount: 3,
    reason: 'Fever and rest',
    status: 'Approved',
    appliedOn: '2026-06-08',
    availableBalance: 12
  }
];

export const initialRemoteWorkRequests = [
  {
    id: 'WFH-001',
    employeeId: 'EMP-007',
    employeeName: 'Neha Gupta',
    requestedDates: '2026-06-16',
    reason: 'Home maintenance & network testing',
    location: 'Bengaluru Residence',
    status: 'Pending',
    appliedOn: '2026-06-11'
  }
];

export const initialGoals = [
  {
    id: 'GOL-001',
    employeeId: 'EMP-001',
    employeeName: 'Anjali Mehta',
    title: 'Complete Employee Portal Backend',
    description: 'Deliver GraphQL APIs and database queries for employee self-service',
    target: '100% Code Coverage & Zero Critical Bugs',
    due: '2026-09-30',
    weight: 30,
    progress: 75,
    status: 'In Progress',
    priority: 'High',
    managerComments: 'Great progress so far on authorization modules.'
  },
  {
    id: 'GOL-002',
    employeeId: 'EMP-002',
    employeeName: 'Rahul Das',
    title: 'Optimize Database Indexing & Query Latency',
    description: 'Reduce attendance query p99 latency to below 50ms',
    target: 'p99 < 50ms',
    due: '2026-10-15',
    weight: 25,
    progress: 40,
    status: 'In Progress',
    priority: 'Medium',
    managerComments: 'Initial profiling complete.'
  }
];

export const initialPerformanceReviews = [
  {
    id: 'REV-001',
    employeeId: 'EMP-001',
    employeeName: 'Anjali Mehta',
    reviewCycle: 'H1 2026',
    workQualityRating: 4.5,
    productivityRating: 4.2,
    communicationRating: 4.8,
    teamworkRating: 4.6,
    overallRating: 4.5,
    strengths: 'Excellent frontend design skills, clean component structure',
    improvementAreas: 'Could take more initiative in architectural discussions',
    comments: 'Consistent top performer in the team',
    recommendedAction: 'Promotion to Senior Frontend Engineer',
    status: 'Manager Review'
  }
];

export const initialFeedback = [
  {
    id: 'FDB-001',
    employeeId: 'EMP-001',
    employeeName: 'Anjali Mehta',
    type: 'positive',
    category: 'great_performance',
    categoryLabel: 'Great Performance',
    content: 'Delivered the authentication revamp ahead of schedule with zero production bugs!',
    givenBy: 'Rohit Mehta',
    createdAt: '2026-09-02'
  },
  {
    id: 'FDB-002',
    employeeId: 'EMP-002',
    employeeName: 'Rahul Das',
    type: 'positive',
    category: 'team_player',
    categoryLabel: 'Team Player',
    content: 'Helped onboard two new junior team members seamlessly during sprint launch.',
    givenBy: 'Rohit Mehta',
    createdAt: '2026-08-28'
  }
];

export const initialProbationReviews = [
  {
    id: 'PRB-001',
    employeeId: 'EMP-001',
    employeeName: 'Anjali Mehta',
    daysRemaining: 8,
    probationEndDate: '2026-09-15',
    recommendation: 'confirm',
    justification: 'Exceeded all performance milestones during 6-month probation period.',
    status: 'Submitted to HR'
  },
  {
    id: 'PRB-002',
    employeeId: 'EMP-002',
    employeeName: 'Rahul Das',
    daysRemaining: 14,
    probationEndDate: '2026-09-21',
    recommendation: 'confirm',
    justification: 'Strong technical contributions and good team collaboration.',
    status: 'Pending'
  },
  {
    id: 'PRB-003',
    employeeId: 'EMP-004',
    employeeName: 'Karan Verma',
    daysRemaining: 25,
    probationEndDate: '2026-10-02',
    recommendation: 'confirm',
    justification: 'Solid QA automation setup.',
    status: 'Pending'
  }
];

export const initialRecruitmentRequests = [
  {
    id: 'REC-001',
    position: 'Frontend Developer',
    department: 'Engineering',
    openings: 2,
    experience: '2 - 4 Years',
    priority: 'High',
    reason: 'Team expansion for Manager portal & Mobile app projects',
    status: 'Submitted',
    preferredJoiningDate: '2026-10-01',
    createdDate: '2026-09-05'
  }
];

export const initialHRRequests = [
  {
    id: 'HRR-001',
    category: 'Employee Issue',
    categoryLabel: 'Employee Issue',
    priority: 'High',
    subject: 'Request for additional dev workstation for new joiner',
    description: 'Hardware requisition for incoming Senior QA Engineer',
    status: 'Submitted',
    createdDate: '2026-09-06',
    hrResponse: 'Under review by IT assets team'
  }
];

export const initialOffboardingRequests = [
  {
    id: 'OFF-001',
    employeeId: 'EMP-008',
    employeeName: 'Amit Patel',
    resignationDate: '2026-08-15',
    proposedLWD: '2026-09-15',
    noticePeriod: '30 Days',
    reason: 'Higher studies abroad',
    ktStatus: 'In Progress',
    handoverStatus: 'Pending',
    managerClearance: 'Pending',
    status: 'Pending Manager Review'
  }
];

export const initialAnnouncements = [
  {
    id: 'ANC-001',
    title: 'Engineering All-Hands Meeting',
    content: 'Engineering stand-up moved to 10:30 AM tomorrow in Conference Room B & Google Meet.',
    audience: 'Engineering Team',
    createdDate: '2026-09-06',
    createdBy: 'Rohit Mehta'
  },
  {
    id: 'ANC-002',
    title: 'Annual Health Check-up Drive',
    content: 'Company health checkup camp scheduled for 20th September at Bengaluru office.',
    audience: 'All Employees',
    createdDate: '2026-09-01',
    createdBy: 'HR Team'
  }
];

export const initialNotifications = [
  { id: 'NTF-001', category: 'Leave', title: 'New Leave Request', message: 'Anjali Mehta submitted a Casual Leave request for 18-20 Jun.', time: '10 mins ago', isRead: false, link: '/leave' },
  { id: 'NTF-002', category: 'Attendance', title: 'Attendance Correction', message: 'Neha Gupta submitted an attendance correction request for 06 Sep.', time: '1 hour ago', isRead: false, link: '/corrections' },
  { id: 'NTF-003', category: 'Performance', title: 'Probation Review Due', message: 'Anjali Mehta probation period ends in 8 days.', time: '2 hours ago', isRead: false, link: '/probation' },
  { id: 'NTF-004', category: 'Approvals', title: 'Remote Work Request', message: 'Neha Gupta requested WFH for 16 Jun.', time: '3 hours ago', isRead: false, link: '/remote-work' }
];

export const initialCalendarEvents = [
  { id: 'EVT-001', title: 'Bakrid Holiday', type: 'Holiday', date: '2026-06-17', description: 'Company Holiday' },
  { id: 'EVT-002', title: 'Annual Health Check-up', type: 'Company Event', date: '2026-06-20', description: 'All Employees' },
  { id: 'EVT-003', title: 'Team Building Event', type: 'Team Event', date: '2026-06-28', description: 'Bengaluru Office' },
  { id: 'EVT-004', title: 'Kriti Sharma Birthday', type: 'Birthday', date: '2026-06-12', description: 'Birthday Wish' },
  { id: 'EVT-005', title: 'Arjun Nair Work Anniversary', type: 'Anniversary', date: '2026-06-18', description: '3 Years Completed' }
];
