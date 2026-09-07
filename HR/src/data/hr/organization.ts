import { EmployeeProfile } from './employees';

export type Department = {
  id: string;
  name: string;
  code: string;
  headId: string;
  headName: string;
  employeesCount: number;
  teamsCount: number;
  location: string;
  status: 'Active' | 'Inactive';
};

export type Designation = {
  id: string;
  name: string;
  code: string;
  departmentId: string;
  departmentName: string;
  level: string;
  employeesCount: number;
  status: 'Active' | 'Inactive';
};

export type Team = {
  id: string;
  name: string;
  departmentId: string;
  departmentName: string;
  leadId: string;
  leadName: string;
  membersCount: number;
  location: string;
  status: 'Active' | 'Inactive';
};

export type WorkLocation = {
  id: string;
  name: string;
  code: string;
  type: string;
  employeesCount: number;
  departmentsCount: number;
  workingHours: string;
  status: 'Active' | 'Inactive';
  address: string;
  timezone: string;
};

export type OrgNode = {
  id: string;
  name: string;
  designation: string;
  department: string;
  avatar: string;
  reportsTo?: string;
  directReports?: OrgNode[];
};

export const mockOrgChart: OrgNode = {
  id: 'EMP-CEO',
  name: 'Saurabh Kumar',
  designation: 'CEO',
  department: 'Executive',
  avatar: 'SK',
  directReports: [
    {
      id: 'EMP-MGR1',
      name: 'Vikram Sharma',
      designation: 'Engineering Manager',
      department: 'Engineering',
      avatar: 'VS',
      reportsTo: 'Saurabh Kumar',
      directReports: [
        {
          id: 'EMP001',
          name: 'Anjali Rao',
          designation: 'Software Developer',
          department: 'Engineering',
          avatar: 'AR',
          reportsTo: 'Vikram Sharma'
        },
        {
          id: 'EMP002',
          name: 'Siddharth Rao',
          designation: 'Backend Engineer',
          department: 'Engineering',
          avatar: 'SR',
          reportsTo: 'Vikram Sharma'
        },
        {
          id: 'EMP003',
          name: 'Rahul Mehta',
          designation: 'Frontend Engineer',
          department: 'Engineering',
          avatar: 'RM',
          reportsTo: 'Vikram Sharma'
        }
      ]
    },
    {
      id: 'EMP-MGR2',
      name: 'Priya Sharma',
      designation: 'HR Manager',
      department: 'Human Resources',
      avatar: 'PS',
      reportsTo: 'Saurabh Kumar'
    },
    {
      id: 'EMP-MGR3',
      name: 'Arjun Verma',
      designation: 'Operations Manager',
      department: 'Operations',
      avatar: 'AV',
      reportsTo: 'Saurabh Kumar'
    },
    {
      id: 'EMP-MGR4',
      name: 'Kavya Nair',
      designation: 'Finance Manager',
      department: 'Finance',
      avatar: 'KN',
      reportsTo: 'Saurabh Kumar'
    },
    {
      id: 'EMP-MGR5',
      name: 'Rhea Kapoor',
      designation: 'Marketing Manager',
      department: 'Marketing',
      avatar: 'RK',
      reportsTo: 'Saurabh Kumar'
    }
  ]
};

export const mockDepartments: Department[] = [
  { id: 'D01', name: 'Engineering', code: 'ENG', headId: 'EMP-MGR1', headName: 'Vikram Sharma', employeesCount: 72, teamsCount: 5, location: 'Bengaluru HQ', status: 'Active' },
  { id: 'D02', name: 'Human Resources', code: 'HR', headId: 'EMP-MGR2', headName: 'Priya Sharma', employeesCount: 12, teamsCount: 2, location: 'Bengaluru HQ', status: 'Active' },
  { id: 'D03', name: 'Operations', code: 'OPS', headId: 'EMP-MGR3', headName: 'Arjun Verma', employeesCount: 54, teamsCount: 4, location: 'Multiple', status: 'Active' },
  { id: 'D04', name: 'Finance', code: 'FIN', headId: 'EMP-MGR4', headName: 'Kavya Nair', employeesCount: 18, teamsCount: 2, location: 'Bengaluru HQ', status: 'Active' },
  { id: 'D05', name: 'Marketing', code: 'MKT', headId: 'EMP-MGR5', headName: 'Rhea Kapoor', employeesCount: 26, teamsCount: 3, location: 'Bengaluru HQ', status: 'Active' },
];

export const mockDesignations: Designation[] = [
  { id: 'DS01', name: 'Software Developer', code: 'SDE', departmentId: 'D01', departmentName: 'Engineering', level: 'Individual Contributor', employeesCount: 18, status: 'Active' },
  { id: 'DS02', name: 'Senior Software Developer', code: 'SSDE', departmentId: 'D01', departmentName: 'Engineering', level: 'Senior IC', employeesCount: 12, status: 'Active' },
  { id: 'DS03', name: 'Engineering Manager', code: 'EM', departmentId: 'D01', departmentName: 'Engineering', level: 'Manager', employeesCount: 5, status: 'Active' },
  { id: 'DS04', name: 'HR Executive', code: 'HRE', departmentId: 'D02', departmentName: 'Human Resources', level: 'Individual Contributor', employeesCount: 6, status: 'Active' },
  { id: 'DS05', name: 'HR Manager', code: 'HRM', departmentId: 'D02', departmentName: 'Human Resources', level: 'Manager', employeesCount: 2, status: 'Active' },
];

export const mockTeams: Team[] = [
  { id: 'T01', name: 'Platform Engineering', departmentId: 'D01', departmentName: 'Engineering', leadId: 'EMP-MGR1', leadName: 'Vikram Sharma', membersCount: 12, location: 'Bengaluru HQ', status: 'Active' },
  { id: 'T02', name: 'Mobile Engineering', departmentId: 'D01', departmentName: 'Engineering', leadId: 'EMP005', leadName: 'Rahul Verma', membersCount: 8, location: 'Bengaluru HQ', status: 'Active' },
  { id: 'T03', name: 'People Operations', departmentId: 'D02', departmentName: 'Human Resources', leadId: 'EMP-MGR2', leadName: 'Priya Sharma', membersCount: 6, location: 'Bengaluru HQ', status: 'Active' },
  { id: 'T04', name: 'Payroll Operations', departmentId: 'D04', departmentName: 'Finance', leadId: 'EMP-MGR4', leadName: 'Kavya Nair', membersCount: 5, location: 'Bengaluru HQ', status: 'Active' },
];

export const mockWorkLocations: WorkLocation[] = [
  { id: 'L01', name: 'Bengaluru HQ', code: 'BLR-HQ', type: 'Office', employeesCount: 184, departmentsCount: 8, workingHours: '09:30 AM – 06:30 PM', status: 'Active', address: 'Bengaluru, Karnataka', timezone: 'Asia/Kolkata' },
  { id: 'L02', name: 'Mumbai Office', code: 'MUM-01', type: 'Office', employeesCount: 32, departmentsCount: 5, workingHours: '09:30 AM – 06:30 PM', status: 'Active', address: 'Mumbai, Maharashtra', timezone: 'Asia/Kolkata' },
  { id: 'L03', name: 'Delhi Office', code: 'DEL-01', type: 'Office', employeesCount: 22, departmentsCount: 4, workingHours: '09:30 AM – 06:30 PM', status: 'Active', address: 'Delhi, NCR', timezone: 'Asia/Kolkata' },
  { id: 'L04', name: 'Remote', code: 'REMOTE', type: 'Remote', employeesCount: 10, departmentsCount: 6, workingHours: 'Flexible', status: 'Active', address: 'Remote Work', timezone: 'Flexible' },
];
