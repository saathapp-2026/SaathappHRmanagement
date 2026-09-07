export type NotificationCategory = 'Leave' | 'Attendance' | 'Attendance Correction' | 'Concern' | 'Help Request' | 'Profile Request' | 'Document' | 'Employee' | 'Onboarding' | 'Probation' | 'Offboarding' | 'Announcement' | 'Account' | 'System';

export type NotificationPriority = 'Normal' | 'Important' | 'Urgent';

export interface HRNotification {
  id: string;
  type: string;
  category: NotificationCategory;
  title: string;
  description: string;
  employeeId?: string;
  employeeName?: string;
  relatedEntityId?: string;
  relatedRoute?: string;
  createdAt: string; // ISO string
  priority: NotificationPriority;
  isRead: boolean;
  requiresAction: boolean;
  isArchived: boolean;
  metadata?: Record<string, unknown>;
}
