import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { EmployeePayrollRecord } from '@/data/hr/payroll';
import { mockDepartments } from '@/data/hr/organization'; // Assuming mockEmployee implies multiple employees somehow, we will mock names.

interface PayrollEmployeeTableProps {
  records: EmployeePayrollRecord[];
}

export function PayrollEmployeeTable({ records }: PayrollEmployeeTableProps) {
  const [showSalary, setShowSalary] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'bg-green-100 text-green-800';
      case 'Needs Review': return 'bg-amber-100 text-amber-800';
      case 'Blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const formatCurrency = (val: number) => {
    if (!showSalary) return '••••••';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  const getEmployeeMock = (id: string) => {
     // Mocking some simple name mapping
     if (id === 'EMP001') return { name: 'Anjali Rao', dept: 'Engineering' };
     if (id === 'EMP002') return { name: 'Rahul Mehta', dept: 'Engineering' };
     if (id === 'EMP003') return { name: 'Siddharth Rao', dept: 'Operations' };
     if (id === 'EMP004') return { name: 'Priya Sharma', dept: 'Human Resources' };
     if (id === 'EMP005') return { name: 'Arjun Verma', dept: 'Finance' };
     return { name: `Employee ${id}`, dept: 'Unknown' };
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={() => setShowSalary(!showSalary)}>
          {showSalary ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
          {showSalary ? 'Hide Salary' : 'Show Salary'}
        </Button>
      </div>
      
      <div className="border rounded-md overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted text-muted-foreground text-xs uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Employee</th>
              <th className="px-4 py-3 font-medium">Gross Salary</th>
              <th className="px-4 py-3 font-medium">LWP</th>
              <th className="px-4 py-3 font-medium">Adjustments</th>
              <th className="px-4 py-3 font-medium">Net Preview</th>
              <th className="px-4 py-3 font-medium">Readiness</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {records.map((record) => {
              const emp = getEmployeeMock(record.employeeId);
              return (
                <tr key={record.employeeId} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium">{emp.name}</div>
                    <div className="text-xs text-muted-foreground">{record.employeeId} • {emp.dept}</div>
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {record.grossPreview > 0 ? formatCurrency(record.grossPreview) : <span className="text-destructive text-xs">Missing</span>}
                  </td>
                  <td className="px-4 py-3">
                    {record.lwpDays > 0 ? <span className="text-amber-600 font-medium">{record.lwpDays} days</span> : '0'}
                  </td>
                  <td className="px-4 py-3">
                    {record.adjustmentsTotal !== 0 ? (
                       <span className={record.adjustmentsTotal > 0 ? 'text-green-600' : 'text-red-600'}>
                         {record.adjustmentsTotal > 0 ? '+' : ''}{formatCurrency(record.adjustmentsTotal)}
                       </span>
                    ) : '—'}
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    {record.grossPreview > 0 ? formatCurrency(record.netPreview) : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(record.readiness)}`}>
                      {record.readiness}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/hr/payroll/employee/${record.employeeId}`} className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                      {record.readiness === 'Ready' ? 'View' : 'Review'}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
