export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected' | 'Needs Clarification' | 'Cancelled';
export type LeaveType = 'Casual Leave' | 'Sick Leave' | 'Earned Leave' | 'Comp Off' | 'Unpaid Leave' | 'Maternity Leave' | 'Paternity Leave' | 'Bereavement Leave';

export type LeaveRequest = {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  avatar: string;
  leaveType: LeaveType;
  fromDate: string;
  toDate: string;
  workingDays: number;
  reason: string;
  balanceRemaining: number;
  submitted: string;
  status: LeaveStatus;
  age: string;
  attachments: { name: string; type: string; size: string }[];
  managerRecommendation: 'Approved' | 'No recommendation' | 'Rejected';
  reportingManager: string;
};

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 'LVR-2026-00124',
    employeeId: 'EMP001',
    employeeName: 'Anjali Rao',
    department: 'Engineering',
    avatar: 'AR',
    leaveType: 'Casual Leave',
    fromDate: '10 Sep 2026',
    toDate: '11 Sep 2026',
    workingDays: 2,
    reason: 'Personal work and family appointment.',
    balanceRemaining: 8,
    submitted: '07 Sep 2026',
    status: 'Pending',
    age: '2h ago',
    attachments: [],
    managerRecommendation: 'Approved',
    reportingManager: 'Vikram Sharma'
  },
  {
    id: 'LVR-2026-00125',
    employeeId: 'EMP002',
    employeeName: 'Rahul Mehta',
    department: 'Engineering',
    avatar: 'RM',
    leaveType: 'Sick Leave',
    fromDate: '08 Sep 2026',
    toDate: '09 Sep 2026',
    workingDays: 2,
    reason: 'Medical recovery.',
    balanceRemaining: 6,
    submitted: '07 Sep 2026',
    status: 'Pending',
    age: '1 day old',
    attachments: [{ name: 'medical-certificate.pdf', type: 'PDF', size: '420 KB' }],
    managerRecommendation: 'Approved',
    reportingManager: 'Vikram Sharma'
  },
  {
    id: 'LVR-2026-00126',
    employeeId: 'EMP003',
    employeeName: 'Neha Gupta',
    department: 'Design',
    avatar: 'NG',
    leaveType: 'Earned Leave',
    fromDate: '15 Sep 2026',
    toDate: '19 Sep 2026',
    workingDays: 5,
    reason: 'Family travel.',
    balanceRemaining: 12,
    submitted: '06 Sep 2026',
    status: 'Needs Clarification',
    age: '2 days old',
    attachments: [],
    managerRecommendation: 'No recommendation',
    reportingManager: 'Priya Sharma'
  }
];

export const mockTeamOverlap = [
  { date: '10 Sep', employees: [{ name: 'Anjali Rao', status: 'Requested' }, { name: 'Rahul Mehta', status: 'Approved Leave' }, { name: 'Vikram Sharma', status: 'Working' }, { name: 'Neha Gupta', status: 'Working' }] },
  { date: '11 Sep', employees: [{ name: 'Anjali Rao', status: 'Requested' }, { name: 'Rahul Mehta', status: 'Working' }, { name: 'Vikram Sharma', status: 'Approved Leave' }] }
];

export const getLeaveStatusColor = (status: LeaveStatus) => {
  switch (status) {
    case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Approved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Rejected': return 'bg-rose-50 text-rose-700 border-rose-200';
    case 'Needs Clarification': return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Cancelled': return 'bg-gray-100 text-gray-600 border-gray-200';
    default: return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};
