export type HelpStatus = 'Open' | 'In Progress' | 'Waiting for Employee' | 'Resolved' | 'Closed';
export type HelpPriority = 'Low' | 'Normal' | 'High' | 'Urgent';
export type HelpCategory = 'IT Support' | 'HR Policy' | 'Payroll' | 'Facility' | 'Admin' | 'Other';

export type HelpMessage = {
  id: string;
  senderName: string;
  senderRole: 'Employee' | 'Support Agent' | 'System';
  date: string;
  content: string;
};

export type HelpInternalNote = {
  id: string;
  authorName: string;
  date: string;
  content: string;
};

export type HelpAttachment = {
  id: string;
  name: string;
  type: string;
  size: string;
};

export type HelpTimelineEvent = {
  id: string;
  title: string;
  actor: string;
  date: string;
  description?: string;
};

export type HelpRequest = {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeDesignation: string;
  employeeDepartment: string;
  category: HelpCategory;
  subject: string;
  description: string;
  priority: HelpPriority;
  status: HelpStatus;
  assignedTo?: string;
  submittedAt: string;
  slaStatus: 'On Track' | 'At Risk' | 'Overdue';
  ageText: string;
  messages: HelpMessage[];
  internalNotes: HelpInternalNote[];
  attachments: HelpAttachment[];
  timeline: HelpTimelineEvent[];
};

export const mockHelpRequests: HelpRequest[] = [
  {
    id: 'REQ-2026-00401',
    employeeId: 'EMP001',
    employeeName: 'Anjali Rao',
    employeeDesignation: 'Software Developer',
    employeeDepartment: 'Engineering',
    category: 'IT Support',
    subject: 'Laptop battery draining fast',
    description: 'My work laptop battery drains from 100% to 10% in under an hour. I think it needs a replacement.',
    priority: 'High',
    status: 'In Progress',
    assignedTo: 'IT Desk',
    submittedAt: '06 Sep 2026 · 09:15 AM',
    slaStatus: 'At Risk',
    ageText: '1 day',
    messages: [
      { id: 'm1', senderName: 'Anjali Rao', senderRole: 'Employee', date: '06 Sep 2026 · 09:15 AM', content: 'My work laptop battery drains from 100% to 10% in under an hour.' },
      { id: 'm2', senderName: 'IT Desk', senderRole: 'Support Agent', date: '06 Sep 2026 · 10:00 AM', content: 'We have ordered a replacement battery. It will arrive by tomorrow.' }
    ],
    internalNotes: [
      { id: 'n1', authorName: 'IT Desk', date: '06 Sep 2026 · 09:55 AM', content: 'Battery health shows 42%. Placed order for replacement.' }
    ],
    attachments: [],
    timeline: [
      { id: 't1', title: 'Request Submitted', actor: 'Anjali Rao', date: '06 Sep 2026 · 09:15 AM' },
      { id: 't2', title: 'Status Changed (Open → In Progress)', actor: 'IT Desk', date: '06 Sep 2026 · 09:50 AM' }
    ]
  },
  {
    id: 'REQ-2026-00402',
    employeeId: 'EMP002',
    employeeName: 'Siddharth Rao',
    employeeDesignation: 'Backend Engineer',
    employeeDepartment: 'Engineering',
    category: 'HR Policy',
    subject: 'PF Transfer Query',
    description: 'How do I initiate my PF transfer from my previous employer?',
    priority: 'Normal',
    status: 'Open',
    submittedAt: '07 Sep 2026 · 11:30 AM',
    slaStatus: 'On Track',
    ageText: '3 hours',
    messages: [
      { id: 'm1', senderName: 'Siddharth Rao', senderRole: 'Employee', date: '07 Sep 2026 · 11:30 AM', content: 'How do I initiate my PF transfer from my previous employer?' }
    ],
    internalNotes: [],
    attachments: [],
    timeline: [
      { id: 't1', title: 'Request Submitted', actor: 'Siddharth Rao', date: '07 Sep 2026 · 11:30 AM' }
    ]
  },
  {
    id: 'REQ-2026-00403',
    employeeId: 'EMP005',
    employeeName: 'Rahul Verma',
    employeeDesignation: 'Mobile Engineer',
    employeeDepartment: 'Engineering',
    category: 'Facility',
    subject: 'Chair replacement',
    description: 'The armrest of my chair is broken.',
    priority: 'Low',
    status: 'Waiting for Employee',
    assignedTo: 'Admin Team',
    submittedAt: '05 Sep 2026 · 02:00 PM',
    slaStatus: 'Overdue',
    ageText: '2 days',
    messages: [
      { id: 'm1', senderName: 'Rahul Verma', senderRole: 'Employee', date: '05 Sep 2026 · 02:00 PM', content: 'The armrest of my chair is broken.' },
      { id: 'm2', senderName: 'Admin Team', senderRole: 'Support Agent', date: '05 Sep 2026 · 04:00 PM', content: 'Could you please provide your desk number?' }
    ],
    internalNotes: [],
    attachments: [],
    timeline: [
      { id: 't1', title: 'Request Submitted', actor: 'Rahul Verma', date: '05 Sep 2026 · 02:00 PM' }
    ]
  }
];

export const getHelpPriorityColor = (p: HelpPriority) => {
  switch (p) {
    case 'Urgent': return 'bg-rose-100 text-rose-800 border-rose-200 font-bold';
    case 'High': return 'bg-orange-100 text-orange-800 border-orange-200 font-semibold';
    case 'Normal': return 'bg-gray-100 text-gray-700 border-gray-200 font-medium';
    case 'Low': return 'bg-slate-100 text-slate-600 border-slate-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const getHelpStatusColor = (s: HelpStatus) => {
  switch (s) {
    case 'Open': return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'In Progress': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    case 'Waiting for Employee': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Resolved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Closed': return 'bg-gray-100 text-gray-600 border-gray-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const getSlaColor = (s: 'On Track' | 'At Risk' | 'Overdue') => {
  switch (s) {
    case 'On Track': return 'text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100';
    case 'At Risk': return 'text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-100';
    case 'Overdue': return 'text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100 font-bold';
  }
}
