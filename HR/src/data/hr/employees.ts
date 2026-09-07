export type EmployeeProfile = {
  id: string;
  name: string;
  avatar: string;
  designation: string;
  department: string;
  location: string;
  employmentType: string;
  status: string;
  workEmail: string;
  manager: string;
  joiningDate: string;
  profileCompleteness: number;
};

export const mockEmployee: EmployeeProfile = {
  id: 'EMP001',
  name: 'Anjali Rao',
  avatar: 'AR',
  designation: 'Software Developer',
  department: 'Engineering',
  location: 'Bengaluru',
  employmentType: 'Full-Time',
  status: 'Active',
  workEmail: 'anjali.rao@saathapp.com',
  manager: 'Vikram Sharma',
  joiningDate: '01 Aug 2026',
  profileCompleteness: 92
};
