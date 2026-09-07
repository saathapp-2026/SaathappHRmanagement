export type HRSettings = {
  general: {
    defaultHrOwner: string;
    defaultWorkLocation: string;
    defaultEmploymentType: string;
    defaultJoiningStatus: string;
    defaultTimezone: string;
    employeeIdPrefix: string;
    employeeIdNumberLength: number;
  };
  attendance: {
    workStartTime: string;
    workEndTime: string;
    gracePeriod: number;
    minFullDayHours: number;
    minHalfDayHours: number;
    checkInAllowedBefore: number;
    lateArrivalThreshold: number;
    earlyDepartureThreshold: number;
    defaultLocationRule: string;
    workingDays: { [key: string]: boolean };
    correctionAllowedWindow: number;
    maxOpenCorrectionRequests: number;
    correctionRequireReason: boolean;
    correctionRequireAttachment: 'Optional' | 'Required' | 'No';
    allowFutureDate: boolean;
    hrCanMarkManual: boolean;
    requireHrRemark: boolean;
  };
  leave: {
    minimumAdvanceNotice: number;
    maximumBackdatedRequest: number;
    allowHalfDay: boolean;
    allowDuringNoticePeriod: string;
    allowNegativeBalance: boolean;
    allowOverlappingRequests: boolean;
    approvalWorkflow: string;
    balanceReset: string;
    carryForwardProcessing: string;
    types: LeaveTypeSetting[];
  };
  employment: {
    types: EmploymentTypeSetting[];
    statuses: string[];
    defaultJoiningChecklist: boolean;
    sendInvitationOnCreation: boolean;
    requireProfileBeforeActivation: boolean;
    requireDocumentBeforeActivation: boolean;
    allowJoiningWithoutBank: boolean;
    onboardingRequirements: OnboardingRequirement[];
  };
  probation: {
    defaultDuration: number;
    reviewReminder: string;
    defaultCheckpoints: string[];
    allowedExtensions: string[];
    maxExtensions: number;
    requireReason: boolean;
    requireManagerRecommendation: boolean;
    beforeConfirmationRequirements: { [key: string]: boolean };
  };
  documents: {
    requirements: DocumentRequirement[];
    allowedFileTypes: string[];
    maxFileSizeMB: number;
    notifyHrDays: string[];
    verificationRequired: string;
  };
  templates: {
    list: HRTemplate[];
  };
  payroll: {
    closingDay: number;
    workingDayMethod: string;
    attendanceLockReminder: string;
    lwpReviewRequired: boolean;
    salaryRevisionApprovalRequired: boolean;
    payslipIssueDay: string;
    requireConfirmationBeforeLock: boolean;
    allowReopen: boolean;
    reopenRequiresReason: boolean;
    payslipNamingConvention: string;
    showSalaryBreakdown: boolean;
    showAdjustmentDetails: boolean;
  };
  recruitment: {
    defaultCandidateOwner: string;
    defaultJobLocation: string;
    defaultEmploymentType: string;
    defaultInterviewDuration: number;
    offerExpiryDays: number;
    duplicateMatchRule: string;
    defaultProbationDuration: number;
    defaultNoticePeriod: number;
    requireHrReviewBeforeOffer: boolean;
    requireManagerApproval: boolean;
    interviewModes: string[];
    defaultRounds: string[];
  };
  performance: {
    defaultCycleType: string;
    ratingScale: string[];
    goalsRequired: boolean;
    totalGoalWeight: number;
    minGoals: number;
    maxGoals: number;
    managerCommentRequired: boolean;
    stages: { [key: string]: boolean };
    calibrationRequired: boolean;
    selfReviewReminder: string;
    managerReviewReminder: string;
    overdueReminder: string;
  };
  communication: {
    defaultAudience: string;
    defaultPriority: string;
    defaultExpiry: number;
    allowAttachment: boolean;
    requireExpiry: boolean;
    notifications: { [key: string]: boolean };
    calendarView: string;
    calendarToggles: { [key: string]: boolean };
  };
};

export type LeaveTypeSetting = {
  id: string;
  name: string;
  annualAllocation: number;
  carryForward: boolean;
  maxCarryForward: number | null;
  approvalRequired: boolean;
  documentRequired: 'Yes' | 'No' | 'After X Days';
  status: 'Active' | 'Inactive';
};

export type EmploymentTypeSetting = {
  id: string;
  name: string;
  defaultNoticePeriodDays: number;
  status: 'Active' | 'Inactive';
};

export type OnboardingRequirement = {
  id: string;
  name: string;
  required: boolean;
};

export type DocumentRequirement = {
  id: string;
  name: string;
  appliesTo: string;
  expiryTracked: boolean;
  verificationRequired: boolean;
  required: boolean;
  status: 'Active' | 'Inactive';
};

export type HRTemplate = {
  id: string;
  name: string;
  category: string;
  lastUpdated: string;
  updatedBy: string;
  status: 'Active' | 'Draft' | 'Archived';
  body: string;
};

export const defaultSettings: HRSettings = {
  general: {
    defaultHrOwner: 'Priya Sharma',
    defaultWorkLocation: 'Bengaluru HQ',
    defaultEmploymentType: 'Full-Time',
    defaultJoiningStatus: 'Invited',
    defaultTimezone: 'Asia/Kolkata',
    employeeIdPrefix: 'EMP',
    employeeIdNumberLength: 4
  },
  attendance: {
    workStartTime: '09:30',
    workEndTime: '18:30',
    gracePeriod: 15,
    minFullDayHours: 8,
    minHalfDayHours: 4,
    checkInAllowedBefore: 30,
    lateArrivalThreshold: 30,
    earlyDepartureThreshold: 30,
    defaultLocationRule: 'No Restriction',
    workingDays: { Monday: true, Tuesday: true, Wednesday: true, Thursday: true, Friday: true, Saturday: false, Sunday: false },
    correctionAllowedWindow: 30,
    maxOpenCorrectionRequests: 3,
    correctionRequireReason: true,
    correctionRequireAttachment: 'Optional',
    allowFutureDate: false,
    hrCanMarkManual: true,
    requireHrRemark: true
  },
  leave: {
    minimumAdvanceNotice: 1,
    maximumBackdatedRequest: 3,
    allowHalfDay: true,
    allowDuringNoticePeriod: 'Requires HR Review',
    allowNegativeBalance: false,
    allowOverlappingRequests: false,
    approvalWorkflow: 'Manager',
    balanceReset: 'Calendar Year',
    carryForwardProcessing: 'Automatic Preview',
    types: [
      { id: '1', name: 'Casual Leave', annualAllocation: 12, carryForward: false, maxCarryForward: null, approvalRequired: true, documentRequired: 'No', status: 'Active' },
      { id: '2', name: 'Sick Leave', annualAllocation: 12, carryForward: false, maxCarryForward: null, approvalRequired: true, documentRequired: 'After X Days', status: 'Active' },
      { id: '3', name: 'Earned Leave', annualAllocation: 18, carryForward: true, maxCarryForward: 10, approvalRequired: true, documentRequired: 'No', status: 'Active' }
    ]
  },
  employment: {
    types: [
      { id: '1', name: 'Full-Time', defaultNoticePeriodDays: 30, status: 'Active' },
      { id: '2', name: 'Contract', defaultNoticePeriodDays: 15, status: 'Active' },
      { id: '3', name: 'Intern', defaultNoticePeriodDays: 0, status: 'Active' }
    ],
    statuses: ['Invited', 'Profile Pending', 'Active', 'On Probation', 'Notice Period', 'Inactive', 'Separated'],
    defaultJoiningChecklist: true,
    sendInvitationOnCreation: true,
    requireProfileBeforeActivation: true,
    requireDocumentBeforeActivation: true,
    allowJoiningWithoutBank: false,
    onboardingRequirements: [
      { id: '1', name: 'Personal Details', required: true },
      { id: '2', name: 'Employment Details', required: true },
      { id: '3', name: 'Address', required: true },
      { id: '4', name: 'Required Documents', required: true }
    ]
  },
  probation: {
    defaultDuration: 90,
    reviewReminder: '30 days before',
    defaultCheckpoints: ['30-Day', 'Mid-Probation', 'Final Review'],
    allowedExtensions: ['15 days', '30 days', '60 days', '90 days'],
    maxExtensions: 2,
    requireReason: true,
    requireManagerRecommendation: true,
    beforeConfirmationRequirements: {
      managerRecommendation: true,
      probationReviewCompleted: true,
      attendanceReviewed: true,
      pendingConcernsReviewed: false,
      documentsVerified: true
    }
  },
  documents: {
    requirements: [
      { id: '1', name: 'Government ID', appliesTo: 'All Employees', expiryTracked: true, verificationRequired: true, required: true, status: 'Active' },
      { id: '2', name: 'Educational Certificate', appliesTo: 'Full-Time', expiryTracked: false, verificationRequired: true, required: true, status: 'Active' }
    ],
    allowedFileTypes: ['PDF', 'JPG', 'JPEG', 'PNG', 'DOC', 'DOCX'],
    maxFileSizeMB: 10,
    notifyHrDays: ['60', '30', '15', '7'],
    verificationRequired: 'HR Verification Required'
  },
  templates: {
    list: [
      { id: '1', name: 'Standard Offer Letter', category: 'Offer Letter', lastUpdated: '05 Sep 2026', updatedBy: 'Priya Sharma', status: 'Active', body: 'Dear {{employee_name}}, Welcome to Saathapp...' },
      { id: '2', name: 'Confirmation Letter', category: 'Confirmation Letter', lastUpdated: '10 Aug 2026', updatedBy: 'Rahul HR', status: 'Draft', body: 'Dear {{employee_name}}, Your probation has concluded...' }
    ]
  },
  payroll: {
    closingDay: 28,
    workingDayMethod: 'Calendar Working Days',
    attendanceLockReminder: '25th of month',
    lwpReviewRequired: true,
    salaryRevisionApprovalRequired: true,
    payslipIssueDay: 'Last Working Day',
    requireConfirmationBeforeLock: true,
    allowReopen: true,
    reopenRequiresReason: true,
    payslipNamingConvention: 'SAATHAPP-PAYSLIP-{{employee_id}}-{{month}}',
    showSalaryBreakdown: true,
    showAdjustmentDetails: true
  },
  recruitment: {
    defaultCandidateOwner: 'Priya Sharma',
    defaultJobLocation: 'Bengaluru HQ',
    defaultEmploymentType: 'Full-Time',
    defaultInterviewDuration: 60,
    offerExpiryDays: 7,
    duplicateMatchRule: 'Email + Phone',
    defaultProbationDuration: 90,
    defaultNoticePeriod: 30,
    requireHrReviewBeforeOffer: true,
    requireManagerApproval: true,
    interviewModes: ['In Person', 'Video', 'Phone'],
    defaultRounds: ['HR Screening', 'Technical', 'Manager', 'Final HR']
  },
  performance: {
    defaultCycleType: 'Annual',
    ratingScale: ['1 — Needs Significant Improvement', '2 — Needs Improvement', '3 — Meets Expectations', '4 — Exceeds Expectations', '5 — Exceptional'],
    goalsRequired: true,
    totalGoalWeight: 100,
    minGoals: 3,
    maxGoals: 8,
    managerCommentRequired: true,
    stages: { goals: true, selfReview: true, managerReview: true, hrReview: true, calibration: true, finalization: true },
    calibrationRequired: true,
    selfReviewReminder: '7 days before',
    managerReviewReminder: '7 days before',
    overdueReminder: 'Every 3 days'
  },
  communication: {
    defaultAudience: 'Everyone',
    defaultPriority: 'Normal',
    defaultExpiry: 30,
    allowAttachment: true,
    requireExpiry: false,
    notifications: { leaveRequests: true, attendanceCorrections: true, concerns: true, helpRequests: true, profileChanges: true, documentExpiry: true, probationEnding: true, offboarding: true, payrollExceptions: true },
    calendarView: 'Month',
    calendarToggles: { birthdays: true, anniversaries: true, approvedLeave: true, joiningDates: true, hrEvents: true }
  }
};
