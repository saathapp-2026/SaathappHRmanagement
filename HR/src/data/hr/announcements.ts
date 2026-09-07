export type AnnouncementStatus = 'Draft' | 'Scheduled' | 'Published' | 'Expired' | 'Archived' | 'Cancelled';
export type AnnouncementCategory = 'General' | 'Policy' | 'Holiday' | 'Event' | 'Training' | 'Payroll' | 'Benefits' | 'Emergency' | 'HR Update' | 'Other';
export type AnnouncementPriority = 'Normal' | 'Important' | 'Urgent';
export type AnnouncementAudienceType = 'Everyone' | 'Department' | 'Location' | 'Designation' | 'Selected Employees';

export type AnnouncementAttachment = {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  url: string;
};

export type AnnouncementAudience = {
  type: AnnouncementAudienceType;
  departments?: string[];
  locations?: string[];
  designations?: string[];
  employees?: string[];
};

export type AnnouncementReadStats = {
  delivered: number;
  read: number;
  unread: number;
  readRate: number;
};

export type AnnouncementAcknowledgementStats = {
  acknowledged: number;
  notAcknowledged: number;
  acknowledgementRate: number;
};

export type AnnouncementRevision = {
  id: string;
  updatedAt: string;
  updatedBy: string;
  updatedByName: string;
  changes: string;
};

export type UnreadEmployee = {
  id: string;
  name: string;
  department: string;
  location: string;
};

export type Announcement = {
  id: string;
  title: string;
  description: string;
  category: AnnouncementCategory;
  priority: AnnouncementPriority;
  status: AnnouncementStatus;
  publishDate: string; // ISO String
  expiryDate?: string; // ISO String
  audience: AnnouncementAudience;
  estimatedReach: number;
  readStats?: AnnouncementReadStats;
  acknowledgementStats?: AnnouncementAcknowledgementStats;
  requireAcknowledgement: boolean;
  pinAnnouncement: boolean;
  attachments: AnnouncementAttachment[];
  createdBy: string;
  createdByName: string;
  createdAt: string; // ISO String
  updatedAt: string; // ISO String
  revisions?: AnnouncementRevision[];
  cancellationReason?: string;
  unreadEmployees?: UnreadEmployee[];
};

export const mockAnnouncements: Announcement[] = [
  {
    id: 'ANN-2026-00124',
    title: 'Ganesh Chaturthi Holiday Notice',
    description: 'Dear Team, please note that the office will remain closed on 09 Sep 2026 on account of Ganesh Chaturthi. Enjoy the festival!',
    category: 'Holiday',
    priority: 'Important',
    status: 'Published',
    publishDate: '2026-09-08T09:00:00Z',
    expiryDate: '2026-09-10T00:00:00Z',
    audience: { type: 'Everyone' },
    estimatedReach: 248,
    readStats: { delivered: 248, read: 221, unread: 27, readRate: 89.1 },
    requireAcknowledgement: false,
    pinAnnouncement: true,
    attachments: [],
    createdBy: 'EMP-MGR2',
    createdByName: 'Priya Sharma',
    createdAt: '2026-09-07T10:00:00Z',
    updatedAt: '2026-09-08T09:00:00Z',
    revisions: [],
    unreadEmployees: [
      { id: 'EMP005', name: 'Rahul Verma', department: 'Engineering', location: 'Bengaluru HQ' },
      { id: 'EMP009', name: 'Neha Gupta', department: 'Operations', location: 'Mumbai Office' }
    ]
  },
  {
    id: 'ANN-2026-00125',
    title: 'Engineering Security Training',
    description: 'Mandatory security training for all engineering staff. Please complete the module by the end of the week.',
    category: 'Training',
    priority: 'Normal',
    status: 'Scheduled',
    publishDate: '2026-09-12T09:00:00Z',
    expiryDate: '2026-09-15T18:00:00Z',
    audience: { type: 'Department', departments: ['D01'] },
    estimatedReach: 72,
    requireAcknowledgement: true,
    pinAnnouncement: false,
    attachments: [
      { id: 'ATT1', fileName: 'security-guidelines.pdf', fileSize: 1200000, fileType: 'application/pdf', url: '#' }
    ],
    createdBy: 'EMP-MGR1',
    createdByName: 'Vikram Sharma',
    createdAt: '2026-09-06T14:00:00Z',
    updatedAt: '2026-09-06T14:00:00Z',
    revisions: []
  },
  {
    id: 'ANN-2026-00126',
    title: 'Updated Leave Policy',
    description: 'We have updated our annual leave policy to include 2 additional wellness days. Please review the attached document.',
    category: 'Policy',
    priority: 'Important',
    status: 'Draft',
    publishDate: '2026-09-01T00:00:00Z', // Past date, will be updated when published
    audience: { type: 'Everyone' },
    estimatedReach: 248,
    requireAcknowledgement: true,
    pinAnnouncement: true,
    attachments: [
      { id: 'ATT2', fileName: 'leave-policy-2026.pdf', fileSize: 2500000, fileType: 'application/pdf', url: '#' }
    ],
    createdBy: 'EMP-MGR2',
    createdByName: 'Priya Sharma',
    createdAt: '2026-09-07T11:00:00Z',
    updatedAt: '2026-09-07T11:30:00Z',
    revisions: []
  },
  {
    id: 'ANN-2026-00127',
    title: 'Emergency Server Maintenance',
    description: 'Servers will be down for 30 minutes at midnight tonight for urgent patching.',
    category: 'Emergency',
    priority: 'Urgent',
    status: 'Published',
    publishDate: '2026-09-07T18:00:00Z',
    expiryDate: '2026-09-08T02:00:00Z',
    audience: { type: 'Department', departments: ['D01', 'D03'] },
    estimatedReach: 126,
    readStats: { delivered: 126, read: 120, unread: 6, readRate: 95.2 },
    requireAcknowledgement: false,
    pinAnnouncement: true,
    attachments: [],
    createdBy: 'EMP-MGR1',
    createdByName: 'Vikram Sharma',
    createdAt: '2026-09-07T17:45:00Z',
    updatedAt: '2026-09-07T17:50:00Z',
    revisions: [
       { id: 'REV1', updatedAt: '2026-09-07T17:50:00Z', updatedBy: 'EMP-MGR1', updatedByName: 'Vikram Sharma', changes: 'Description updated for clarity' }
    ],
    unreadEmployees: []
  },
  {
    id: 'ANN-2026-00128',
    title: 'Benefits Enrollment Reminder',
    description: 'Friendly reminder to complete your benefits enrollment by Friday.',
    category: 'Benefits',
    priority: 'Normal',
    status: 'Published',
    publishDate: '2026-09-05T09:00:00Z',
    expiryDate: '2026-09-11T18:00:00Z',
    audience: { type: 'Everyone' },
    estimatedReach: 248,
    readStats: { delivered: 248, read: 200, unread: 48, readRate: 80.6 },
    requireAcknowledgement: false,
    pinAnnouncement: false,
    attachments: [],
    createdBy: 'EMP-MGR2',
    createdByName: 'Priya Sharma',
    createdAt: '2026-09-04T10:00:00Z',
    updatedAt: '2026-09-05T09:00:00Z',
    revisions: []
  },
  {
    id: 'ANN-2026-00129',
    title: 'Company Town Hall',
    description: 'Join us for the Q3 Company Town Hall next Tuesday in the main cafeteria or online.',
    category: 'Event',
    priority: 'Important',
    status: 'Scheduled',
    publishDate: '2026-09-15T08:30:00Z',
    expiryDate: '2026-09-15T12:00:00Z',
    audience: { type: 'Everyone' },
    estimatedReach: 248,
    requireAcknowledgement: false,
    pinAnnouncement: true,
    attachments: [],
    createdBy: 'EMP-CEO',
    createdByName: 'Saurabh Kumar',
    createdAt: '2026-09-01T09:00:00Z',
    updatedAt: '2026-09-01T09:00:00Z',
    revisions: []
  }
];
