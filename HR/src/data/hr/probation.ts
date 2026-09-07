export type ProbationStatus = 'Active' | 'Review Due' | 'Extended' | 'Confirmed' | 'Overdue' | 'Cancelled' | 'Not Applicable';

export type ProbationReviewType = '30-Day Check-in' | 'Mid-Probation Review' | 'Final Probation Review' | 'Custom Review';
export type ProbationReviewStatus = 'Not Scheduled' | 'Scheduled' | 'Completed' | 'Missed';

export type ProbationReview = {
  id: string;
  type: ProbationReviewType;
  scheduledDate: string | null;
  scheduledTime?: string;
  reviewer: string | null;
  status: ProbationReviewStatus;
  remarks: string | null;
};

export type ProbationRecommendationType = 'Confirm Employment' | 'Extend Probation' | 'Further Review Required';

export type ProbationExtension = {
  id: string;
  originalEnd: string;
  newEnd: string;
  duration: string;
  reason: string;
  decisionBy: string;
  date: string;
};

export type ProbationRecord = {
  employeeId: string;
  employeeName: string;
  designation: string;
  department: string;
  location: string;
  manager: string;
  employmentType: string;
  joiningDate: string;
  
  probationStart: string;
  originalEndDate: string;
  currentEndDate: string;
  duration: string;
  
  status: ProbationStatus;
  daysRemaining: number; // can be negative if overdue
  
  reviews: ProbationReview[];
  extensions: ProbationExtension[];
  
  managerRecommendation?: {
    type: ProbationRecommendationType;
    remarks: string;
    submittedBy: string;
    date: string;
  };
  
  hrRemarks?: {
    text: string;
    author: string;
    date: string;
  };
  
  hrReviewer?: string;
};

export const mockProbationRecords: ProbationRecord[] = [
  {
    employeeId: 'EMP001',
    employeeName: 'Anjali Rao',
    designation: 'Software Developer',
    department: 'Engineering',
    location: 'Bengaluru HQ',
    manager: 'Vikram Sharma',
    employmentType: 'Full-Time',
    joiningDate: '2026-08-01',
    probationStart: '2026-08-01',
    originalEndDate: '2026-10-31',
    currentEndDate: '2026-10-31',
    duration: '3 months',
    status: 'Active',
    daysRemaining: 54,
    reviews: [
      {
        id: 'rev1',
        type: '30-Day Check-in',
        scheduledDate: '2026-08-31',
        reviewer: 'Vikram Sharma',
        status: 'Completed',
        remarks: 'Onboarding well.'
      },
      {
        id: 'rev2',
        type: 'Mid-Probation Review',
        scheduledDate: '2026-09-15',
        reviewer: 'Vikram Sharma',
        status: 'Scheduled',
        remarks: null
      },
      {
        id: 'rev3',
        type: 'Final Probation Review',
        scheduledDate: '2026-10-24',
        scheduledTime: '15:00',
        reviewer: 'Vikram Sharma + Priya Sharma',
        status: 'Not Scheduled',
        remarks: null
      }
    ],
    extensions: [],
    hrReviewer: 'Priya Sharma'
  },
  {
    employeeId: 'EMP002',
    employeeName: 'Rahul Mehta',
    designation: 'Software Developer',
    department: 'Engineering',
    location: 'Bengaluru HQ',
    manager: 'Vikram Sharma',
    employmentType: 'Full-Time',
    joiningDate: '2026-03-15',
    probationStart: '2026-03-15',
    originalEndDate: '2026-09-15',
    currentEndDate: '2026-09-15',
    duration: '6 months',
    status: 'Review Due',
    daysRemaining: 8,
    reviews: [
      {
        id: 'rev2-3',
        type: 'Final Probation Review',
        scheduledDate: '2026-09-10',
        reviewer: 'Vikram Sharma',
        status: 'Scheduled',
        remarks: null
      }
    ],
    extensions: []
  },
  {
    employeeId: 'EMP003',
    employeeName: 'Neha Gupta',
    designation: 'Operations Executive',
    department: 'Operations',
    location: 'Mumbai Branch',
    manager: 'Arjun Verma',
    employmentType: 'Full-Time',
    joiningDate: '2026-03-01',
    probationStart: '2026-03-01',
    originalEndDate: '2026-09-01',
    currentEndDate: '2026-09-01',
    duration: '6 months',
    status: 'Overdue',
    daysRemaining: -6,
    reviews: [],
    extensions: []
  },
  {
    employeeId: 'EMP004',
    employeeName: 'Meera Singh',
    designation: 'Marketing Specialist',
    department: 'Marketing',
    location: 'Delhi Branch',
    manager: 'Kavita Kapoor',
    employmentType: 'Full-Time',
    joiningDate: '2026-03-10',
    probationStart: '2026-03-10',
    originalEndDate: '2026-09-10',
    currentEndDate: '2026-09-10',
    duration: '6 months',
    status: 'Active',
    daysRemaining: 3,
    reviews: [],
    extensions: []
  },
  {
    employeeId: 'EMP005',
    employeeName: 'Neha Rao',
    designation: 'HR Coordinator',
    department: 'HR',
    location: 'Bengaluru HQ',
    manager: 'Priya Sharma',
    employmentType: 'Full-Time',
    joiningDate: '2026-03-17',
    probationStart: '2026-03-17',
    originalEndDate: '2026-09-17',
    currentEndDate: '2026-09-17',
    duration: '6 months',
    status: 'Active',
    daysRemaining: 10,
    reviews: [],
    extensions: []
  }
];

export const mockProbationStats = {
  active: 24,
  reviewDue: 9,
  extended: 4,
  confirmed: 41,
  overdue: 3,
  all: 72,
  endingIn7Days: 4,
  endingIn15Days: 7,
  endingIn30Days: 12,
  confirmedThisMonth: 8,
};
