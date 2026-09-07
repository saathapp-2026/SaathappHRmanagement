import React from 'react';
import { Eye, Edit, Ban } from 'lucide-react';
import { Department } from '@/data/hr/organization';

export function DepartmentsTable({ departments, onRowClick, onEdit, onDeactivate }: { departments: Department[], onRowClick: (d: Department) => void, onEdit: (d: Department) => void, onDeactivate: (d: Department) => void }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-4 py-3 whitespace-nowrap">Department</th>
              <th className="px-4 py-3 whitespace-nowrap">Code</th>
              <th className="px-4 py-3 whitespace-nowrap">Head</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">Employees</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">Teams</th>
              <th className="px-4 py-3 whitespace-nowrap">Location</th>
              <th className="px-4 py-3 whitespace-nowrap">Status</th>
              <th className="px-4 py-3 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {departments.map((dept) => (
              <tr key={dept.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => onRowClick(dept)}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{dept.name}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase tracking-wider">{dept.code}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">{dept.headName}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-bold text-gray-900">{dept.employeesCount}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium text-gray-500">{dept.teamsCount}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{dept.location}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${dept.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
                    {dept.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-gray-400">
                  <div className="flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => onRowClick(dept)} className="p-1.5 hover:bg-gray-100 hover:text-indigo-600 rounded transition-colors tooltip-trigger" title="View"><Eye size={16}/></button>
                    <button onClick={() => onEdit(dept)} className="p-1.5 hover:bg-gray-100 hover:text-indigo-600 rounded transition-colors tooltip-trigger" title="Edit"><Edit size={16}/></button>
                    <button onClick={() => onDeactivate(dept)} className="p-1.5 hover:bg-rose-50 hover:text-rose-600 rounded transition-colors tooltip-trigger" title="Deactivate"><Ban size={16}/></button>
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
