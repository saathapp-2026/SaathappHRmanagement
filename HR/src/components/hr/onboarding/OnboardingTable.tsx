import React from 'react';
import Link from 'next/link';
import { Eye, CheckCircle2 } from 'lucide-react';
import { mockOnboardingEmployees } from '@/data/hr/onboarding';

export function OnboardingTable() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Employee Created': return <span className="inline-flex px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700">{status}</span>;
      case 'Invitation Sent': return <span className="inline-flex px-2 py-1 rounded text-xs font-semibold bg-blue-50 text-blue-700">{status}</span>;
      case 'Profile Completed': return <span className="inline-flex px-2 py-1 rounded text-xs font-semibold bg-purple-50 text-purple-700">{status}</span>;
      case 'Documents Submitted': return <span className="inline-flex px-2 py-1 rounded text-xs font-semibold bg-indigo-50 text-indigo-700">{status}</span>;
      case 'HR Verification': return <span className="inline-flex px-2 py-1 rounded text-xs font-semibold bg-amber-50 text-amber-700">{status}</span>;
      case 'Completed': return <span className="inline-flex px-2 py-1 rounded text-xs font-semibold bg-emerald-50 text-emerald-700">{status}</span>;
      default: return <span className="inline-flex px-2 py-1 rounded text-xs font-semibold bg-gray-50 text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-4 whitespace-nowrap">Employee</th>
              <th className="px-6 py-4 whitespace-nowrap">Role & Dept</th>
              <th className="px-6 py-4 whitespace-nowrap">Joining Date</th>
              <th className="px-6 py-4 whitespace-nowrap">Status & Progress</th>
              <th className="px-6 py-4 whitespace-nowrap">Inv. & Docs</th>
              <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockOnboardingEmployees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <Link href={`/hr/onboarding/${emp.id}`} className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors">{emp.name}</Link>
                    <div className="text-xs text-gray-500 mt-0.5">{emp.id}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{emp.designation}</div>
                  <div className="text-xs text-gray-500">{emp.department}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {emp.joiningDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="mb-2">{getStatusBadge(emp.status)}</div>
                  <div className="w-32 bg-gray-100 rounded-full h-1.5 flex overflow-hidden">
                    <div className={`h-1.5 rounded-full ${emp.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`} style={{ width: `${emp.progress}%` }}></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-xs font-medium text-gray-500 mb-1">
                    Inv: <span className={emp.invitationStatus === 'Accepted' ? 'text-emerald-600' : 'text-gray-900'}>{emp.invitationStatus}</span>
                  </div>
                  <div className="text-xs font-medium text-gray-500">
                    Docs: <span className={emp.documentsComplete === emp.documentsTotal ? 'text-emerald-600' : 'text-gray-900'}>{emp.documentsComplete}/{emp.documentsTotal}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/hr/onboarding/${emp.id}`} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="View Onboarding">
                      <Eye size={18} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
