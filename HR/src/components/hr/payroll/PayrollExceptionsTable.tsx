import React from 'react';
import { PayrollException } from '@/data/hr/payroll';
import { Button } from '@/components/ui/button';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface PayrollExceptionsTableProps {
  exceptions: PayrollException[];
}

export function PayrollExceptionsTable({ exceptions }: PayrollExceptionsTableProps) {
  
  const getSeverityIcon = (severity: string) => {
    switch(severity) {
      case 'Blocking': return <AlertCircle className="w-4 h-4 text-destructive" />;
      case 'Warning': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  if (exceptions.length === 0) {
    return <div className="text-center py-8 text-muted-foreground border rounded-md">No payroll exceptions require attention.</div>;
  }

  return (
    <div className="border rounded-md overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted text-muted-foreground text-xs uppercase">
          <tr>
            <th className="px-4 py-3 font-medium w-10"></th>
            <th className="px-4 py-3 font-medium">Employee ID</th>
            <th className="px-4 py-3 font-medium">Issue</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {exceptions.map((exc) => (
            <tr key={exc.id} className="hover:bg-muted/50">
              <td className="px-4 py-3">{getSeverityIcon(exc.severity)}</td>
              <td className="px-4 py-3 font-medium">{exc.employeeId}</td>
              <td className="px-4 py-3 font-medium text-foreground">{exc.issue}</td>
              <td className="px-4 py-3 text-muted-foreground">{exc.category}</td>
              <td className="px-4 py-3">
                 <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${exc.status === 'Open' ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-green-50 text-green-800 border-green-200'}`}>
                    {exc.status}
                  </span>
              </td>
              <td className="px-4 py-3 text-right">
                {exc.status === 'Open' && (
                  <Button variant="outline" size="sm">Review</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
