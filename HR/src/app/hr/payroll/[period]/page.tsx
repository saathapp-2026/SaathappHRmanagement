"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Download, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  mockPayrollPeriods, 
  mockEmployeePayrollRecords, 
  mockAdjustments, 
  mockExceptions, 
  mockPayslips 
} from '@/data/hr/payroll';
import { PayrollStats } from '@/components/hr/payroll/PayrollStats';
import { PayrollStatusStepper } from '@/components/hr/payroll/PayrollStatusStepper';
import { PayrollPeriodSelector } from '@/components/hr/payroll/PayrollPeriodSelector';
import { PayrollTabs } from '@/components/hr/payroll/PayrollTabs';
import { PayrollEmployeeTable } from '@/components/hr/payroll/PayrollEmployeeTable';
import { PayrollAdjustmentsTable } from '@/components/hr/payroll/PayrollAdjustmentsTable';
import { PayrollExceptionsTable } from '@/components/hr/payroll/PayrollExceptionsTable';
import { PayrollPayslipTable } from '@/components/hr/payroll/PayrollPayslipTable';

export default function PayrollPeriodPage() {
  const params = useParams();
  const router = useRouter();
  const periodId = params.period as string;
  
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchTerm, setSearchTerm] = useState('');

  const currentPeriod = mockPayrollPeriods.find(p => p.id === periodId) || mockPayrollPeriods[0];
  
  const handlePrevious = () => {
     // Mock logic
     if (periodId === '2026-09') router.push('/hr/payroll/2026-08');
  };
  const handleNext = () => {
     if (periodId === '2026-08') router.push('/hr/payroll/2026-09');
     if (periodId === '2026-09') router.push('/hr/payroll/2026-10');
  };
  const handleCurrent = () => {
     router.push('/hr/payroll/2026-09');
  };

  const totalLWP = mockEmployeePayrollRecords.filter(r => r.lwpDays > 0).length;
  const missingSalary = mockEmployeePayrollRecords.filter(r => r.grossPreview === 0).length;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payroll</h1>
          <p className="text-muted-foreground mt-1">
            Manage salary records, monthly payroll inputs, and payslip status.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <PayrollPeriodSelector 
            currentPeriod={currentPeriod}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onCurrent={handleCurrent}
          />
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">Run Payroll Review</Button>
        </div>
      </div>

      <PayrollStats period={currentPeriod} totalLWP={totalLWP} missingSalary={missingSalary} />
      
      <div className="bg-card rounded-lg border shadow-sm p-6 pb-2">
         <PayrollStatusStepper status={currentPeriod.status} />
      </div>

      <div className="bg-card rounded-lg border shadow-sm">
        <PayrollTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="p-4 space-y-4">
          
          {activeTab === 'Overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Payroll Readiness</h3>
                  <div className="space-y-2">
                     <div className="flex justify-between text-sm">
                       <span>{currentPeriod.readyEmployees} of {currentPeriod.totalEmployees} employees ready</span>
                       <span className="font-medium">{Math.round((currentPeriod.readyEmployees / currentPeriod.totalEmployees) * 100)}%</span>
                     </div>
                     <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${(currentPeriod.readyEmployees / currentPeriod.totalEmployees) * 100}%` }}></div>
                     </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <h4 className="font-medium text-sm text-amber-600">Needs Attention</h4>
                    {mockExceptions.filter(e => e.status === 'Open').map(e => (
                       <div key={e.id} className="flex justify-between p-3 border rounded text-sm bg-amber-50">
                          <span>{e.issue} ({e.employeeId})</span>
                          <span className="font-medium">{e.severity}</span>
                       </div>
                    ))}
                  </div>
               </div>

               <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Month Summary</h3>
                  <div className="space-y-3 p-4 bg-muted/30 rounded-lg border">
                     <div className="flex justify-between text-sm">
                       <span className="text-muted-foreground">Gross Payroll Preview</span>
                       <span className="font-medium">{formatCurrency(currentPeriod.grossPayrollPreview)}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                       <span className="text-muted-foreground">Adjustments Total</span>
                       <span className="font-medium">{formatCurrency(currentPeriod.adjustmentsTotal)}</span>
                     </div>
                     <div className="flex justify-between text-sm text-destructive">
                       <span className="text-muted-foreground text-destructive">Deductions Preview (LWP)</span>
                       <span className="font-medium">-{formatCurrency(currentPeriod.deductionsPreview)}</span>
                     </div>
                     <div className="flex justify-between text-base pt-2 border-t font-semibold">
                       <span>Net Payroll Preview</span>
                       <span>{formatCurrency(currentPeriod.netPayrollPreview)}</span>
                     </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic text-center">
                    Label prominently: Frontend Preview. No actual financial processing.
                  </p>
               </div>
            </div>
          )}

          {activeTab === 'Employees' && (
             <div className="space-y-4">
                <div className="flex items-center gap-2">
                   <div className="relative flex-1 max-w-sm">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     <Input 
                       placeholder="Search employee or ID..." 
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                       className="pl-9 h-9"
                     />
                   </div>
                </div>
                <PayrollEmployeeTable records={mockEmployeePayrollRecords} />
             </div>
          )}

          {activeTab === 'Adjustments' && (
             <div className="space-y-4">
                <div className="flex justify-end">
                   <Button size="sm">Add Adjustment</Button>
                </div>
                <PayrollAdjustmentsTable adjustments={mockAdjustments} />
             </div>
          )}

          {activeTab === 'Exceptions' && (
             <PayrollExceptionsTable exceptions={mockExceptions} />
          )}

          {activeTab === 'Payslips' && (
             <div className="space-y-4">
               <div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg border">
                  <div>
                    <h3 className="font-medium">Payslip Status</h3>
                    <p className="text-sm text-muted-foreground">Generate and issue payslips after payroll is locked.</p>
                  </div>
                  <Button size="sm" disabled={currentPeriod.status !== 'Locked'}>Generate Payslips</Button>
               </div>
               <PayrollPayslipTable payslips={mockPayslips} />
             </div>
          )}

          {(activeTab === 'Attendance Inputs' || activeTab === 'Salary Revisions') && (
            <div className="py-8 text-center border rounded-lg text-muted-foreground bg-muted/10">
               <p>Content for {activeTab} goes here. (Mocked UI segment)</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
