import { HRNotification } from '@/types/hr/notifications';

export const mockNotifications: HRNotification[] = [
  {
    id: 'NOTIF-001',
    type: 'leave.requested',
    category: 'Leave',
    title: 'Leave Request Submitted',
    description: 'Anjali Rao requested Casual Leave for 10–11 Sep.',
    employeeId: 'EMP-001',
    employeeName: 'Anjali Rao',
    relatedEntityId: 'LR-2026-00124',
    relatedRoute: '/hr/leave/LR-2026-00124',
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    priority: 'Normal',
    isRead: false,
    requiresAction: true,
    isArchived: false,
    metadata: {
      leaveType: 'Casual Leave',
      dates: '10–11 Sep 2026',
      days: 2,
      status: 'Pending'
    }
  },
  {
    id: 'NOTIF-002',
    type: 'attendance.correction_requested',
    category: 'Attendance Correction',
    title: 'Attendance Correction Submitted',
    description: 'Rahul Verma requested checkout correction for 05 Sep 2026.',
    employeeId: 'EMP-002',
    employeeName: 'Rahul Verma',
    relatedEntityId: 'COR-001',
    relatedRoute: '/hr/corrections/COR-001',
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    priority: 'Normal',
    isRead: false,
    requiresAction: true,
    isArchived: false,
    metadata: {
      date: '05 Sep 2026',
      originalTime: 'Missed',
      requestedTime: '18:30'
    }
  },
  {
    id: 'NOTIF-003',
    type: 'concern.created',
    category: 'Concern',
    title: 'New Concern Raised',
    description: 'Neha Gupta submitted an urgent workplace concern.',
    employeeId: 'EMP-003',
    employeeName: 'Neha Gupta',
    relatedEntityId: 'CON-001',
    relatedRoute: '/hr/concerns/CON-001',
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    priority: 'Urgent',
    isRead: false,
    requiresAction: true,
    isArchived: false,
    metadata: {
      caseId: 'CON-001',
      concernCategory: 'Workplace Incident',
      priority: 'Urgent'
    }
  },
  {
    id: 'NOTIF-004',
    type: 'profile_change.requested',
    category: 'Profile Request',
    title: 'Profile Change Request',
    description: 'Rahul Mehta requested a bank information update.',
    employeeId: 'EMP-004',
    employeeName: 'Rahul Mehta',
    relatedEntityId: 'PR-001',
    relatedRoute: '/hr/profile-requests/PR-001',
    createdAt: new Date(Date.now() - 42 * 60 * 1000).toISOString(),
    priority: 'Important',
    isRead: false,
    requiresAction: true,
    isArchived: false,
    metadata: {
      requestedField: 'Bank Account Details',
      risk: 'High'
    }
  },
  {
    id: 'NOTIF-005',
    type: 'help.overdue',
    category: 'Help Request',
    title: 'Help Request Overdue',
    description: 'HELP-2026-000124 has exceeded its resolution SLA.',
    relatedEntityId: 'HELP-2026-000124',
    relatedRoute: '/hr/help/HELP-2026-000124',
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    priority: 'Important',
    isRead: true,
    requiresAction: true,
    isArchived: false,
    metadata: {
      requestId: 'HELP-2026-000124',
      requestCategory: 'IT Support',
      sla: 'Overdue by 2 hours'
    }
  },
  {
    id: 'NOTIF-006',
    type: 'document.expiring',
    category: 'Document',
    title: 'Document Expiring',
    description: "Anjali Rao's identity document expires in 14 days.",
    employeeId: 'EMP-001',
    employeeName: 'Anjali Rao',
    relatedRoute: '/hr/documents',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    priority: 'Normal',
    isRead: true,
    requiresAction: true,
    isArchived: false
  },
  {
    id: 'NOTIF-007',
    type: 'employee.joined',
    category: 'Employee',
    title: 'Employee Joined Today',
    description: 'Siddharth Rao starts today.',
    employeeId: 'EMP-005',
    employeeName: 'Siddharth Rao',
    relatedEntityId: 'EMP-005',
    relatedRoute: '/hr/employees/EMP-005',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    priority: 'Normal',
    isRead: false,
    requiresAction: false,
    isArchived: false
  },
  {
    id: 'NOTIF-008',
    type: 'probation.ending',
    category: 'Probation',
    title: 'Probation Ending',
    description: "Rahul Verma's probation ends in 7 days.",
    employeeId: 'EMP-002',
    employeeName: 'Rahul Verma',
    relatedEntityId: 'EMP-002',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    priority: 'Important',
    isRead: true,
    requiresAction: true,
    isArchived: false
  },
  {
    id: 'NOTIF-009',
    type: 'announcement.unread_high_priority',
    category: 'Announcement',
    title: 'Urgent Announcement Unread',
    description: 'Urgent announcement still unread by 20% of audience.',
    relatedRoute: '/hr/announcements',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'Urgent',
    isRead: true,
    requiresAction: true,
    isArchived: false
  }
];
