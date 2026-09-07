import React from 'react';
import { Payslip } from '@/data/hr/payroll';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';

interface PayrollPayslipTableProps {
  payslips: Payslip[];
}

export function PayrollPayslipTable({ payslips }: PayrollPayslipTableProps) {
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Acknowledged': return 'bg-green-100 text-green-800';
      case 'Issued': return 'bg-blue-100 text-blue-800';
      case 'Generated': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  if (payslips.length === 0) {
    return <div className="text-center py-8 text-muted-foreground border rounded-md">No payslips have been generated for this period.</div>;
  }

  return (
    <div className="border rounded-md overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted text-muted-foreground text-xs uppercase">
          <tr>
            <th className="px-4 py-3 font-medium">Employee ID</th>
            <th className="px-4 py-3 font-medium">Gross</th>
            <th className="px-4 py-3 font-medium">Net Pay Preview</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Issued Date</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {payslips.map((ps) => (
            <tr key={ps.id} className="hover:bg-muted/50">
              <td className="px-4 py-3 font-medium">{ps.employeeId}</td>
              <td className="px-4 py-3 text-muted-foreground">{formatCurrency(ps.gross)}</td>
              <td className="px-4 py-3 font-medium">{formatCurrency(ps.net)}</td>
              <td className="px-4 py-3">
                 <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(ps.status)}`}>
                    {ps.status}
                  </span>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {ps.issuedDate ? new Date(ps.issuedDate).toLocaleDateString('en-GB') : '—'}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" title="Preview Payslip">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Download PDF">
                    <Download className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
