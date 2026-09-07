import { AttendanceRecord, mockTodayAttendance } from './attendance';

// Aggregated reporting mock data
export interface ReportMetric {
  title: string;
  value: string | number;
  trend?: string;
  isPositive?: boolean;
}

export interface HeadcountReportData {
  department: string;
  total: number;
  active: number;
  onProbation: number;
  noticePeriod: number;
  newJoiners: number;
  exits: number;
  change: string;
}

export interface AttendanceDepartmentReport {
  department: string;
  presentPct: number;
  absentPct: number;
  late: number;
  halfDay: number;
  avgHours: string;
}

export interface LateArrivalData {
  employee: string;
  employeeId: string;
  department: string;
  lateDays: number;
  avgDelay: string;
  lastLate: string;
  attendancePct: string;
}

export interface LeaveDepartmentReport {
  department: string;
  employees: number;
  leaveDays: number;
  avgPerEmployee: number;
  pendingRequests: number;
}

export interface PayrollReadinessData {
  employee: string;
  employeeId: string;
  department: string;
  attendanceStatus: 'Locked' | 'Pending';
  lwpDays: number;
  salaryRecord: 'Available' | 'Missing';
  payrollReadiness: 'Ready' | 'Needs Review' | 'Missing Data';
}

export const mockHeadcountTable: HeadcountReportData[] = [
  { department: 'Engineering', total: 92, active: 87, onProbation: 8, noticePeriod: 3, newJoiners: 6, exits: 2, change: '+4' },
  { department: 'Operations', total: 54, active: 52, onProbation: 4, noticePeriod: 1, newJoiners: 3, exits: 1, change: '+2' },
  { department: 'Marketing', total: 31, active: 29, onProbation: 2, noticePeriod: 1, newJoiners: 2, exits: 0, change: '+2' },
  { department: 'Finance', total: 24, active: 23, onProbation: 1, noticePeriod: 0, newJoiners: 0, exits: 1, change: '-1' },
  { department: 'Human Resources', total: 18, active: 18, onProbation: 1, noticePeriod: 0, newJoiners: 1, exits: 0, change: '+1' },
  { department: 'Design', total: 17, active: 16, onProbation: 2, noticePeriod: 1, newJoiners: 0, exits: 1, change: '-1' },
];

export const mockAttendanceTable: AttendanceDepartmentReport[] = [
  { department: 'Engineering', presentPct: 95.2, absentPct: 1.8, late: 21, halfDay: 7, avgHours: '8h 21m' },
  { department: 'Operations', presentPct: 92.4, absentPct: 3.1, late: 18, halfDay: 12, avgHours: '8h 05m' },
  { department: 'Marketing', presentPct: 96.1, absentPct: 1.2, late: 8, halfDay: 4, avgHours: '8h 15m' },
  { department: 'Finance', presentPct: 97.5, absentPct: 0.8, late: 4, halfDay: 2, avgHours: '8h 30m' },
];

export const mockLateArrivals: LateArrivalData[] = [
  { employee: 'Rahul Mehta', employeeId: 'EMP002', department: 'Engineering', lateDays: 8, avgDelay: '18 min', lastLate: '2026-09-06', attendancePct: '91.2%' },
  { employee: 'Sneha Patel', employeeId: 'EMP045', department: 'Operations', lateDays: 6, avgDelay: '25 min', lastLate: '2026-09-05', attendancePct: '88.5%' },
  { employee: 'Vikram Singh', employeeId: 'EMP112', department: 'Marketing', lateDays: 5, avgDelay: '12 min', lastLate: '2026-09-02', attendancePct: '94.0%' },
];

export const mockLeaveTable: LeaveDepartmentReport[] = [
  { department: 'Engineering', employees: 92, leaveDays: 45, avgPerEmployee: 0.5, pendingRequests: 4 },
  { department: 'Operations', employees: 54, leaveDays: 32, avgPerEmployee: 0.6, pendingRequests: 2 },
  { department: 'Marketing', employees: 31, leaveDays: 18, avgPerEmployee: 0.6, pendingRequests: 1 },
  { department: 'Finance', employees: 24, leaveDays: 8, avgPerEmployee: 0.3, pendingRequests: 0 },
];

export const mockPayrollReadiness: PayrollReadinessData[] = [
  { employee: 'Anjali Rao', employeeId: 'EMP001', department: 'Engineering', attendanceStatus: 'Locked', lwpDays: 0, salaryRecord: 'Available', payrollReadiness: 'Ready' },
  { employee: 'Rahul Mehta', employeeId: 'EMP002', department: 'Engineering', attendanceStatus: 'Pending', lwpDays: 2, salaryRecord: 'Available', payrollReadiness: 'Needs Review' },
  { employee: 'Karan Kumar', employeeId: 'EMP088', department: 'Operations', attendanceStatus: 'Locked', lwpDays: 0, salaryRecord: 'Missing', payrollReadiness: 'Missing Data' },
];

export const mockSummaryMetrics = {
  totalEmployees: 248,
  activeEmployees: 236,
  newJoiners: 12,
  exits: 5,
  attendanceRate: '94.6%',
  employeesOnLeave: 18,
  pendingHRActions: 27,
  documentCompliance: '91%'
};
