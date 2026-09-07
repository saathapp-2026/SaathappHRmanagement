import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PayrollPeriod } from '@/data/hr/payroll';

interface PayrollStatsProps {
  period: PayrollPeriod;
  totalLWP: number;
  missingSalary: number;
}

export function PayrollStats({ period, totalLWP, missingSalary }: PayrollStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{period.totalEmployees}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Payroll Ready</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{period.readyEmployees}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Needs Review</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600">{period.needsReviewEmployees}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Missing Salary Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">{missingSalary}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">LWP Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalLWP}</div>
        </CardContent>
      </Card>
      
      <Card className={period.status === 'Locked' ? 'bg-muted/50' : ''}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Payroll Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold truncate leading-none pt-1">{period.status}</div>
        </CardContent>
      </Card>
    </div>
  );
}
