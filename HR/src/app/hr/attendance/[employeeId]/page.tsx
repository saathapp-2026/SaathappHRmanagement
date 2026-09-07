'use client';
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { EmployeeAttendanceHeader } from '@/components/hr/attendance/EmployeeAttendanceHeader';
import { EmployeeAttendanceStats } from '@/components/hr/attendance/EmployeeAttendanceStats';
import { AttendanceCalendar } from '@/components/hr/attendance/AttendanceCalendar';
import { WorkingHoursTrend } from '@/components/hr/attendance/WorkingHoursTrend';
import { PunctualityCard } from '@/components/hr/attendance/PunctualityCard';
import { WorkingHoursCard } from '@/components/hr/attendance/WorkingHoursCard';

export default function EmployeeAttendancePage() {
  const params = useParams();
  const employeeId = params.employeeId as string;

  return (
    <div className="space-y-6 pb-12">
      <Link href="/hr/attendance" className="text-sm text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-2 font-medium w-fit">
        <ArrowLeft size={16} /> Back to Attendance
      </Link>

      <EmployeeAttendanceHeader employeeId={employeeId} />
      <EmployeeAttendanceStats />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <AttendanceCalendar />
          <WorkingHoursTrend />
        </div>
        <div className="space-y-6">
          <PunctualityCard />
          <WorkingHoursCard />
        </div>
      </div>
    </div>
  );
}
