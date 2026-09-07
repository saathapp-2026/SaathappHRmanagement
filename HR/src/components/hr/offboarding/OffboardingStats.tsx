'use client';
import React from 'react';
import { OffboardingRecord } from '@/data/hr/offboarding';

interface OffboardingStatsProps {
  records: OffboardingRecord[];
}

export function OffboardingStats({ records }: OffboardingStatsProps) {
  const activeCount = records.filter(r => !['Completed', 'Cancelled'].includes(r.status)).length;
  const pendingReviewCount = records.filter(r => r.status === 'Under Review' || !r.hrReview.completed).length;
  const noticePeriodCount = records.filter(r => r.status === 'Notice Period Active').length;
  const clearancePendingCount = records.filter(r => r.status === 'Clearance Pending' || r.clearanceChecklist.some(c => c.status === 'Pending' || c.status === 'In Progress')).length;
  
  const currentMonth = new Date().getMonth();
  const exitsThisMonth = records.filter(r => {
    const lwd = new Date(r.adjustedLastWorkingDate || r.requestedLastWorkingDate);
    return lwd.getMonth() === currentMonth;
  }).length;

  const overdueTasksCount = records.reduce((acc, r) => {
    let overdue = 0;
    r.ktTasks.forEach(task => {
      if (task.status !== 'Completed' && new Date(task.dueDate) < new Date()) {
        overdue++;
      }
    });
    return acc + overdue;
  }, 0);

  const stats = [
    { label: 'Active Offboarding', value: activeCount },
    { label: 'Resignations Pending Review', value: pendingReviewCount },
    { label: 'Notice Period', value: noticePeriodCount },
    { label: 'Clearance Pending', value: clearancePendingCount },
    { label: 'Exits This Month', value: exitsThisMonth },
    { label: 'Overdue Tasks', value: overdueTasksCount, alert: overdueTasksCount > 0 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <p className="text-xs text-gray-500 font-medium mb-2">{stat.label}</p>
          <p className={`text-2xl font-bold ${stat.alert ? 'text-red-600' : 'text-gray-900'}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
