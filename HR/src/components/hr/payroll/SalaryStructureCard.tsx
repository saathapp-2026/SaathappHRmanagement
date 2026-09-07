import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Edit2 } from 'lucide-react';
import { SalaryRecord } from '@/data/hr/payroll';

interface SalaryStructureCardProps {
  salaryRecord?: SalaryRecord;
  onEdit: () => void;
}

export function SalaryStructureCard({ salaryRecord, onEdit }: SalaryStructureCardProps) {
  const [showSalary, setShowSalary] = useState(false);

  const formatCurrency = (val: number) => {
    if (!showSalary) return '••••••';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg">Current Salary Structure</CardTitle>
          <CardDescription>
            {salaryRecord ? `Effective from ${formatDate(salaryRecord.effectiveFrom)}` : 'No active salary record'}
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="ghost" size="icon" onClick={() => setShowSalary(!showSalary)}>
             {showSalary ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
           </Button>
           <Button variant="outline" size="sm" onClick={onEdit}>
             <Edit2 className="h-4 w-4 mr-2" />
             Edit Salary
           </Button>
        </div>
      </CardHeader>
      <CardContent>
        {salaryRecord ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-muted/50 p-4 rounded-lg">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Monthly Gross</div>
                <div className="text-xl font-bold">{formatCurrency(salaryRecord.gross)}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Annual CTC Preview</div>
                <div className="text-xl font-bold">{formatCurrency(salaryRecord.gross * 12)}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Status</div>
                <div className={`text-sm font-semibold mt-1 ${salaryRecord.status === 'Active' ? 'text-green-600' : 'text-muted-foreground'}`}>
                  {salaryRecord.status}
                </div>
              </div>
            </div>

            <div className="border rounded-md">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium">Component</th>
                    <th className="px-4 py-2 text-right font-medium">Amount (Monthly)</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {salaryRecord.components.map((comp, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2">{comp.name}</td>
                      <td className="px-4 py-2 text-right font-medium">{formatCurrency(comp.amount)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-muted/50 font-semibold border-t">
                  <tr>
                    <td className="px-4 py-3">Gross Salary</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(salaryRecord.gross)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="text-xs text-muted-foreground italic text-center">
              * Note: Statutory deductions (PF, PT, TDS) are not processed in this frontend preview.
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No salary information has been added for this employee.</p>
            <Button onClick={onEdit}>Add Salary Record</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
