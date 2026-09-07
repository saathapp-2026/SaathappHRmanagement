import React from 'react';
import { FileText } from 'lucide-react';
import { AttendanceCorrection } from '@/data/hr/corrections';

export function CorrectionSummaryCard({ correction }: { correction: AttendanceCorrection }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full">
      <div className="flex items-center gap-2 mb-4">
        <FileText size={18} className="text-gray-400" />
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Request Info</h3>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Request ID</p>
          <p className="text-sm font-semibold text-gray-900">{correction.id}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Employee</p>
          <p className="text-sm font-semibold text-gray-900">{correction.employeeName}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Department</p>
          <p className="text-sm font-semibold text-gray-900">{correction.department}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Attendance Date</p>
          <p className="text-sm font-semibold text-gray-900">{correction.attendanceDate}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Submitted</p>
          <p className="text-sm font-semibold text-gray-900">{correction.submitted}</p>
        </div>
        <div className="flex gap-4">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Age</p>
            <p className="text-sm font-semibold text-gray-900">{correction.age}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Priority</p>
            <p className="text-sm font-semibold text-gray-900">{correction.priority}</p>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Assigned To</p>
          <p className="text-sm font-semibold text-gray-900">{correction.assignedTo || 'Unassigned'}</p>
        </div>
      </div>
    </div>
  );
}
