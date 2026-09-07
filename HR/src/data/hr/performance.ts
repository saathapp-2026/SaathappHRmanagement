export interface PerformanceCycle {
  id: string;
  name: string;
  period: string;
  status: 'Draft' | 'Scheduled' | 'Active' | 'Self Review' | 'Manager Review' | 'Calibration' | 'Finalization' | 'Completed' | 'Archived' | 'Cancelled';
  startDate: string;
  endDate: string;
  selfReviewDeadline: string;
  managerDeadline: string;
  finalizationDate: string;
  employeesCount: number;
  completionPct: number;
}

export interface PerformanceReview {
  id: string;
  cycleId: string;
  employeeId: string;
  employeeName: string;
  department: string;
  designation: string;
  manager: string;
  status: 'Not Started' | 'Goals Pending' | 'Self Review Pending' | 'Self Review Submitted' | 'Manager Review Pending' | 'Manager Review Completed' | 'HR Review Pending' | 'Calibration' | 'Finalized' | 'Overdue' | 'Cancelled';
  selfRating?: number;
  managerRating?: number;
  calibratedRating?: number;
  finalRating?: number;
}

export interface PerformanceGoal {
  id: string;
  reviewId: string;
  title: string;
  type: 'KRA' | 'KPI' | 'Project Objective' | 'Development Goal';
  description: string;
  metric: string;
  target: string;
  weight: number;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Partially Completed' | 'Not Achieved' | 'Not Applicable';
  progress: number;
  dueDate: string;
  selfRating?: number;
  managerRating?: number;
}

export const mockPerformanceCycles: PerformanceCycle[] = [
  {
    id: 'PC-2026-H2',
    name: 'H2 2026 Performance Review',
    period: '01 Jul 2026 – 31 Dec 2026',
    status: 'Active',
    startDate: '2026-07-01',
    endDate: '2026-12-31',
    selfReviewDeadline: '2026-12-15',
    managerDeadline: '2026-12-22',
    finalizationDate: '2026-12-31',
    employeesCount: 184,
    completionPct: 52
  },
  {
    id: 'PC-2026-H1',
    name: 'H1 2026 Performance Review',
    period: '01 Jan 2026 – 30 Jun 2026',
    status: 'Completed',
    startDate: '2026-01-01',
    endDate: '2026-06-30',
    selfReviewDeadline: '2026-06-15',
    managerDeadline: '2026-06-22',
    finalizationDate: '2026-06-30',
    employeesCount: 178,
    completionPct: 100
  }
];

export const mockPerformanceReviews: PerformanceReview[] = [
  {
    id: 'REV-2026-00124',
    cycleId: 'PC-2026-H2',
    employeeId: 'EMP001',
    employeeName: 'Anjali Rao',
    department: 'Engineering',
    designation: 'Software Developer',
    manager: 'Vikram Sharma',
    status: 'Manager Review Completed',
    selfRating: 4.1,
    managerRating: 4.0,
    calibratedRating: 4.0
  },
  {
    id: 'REV-2026-00125',
    cycleId: 'PC-2026-H2',
    employeeId: 'EMP002',
    employeeName: 'Rahul Mehta',
    department: 'Engineering',
    designation: 'Frontend Engineer',
    manager: 'Vikram Sharma',
    status: 'Self Review Pending'
  },
  {
    id: 'REV-2026-00126',
    cycleId: 'PC-2026-H2',
    employeeId: 'EMP045',
    employeeName: 'Sneha Patel',
    department: 'Operations',
    designation: 'Operations Manager',
    manager: 'Arjun Verma',
    status: 'Finalized',
    selfRating: 4.5,
    managerRating: 4.2,
    calibratedRating: 4.2,
    finalRating: 4.2
  }
];

export const mockGoals: PerformanceGoal[] = [
  {
    id: 'G-101',
    reviewId: 'REV-2026-00124',
    title: 'Feature Delivery',
    type: 'KRA',
    description: 'Deliver assigned product features with agreed quality and timelines.',
    metric: 'Sprint delivery completion',
    target: '90%+',
    weight: 25,
    status: 'Completed',
    progress: 100,
    dueDate: '2026-12-15',
    selfRating: 4.0,
    managerRating: 4.0
  },
  {
    id: 'G-102',
    reviewId: 'REV-2026-00124',
    title: 'Code Quality',
    type: 'KPI',
    description: 'Maintain code quality with low bug regression.',
    metric: 'Bugs per sprint',
    target: '< 2',
    weight: 25,
    status: 'In Progress',
    progress: 85,
    dueDate: '2026-12-15',
    selfRating: 4.2,
    managerRating: 4.0
  }
];

export const mockPerformanceStats = {
  activeCycles: 2,
  employeesInReview: 184,
  selfReviewsPending: 36,
  managerReviewsPending: 42,
  overdueReviews: 11,
  completedThisCycle: 95
};
