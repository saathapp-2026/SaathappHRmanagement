
export type ProfileChangeStatus = 'Pending' | 'Under Review' | 'Needs Clarification' | 'Approved' | 'Rejected' | 'Cancelled';
export type ProfileChangeType = 'Bank Information' | 'Legal Name' | 'Address' | 'Emergency Contact' | 'Date of Birth Correction' | 'Mobile Number' | 'Personal Email' | 'Nominee Details' | 'Other';
export type ProfileChangeRisk = 'Low' | 'Medium' | 'High';

export interface ProfileChangeField {
  name: string;
  oldValue: string;
  newValue: string;
  changed: boolean;
}

export interface ProfileChangeAttachment {
  id: string;
  name: string;
  size: string;
  status: 'Provided' | 'Missing' | 'Needs Replacement' | 'Verified';
  url: string;
}

export interface ProfileChangeClarification {
  id: string;
  author: string;
  role: 'HR' | 'Employee';
  date: string;
  message: string;
  attachment?: {
    name: string;
    url: string;
  };
}

export interface ProfileChangeInternalNote {
  id: string;
  author: string;
  date: string;
  note: string;
}

export interface ProfileChangeTimelineEvent {
  id: string;
  title: string;
  date: string;
  actor: string;
  type: 'submit' | 'assign' | 'review' | 'clarification' | 'response' | 'status_change' | 'note' | 'view';
}

export interface ProfileChangeRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  requestType: ProfileChangeType;
  status: ProfileChangeStatus;
  riskLevel: ProfileChangeRisk;
  submittedDate: string;
  reviewer?: string;
  reason: string;
  fields: ProfileChangeField[];
  attachments: ProfileChangeAttachment[];
  clarifications: ProfileChangeClarification[];
  internalNotes: ProfileChangeInternalNote[];
  timeline: ProfileChangeTimelineEvent[];
  decision?: {
    date: string;
    by: string;
    remarks: string;
    reason?: string; // used for rejection
    resubmissionAllowed?: boolean;
  };
}

export const mockProfileRequests: ProfileChangeRequest[] = [
  {
    id: 'PCR-2026-00124',
    employeeId: 'EMP001',
    employeeName: 'Anjali Rao',
    requestType: 'Bank Information',
    status: 'Under Review',
    riskLevel: 'High',
    submittedDate: '2026-09-07T09:45:00Z',
    reviewer: 'Priya Sharma',
    reason: 'I have changed my salary account and would like payroll records to be updated.',
    fields: [
      { name: 'Bank Name', oldValue: 'HDFC Bank', newValue: 'State Bank of India', changed: true },
      { name: 'Account Number', oldValue: '•••• 2341', newValue: '•••• 8129', changed: true },
      { name: 'IFSC', oldValue: 'HDFC0000123', newValue: 'SBIN0000456', changed: true },
      { name: 'Account Holder', oldValue: 'Anjali Rao', newValue: 'Anjali Rao', changed: false }
    ],
    attachments: [
      { id: 'att-1', name: 'cancelled-cheque.pdf', size: '420 KB', status: 'Provided', url: '#' }
    ],
    clarifications: [],
    internalNotes: [],
    timeline: [
      { id: 'tl-1', title: 'Request Submitted', date: '2026-09-07T09:45:00Z', actor: 'Anjali Rao', type: 'submit' },
      { id: 'tl-2', title: 'Reviewer Assigned', date: '2026-09-07T10:00:00Z', actor: 'System', type: 'assign' },
      { id: 'tl-3', title: 'Review Started', date: '2026-09-07T10:05:00Z', actor: 'Priya Sharma', type: 'review' }
    ]
  },
  {
    id: 'PCR-2026-00125',
    employeeId: 'EMP002',
    employeeName: 'Rahul Mehta',
    requestType: 'Address',
    status: 'Pending',
    riskLevel: 'Low',
    submittedDate: '2026-09-06T14:30:00Z',
    reason: 'Moved to a new apartment closer to office.',
    fields: [
      { name: 'Address Line', oldValue: '123 Indiranagar', newValue: '456 Whitefield', changed: true },
      { name: 'City', oldValue: 'Bengaluru', newValue: 'Bengaluru', changed: false },
      { name: 'PIN Code', oldValue: '560038', newValue: '560066', changed: true }
    ],
    attachments: [
      { id: 'att-2', name: 'rental-agreement.pdf', size: '2.1 MB', status: 'Provided', url: '#' }
    ],
    clarifications: [],
    internalNotes: [],
    timeline: [
      { id: 'tl-4', title: 'Request Submitted', date: '2026-09-06T14:30:00Z', actor: 'Rahul Mehta', type: 'submit' }
    ]
  },
  {
    id: 'PCR-2026-00126',
    employeeId: 'EMP003',
    employeeName: 'Neha Gupta',
    requestType: 'Legal Name',
    status: 'Needs Clarification',
    riskLevel: 'High',
    submittedDate: '2026-09-05T11:20:00Z',
    reviewer: 'Priya Sharma',
    reason: 'Name change after marriage.',
    fields: [
      { name: 'Current Legal Name', oldValue: 'Neha Gupta', newValue: 'Neha Sharma', changed: true },
      { name: 'Reason', oldValue: '-', newValue: 'Marriage', changed: true }
    ],
    attachments: [
      { id: 'att-3', name: 'marriage-certificate.jpg', size: '1.5 MB', status: 'Needs Replacement', url: '#' }
    ],
    clarifications: [
      {
        id: 'c-1',
        author: 'Priya Sharma',
        role: 'HR',
        date: '2026-09-06T10:00:00Z',
        message: 'The attached marriage certificate is blurry and cannot be read clearly. Please upload a scanned PDF or a high-quality image.'
      },
      {
        id: 'c-2',
        author: 'Neha Gupta',
        role: 'Employee',
        date: '2026-09-06T11:30:00Z',
        message: 'Uploaded a new clear PDF version.',
        attachment: { name: 'marriage-certificate-clear.pdf', url: '#' }
      }
    ],
    internalNotes: [
      { id: 'in-1', author: 'Priya Sharma', date: '2026-09-05T15:00:00Z', note: 'Image is too blurry to verify the name.' }
    ],
    timeline: [
      { id: 'tl-5', title: 'Request Submitted', date: '2026-09-05T11:20:00Z', actor: 'Neha Gupta', type: 'submit' },
      { id: 'tl-6', title: 'Clarification Requested', date: '2026-09-06T10:00:00Z', actor: 'Priya Sharma', type: 'clarification' },
      { id: 'tl-7', title: 'Employee Responded', date: '2026-09-06T11:30:00Z', actor: 'Neha Gupta', type: 'response' }
    ]
  },
  {
    id: 'PCR-2026-00082',
    employeeId: 'EMP001',
    employeeName: 'Anjali Rao',
    requestType: 'Address',
    status: 'Approved',
    riskLevel: 'Low',
    submittedDate: '2026-08-14T09:00:00Z',
    reviewer: 'Rahul HR',
    reason: 'Moved to a new apartment.',
    fields: [
      { name: 'Address Line', oldValue: 'Old Address', newValue: 'New Address', changed: true }
    ],
    attachments: [],
    clarifications: [],
    internalNotes: [],
    timeline: [
      { id: 'tl-8', title: 'Request Submitted', date: '2026-08-14T09:00:00Z', actor: 'Anjali Rao', type: 'submit' },
      { id: 'tl-9', title: 'Approved', date: '2026-08-14T14:00:00Z', actor: 'Rahul HR', type: 'status_change' }
    ],
    decision: {
      date: '2026-08-14T14:00:00Z',
      by: 'Rahul HR',
      remarks: 'Verified address proof.'
    }
  },
  {
    id: 'PCR-2026-00043',
    employeeId: 'EMP001',
    employeeName: 'Anjali Rao',
    requestType: 'Emergency Contact',
    status: 'Approved',
    riskLevel: 'Low',
    submittedDate: '2026-08-02T10:00:00Z',
    reviewer: 'Meera HR',
    reason: 'Updating emergency contact to spouse.',
    fields: [
      { name: 'Contact Name', oldValue: 'Father Name', newValue: 'Spouse Name', changed: true }
    ],
    attachments: [],
    clarifications: [],
    internalNotes: [],
    timeline: [
      { id: 'tl-10', title: 'Request Submitted', date: '2026-08-02T10:00:00Z', actor: 'Anjali Rao', type: 'submit' },
      { id: 'tl-11', title: 'Approved', date: '2026-08-02T15:00:00Z', actor: 'Meera HR', type: 'status_change' }
    ],
    decision: {
      date: '2026-08-02T15:00:00Z',
      by: 'Meera HR',
      remarks: 'Updated emergency contact successfully.'
    }
  }
];

export const mockAvailableReviewers: string[] = [
  'Priya Sharma',
  'Rahul HR',
  'Meera HR',
  'Kavya HR'
];
