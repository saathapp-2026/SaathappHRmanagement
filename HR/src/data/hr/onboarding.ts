export type OnboardingEmployee = {
  id: string;
  name: string;
  department: string;
  designation: string;
  joiningDate: string;
  status: string;
  progress: number;
  invitationStatus: string;
  documentsComplete: number;
  documentsTotal: number;
  manager: string;
  location: string;
};

export const mockOnboardingEmployees: OnboardingEmployee[] = [
  {
    id: 'EMP001',
    name: 'Anjali Rao',
    department: 'Engineering',
    designation: 'Software Developer',
    joiningDate: '01 Aug 2026',
    status: 'HR Verification',
    progress: 85,
    invitationStatus: 'Accepted',
    documentsComplete: 8,
    documentsTotal: 9,
    manager: 'Vikram Sharma',
    location: 'Bengaluru HQ',
  },
  {
    id: 'EMP014',
    name: 'Siddharth Rao',
    department: 'Engineering',
    designation: 'Backend Engineer',
    joiningDate: '09 Sep 2026',
    status: 'Invitation Sent',
    progress: 20,
    invitationStatus: 'Sent',
    documentsComplete: 0,
    documentsTotal: 6,
    manager: 'Sneha Iyer',
    location: 'Remote',
  },
  {
    id: 'EMP015',
    name: 'Meera Srinivasan',
    department: 'Design',
    designation: 'Product Designer',
    joiningDate: '12 Sep 2026',
    status: 'Profile Completed',
    progress: 55,
    invitationStatus: 'Accepted',
    documentsComplete: 2,
    documentsTotal: 6,
    manager: 'Rahul Mehta',
    location: 'Bengaluru HQ',
  },
  {
    id: 'EMP016',
    name: 'Arjun Nair',
    department: 'Operations',
    designation: 'Operations Executive',
    joiningDate: '15 Sep 2026',
    status: 'Employee Created',
    progress: 10,
    invitationStatus: 'Not Sent',
    documentsComplete: 0,
    documentsTotal: 5,
    manager: 'Deepak S',
    location: 'Mumbai Branch',
  },
  {
    id: 'EMP017',
    name: 'Riya Gupta',
    department: 'Finance',
    designation: 'Finance Associate',
    joiningDate: '18 Sep 2026',
    status: 'Documents Submitted',
    progress: 75,
    invitationStatus: 'Accepted',
    documentsComplete: 6,
    documentsTotal: 6,
    manager: 'Amit Kumar',
    location: 'Delhi Branch',
  }
];
