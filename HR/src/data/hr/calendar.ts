export type CalendarEventType = 'Company Holiday' | 'Public Holiday' | 'Employee Leave' | 'Birthday' | 'Work Anniversary' | 'Joining Date' | 'HR Event' | 'Training' | 'Company Meeting' | 'Other';

export type CalendarEvent = {
  id: string;
  type: CalendarEventType;
  title: string;
  date: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  allDay: boolean;
  location?: string;
  description?: string;
  audience?: string;
  employeeId?: string;
  employeeName?: string;
  department?: string;
  designation?: string;
  leaveId?: string;
  yearsCompleted?: number;
};

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'EVT-2026-001',
    type: 'Public Holiday',
    title: 'Ganesh Chaturthi',
    date: '02 Sep 2026',
    allDay: true,
    location: 'All Locations',
    description: 'Company-wide holiday.',
  },
  {
    id: 'EVT-2026-002',
    type: 'Work Anniversary',
    title: 'Anjali Rao Work Anniversary',
    date: '05 Sep 2026',
    allDay: true,
    employeeId: 'EMP001',
    employeeName: 'Anjali Rao',
    department: 'Engineering',
    yearsCompleted: 2,
  },
  {
    id: 'EVT-2026-003',
    type: 'HR Event',
    title: 'HR Policy Review',
    date: '07 Sep 2026',
    allDay: false,
    startTime: '11:00 AM',
    endTime: '12:00 PM',
    location: 'Conference Room A',
    audience: 'HR Team',
    description: 'Quarterly review of attendance and leave policies.',
  },
  {
    id: 'EVT-2026-004',
    type: 'Birthday',
    title: 'Rahul Mehta Birthday',
    date: '09 Sep 2026',
    allDay: true,
    employeeId: 'EMP002',
    employeeName: 'Rahul Mehta',
    designation: 'Product Designer',
    department: 'Design',
  },
  {
    id: 'EVT-2026-005',
    type: 'Employee Leave',
    title: 'Anjali Rao — Casual Leave',
    date: '10 Sep 2026',
    endDate: '11 Sep 2026',
    allDay: true,
    employeeId: 'EMP001',
    employeeName: 'Anjali Rao',
    department: 'Engineering',
    leaveId: 'LVR-2026-00124',
  },
  {
    id: 'EVT-2026-006',
    type: 'Training',
    title: 'New Hire Orientation',
    date: '12 Sep 2026',
    allDay: false,
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    location: 'Training Room 1',
    audience: 'New Joiners',
  },
  {
    id: 'EVT-2026-007',
    type: 'Company Meeting',
    title: 'Operations All Hands',
    date: '14 Sep 2026',
    allDay: false,
    startTime: '02:00 PM',
    endTime: '03:30 PM',
    location: 'Main Hall',
    audience: 'Operations Department',
  },
  {
    id: 'EVT-2026-008',
    type: 'Employee Leave',
    title: 'Neha Gupta — Earned Leave',
    date: '15 Sep 2026',
    endDate: '19 Sep 2026',
    allDay: true,
    employeeId: 'EMP003',
    employeeName: 'Neha Gupta',
    department: 'Design',
    leaveId: 'LVR-2026-00126',
  },
  {
    id: 'EVT-2026-009',
    type: 'Joining Date',
    title: 'Siddharth Rao Joining',
    date: '18 Sep 2026',
    allDay: true,
    employeeId: 'EMP014',
    employeeName: 'Siddharth Rao',
    designation: 'Backend Engineer',
    department: 'Engineering',
  },
  {
    id: 'EVT-2026-010',
    type: 'Birthday',
    title: 'Meera Srinivasan Birthday',
    date: '21 Sep 2026',
    allDay: true,
    employeeId: 'EMP006',
    employeeName: 'Meera Srinivasan',
    designation: 'HR Executive',
    department: 'HR',
  },
  {
    id: 'EVT-2026-011',
    type: 'HR Event',
    title: 'Monthly HR Townhall',
    date: '25 Sep 2026',
    allDay: false,
    startTime: '03:00 PM',
    endTime: '04:00 PM',
    location: 'Townhall Space',
    audience: 'HR Team',
  }
];

export const getEventColor = (type: CalendarEventType) => {
  switch (type) {
    case 'Company Holiday':
    case 'Public Holiday': return 'bg-rose-50 border-rose-500 text-rose-700';
    case 'Employee Leave': return 'bg-amber-50 border-amber-500 text-amber-700';
    case 'Birthday':
    case 'Work Anniversary':
    case 'Joining Date': return 'bg-purple-50 border-purple-500 text-purple-700';
    case 'HR Event': return 'bg-indigo-50 border-indigo-500 text-indigo-700';
    case 'Training': return 'bg-emerald-50 border-emerald-500 text-emerald-700';
    case 'Company Meeting': return 'bg-blue-50 border-blue-500 text-blue-700';
    default: return 'bg-gray-50 border-gray-500 text-gray-700';
  }
};

export const getEventDotColor = (type: CalendarEventType) => {
  switch (type) {
    case 'Company Holiday':
    case 'Public Holiday': return 'bg-rose-500';
    case 'Employee Leave': return 'bg-amber-500';
    case 'Birthday':
    case 'Work Anniversary':
    case 'Joining Date': return 'bg-purple-500';
    case 'HR Event': return 'bg-indigo-500';
    case 'Training': return 'bg-emerald-500';
    case 'Company Meeting': return 'bg-blue-500';
    default: return 'bg-gray-500';
  }
};
