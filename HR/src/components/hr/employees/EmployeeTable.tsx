import React from 'react';
import Link from 'next/link';
import { Edit2, Eye, UserX } from 'lucide-react';

export function EmployeeTable() {
  const employees = [
    {
      id: 'EMP-001',
      name: 'Priya Sharma',
      email: 'priya.s@saathapp.com',
      avatar: 'PS',
      color: 'bg-indigo-100 text-indigo-700',
      role: 'HR Manager',
      department: 'HR',
      status: 'Active',
      joinDate: 'Jan 15, 2024',
      type: 'Full-time'
    },
    {
      id: 'EMP-042',
      name: 'Amit Kumar',
      email: 'amit.k@saathapp.com',
      avatar: 'AK',
      color: 'bg-blue-100 text-blue-700',
      role: 'Senior Backend Engineer',
      department: 'Engineering',
      status: 'On Leave',
      joinDate: 'Mar 10, 2024',
      type: 'Full-time'
    },
    {
      id: 'EMP-078',
      name: 'Sneha Rao',
      email: 'sneha.r@saathapp.com',
      avatar: 'SR',
      color: 'bg-emerald-100 text-emerald-700',
      role: 'Operations Lead',
      department: 'Operations',
      status: 'Active',
      joinDate: 'May 22, 2024',
      type: 'Full-time'
    },
    {
      id: 'EMP-089',
      name: 'Rahul Mehta',
      email: 'rahul.m@saathapp.com',
      avatar: 'RM',
      color: 'bg-rose-100 text-rose-700',
      role: 'Product Designer',
      department: 'Design',
      status: 'Notice Period',
      joinDate: 'Aug 05, 2024',
      type: 'Full-time'
    },
    {
      id: 'EMP-092',
      name: 'Anjali Rao',
      email: 'anjali.r@saathapp.com',
      avatar: 'AR',
      color: 'bg-amber-100 text-amber-700',
      role: 'Marketing Specialist',
      department: 'Marketing',
      status: 'Active',
      joinDate: 'Sep 01, 2024',
      type: 'Contract'
    },
    {
      id: 'EMP-104',
      name: 'Vikram Singh',
      email: 'vikram.s@saathapp.com',
      avatar: 'VS',
      color: 'bg-purple-100 text-purple-700',
      role: 'Frontend Engineer',
      department: 'Engineering',
      status: 'Active',
      joinDate: 'Sep 05, 2024',
      type: 'Full-time'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Active':
        return <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">Active</span>;
      case 'On Leave':
        return <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">On Leave</span>;
      case 'Notice Period':
        return <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">Notice Period</span>;
      default:
        return <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200">{status}</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-4 whitespace-nowrap">Employee</th>
              <th className="px-6 py-4 whitespace-nowrap">Role & Department</th>
              <th className="px-6 py-4 whitespace-nowrap">Status</th>
              <th className="px-6 py-4 whitespace-nowrap">Employment</th>
              <th className="px-6 py-4 whitespace-nowrap">Join Date</th>
              <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${emp.color}`}>
                      {emp.avatar}
                    </div>
                    <div>
                      <Link href={`/hr/employees/${emp.id}`} className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors">{emp.name}</Link>
                      <div className="text-sm text-gray-500">{emp.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{emp.role}</div>
                  <div className="text-sm text-gray-500">{emp.department}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(emp.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{emp.type}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{emp.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {emp.joinDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/hr/employees/${emp.id}`} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="View Profile">
                      <Eye size={18} />
                    </Link>
                    <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Edit">
                      <Edit2 size={18} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors" title="Deactivate / Start Offboarding">
                      <UserX size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-sm text-gray-500">Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">6</span> of <span className="font-medium text-gray-900">248</span> employees</span>
        <div className="flex gap-1">
          <button className="px-3 py-1.5 border border-gray-200 text-gray-400 rounded-md text-sm font-medium cursor-not-allowed">Previous</button>
          <button className="px-3 py-1.5 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 rounded-md text-sm font-medium transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}
