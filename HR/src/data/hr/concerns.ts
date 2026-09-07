export type ConcernStatus = 'New' | 'Under Review' | 'Waiting for Employee' | 'Resolved' | 'Closed';
export type ConcernPriority = 'Low' | 'Normal' | 'High' | 'Urgent';
export type ConcernCategory = 'Workplace' | 'Manager' | 'Salary' | 'Attendance' | 'Leave' | 'Harassment' | 'Policy' | 'Technical' | 'Other';

export type ConcernMessage = {
  id: string;
  senderName: string;
  senderRole: 'Employee' | 'HR System' | 'HR Member';
  date: string;
  content: string;
};

export type ConcernInternalNote = {
  id: string;
  authorName: string;
  date: string;
  content: string;
};

export type ConcernAttachment = {
  id: string;
  name: string;
  type: string;
  size: string;
};

export type ConcernTimelineEvent = {
  id: string;
  title: string;
  actor: string;
  date: string;
  description?: string;
};

export type ConcernCase = {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeDesignation: string;
  employeeDepartment: string;
  managerName?: string;
  joiningDate?: string;
  employmentType?: string;
  category: ConcernCategory;
  subject: string;
  description: string;
  priority: ConcernPriority;
  status: ConcernStatus;
  assignedTo?: string;
  submittedAt: string;
  ageText: string;
  messages: ConcernMessage[];
  internalNotes: ConcernInternalNote[];
  attachments: ConcernAttachment[];
  timeline: ConcernTimelineEvent[];
};

export const mockConcerns: ConcernCase[] = [
  {
    id: 'CON-2026-00124',
    employeeId: 'EMP001',
    employeeName: 'Anjali Rao',
    employeeDesignation: 'Software Developer',
    employeeDepartment: 'Engineering',
    managerName: 'Vikram Sharma',
    joiningDate: '01 Aug 2026',
    employmentType: 'Full-Time',
    category: 'Manager',
    subject: 'Workload and communication issue',
    description: 'I would like HR support regarding recurring communication issues and workload planning with my reporting manager. I would prefer to discuss this confidentially.',
    priority: 'High',
    status: 'Under Review',
    assignedTo: 'Priya Sharma',
    submittedAt: '06 Sep 2026 · 10:24 AM',
    ageText: '1 day',
    messages: [
      { id: 'm1', senderName: 'Anjali Rao', senderRole: 'Employee', date: '06 Sep 2026 · 10:24 AM', content: 'I have been experiencing repeated last-minute workload changes...' },
      { id: 'm2', senderName: 'Priya Sharma', senderRole: 'HR Member', date: '06 Sep 2026 · 11:05 AM', content: 'Thank you for raising this. I would like to understand a few details before proceeding.' },
      { id: 'm3', senderName: 'Anjali Rao', senderRole: 'Employee', date: '06 Sep 2026 · 02:18 PM', content: 'Sure. The issue has happened several times during the last month...' }
    ],
    internalNotes: [
      { id: 'n1', authorName: 'Priya Sharma', date: '06 Sep 2026 · 11:15 AM', content: 'Discussed workload pattern with department head. No formal escalation yet.' }
    ],
    attachments: [
      { id: 'a1', name: 'conversation-screenshot.png', type: 'Image', size: '840 KB' },
      { id: 'a2', name: 'work-allocation.pdf', type: 'PDF', size: '315 KB' }
    ],
    timeline: [
      { id: 't1', title: 'Concern Submitted', actor: 'Anjali Rao', date: '06 Sep 2026 · 10:24 AM' },
      { id: 't2', title: 'Assigned to Priya Sharma', actor: 'System', date: '06 Sep 2026 · 10:30 AM' },
      { id: 't3', title: 'Opened by HR', actor: 'Priya Sharma', date: '06 Sep 2026 · 11:02 AM' },
      { id: 't4', title: 'HR Reply Sent', actor: 'Priya Sharma', date: '06 Sep 2026 · 11:05 AM' },
      { id: 't5', title: 'Employee Responded', actor: 'Anjali Rao', date: '06 Sep 2026 · 02:18 PM' },
      { id: 't6', title: 'Status Changed (New → Under Review)', actor: 'Priya Sharma', date: '06 Sep 2026 · 02:30 PM' }
    ]
  },
  {
    id: 'CON-2026-00125',
    employeeId: 'EMP002',
    employeeName: 'Rahul Mehta',
    employeeDesignation: 'Product Designer',
    employeeDepartment: 'Design',
    managerName: 'Karan Singh',
    joiningDate: '15 Mar 2025',
    category: 'Salary',
    subject: 'Salary revision clarification',
    description: 'I need clarification on the recent salary revision letter.',
    priority: 'Normal',
    status: 'Waiting for Employee',
    assignedTo: 'Rahul HR',
    submittedAt: '05 Sep 2026 · 09:15 AM',
    ageText: '2 days',
    messages: [
      { id: 'm1', senderName: 'Rahul Mehta', senderRole: 'Employee', date: '05 Sep 2026 · 09:15 AM', content: 'Could you please explain component X?' },
      { id: 'm2', senderName: 'Rahul HR', senderRole: 'HR Member', date: '05 Sep 2026 · 10:00 AM', content: 'Please review page 2 of the attached handbook and let me know if it clears it up.' }
    ],
    internalNotes: [],
    attachments: [],
    timeline: [
      { id: 't1', title: 'Concern Submitted', actor: 'Rahul Mehta', date: '05 Sep 2026 · 09:15 AM' }
    ]
  },
  {
    id: 'CON-2026-00126',
    employeeId: 'EMP003',
    employeeName: 'Neha Gupta',
    employeeDesignation: 'Frontend Engineer',
    employeeDepartment: 'Engineering',
    managerName: 'Vikram Sharma',
    joiningDate: '10 Jan 2024',
    category: 'Workplace',
    subject: 'Team collaboration concern',
    description: 'There are ongoing collaboration issues with another team.',
    priority: 'Normal',
    status: 'New',
    submittedAt: '07 Sep 2026 · 11:00 AM',
    ageText: '3 hours',
    messages: [
      { id: 'm1', senderName: 'Neha Gupta', senderRole: 'Employee', date: '07 Sep 2026 · 11:00 AM', content: 'There are ongoing collaboration issues with another team.' }
    ],
    internalNotes: [],
    attachments: [],
    timeline: [
      { id: 't1', title: 'Concern Submitted', actor: 'Neha Gupta', date: '07 Sep 2026 · 11:00 AM' }
    ]
  }
];

export const getPriorityColor = (p: ConcernPriority) => {
  switch (p) {
    case 'Urgent': return 'bg-rose-100 text-rose-800 border-rose-200 font-bold';
    case 'High': return 'bg-orange-100 text-orange-800 border-orange-200 font-semibold';
    case 'Normal': return 'bg-gray-100 text-gray-700 border-gray-200 font-medium';
    case 'Low': return 'bg-slate-100 text-slate-600 border-slate-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const getStatusColor = (s: ConcernStatus) => {
  switch (s) {
    case 'New': return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Under Review': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    case 'Waiting for Employee': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Resolved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Closed': return 'bg-gray-100 text-gray-600 border-gray-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};
