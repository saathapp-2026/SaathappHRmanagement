export type PayrollPeriodStatus = 'Draft' | 'Inputs Pending' | 'Under Review' | 'Ready' | 'Processed' | 'Locked' | 'Reopened';
export type SalaryRevisionType = 'Annual Increment' | 'Promotion' | 'Market Correction' | 'Role Change' | 'Salary Correction' | 'Other';
export type PayrollAdjustmentType = 'Bonus' | 'Incentive' | 'Reimbursement' | 'Arrear' | 'One-Time Allowance' | 'Recovery' | 'Correction' | 'Other';
export type PayrollAdjustmentStatus = 'Draft' | 'Approved' | 'Applied' | 'Cancelled';
export type PayrollExceptionSeverity = 'Info' | 'Warning' | 'Blocking';
export type PayrollExceptionStatus = 'Open' | 'Reviewed' | 'Resolved';
export type PayslipStatus = 'Not Generated' | 'Generated' | 'Issued' | 'Viewed' | 'Acknowledged';
export type ReadinessStatus = 'Ready' | 'Needs Review' | 'Blocked';

export interface SalaryComponent {
  name: string;
  amount: number;
}

export interface SalaryRevision {
  id: string;
  employeeId: string;
  effectiveDate: string;
  previousGross: number;
  newGross: number;
  revisionType: SalaryRevisionType;
  reason: string;
  remarks?: string;
  recordedBy: string;
  recordedAt: string;
}

export interface SalaryRecord {
  employeeId: string;
  effectiveFrom: string;
  gross: number;
  components: SalaryComponent[];
  status: 'Active' | 'Inactive';
}

export interface PayrollAdjustment {
  id: string;
  employeeId: string;
  type: PayrollAdjustmentType;
  description: string;
  amount: number;
  direction: 'Add' | 'Deduct';
  effectivePeriod: string; // e.g. "2026-09"
  addedBy: string;
  status: PayrollAdjustmentStatus;
  reason: string;
  remarks?: string;
  createdAt: string;
}

export interface PayrollException {
  id: string;
  employeeId: string;
  period: string;
  issue: string;
  category: string;
  severity: PayrollExceptionSeverity;
  detectedAt: string;
  status: PayrollExceptionStatus;
  suggestedAction?: string;
}

export interface EmployeePayrollRecord {
  employeeId: string;
  period: string; // e.g., '2026-09'
  grossPreview: number;
  lwpDays: number;
  lwpDeductionPreview: number;
  adjustmentsTotal: number;
  netPreview: number;
  readiness: ReadinessStatus;
  status: 'Draft' | 'Needs Review' | 'Ready' | 'Processed' | 'Locked';
}

export interface Payslip {
  id: string;
  employeeId: string;
  period: string;
  gross: number;
  net: number;
  status: PayslipStatus;
  issuedDate?: string;
  generatedBy?: string;
}

export interface PayrollPeriod {
  id: string; // e.g., '2026-09'
  month: string;
  year: number;
  status: PayrollPeriodStatus;
  totalEmployees: number;
  readyEmployees: number;
  needsReviewEmployees: number;
  grossPayrollPreview: number;
  adjustmentsTotal: number;
  deductionsPreview: number;
  netPayrollPreview: number;
  lockedBy?: string;
  lockedAt?: string;
}

export interface PayrollActivity {
  id: string;
  period: string;
  action: string;
  actor: string;
  timestamp: string;
  details?: string;
}

// Mock Data
export const mockPayrollPeriods: PayrollPeriod[] = [
  {
    id: '2026-09',
    month: 'September',
    year: 2026,
    status: 'Under Review',
    totalEmployees: 248,
    readyEmployees: 231,
    needsReviewEmployees: 17,
    grossPayrollPreview: 18460000,
    adjustmentsTotal: 214500,
    deductionsPreview: 392000,
    netPayrollPreview: 18282500,
  },
  {
    id: '2026-08',
    month: 'August',
    year: 2026,
    status: 'Locked',
    totalEmployees: 245,
    readyEmployees: 245,
    needsReviewEmployees: 0,
    grossPayrollPreview: 18000000,
    adjustmentsTotal: 150000,
    deductionsPreview: 380000,
    netPayrollPreview: 17770000,
    lockedBy: 'Priya Sharma',
    lockedAt: '2026-08-31T18:20:00Z'
  },
  {
    id: '2026-10',
    month: 'October',
    year: 2026,
    status: 'Draft',
    totalEmployees: 250,
    readyEmployees: 0,
    needsReviewEmployees: 0,
    grossPayrollPreview: 0,
    adjustmentsTotal: 0,
    deductionsPreview: 0,
    netPayrollPreview: 0,
  }
];

export const mockSalaryRecords: Record<string, SalaryRecord> = {
  'EMP001': {
    employeeId: 'EMP001',
    effectiveFrom: '2026-08-01',
    gross: 78000,
    status: 'Active',
    components: [
      { name: 'Basic', amount: 35000 },
      { name: 'House Rent Allowance', amount: 17500 },
      { name: 'Special Allowance', amount: 15500 },
      { name: 'Other Allowance', amount: 10000 },
    ]
  },
  'EMP002': {
    employeeId: 'EMP002',
    effectiveFrom: '2025-01-01',
    gross: 92000,
    status: 'Active',
    components: [
      { name: 'Basic', amount: 45000 },
      { name: 'House Rent Allowance', amount: 22500 },
      { name: 'Special Allowance', amount: 14500 },
      { name: 'Other Allowance', amount: 10000 },
    ]
  }
};

export const mockEmployeePayrollRecords: EmployeePayrollRecord[] = [
  {
    employeeId: 'EMP001',
    period: '2026-09',
    grossPreview: 78000,
    lwpDays: 0,
    lwpDeductionPreview: 0,
    adjustmentsTotal: 2500,
    netPreview: 80500,
    readiness: 'Ready',
    status: 'Draft'
  },
  {
    employeeId: 'EMP002',
    period: '2026-09',
    grossPreview: 92000,
    lwpDays: 2,
    lwpDeductionPreview: 6133,
    adjustmentsTotal: -3450,
    netPreview: 82417,
    readiness: 'Needs Review',
    status: 'Needs Review'
  },
  {
    employeeId: 'EMP003',
    period: '2026-09',
    grossPreview: 110000,
    lwpDays: 0,
    lwpDeductionPreview: 0,
    adjustmentsTotal: 0,
    netPreview: 110000,
    readiness: 'Ready',
    status: 'Draft'
  },
  {
    employeeId: 'EMP004',
    period: '2026-09',
    grossPreview: 65000,
    lwpDays: 5,
    lwpDeductionPreview: 14772,
    adjustmentsTotal: 0,
    netPreview: 50228,
    readiness: 'Needs Review',
    status: 'Needs Review'
  },
  {
    employeeId: 'EMP005',
    period: '2026-09',
    grossPreview: 0,
    lwpDays: 0,
    lwpDeductionPreview: 0,
    adjustmentsTotal: 0,
    netPreview: 0,
    readiness: 'Blocked',
    status: 'Draft'
  }
];

export const mockExceptions: PayrollException[] = [
  {
    id: 'EXC-01',
    employeeId: 'EMP005',
    period: '2026-09',
    issue: 'Missing Salary Record',
    category: 'Data Missing',
    severity: 'Blocking',
    detectedAt: '2026-09-15T10:00:00Z',
    status: 'Open',
    suggestedAction: 'Add Salary Record'
  },
  {
    id: 'EXC-02',
    employeeId: 'EMP002',
    period: '2026-09',
    issue: 'Attendance not finalized',
    category: 'Attendance',
    severity: 'Blocking',
    detectedAt: '2026-09-16T09:00:00Z',
    status: 'Open',
    suggestedAction: 'Review Attendance'
  },
  {
    id: 'EXC-03',
    employeeId: 'EMP009',
    period: '2026-09',
    issue: 'Employee Joined Mid-Month',
    category: 'Proration',
    severity: 'Warning',
    detectedAt: '2026-09-16T11:00:00Z',
    status: 'Reviewed',
    suggestedAction: 'Review Proration'
  }
];

export const mockAdjustments: PayrollAdjustment[] = [
  {
    id: 'ADJ-01',
    employeeId: 'EMP001',
    type: 'Bonus',
    description: 'Performance Bonus Q2',
    amount: 2500,
    direction: 'Add',
    effectivePeriod: '2026-09',
    addedBy: 'Priya Sharma',
    status: 'Approved',
    reason: 'Quarterly achievement',
    createdAt: '2026-09-10T10:00:00Z'
  },
  {
    id: 'ADJ-02',
    employeeId: 'EMP002',
    type: 'Recovery',
    description: 'Asset Damage Recovery',
    amount: 3450,
    direction: 'Deduct',
    effectivePeriod: '2026-09',
    addedBy: 'Arjun Verma',
    status: 'Applied',
    reason: 'Lost company phone',
    createdAt: '2026-09-12T11:30:00Z'
  }
];

export const mockSalaryRevisions: SalaryRevision[] = [
  {
    id: 'REV-01',
    employeeId: 'EMP001',
    effectiveDate: '2026-08-01',
    previousGross: 72000,
    newGross: 78000,
    revisionType: 'Annual Increment',
    reason: 'Annual compensation revision',
    recordedBy: 'Priya Sharma',
    recordedAt: '2026-07-28T14:00:00Z'
  }
];

export const mockPayslips: Payslip[] = [
  {
    id: 'PS-01',
    employeeId: 'EMP001',
    period: '2026-08',
    gross: 78000,
    net: 78000,
    status: 'Acknowledged',
    issuedDate: '2026-08-31T18:30:00Z',
    generatedBy: 'System'
  }
];

export const mockPayrollActivities: PayrollActivity[] = [
  {
    id: 'ACT-01',
    period: '2026-09',
    action: 'Payroll Created',
    actor: 'System',
    timestamp: '2026-09-01T00:00:00Z'
  },
  {
    id: 'ACT-02',
    period: '2026-09',
    action: 'Attendance Inputs Loaded',
    actor: 'System',
    timestamp: '2026-09-25T00:00:00Z'
  },
  {
    id: 'ACT-03',
    period: '2026-09',
    action: 'Exception Reviewed',
    actor: 'Rahul HR',
    timestamp: '2026-09-26T10:30:00Z',
    details: 'Reviewed mid-month joiner EMP009'
  }
];
