

export type OffboardingStatus = 
  | 'Resignation Submitted'
  | 'Under Review'
  | 'Manager Approval Pending'
  | 'Notice Period Active'
  | 'Knowledge Transfer'
  | 'Clearance Pending'
  | 'Exit Interview Pending'
  | 'Final Settlement Pending'
  | 'Documents Pending'
  | 'Account Deactivation Pending'
  | 'Completed'
  | 'Cancelled'
  | 'On Hold';

export type ExitType = 
  | 'Resignation'
  | 'Termination'
  | 'Contract Completion'
  | 'Retirement'
  | 'Mutual Separation'
  | 'Absconding'
  | 'Other';

export type ExitReason = 
  | 'Career Growth'
  | 'Higher Education'
  | 'Relocation'
  | 'Personal Reasons'
  | 'Compensation'
  | 'Role Change'
  | 'Manager/Team'
  | 'Work Environment'
  | 'Health/Family'
  | 'Contract Completion'
  | 'Retirement'
  | 'Other';

export type NoticePeriod = {
  startDate: string;
  endDate: string; // Last Working Day
  durationDays: number;
  servedDays: number;
  remainingDays: number;
  status: 'Active' | 'Completed' | 'Waived';
  waiver?: 'None' | 'Partial' | 'Full';
};

export type KTTaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Blocked';

export type KnowledgeTransferTask = {
  id: string;
  task: string;
  owner: string;
  dueDate: string;
  description: string;
  status: KTTaskStatus;
  remarks?: string;
};

export type ClearanceStatus = 'Not Started' | 'Pending' | 'In Progress' | 'Cleared' | 'Blocked' | 'Not Applicable';

export type ClearanceItem = {
  id: string;
  department: string;
  owner: string;
  status: ClearanceStatus;
  pendingItems: string[];
  completedDate?: string;
  remarks?: string;
};

export type ExitInterviewResponse = 'Yes' | 'No' | 'Maybe';

export type ExitInterview = {
  status: 'Not Scheduled' | 'Scheduled' | 'Completed';
  scheduleDate?: string;
  scheduleTime?: string;
  interviewer?: string;
  mode?: 'In Person' | 'Video' | 'Phone';
  locationOrLink?: string;
  notes?: string;
  // Completed response
  overallExperience?: number; // 1-5
  primaryReason?: ExitReason;
  managerExperience?: number;
  teamExperience?: number;
  roleSatisfaction?: number;
  compensationSatisfaction?: number;
  wouldRejoin?: ExitInterviewResponse;
  wouldRecommend?: ExitInterviewResponse;
  workedWell?: string;
  couldImprove?: string;
  additionalFeedback?: string;
  hrNotes?: string;
  completedDate?: string;
};

export type SettlementStatus = 'Not Started' | 'Inputs Pending' | 'Under Review' | 'Ready' | 'Processed' | 'Pending';

export type FinalSettlementTracker = {
  status: SettlementStatus;
  salaryInputsStatus: SettlementStatus;
  leaveEncashmentStatus: SettlementStatus;
  noticeRecoveryWaiverStatus: 'Pending' | 'Not Applicable' | 'Processed';
  expenseReimbursementsStatus: SettlementStatus;
  expenseReimbursementAmount?: number;
  deductionsStatus: SettlementStatus;
  settlementAmountCalculated: boolean;
};

export type ExitDocumentStatus = 'Not Generated' | 'Generated' | 'Issued' | 'Acknowledged';

export type ExitDocument = {
  id: string;
  type: 'Experience Letter' | 'Relieving Letter' | 'Final Settlement Statement' | 'Service Certificate';
  status: ExitDocumentStatus;
  generatedDate?: string;
  issuedDate?: string;
};

export type AccountDeactivation = {
  status: 'Active' | 'Scheduled' | 'Deactivated';
  scheduledDate?: string;
  scheduledTime?: string;
  accessTypes: {
    employeePortal: 'Active' | 'Scheduled' | 'Deactivated';
    email: 'Active' | 'Scheduled' | 'Deactivated';
    hrPortal: 'Active' | 'Scheduled' | 'Deactivated';
    vpn: 'Active' | 'Scheduled' | 'Deactivated';
    internalTools: 'Active' | 'Scheduled' | 'Deactivated';
  };
  reason?: string;
  completedBy?: string;
  completedDate?: string;
};

export type OffboardingTimelineEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  description?: string;
};

export type OffboardingInternalNote = {
  id: string;
  author: string;
  timestamp: string;
  note: string;
};

export type AssignedAsset = {
  id: string;
  name: string;
  assetId: string;
  status: 'Return Pending' | 'Returned';
};

export type OffboardingRecord = {
  id: string;
  employeeId: string;
  employeeName: string;
  designation: string;
  department: string;
  manager: string;
  location: string;
  employmentType: string;
  joiningDate: string;
  tenure: string;
  exitType: ExitType;
  status: OffboardingStatus;
  progress: number;
  resignationDate: string;
  requestedLastWorkingDate: string;
  adjustedLastWorkingDate?: string;
  reason?: ExitReason;
  employeeRemarks?: string;
  hrOwner?: string;
  
  // Stages
  hrReview: {
    resignationReviewed: boolean;
    noticePeriodVerified: boolean;
    requestedLastWorkingDateReviewed: boolean;
    managerNotified: boolean;
    policyChecked: boolean;
    internalRemark?: string;
    completed: boolean;
  };

  managerDecision: {
    status: 'Pending' | 'Approved' | 'Discussed';
    recommendedLastWorkingDate?: string;
    remark?: string;
  };

  noticePeriod: NoticePeriod;
  
  ktTasks: KnowledgeTransferTask[];
  
  clearanceChecklist: ClearanceItem[];
  
  assignedAssets: AssignedAsset[];

  exitInterview: ExitInterview;

  finalSettlement: FinalSettlementTracker;

  exitDocuments: ExitDocument[];

  accountDeactivation: AccountDeactivation;

  timeline: OffboardingTimelineEvent[];
  internalNotes: OffboardingInternalNote[];

  // Extras
  cancellationReason?: string;
  cancellationRemarks?: string;
};

export const MOCK_HR_OWNERS = [
  'Priya Sharma',
  'Rahul HR',
  'Meera HR',
  'Kavya HR'
];

export const mockOffboardingRecords: OffboardingRecord[] = [
  {
    id: 'OFF-2026-00124',
    employeeId: 'EMP001',
    employeeName: 'Anjali Rao',
    designation: 'Software Developer',
    department: 'Engineering',
    manager: 'Vikram Sharma',
    location: 'Bengaluru HQ',
    employmentType: 'Full-Time',
    joiningDate: '01 Aug 2024',
    tenure: '2 years 2 months',
    exitType: 'Resignation',
    status: 'Notice Period Active',
    progress: 35,
    resignationDate: '05 Sep 2026',
    requestedLastWorkingDate: '05 Oct 2026',
    adjustedLastWorkingDate: '05 Oct 2026',
    reason: 'Career Growth',
    employeeRemarks: "I have decided to pursue another opportunity.",
    hrOwner: 'Priya Sharma',
    
    hrReview: {
      resignationReviewed: true,
      noticePeriodVerified: true,
      requestedLastWorkingDateReviewed: true,
      managerNotified: true,
      policyChecked: true,
      internalRemark: 'Notice period aligns with policy.',
      completed: true,
    },

    managerDecision: {
      status: 'Approved',
      recommendedLastWorkingDate: '05 Oct 2026',
      remark: 'Transition plan can be completed within the notice period.'
    },

    noticePeriod: {
      startDate: '05 Sep 2026',
      endDate: '05 Oct 2026',
      durationDays: 30,
      servedDays: 10,
      remainingDays: 20,
      status: 'Active',
      waiver: 'None'
    },

    ktTasks: [
      {
        id: 'KT1',
        task: 'Project Handover',
        owner: 'Vikram Sharma',
        dueDate: '28 Sep 2026',
        description: 'Handover the core microservices to team.',
        status: 'In Progress'
      },
      {
        id: 'KT2',
        task: 'Documentation Completed',
        owner: 'Anjali Rao',
        dueDate: '25 Sep 2026',
        description: 'Update API docs',
        status: 'Completed'
      }
    ],

    clearanceChecklist: [
      { id: 'C1', department: 'Manager', owner: 'Vikram Sharma', status: 'Cleared', pendingItems: [] },
      { id: 'C2', department: 'IT', owner: 'IT Operations', status: 'Pending', pendingItems: ['Laptop Return', 'Email Access', 'VPN Access', 'Software Licenses'] },
      { id: 'C3', department: 'Finance', owner: 'Finance Team', status: 'In Progress', pendingItems: ['Expense claim review'] },
      { id: 'C4', department: 'HR', owner: 'Priya Sharma', status: 'Pending', pendingItems: ['Exit documents'] },
      { id: 'C5', department: 'Admin', owner: 'Facilities', status: 'Cleared', pendingItems: [] },
    ],

    assignedAssets: [
      { id: 'A1', name: 'Laptop', assetId: 'SA-LAP-0042', status: 'Return Pending' },
      { id: 'A2', name: 'ID Card', assetId: 'SA-ID-0098', status: 'Return Pending' },
      { id: 'A3', name: 'Access Card', assetId: 'SA-ACC-0041', status: 'Returned' },
    ],

    exitInterview: {
      status: 'Scheduled',
      scheduleDate: '02 Oct 2026',
      scheduleTime: '03:00 PM',
      interviewer: 'Priya Sharma',
      mode: 'Video'
    },

    finalSettlement: {
      status: 'Inputs Pending',
      salaryInputsStatus: 'Inputs Pending',
      leaveEncashmentStatus: 'Inputs Pending',
      noticeRecoveryWaiverStatus: 'Not Applicable',
      expenseReimbursementsStatus: 'Inputs Pending',
      expenseReimbursementAmount: 4250,
      deductionsStatus: 'Inputs Pending',
      settlementAmountCalculated: false
    },

    exitDocuments: [
      { id: 'ED1', type: 'Experience Letter', status: 'Not Generated' },
      { id: 'ED2', type: 'Relieving Letter', status: 'Not Generated' },
      { id: 'ED3', type: 'Final Settlement Statement', status: 'Not Generated' },
    ],

    accountDeactivation: {
      status: 'Scheduled',
      scheduledDate: '05 Oct 2026',
      scheduledTime: '06:30 PM',
      accessTypes: {
        employeePortal: 'Active',
        email: 'Scheduled',
        hrPortal: 'Active',
        vpn: 'Active',
        internalTools: 'Active'
      }
    },

    timeline: [
      { id: 'T1', title: 'Resignation Submitted', date: '05 Sep 2026', time: '10:00 AM' },
      { id: 'T2', title: 'HR Review Completed', date: '06 Sep 2026', time: '11:30 AM' },
      { id: 'T3', title: 'Manager Decision Recorded', date: '07 Sep 2026', time: '02:00 PM' }
    ],

    internalNotes: [
      { id: 'N1', author: 'Priya Sharma', timestamp: '06 Sep 2026 11:30 AM', note: 'All checks passed. Standard offboarding initiated.' }
    ]
  },
  {
    id: 'OFF-2026-00125',
    employeeId: 'EMP002',
    employeeName: 'Rahul Mehta',
    designation: 'Product Manager',
    department: 'Product',
    manager: 'Neha Singh',
    location: 'Bengaluru HQ',
    employmentType: 'Full-Time',
    joiningDate: '15 Jan 2023',
    tenure: '3 years 8 months',
    exitType: 'Resignation',
    status: 'Clearance Pending',
    progress: 70,
    resignationDate: '01 Sep 2026',
    requestedLastWorkingDate: '30 Sep 2026',
    adjustedLastWorkingDate: '30 Sep 2026',
    reason: 'Relocation',
    hrOwner: 'Rahul HR',
    
    hrReview: {
      resignationReviewed: true,
      noticePeriodVerified: true,
      requestedLastWorkingDateReviewed: true,
      managerNotified: true,
      policyChecked: true,
      completed: true,
    },
    managerDecision: { status: 'Approved' },
    noticePeriod: {
      startDate: '01 Sep 2026',
      endDate: '30 Sep 2026',
      durationDays: 30,
      servedDays: 20,
      remainingDays: 10,
      status: 'Active'
    },
    ktTasks: [
      { id: 'KT1', task: 'Handover PM Docs', owner: 'Rahul Mehta', dueDate: '20 Sep 2026', description: 'PRDs', status: 'Completed' }
    ],
    clearanceChecklist: [
      { id: 'C1', department: 'Manager', owner: 'Neha Singh', status: 'Cleared', pendingItems: [] },
      { id: 'C2', department: 'IT', owner: 'IT Ops', status: 'Pending', pendingItems: ['Laptop Return'] },
    ],
    assignedAssets: [
      { id: 'A1', name: 'MacBook Pro', assetId: 'SA-LAP-0021', status: 'Return Pending' }
    ],
    exitInterview: { status: 'Not Scheduled' },
    finalSettlement: {
      status: 'Inputs Pending',
      salaryInputsStatus: 'Inputs Pending',
      leaveEncashmentStatus: 'Inputs Pending',
      noticeRecoveryWaiverStatus: 'Not Applicable',
      expenseReimbursementsStatus: 'Inputs Pending',
      deductionsStatus: 'Inputs Pending',
      settlementAmountCalculated: false
    },
    exitDocuments: [],
    accountDeactivation: {
      status: 'Active',
      accessTypes: { employeePortal: 'Active', email: 'Active', hrPortal: 'Active', vpn: 'Active', internalTools: 'Active' }
    },
    timeline: [],
    internalNotes: []
  },
  {
    id: 'OFF-2026-00126',
    employeeId: 'EMP003',
    employeeName: 'Neha Gupta',
    designation: 'Operations Exec',
    department: 'Operations',
    manager: 'Arjun Verma',
    location: 'Delhi',
    employmentType: 'Contract',
    joiningDate: '15 Aug 2025',
    tenure: '1 year',
    exitType: 'Contract Completion',
    status: 'Exit Interview Pending',
    progress: 85,
    resignationDate: '15 Aug 2026',
    requestedLastWorkingDate: '15 Sep 2026',
    adjustedLastWorkingDate: '15 Sep 2026',
    hrOwner: 'Kavya HR',
    
    hrReview: { resignationReviewed: true, noticePeriodVerified: true, requestedLastWorkingDateReviewed: true, managerNotified: true, policyChecked: true, completed: true },
    managerDecision: { status: 'Approved' },
    noticePeriod: { startDate: '15 Aug 2026', endDate: '15 Sep 2026', durationDays: 30, servedDays: 30, remainingDays: 0, status: 'Completed' },
    ktTasks: [],
    clearanceChecklist: [
      { id: 'C1', department: 'Manager', owner: 'Arjun Verma', status: 'Cleared', pendingItems: [] },
      { id: 'C2', department: 'IT', owner: 'IT Ops', status: 'Cleared', pendingItems: [] },
    ],
    assignedAssets: [],
    exitInterview: { status: 'Not Scheduled' },
    finalSettlement: {
      status: 'Ready',
      salaryInputsStatus: 'Processed',
      leaveEncashmentStatus: 'Processed',
      noticeRecoveryWaiverStatus: 'Not Applicable',
      expenseReimbursementsStatus: 'Processed',
      deductionsStatus: 'Processed',
      settlementAmountCalculated: true
    },
    exitDocuments: [
      { id: 'ED1', type: 'Experience Letter', status: 'Generated', generatedDate: '10 Sep 2026' }
    ],
    accountDeactivation: {
      status: 'Scheduled',
      scheduledDate: '15 Sep 2026',
      scheduledTime: '06:00 PM',
      accessTypes: { employeePortal: 'Active', email: 'Scheduled', hrPortal: 'Active', vpn: 'Active', internalTools: 'Active' }
    },
    timeline: [],
    internalNotes: []
  }
];
