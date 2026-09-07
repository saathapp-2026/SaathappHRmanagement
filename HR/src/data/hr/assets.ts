export type AssetType = 'Laptop' | 'Phone' | 'SIM' | 'ID Card' | 'Monitor' | 'Access Card' | 'Headset' | 'Keyboard' | 'Mouse' | 'Software License' | 'Other';
export type AssetStatus = 'Available' | 'Assigned' | 'Return Pending' | 'Returned' | 'Under Repair' | 'Damaged' | 'Lost' | 'Retired' | 'Reserved';
export type AssetCondition = 'New' | 'Excellent' | 'Good' | 'Fair' | 'Damaged' | 'Needs Repair';
export type AssetOwnershipType = 'Company Owned' | 'Leased' | 'Rented' | 'Licensed';

export type AssetHistoryEvent = {
  id: string;
  actor: string;
  date: string;
  action: string;
  description?: string;
};

export type AssetAssignmentHistory = {
  id: string;
  employeeName: string;
  employeeId: string;
  assignedDate: string;
  returnedDate?: string;
  conditionOut: AssetCondition;
  conditionIn?: AssetCondition;
  reason: string;
};

export type Asset = {
  id: string;
  assetId: string;
  name: string;
  type: AssetType;
  brand: string;
  model: string;
  serialNumber?: string;
  purchaseDate?: string;
  purchaseCost?: number;
  location: string;
  condition: AssetCondition;
  status: AssetStatus;
  ownershipType: AssetOwnershipType;
  warrantyExpiry?: string;
  notes?: string;

  // Assignment details if Assigned
  assignedTo?: string;
  assignedEmployeeId?: string;
  assignedDate?: string;
  expectedReturnDate?: string;

  // Return pending
  returnRequestedDate?: string;
  returnReason?: string;
  
  // Software License specifics
  licenseType?: string;
  seats?: number;
  assignedUser?: string; // might differ from employeeId for shared
  licenseKeyMasked?: string;

  history: AssetHistoryEvent[];
  assignmentHistory: AssetAssignmentHistory[];
};

export const mockAssets: Asset[] = [
  {
    id: '1',
    assetId: 'AST-LAP-0042',
    name: 'MacBook Pro 14',
    type: 'Laptop',
    brand: 'Apple',
    model: 'MacBook Pro 14 M3',
    serialNumber: 'C02X••••91',
    purchaseDate: '12 Jul 2026',
    purchaseCost: 150000,
    location: 'Bengaluru HQ',
    condition: 'Good',
    status: 'Assigned',
    ownershipType: 'Company Owned',
    warrantyExpiry: '12 Jul 2027',
    assignedTo: 'Anjali Rao',
    assignedEmployeeId: 'EMP001',
    assignedDate: '01 Aug 2026',
    history: [
      { id: 'h1', actor: 'Priya Sharma', date: '12 Jul 2026', action: 'Asset Added' },
      { id: 'h2', actor: 'Priya Sharma', date: '01 Aug 2026', action: 'Assigned to Anjali Rao' }
    ],
    assignmentHistory: [
      { id: 'a1', employeeName: 'Anjali Rao', employeeId: 'EMP001', assignedDate: '01 Aug 2026', conditionOut: 'Good', reason: 'Current' }
    ]
  },
  {
    id: '2',
    assetId: 'AST-MON-0018',
    name: 'Dell Monitor 24',
    type: 'Monitor',
    brand: 'Dell',
    model: 'UltraSharp 24',
    serialNumber: 'DL••••83',
    purchaseDate: '10 Jan 2026',
    location: 'Bengaluru HQ',
    condition: 'Good',
    status: 'Assigned',
    ownershipType: 'Company Owned',
    assignedTo: 'Rahul Mehta',
    assignedEmployeeId: 'EMP005',
    assignedDate: '14 Jul 2026',
    history: [
      { id: 'h1', actor: 'Priya Sharma', date: '10 Jan 2026', action: 'Asset Added' },
      { id: 'h2', actor: 'Priya Sharma', date: '14 Jul 2026', action: 'Assigned to Rahul Mehta', description: 'Transfer' }
    ],
    assignmentHistory: [
      { id: 'a1', employeeName: 'Siddharth Rao', employeeId: 'EMP002', assignedDate: '10 Jan 2026', returnedDate: '14 Jul 2026', conditionOut: 'Excellent', conditionIn: 'Good', reason: 'Transfer' },
      { id: 'a2', employeeName: 'Rahul Mehta', employeeId: 'EMP005', assignedDate: '14 Jul 2026', conditionOut: 'Good', reason: 'Current' }
    ]
  },
  {
    id: '3',
    assetId: 'AST-PHN-0007',
    name: 'iPhone 15',
    type: 'Phone',
    brand: 'Apple',
    model: 'iPhone 15 128GB',
    serialNumber: 'F02••••11',
    purchaseDate: '01 Sep 2026',
    location: 'Bengaluru HQ',
    condition: 'New',
    status: 'Available',
    ownershipType: 'Company Owned',
    warrantyExpiry: '01 Sep 2027',
    history: [
      { id: 'h1', actor: 'System', date: '01 Sep 2026', action: 'Asset Added' }
    ],
    assignmentHistory: []
  },
  {
    id: '4',
    assetId: 'AST-ACC-0041',
    name: 'Access Card - Mumbai',
    type: 'Access Card',
    brand: 'HID',
    model: 'ProxCard II',
    serialNumber: '93821',
    location: 'Mumbai Office',
    condition: 'Good',
    status: 'Return Pending',
    ownershipType: 'Company Owned',
    assignedTo: 'Neha Gupta',
    assignedEmployeeId: 'EMP008',
    assignedDate: '05 May 2026',
    returnRequestedDate: '05 Oct 2026',
    returnReason: 'Offboarding',
    history: [
      { id: 'h1', actor: 'Admin', date: '05 May 2026', action: 'Asset Added and Assigned' },
      { id: 'h2', actor: 'System', date: '01 Oct 2026', action: 'Marked for Return', description: 'Due to offboarding' }
    ],
    assignmentHistory: [
      { id: 'a1', employeeName: 'Neha Gupta', employeeId: 'EMP008', assignedDate: '05 May 2026', conditionOut: 'Good', reason: 'Current' }
    ]
  },
  {
    id: '5',
    assetId: 'AST-LIC-0032',
    name: 'Adobe Creative Cloud',
    type: 'Software License',
    brand: 'Adobe',
    model: 'All Apps',
    location: 'Remote',
    condition: 'New',
    status: 'Assigned',
    ownershipType: 'Licensed',
    licenseType: 'Named User',
    seats: 1,
    assignedUser: 'Anjali Rao',
    assignedTo: 'Anjali Rao',
    assignedEmployeeId: 'EMP001',
    assignedDate: '15 Aug 2026',
    warrantyExpiry: '31 Dec 2026',
    licenseKeyMasked: 'XXXX-XXXX-••••-2291',
    history: [
      { id: 'h1', actor: 'IT Dept', date: '15 Aug 2026', action: 'License Purchased and Assigned' }
    ],
    assignmentHistory: [
      { id: 'a1', employeeName: 'Anjali Rao', employeeId: 'EMP001', assignedDate: '15 Aug 2026', conditionOut: 'New', reason: 'Current' }
    ]
  }
];

export const getStatusColor = (s: AssetStatus) => {
  switch (s) {
    case 'Available': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Assigned': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    case 'Return Pending': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Returned': return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Under Repair': return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'Damaged': return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'Lost': return 'bg-rose-50 text-rose-700 border-rose-200 font-bold';
    case 'Retired': return 'bg-gray-100 text-gray-700 border-gray-300';
    case 'Reserved': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
    default: return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

export const getConditionColor = (c: AssetCondition) => {
  switch (c) {
    case 'New': return 'text-emerald-700 bg-emerald-50 border-emerald-100';
    case 'Excellent': return 'text-indigo-700 bg-indigo-50 border-indigo-100';
    case 'Good': return 'text-blue-700 bg-blue-50 border-blue-100';
    case 'Fair': return 'text-amber-700 bg-amber-50 border-amber-100';
    case 'Damaged': return 'text-rose-700 bg-rose-50 border-rose-100';
    case 'Needs Repair': return 'text-orange-700 bg-orange-50 border-orange-100';
    default: return 'text-gray-700 bg-gray-50 border-gray-100';
  }
};
