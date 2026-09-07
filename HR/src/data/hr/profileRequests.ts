export type ProfileRequestStatus = 'Pending' | 'Approved' | 'Rejected';
export type ProfileRequestCategory = 'Address Change' | 'Bank Details' | 'Personal Info' | 'Emergency Contact';

export type ProfileChangeField = {
  field: string;
  oldValue: string;
  newValue: string;
};

export type ProfileRequest = {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeDepartment: string;
  category: ProfileRequestCategory;
  submittedAt: string;
  status: ProfileRequestStatus;
  changes: ProfileChangeField[];
  evidenceUrl?: string;
  evidenceName?: string;
  reviewerName?: string;
  rejectionReason?: string;
};

export const mockProfileRequests: ProfileRequest[] = [
  {
    id: 'PRQ-2026-0081',
    employeeId: 'EMP001',
    employeeName: 'Anjali Rao',
    employeeDepartment: 'Engineering',
    category: 'Address Change',
    submittedAt: '07 Sep 2026',
    status: 'Pending',
    changes: [
      { field: 'Current Address', oldValue: '123 Main St, Koramangala', newValue: '456 New St, Indiranagar, Bengaluru' }
    ],
    evidenceUrl: '#',
    evidenceName: 'Rental_Agreement.pdf'
  },
  {
    id: 'PRQ-2026-0082',
    employeeId: 'EMP002',
    employeeName: 'Siddharth Rao',
    employeeDepartment: 'Engineering',
    category: 'Bank Details',
    submittedAt: '05 Sep 2026',
    status: 'Pending',
    changes: [
      { field: 'Account Number', oldValue: '********4589', newValue: '********7742' },
      { field: 'IFSC Code', oldValue: 'HDFC0001234', newValue: 'ICIC0005678' }
    ],
    evidenceUrl: '#',
    evidenceName: 'Cancelled_Cheque.jpg'
  },
  {
    id: 'PRQ-2026-0083',
    employeeId: 'EMP005',
    employeeName: 'Rahul Verma',
    employeeDepartment: 'Engineering',
    category: 'Emergency Contact',
    submittedAt: '01 Sep 2026',
    status: 'Approved',
    changes: [
      { field: 'Emergency Contact Name', oldValue: 'Ramesh Verma', newValue: 'Priya Verma' },
      { field: 'Emergency Contact Phone', oldValue: '+91 9876543210', newValue: '+91 9988776655' }
    ],
    reviewerName: 'Meera HR'
  }
];
