export type JobStatus = 'Draft' | 'Open' | 'On Hold' | 'Closed' | 'Filled' | 'Cancelled';
export type CandidateStage = 'Applied' | 'Screening' | 'Interview' | 'Selected' | 'Offer' | 'Hired';
export type CandidateStatus = 'Active' | 'On Hold' | 'Rejected' | 'Withdrawn' | 'Hired';
export type CandidateSource = 'Careers Page' | 'LinkedIn' | 'Naukri' | 'Indeed' | 'Employee Referral' | 'Recruitment Agency' | 'Walk-In' | 'Campus' | 'HR Sourcing' | 'Other';
export type CandidatePriority = 'Normal' | 'High' | 'Urgent';
export type InterviewStatus = 'Not Scheduled' | 'Scheduled' | 'Completed' | 'Cancelled' | 'Rescheduled' | 'No Show';
export type InterviewRound = 'HR Screening' | 'Technical Round 1' | 'Technical Round 2' | 'Manager Round' | 'Assignment' | 'Final HR' | 'Custom';
export type InterviewRecommendation = 'Strong Hire' | 'Hire' | 'Mixed' | 'No Hire';
export type OfferStatus = 'Draft' | 'Approval Pending' | 'Ready' | 'Sent' | 'Viewed' | 'Accepted' | 'Declined' | 'Expired' | 'Withdrawn';

export interface RecruitmentJob {
  id: string;
  title: string;
  department: string;
  designation: string;
  location: string;
  employmentType: string;
  openings: number;
  hiringManager: string;
  recruiter: string;
  experienceRange: string;
  salaryRange?: string;
  jobDescription: string;
  requiredSkills: string[];
  preferredSkills: string[];
  targetClosingDate: string;
  status: JobStatus;
  postedAt?: string;
  createdAt: string;
}

export interface CandidateTimelineEvent {
  id: string;
  action: string;
  actor: string;
  timestamp: string;
  remark?: string;
}

export interface InterviewFeedback {
  id: string;
  interviewer: string;
  interviewerRole: string;
  technicalSkills: number;
  problemSolving: number;
  communication: number;
  roleFit: number;
  strengths: string;
  concerns: string;
  recommendation: InterviewRecommendation;
  finalRemarks: string;
  createdAt: string;
}

export interface Interview {
  id: string;
  round: InterviewRound;
  date: string;
  time: string;
  duration: string;
  interviewers: string[];
  mode: 'In Person' | 'Video' | 'Phone';
  locationOrLink?: string;
  internalNotes?: string;
  status: InterviewStatus;
  feedbacks: InterviewFeedback[];
  createdAt: string;
}

export interface Offer {
  id: string;
  proposedSalary: string;
  joiningDate: string;
  offerExpiry: string;
  probationDuration?: string;
  noticePeriod?: string;
  hrRemark?: string;
  status: OfferStatus;
  offerDate?: string;
  responseReason?: string;
}

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  appliedJobId: string;
  appliedJobTitle: string;
  department: string;
  currentLocation: string;
  currentCompany: string;
  currentDesignation: string;
  experience: string;
  currentSalary?: string;
  expectedSalary?: string;
  noticePeriod: string;
  source: CandidateSource;
  referredBy?: string;
  stage: CandidateStage;
  status: CandidateStatus;
  priority: CandidatePriority;
  owner?: string;
  appliedAt: string;
  timeline: CandidateTimelineEvent[];
  interviews: Interview[];
  offer?: Offer;
  convertedEmployeeId?: string;
  rejectionReason?: string;
  rejectionStage?: string;
  notes: { id: string; author: string; timestamp: string; content: string }[];
}

export const mockJobs: RecruitmentJob[] = [
  {
    id: 'JOB-2026-0042',
    title: 'Frontend Developer',
    department: 'Engineering',
    designation: 'Frontend Developer',
    location: 'Bengaluru',
    employmentType: 'Full-Time',
    openings: 3,
    hiringManager: 'Vikram Sharma',
    recruiter: 'Priya Sharma',
    experienceRange: '2-4 Years',
    salaryRange: '₹6 LPA – ₹10 LPA',
    jobDescription: 'Looking for a skilled frontend developer with React experience.',
    requiredSkills: ['React', 'TypeScript', 'Tailwind CSS'],
    preferredSkills: ['Next.js', 'GraphQL'],
    targetClosingDate: '2026-10-15T00:00:00Z',
    status: 'Open',
    postedAt: '2026-09-01T10:00:00Z',
    createdAt: '2026-09-01T09:00:00Z',
  },
  {
    id: 'JOB-2026-0043',
    title: 'Operations Manager',
    department: 'Operations',
    designation: 'Operations Manager',
    location: 'Mumbai',
    employmentType: 'Full-Time',
    openings: 1,
    hiringManager: 'Sneha Patel',
    recruiter: 'Rahul HR',
    experienceRange: '5-8 Years',
    jobDescription: 'Manage daily operations and logistics.',
    requiredSkills: ['Operations', 'Team Management'],
    preferredSkills: ['Six Sigma'],
    targetClosingDate: '2026-09-30T00:00:00Z',
    status: 'Open',
    postedAt: '2026-08-15T10:00:00Z',
    createdAt: '2026-08-15T09:00:00Z',
  }
];

export const mockCandidates: Candidate[] = [
  {
    id: 'CAN-2026-00124',
    firstName: 'Ananya',
    lastName: 'Sharma',
    email: 'ananya@example.com',
    phone: '+91-9876543210',
    appliedJobId: 'JOB-2026-0042',
    appliedJobTitle: 'Frontend Developer',
    department: 'Engineering',
    currentLocation: 'Bengaluru',
    currentCompany: 'Tech Corp',
    currentDesignation: 'UI Developer',
    experience: '2.5 years',
    currentSalary: '8 LPA',
    expectedSalary: '11 LPA',
    noticePeriod: '30 Days',
    source: 'LinkedIn',
    stage: 'Screening',
    status: 'Active',
    priority: 'Normal',
    owner: 'Priya Sharma',
    appliedAt: '2026-09-04T10:30:00Z',
    timeline: [
      { id: 'T1', action: 'Application Received', actor: 'System', timestamp: '2026-09-04T10:30:00Z' },
      { id: 'T2', action: 'Moved to Screening', actor: 'Priya Sharma', timestamp: '2026-09-05T11:00:00Z' }
    ],
    interviews: [],
    notes: [
      { id: 'N1', author: 'Priya Sharma', timestamp: '2026-09-05T11:10:00Z', content: 'Strong profile. Need to check React hooks experience.' }
    ]
  },
  {
    id: 'CAN-2026-00125',
    firstName: 'Rahul',
    lastName: 'Verma',
    email: 'rahul.verma@example.com',
    phone: '+91-9876543211',
    appliedJobId: 'JOB-2026-0043',
    appliedJobTitle: 'Operations Manager',
    department: 'Operations',
    currentLocation: 'Mumbai',
    currentCompany: 'Logistics Co',
    currentDesignation: 'Operations Lead',
    experience: '6 years',
    noticePeriod: '60 Days',
    source: 'Naukri',
    stage: 'Interview',
    status: 'Active',
    priority: 'High',
    owner: 'Rahul HR',
    appliedAt: '2026-08-20T14:15:00Z',
    timeline: [
      { id: 'T1', action: 'Application Received', actor: 'System', timestamp: '2026-08-20T14:15:00Z' },
      { id: 'T2', action: 'Screening Completed', actor: 'Rahul HR', timestamp: '2026-08-22T09:00:00Z' },
      { id: 'T3', action: 'Interview Scheduled', actor: 'Rahul HR', timestamp: '2026-08-25T10:00:00Z' }
    ],
    interviews: [
      {
        id: 'INT-001',
        round: 'Technical Round 1',
        date: '2026-09-07', // Today relative to 2026-09-07
        time: '14:30',
        duration: '60 mins',
        interviewers: ['Sneha Patel'],
        mode: 'Video',
        locationOrLink: 'https://meet.google.com/xyz',
        status: 'Scheduled',
        feedbacks: [],
        createdAt: '2026-08-25T10:00:00Z'
      }
    ],
    notes: []
  },
  {
    id: 'CAN-2026-00126',
    firstName: 'Megha',
    lastName: 'Iyer',
    email: 'megha.iyer@example.com',
    phone: '+91-9876543212',
    appliedJobId: 'JOB-2026-0042',
    appliedJobTitle: 'Frontend Developer',
    department: 'Engineering',
    currentLocation: 'Pune',
    currentCompany: 'Startup Inc',
    currentDesignation: 'Frontend Eng',
    experience: '3 years',
    noticePeriod: '15 Days',
    source: 'Careers Page',
    stage: 'Selected',
    status: 'Active',
    priority: 'Normal',
    owner: 'Priya Sharma',
    appliedAt: '2026-08-10T10:00:00Z',
    timeline: [
      { id: 'T1', action: 'Application Received', actor: 'System', timestamp: '2026-08-10T10:00:00Z' },
      { id: 'T2', action: 'Selected', actor: 'Vikram Sharma', timestamp: '2026-09-05T15:00:00Z' }
    ],
    interviews: [
      {
        id: 'INT-002',
        round: 'Manager Round',
        date: '2026-09-04',
        time: '11:00',
        duration: '45 mins',
        interviewers: ['Vikram Sharma'],
        mode: 'Video',
        status: 'Completed',
        feedbacks: [
          {
            id: 'FB-1',
            interviewer: 'Vikram Sharma',
            interviewerRole: 'Hiring Manager',
            technicalSkills: 4,
            problemSolving: 5,
            communication: 4,
            roleFit: 5,
            strengths: 'Great React knowledge',
            concerns: 'None',
            recommendation: 'Strong Hire',
            finalRemarks: 'Let us roll out an offer.',
            createdAt: '2026-09-04T12:00:00Z'
          }
        ],
        createdAt: '2026-09-01T10:00:00Z'
      }
    ],
    notes: []
  },
  {
    id: 'CAN-2026-00127',
    firstName: 'Arvind',
    lastName: 'Kumar',
    email: 'arvind.kumar@example.com',
    phone: '+91-9876543213',
    appliedJobId: 'JOB-2026-0042',
    appliedJobTitle: 'Frontend Developer',
    department: 'Engineering',
    currentLocation: 'Chennai',
    currentCompany: 'Agency Co',
    currentDesignation: 'Web Developer',
    experience: '4 years',
    noticePeriod: 'Immediate',
    source: 'Employee Referral',
    referredBy: 'Siddharth Rao',
    stage: 'Offer',
    status: 'Active',
    priority: 'Urgent',
    owner: 'Priya Sharma',
    appliedAt: '2026-08-01T10:00:00Z',
    timeline: [
      { id: 'T1', action: 'Application Received', actor: 'System', timestamp: '2026-08-01T10:00:00Z' },
      { id: 'T2', action: 'Offer Prepared', actor: 'Priya Sharma', timestamp: '2026-09-06T14:00:00Z' },
      { id: 'T3', action: 'Offer Sent', actor: 'Priya Sharma', timestamp: '2026-09-06T15:00:00Z' }
    ],
    interviews: [],
    offer: {
      id: 'OFF-001',
      proposedSalary: '12,00,000',
      joiningDate: '2026-09-20',
      offerExpiry: '2026-09-10',
      status: 'Sent',
      offerDate: '2026-09-06'
    },
    notes: []
  },
  {
    id: 'CAN-2026-00128',
    firstName: 'Pooja',
    lastName: 'Nair',
    email: 'pooja.nair@example.com',
    phone: '+91-9876543214',
    appliedJobId: 'JOB-2026-0043',
    appliedJobTitle: 'Operations Manager',
    department: 'Operations',
    currentLocation: 'Delhi',
    currentCompany: 'Retail Ltd',
    currentDesignation: 'Ops Head',
    experience: '8 years',
    noticePeriod: '30 Days',
    source: 'LinkedIn',
    stage: 'Hired',
    status: 'Hired',
    priority: 'Normal',
    owner: 'Rahul HR',
    appliedAt: '2026-07-15T10:00:00Z',
    timeline: [
      { id: 'T1', action: 'Offer Accepted', actor: 'Pooja Nair', timestamp: '2026-09-01T10:00:00Z' },
      { id: 'T2', action: 'Converted to Employee', actor: 'Rahul HR', timestamp: '2026-09-02T11:00:00Z' }
    ],
    interviews: [],
    offer: {
      id: 'OFF-002',
      proposedSalary: '18,00,000',
      joiningDate: '2026-10-01',
      offerExpiry: '2026-09-05',
      status: 'Accepted',
      offerDate: '2026-08-25'
    },
    convertedEmployeeId: 'EMP248',
    notes: []
  }
];
