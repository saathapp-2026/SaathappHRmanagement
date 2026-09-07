export type VerificationStatus = 'Pending' | 'Approved' | 'Rejected';
export type DocumentCategory = 'Identity' | 'Education' | 'Experience' | 'Tax' | 'Policy' | 'Template';

export type EmployeeDocument = {
  id: string;
  employeeId: string;
  employeeName: string;
  documentName: string;
  category: DocumentCategory;
  uploadDate: string;
  status: VerificationStatus;
  fileSize: string;
  fileType: 'PDF' | 'Image';
  reviewerName?: string;
  rejectionReason?: string;
};

export type CompanyDocument = {
  id: string;
  title: string;
  category: DocumentCategory;
  lastUpdated: string;
  fileSize: string;
  fileType: 'PDF' | 'Word' | 'Excel';
  sharedWith: 'All Employees' | 'Managers Only' | 'HR Only';
};

export const mockEmployeeDocuments: EmployeeDocument[] = [
  {
    id: 'DOC-EMP-001',
    employeeId: 'EMP001',
    employeeName: 'Anjali Rao',
    documentName: 'Aadhar Card_Anjali.pdf',
    category: 'Identity',
    uploadDate: '07 Sep 2026',
    status: 'Pending',
    fileSize: '1.2 MB',
    fileType: 'PDF'
  },
  {
    id: 'DOC-EMP-002',
    employeeId: 'EMP002',
    employeeName: 'Siddharth Rao',
    documentName: 'BTech_Degree_Certificate.jpg',
    category: 'Education',
    uploadDate: '06 Sep 2026',
    status: 'Approved',
    fileSize: '2.4 MB',
    fileType: 'Image',
    reviewerName: 'Priya Sharma'
  },
  {
    id: 'DOC-EMP-003',
    employeeId: 'EMP005',
    employeeName: 'Rahul Verma',
    documentName: 'Relieving_Letter_Prev.pdf',
    category: 'Experience',
    uploadDate: '05 Sep 2026',
    status: 'Rejected',
    fileSize: '800 KB',
    fileType: 'PDF',
    reviewerName: 'Priya Sharma',
    rejectionReason: 'The uploaded scan is illegible. Please re-scan and ensure all edges are visible.'
  }
];

export const mockCompanyDocuments: CompanyDocument[] = [
  {
    id: 'DOC-COMP-001',
    title: 'Saathapp Employee Handbook 2026',
    category: 'Policy',
    lastUpdated: '01 Jan 2026',
    fileSize: '4.5 MB',
    fileType: 'PDF',
    sharedWith: 'All Employees'
  },
  {
    id: 'DOC-COMP-002',
    title: 'Leave Policy Guidelines',
    category: 'Policy',
    lastUpdated: '15 Mar 2026',
    fileSize: '1.1 MB',
    fileType: 'PDF',
    sharedWith: 'All Employees'
  },
  {
    id: 'DOC-COMP-003',
    title: 'Performance Appraisal Template',
    category: 'Template',
    lastUpdated: '10 Aug 2026',
    fileSize: '350 KB',
    fileType: 'Word',
    sharedWith: 'Managers Only'
  }
];
