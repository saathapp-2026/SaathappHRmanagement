export type CorrectionStatus = 'Pending' | 'Approved' | 'Rejected' | 'Needs Information';
export type CorrectionType = 'Missed Check-In' | 'Missed Check-Out' | 'Incorrect Check-In' | 'Incorrect Check-Out' | 'Wrong Attendance Status' | 'Incorrect Working Hours' | 'Location Issue' | 'Other';
export type CorrectionPriority = 'Low' | 'Normal' | 'High' | 'Urgent';

export type AttendanceCorrection = {
  id: string;
  employeeId: string;
  employeeName: string;
  designation: string;
  department: string;
  avatar: string;
  attendanceDate: string;
  type: CorrectionType;
  submitted: string;
  priority: CorrectionPriority;
  status: CorrectionStatus;
  original: {
    status?: string;
    checkIn?: string;
    checkOut?: string;
    workingHours?: string;
    location?: string;
  };
  requested: {
    status?: string;
    checkIn?: string;
    checkOut?: string;
    workingHours?: string;
    location?: string;
  };
  reason: string;
  age: string;
  assignedTo?: string;
  evidence: Array<{ name: string; type: string; size: string }>;
};

export const mockCorrections: AttendanceCorrection[] = [
  {
    id: 'ACR-2026-00124',
    employeeId: 'EMP001',
    employeeName: 'Anjali Rao',
    designation: 'Software Developer',
    department: 'Engineering',
    avatar: 'AR',
    attendanceDate: '05 Sep 2026',
    type: 'Missed Check-Out',
    submitted: '06 Sep 2026',
    priority: 'Normal',
    status: 'Pending',
    original: {
      status: 'Present',
      checkIn: '09:17 AM',
      checkOut: '—',
      workingHours: '4h 12m',
      location: 'Bengaluru HQ'
    },
    requested: {
      checkOut: '06:31 PM',
      workingHours: '9h 14m'
    },
    reason: 'I completed my shift normally but forgot to check out before leaving the office. My manager can confirm that I was working until 6:30 PM.',
    age: '1 day old',
    assignedTo: 'Priya Sharma',
    evidence: [
      { name: 'manager-confirmation.pdf', type: 'PDF', size: '320 KB' }
    ]
  },
  {
    id: 'ACR-2026-00125',
    employeeId: 'EMP002',
    employeeName: 'Rahul Mehta',
    designation: 'Product Designer',
    department: 'Design',
    avatar: 'RM',
    attendanceDate: '04 Sep 2026',
    type: 'Incorrect Check-In',
    submitted: '05 Sep 2026',
    priority: 'Normal',
    status: 'Pending',
    original: {
      checkIn: '09:51 AM'
    },
    requested: {
      checkIn: '09:22 AM'
    },
    reason: 'The mobile app failed to sync my check-in when I entered the office because of network issues. I only realized it later.',
    age: '2 days old',
    evidence: []
  },
  {
    id: 'ACR-2026-00126',
    employeeId: 'EMP005',
    employeeName: 'Priya Nair',
    designation: 'Finance Associate',
    department: 'Finance',
    avatar: 'PN',
    attendanceDate: '03 Sep 2026',
    type: 'Wrong Attendance Status',
    submitted: '04 Sep 2026',
    priority: 'High',
    status: 'Needs Information',
    original: {
      status: 'Absent'
    },
    requested: {
      status: 'Present'
    },
    reason: 'I was marked absent but I was working from the client site all day.',
    age: '3 days old',
    assignedTo: 'Rahul HR',
    evidence: [
      { name: 'client-email-proof.jpg', type: 'Image', size: '1.2 MB' }
    ]
  }
];

export const getStatusBadgeStyle = (status: CorrectionStatus) => {
  switch (status) {
    case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Approved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Rejected': return 'bg-rose-50 text-rose-700 border-rose-200';
    case 'Needs Information': return 'bg-blue-50 text-blue-700 border-blue-200';
    default: return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};
