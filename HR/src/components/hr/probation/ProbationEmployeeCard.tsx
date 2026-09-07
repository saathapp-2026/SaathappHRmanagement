import React from 'react';
import Link from 'next/link';
import { User, MapPin, Briefcase, ExternalLink } from 'lucide-react';
import { ProbationRecord } from '@/data/hr/probation';

interface ProbationEmployeeCardProps {
  record: ProbationRecord;
}

export function ProbationEmployeeCard({ record }: ProbationEmployeeCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xl">
            {record.employeeName.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{record.employeeName}</h2>
            <p className="text-sm text-gray-500 font-medium">{record.employeeId}</p>
          </div>
        </div>
        <Link 
          href={`/hr/employees/${record.employeeId}`}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors"
        >
          View Employee Profile
          <ExternalLink size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Briefcase size={14}/> Designation</p>
          <p className="font-medium text-gray-900">{record.designation}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><User size={14}/> Manager</p>
          <p className="font-medium text-gray-900">{record.manager}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><MapPin size={14}/> Location</p>
          <p className="font-medium text-gray-900">{record.location}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Employment</p>
          <p className="font-medium text-gray-900">{record.employmentType}</p>
        </div>
      </div>
    </div>
  );
}
