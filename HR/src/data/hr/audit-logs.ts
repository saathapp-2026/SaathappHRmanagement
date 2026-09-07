import { mockEmployee } from './employees';

export type AuditCategory =
  | 'Employee'
  | 'Onboarding'
  | 'Attendance'
  | 'Correction'
  | 'Leave'
  | 'Concern'
  | 'Help Request'
  | 'Profile Request'
  | 'Document'
  | 'Announcement'
  | 'Probation'
  | 'Offboarding'
  | 'Asset'
  | 'Settings'
  | 'Authentication';

export type AuditAction =
  | 'Created'
  | 'Updated'
  | 'Approved'
  | 'Rejected'
  | 'Assigned'
  | 'Unassigned'
  | 'Activated'
  | 'Deactivated'
  | 'Verified'
  | 'Cancelled'
  | 'Archived'
  | 'Published'
  | 'Scheduled'
  | 'Extended'
  | 'Confirmed'
  | 'Returned'
  | 'Transferred'
  | 'Retired'
  | 'Status Changed'
  | 'Balance Adjusted'
  | 'Reviewer Changed'
  | 'Owner Changed'
  | 'Document Replaced'
  | 'Manually Marked'
  | 'Check-in Updated'
  | 'Check-out Updated';

export type AuditResult = 'Success' | 'Rejected' | 'Cancelled' | 'Failed';

export type AuditSource = 'HR Portal' | 'Employee Request' | 'Automated System' | 'Import';

export interface AuditActor {
  name: string;
  role: string;
}

export interface AuditFieldChange {
  field: string;
  previousValue: string | null;
  newValue: string | null;
}

export interface AuditEntity {
  type: string;
  id: string;
  name?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string; // ISO format or formatted string
  actor: AuditActor;
  action: AuditAction;
  actionDescription: string; // E.g., 'Approved Leave Request'
  category: AuditCategory;
  module: string; // e.g., 'Leave', 'Employees'
  entity: AuditEntity;
  employeeId?: string;
  employeeName?: string;
  fieldChanges?: AuditFieldChange[];
  reason?: string;
  result: AuditResult;
  decision?: 'Approved' | 'Rejected'; // Business decision
  sensitive?: boolean;
  source: AuditSource;
  relatedRoute?: string;
}

export const mockActors = {
  priya: { name: 'Priya Sharma', role: 'HR Manager' },
  rahul: { name: 'Rahul HR', role: 'HR Executive' },
  meera: { name: 'Meera HR', role: 'HR Executive' },
  system: { name: 'System', role: 'Automated' },
};

export const mockAuditLogs: AuditLogEntry[] = [
  {
    id: 'AUD-2026-00981',
    timestamp: '2026-09-07T10:42:18+05:30',
    actor: mockActors.priya,
    action: 'Approved',
    actionDescription: 'Approved Leave Request',
    category: 'Leave',
    module: 'Leave',
    entity: { type: 'Leave Request', id: 'LR-2026-00124' },
    employeeId: mockEmployee.id,
    employeeName: mockEmployee.name,
    fieldChanges: [
      { field: 'Status', previousValue: 'Pending', newValue: 'Approved' },
      { field: 'Reviewer', previousValue: 'Unassigned', newValue: 'Priya Sharma' },
    ],
    reason: 'Team coverage reviewed. Leave approved.',
    result: 'Success',
    decision: 'Approved',
    sensitive: false,
    source: 'HR Portal',
    relatedRoute: `/hr/leave/LR-2026-00124`,
  },
  {
    id: 'AUD-2026-00982',
    timestamp: '2026-09-07T10:25:00+05:30',
    actor: mockActors.rahul,
    action: 'Updated',
    actionDescription: 'Updated Employee Profile',
    category: 'Employee',
    module: 'Employees',
    entity: { type: 'Employee Profile', id: 'EMP003', name: 'Neha Gupta' },
    employeeId: 'EMP003',
    employeeName: 'Neha Gupta',
    fieldChanges: [
      { field: 'Work Location', previousValue: 'Mumbai Office', newValue: 'Bengaluru HQ' },
    ],
    result: 'Success',
    sensitive: false,
    source: 'HR Portal',
    relatedRoute: `/hr/employees/EMP003`,
  },
  {
    id: 'AUD-2026-00983',
    timestamp: '2026-09-07T09:58:00+05:30',
    actor: mockActors.priya,
    action: 'Rejected',
    actionDescription: 'Rejected Profile Change Request',
    category: 'Profile Request',
    module: 'Profile Requests',
    entity: { type: 'Profile Request', id: 'PCR-2026-00125' },
    employeeId: 'EMP005',
    employeeName: 'Rahul Mehta',
    fieldChanges: [
      { field: 'Status', previousValue: 'Pending', newValue: 'Rejected' },
    ],
    reason: 'Supporting documentation was incomplete.',
    result: 'Success', // System Result is Success
    decision: 'Rejected', // Business decision
    sensitive: false,
    source: 'HR Portal',
    relatedRoute: `/hr/profile-requests/PCR-2026-00125`,
  },
  {
    id: 'AUD-2026-00984',
    timestamp: '2026-09-06T15:30:00+05:30',
    actor: mockActors.meera,
    action: 'Assigned',
    actionDescription: 'Assigned Concern',
    category: 'Concern',
    module: 'Concerns',
    entity: { type: 'Concern', id: 'CON-2026-00124', name: 'Priority: High' },
    fieldChanges: [
      { field: 'Assignee', previousValue: 'Unassigned', newValue: 'Priya Sharma' },
    ],
    result: 'Success',
    sensitive: true, // Not necessarily sensitive, but treating it with care
    source: 'HR Portal',
    relatedRoute: `/hr/concerns/CON-2026-00124`,
  },
  {
    id: 'AUD-2026-00985',
    timestamp: '2026-09-06T14:15:00+05:30',
    actor: mockActors.system,
    action: 'Updated',
    actionDescription: 'Document Expiry Status Updated',
    category: 'Document',
    module: 'Documents',
    entity: { type: 'Document', id: 'DOC-9921', name: 'Passport' },
    employeeId: mockEmployee.id,
    employeeName: mockEmployee.name,
    fieldChanges: [
      { field: 'Status', previousValue: 'Active', newValue: 'Expired' },
    ],
    result: 'Success',
    sensitive: false,
    source: 'Automated System',
    relatedRoute: `/hr/documents/DOC-9921`,
  },
  {
    id: 'AUD-2026-00986',
    timestamp: '2026-09-05T11:00:00+05:30',
    actor: mockActors.priya,
    action: 'Approved',
    actionDescription: 'Approved Bank Information Change',
    category: 'Profile Request',
    module: 'Profile Requests',
    entity: { type: 'Bank Information', id: 'PCR-2026-00120' },
    employeeId: mockEmployee.id,
    employeeName: mockEmployee.name,
    fieldChanges: [
      { field: 'Account Number', previousValue: '••••2341', newValue: '••••8129' },
      { field: 'Status', previousValue: 'Pending', newValue: 'Approved' },
    ],
    result: 'Success',
    decision: 'Approved',
    sensitive: true,
    source: 'HR Portal',
    relatedRoute: `/hr/profile-requests/PCR-2026-00120`,
  },
  {
    id: 'AUD-2026-00987',
    timestamp: '2026-09-05T10:30:00+05:30',
    actor: mockActors.rahul,
    action: 'Balance Adjusted',
    actionDescription: 'Adjusted Leave Balance',
    category: 'Leave',
    module: 'Leave',
    entity: { type: 'Leave Balance', id: 'LB-001', name: 'Casual Leave' },
    employeeId: mockEmployee.id,
    employeeName: mockEmployee.name,
    fieldChanges: [
      { field: 'Remaining Days', previousValue: '5', newValue: '7' },
    ],
    reason: 'Manual HR adjustment',
    result: 'Success',
    sensitive: false,
    source: 'HR Portal',
    // No specific route to leave balance right now
  },
  {
    id: 'AUD-2026-00988',
    timestamp: '2026-09-04T09:15:00+05:30',
    actor: mockActors.priya,
    action: 'Published',
    actionDescription: 'Published Announcement',
    category: 'Announcement',
    module: 'Announcements',
    entity: { type: 'Announcement', id: 'ANN-2026-005', name: 'Townhall Q3' },
    fieldChanges: [
      { field: 'Status', previousValue: 'Draft', newValue: 'Published' },
    ],
    result: 'Success',
    sensitive: false,
    source: 'HR Portal',
    relatedRoute: `/hr/announcements/ANN-2026-005`,
  },
  {
    id: 'AUD-2026-00989',
    timestamp: '2026-09-03T16:45:00+05:30',
    actor: mockActors.meera,
    action: 'Extended',
    actionDescription: 'Extended Probation Period',
    category: 'Probation',
    module: 'Probation',
    entity: { type: 'Probation Record', id: 'PROB-102' },
    employeeId: 'EMP009',
    employeeName: 'Sanjay Kumar',
    fieldChanges: [
      { field: 'Probation End Date', previousValue: '31 Oct 2026', newValue: '30 Nov 2026' },
    ],
    reason: 'Additional review time required.',
    result: 'Success',
    sensitive: true,
    source: 'HR Portal',
    relatedRoute: `/hr/probation/EMP009`,
  },
  {
    id: 'AUD-2026-00990',
    timestamp: '2026-09-02T14:20:00+05:30',
    actor: mockActors.rahul,
    action: 'Returned',
    actionDescription: 'Asset Returned',
    category: 'Asset',
    module: 'Assets',
    entity: { type: 'Laptop', id: 'AST-LPT-042', name: 'MacBook Pro 16"' },
    employeeId: mockEmployee.id,
    employeeName: mockEmployee.name,
    fieldChanges: [
      { field: 'Status', previousValue: 'Assigned', newValue: 'Available' },
    ],
    result: 'Success',
    sensitive: false,
    source: 'HR Portal',
    relatedRoute: `/hr/assets/AST-LPT-042`,
  },
  {
    id: 'AUD-2026-00991',
    timestamp: '2026-09-01T11:05:00+05:30',
    actor: mockActors.system,
    action: 'Updated',
    actionDescription: 'Employee Update Attempt',
    category: 'Employee',
    module: 'Employees',
    entity: { type: 'Employee Profile', id: 'EMP015', name: 'Unknown' },
    employeeId: 'EMP015',
    result: 'Failed',
    reason: 'Validation Error',
    sensitive: false,
    source: 'Automated System',
  },
  {
    id: 'AUD-2026-00992',
    timestamp: '2026-09-07T12:00:00+05:30', // Today
    actor: mockActors.meera,
    action: 'Manually Marked',
    actionDescription: 'Manually Marked Attendance',
    category: 'Attendance',
    module: 'Attendance',
    entity: { type: 'Attendance Record', id: 'ATT-0907' },
    employeeId: mockEmployee.id,
    employeeName: mockEmployee.name,
    fieldChanges: [
      { field: 'Check-in Time', previousValue: null, newValue: '09:00 AM' },
    ],
    result: 'Success',
    sensitive: false,
    source: 'HR Portal',
    relatedRoute: `/hr/attendance/${mockEmployee.id}`,
  },
  {
    id: 'AUD-2026-00993',
    timestamp: '2026-09-07T13:30:00+05:30', // Today
    actor: mockActors.priya,
    action: 'Updated',
    actionDescription: 'Changed Employee Designation',
    category: 'Employee',
    module: 'Employees',
    entity: { type: 'Employee Profile', id: 'EMP020', name: 'Vikram Singh' },
    employeeId: 'EMP020',
    employeeName: 'Vikram Singh',
    fieldChanges: [
      { field: 'Designation', previousValue: 'Software Engineer', newValue: 'Senior Software Engineer' },
      { field: 'Manager', previousValue: 'Anil Kumar', newValue: 'Amit Rao' },
      { field: 'Location', previousValue: 'Remote', newValue: 'Bengaluru HQ' }
    ],
    result: 'Success',
    sensitive: false,
    source: 'HR Portal',
    relatedRoute: `/hr/employees/EMP020`,
  },
];
