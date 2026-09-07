export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'On Leave' | 'Half Day' | 'Not Checked In' | 'Holiday' | 'Weekly Off';
export type SessionState = 'Active' | 'Checked Out' | 'None';
export type AttendanceSource = 'Mobile App' | 'Web Portal' | 'HR Manual Entry' | 'System Import';

export type AttendanceRecord = {
  id: string;
  employeeId: string;
  employeeName: string;
  designation: string;
  department: string;
  avatar: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  workingHours: string | null;
  lateMinutes: number;
  earlyCheckoutMinutes: number;
  overtimeMinutes: number;
  location: string;
  status: AttendanceStatus;
  sessionState: SessionState;
  source: AttendanceSource;
};

export const mockTodayAttendance: AttendanceRecord[] = [
  {
    id: 'ATT001',
    employeeId: 'EMP001',
    employeeName: 'Anjali Rao',
    designation: 'Software Developer',
    department: 'Engineering',
    avatar: 'AR',
    date: '05 Sep 2026',
    checkIn: '09:17 AM',
    checkOut: '06:31 PM',
    workingHours: '9h 14m',
    lateMinutes: 0,
    earlyCheckoutMinutes: 0,
    overtimeMinutes: 44,
    location: 'Bengaluru HQ',
    status: 'Present',
    sessionState: 'Checked Out',
    source: 'Mobile App'
  },
  {
    id: 'ATT002',
    employeeId: 'EMP002',
    employeeName: 'Rahul Mehta',
    designation: 'Product Designer',
    department: 'Design',
    avatar: 'RM',
    date: '05 Sep 2026',
    checkIn: '09:46 AM',
    checkOut: null,
    workingHours: '3h 35m',
    lateMinutes: 16,
    earlyCheckoutMinutes: 0,
    overtimeMinutes: 0,
    location: 'Bengaluru HQ',
    status: 'Late',
    sessionState: 'Active',
    source: 'Mobile App'
  },
  {
    id: 'ATT003',
    employeeId: 'EMP003',
    employeeName: 'Neha Gupta',
    designation: 'HR Manager',
    department: 'HR',
    avatar: 'NG',
    date: '05 Sep 2026',
    checkIn: null,
    checkOut: null,
    workingHours: null,
    lateMinutes: 0,
    earlyCheckoutMinutes: 0,
    overtimeMinutes: 0,
    location: '—',
    status: 'On Leave',
    sessionState: 'None',
    source: 'System Import'
  },
  {
    id: 'ATT004',
    employeeId: 'EMP004',
    employeeName: 'Amit Kumar',
    designation: 'Operations Lead',
    department: 'Operations',
    avatar: 'AK',
    date: '05 Sep 2026',
    checkIn: null,
    checkOut: null,
    workingHours: null,
    lateMinutes: 0,
    earlyCheckoutMinutes: 0,
    overtimeMinutes: 0,
    location: '—',
    status: 'Not Checked In',
    sessionState: 'None',
    source: 'System Import'
  },
  {
    id: 'ATT005',
    employeeId: 'EMP005',
    employeeName: 'Priya Nair',
    designation: 'Finance Associate',
    department: 'Finance',
    avatar: 'PN',
    date: '05 Sep 2026',
    checkIn: '09:24 AM',
    checkOut: '01:35 PM',
    workingHours: '4h 11m',
    lateMinutes: 0,
    earlyCheckoutMinutes: 0,
    overtimeMinutes: 0,
    location: 'Remote',
    status: 'Half Day',
    sessionState: 'Checked Out',
    source: 'Web Portal'
  }
];

export const mockMonthlySummary = [
  { employeeId: 'EMP001', name: 'Anjali Rao', present: 21, absent: 0, leave: 1, late: 2, halfDay: 0, weeklyOff: 4, workingDays: 22, attendancePct: 95.5, avgHours: '8h 31m' },
  { employeeId: 'EMP002', name: 'Rahul Mehta', present: 19, absent: 2, leave: 1, late: 5, halfDay: 1, weeklyOff: 4, workingDays: 22, attendancePct: 86.4, avgHours: '7h 58m' },
  { employeeId: 'EMP003', name: 'Neha Gupta', present: 20, absent: 0, leave: 2, late: 0, halfDay: 0, weeklyOff: 4, workingDays: 22, attendancePct: 90.9, avgHours: '8h 12m' }
];

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Present': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    case 'Late': return 'bg-amber-50 text-amber-700 border border-amber-200';
    case 'Half Day': return 'bg-orange-50 text-orange-700 border border-orange-200';
    case 'Absent': return 'bg-rose-50 text-rose-700 border border-rose-200';
    case 'On Leave': return 'bg-purple-50 text-purple-700 border border-purple-200';
    case 'Holiday': return 'bg-blue-50 text-blue-700 border border-blue-200';
    case 'Weekly Off': return 'bg-gray-100 text-gray-700 border border-gray-200';
    case 'Not Checked In': return 'bg-gray-50 text-gray-600 border border-gray-200';
    default: return 'bg-gray-50 text-gray-700 border border-gray-200';
  }
};
export const mockAttendanceRecords = mockTodayAttendance;
