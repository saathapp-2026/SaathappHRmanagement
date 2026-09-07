"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, User, Calendar, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockSalaryRecords, mockSalaryRevisions, mockEmployeePayrollRecords } from '@/data/hr/payroll';
import { SalaryStructureCard } from '@/components/hr/payroll/SalaryStructureCard';

export default function EmployeePayrollPage() {
  const params = useParams();
  const id = params.employeeId as string;
  
  const salaryRecord = mockSalaryRecords[id];
  const revisions = mockSalaryRevisions.filter(r => r.employeeId === id);
  const payrollRecord = mockEmployeePayrollRecords.find(r => r.employeeId === id);

  const [isEditingSalary, setIsEditingSalary] = useState(false);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  const getReadinessColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'bg-green-100 text-green-800';
      case 'Needs Review': return 'bg-amber-100 text-amber-800';
      case 'Blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <Link href="/hr/payroll">
          <Button variant="ghost" size="sm" className="-ml-2 mb-2 text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Payroll
          </Button>
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
             <h1 className="text-2xl font-bold tracking-tight">Employee Payroll</h1>
             <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <User className="w-4 h-4" /> {id} • Current Salary: {salaryRecord ? formatCurrency(salaryRecord.gross) : 'Not Set'} / month
             </p>
          </div>
          <div className="flex gap-2">
             <Link href={`/hr/employees/${id}`}>
                <Button variant="outline" size="sm">View Profile</Button>
             </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         <div className="lg:col-span-2 space-y-6">
            <SalaryStructureCard 
               salaryRecord={salaryRecord} 
               onEdit={() => setIsEditingSalary(!isEditingSalary)} 
            />

            {isEditingSalary && (
               <div className="bg-card p-6 rounded-lg border shadow-sm space-y-4 border-primary">
                  <h3 className="text-lg font-semibold">Add Salary Revision</h3>
                  <div className="text-sm text-muted-foreground bg-muted p-3 rounded">
                    Frontend mock placeholder. Revisions require effective date, reason, and recalculated components.
                  </div>
                  <div className="flex justify-end gap-2">
                     <Button variant="outline" onClick={() => setIsEditingSalary(false)}>Cancel</Button>
                     <Button onClick={() => setIsEditingSalary(false)}>Save Revision</Button>
                  </div>
               </div>
            )}

            {revisions.length > 0 && (
              <div className="bg-card rounded-lg border shadow-sm">
                 <div className="p-6 border-b">
                   <h3 className="text-lg font-semibold">Salary Revision History</h3>
                 </div>
                 <div className="p-6">
                    <div className="space-y-4">
                       {revisions.map(rev => (
                          <div key={rev.id} className="p-4 border rounded-lg bg-muted/30">
                             <div className="flex justify-between items-start mb-2">
                               <div>
                                 <div className="font-semibold text-sm">{new Date(rev.effectiveDate).toLocaleDateString('en-GB')}</div>
                                 <div className="text-xs text-muted-foreground">{rev.revisionType}</div>
                               </div>
                               <Badge variant="outline">{((rev.newGross - rev.previousGross) / rev.previousGross * 100).toFixed(1)}%</Badge>
                             </div>
                             <div className="flex items-center gap-3 mt-3 text-sm">
                                <span className="line-through text-muted-foreground">{formatCurrency(rev.previousGross)}</span>
                                <span className="text-muted-foreground">→</span>
                                <span className="font-medium text-green-600">{formatCurrency(rev.newGross)}</span>
                             </div>
                             <div className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                                Reason: {rev.reason} • Recorded by: {rev.recordedBy}
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
            )}
         </div>

         <div className="space-y-6">
            {payrollRecord && (
               <div className="bg-card rounded-lg border shadow-sm">
                 <div className="p-4 border-b bg-muted/50">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Current Period: {payrollRecord.period}
                    </h3>
                 </div>
                 <div className="p-4 space-y-4">
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-muted-foreground">Readiness</span>
                       <span className={`px-2 py-0.5 rounded font-medium text-xs ${getReadinessColor(payrollRecord.readiness)}`}>
                         {payrollRecord.readiness}
                       </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-muted-foreground">LWP Days</span>
                       <span className={payrollRecord.lwpDays > 0 ? 'text-amber-600 font-medium' : ''}>{payrollRecord.lwpDays}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-t pt-2 mt-2">
                       <span className="font-semibold">Net Preview</span>
                       <span className="font-semibold">{formatCurrency(payrollRecord.netPreview)}</span>
                    </div>
                 </div>
               </div>
            )}

            <div className="bg-card rounded-lg border shadow-sm p-4 space-y-4">
               <h3 className="font-semibold flex items-center gap-2">
                 <Lock className="w-4 h-4 text-muted-foreground" /> Payroll Notes
               </h3>
               <div className="text-xs text-muted-foreground p-3 bg-muted rounded italic">
                 Confidential HR/Payroll note. Not visible in Employee Portal.
               </div>
               <textarea className="w-full text-sm p-2 border rounded-md" rows={3} placeholder="Add an internal note..."></textarea>
               <Button size="sm" className="w-full">Save Note</Button>
            </div>
         </div>

      </div>
    </div>
  );
}
