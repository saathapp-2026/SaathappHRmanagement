import React from 'react';
import { PayrollAdjustment } from '@/data/hr/payroll';


interface PayrollAdjustmentsTableProps {
  adjustments: PayrollAdjustment[];
}

export function PayrollAdjustmentsTable({ adjustments }: PayrollAdjustmentsTableProps) {
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Approved':
      case 'Applied': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  if (adjustments.length === 0) {
    return <div className="text-center py-8 text-muted-foreground border rounded-md">No payroll adjustments have been added.</div>;
  }

  return (
    <div className="border rounded-md overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted text-muted-foreground text-xs uppercase">
          <tr>
            <th className="px-4 py-3 font-medium">Employee ID</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Description</th>
            <th className="px-4 py-3 font-medium">Amount</th>
            <th className="px-4 py-3 font-medium">Added By</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {adjustments.map((adj) => (
            <tr key={adj.id} className="hover:bg-muted/50">
              <td className="px-4 py-3 font-medium">{adj.employeeId}</td>
              <td className="px-4 py-3">{adj.type}</td>
              <td className="px-4 py-3 text-muted-foreground">{adj.description}</td>
              <td className="px-4 py-3 font-medium">
                <span className={adj.direction === 'Add' ? 'text-green-600' : 'text-red-600'}>
                  {adj.direction === 'Add' ? '+' : '-'}{formatCurrency(adj.amount)}
                </span>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{adj.addedBy}</td>
              <td className="px-4 py-3">
                 <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(adj.status)}`}>
                    {adj.status}
                  </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
