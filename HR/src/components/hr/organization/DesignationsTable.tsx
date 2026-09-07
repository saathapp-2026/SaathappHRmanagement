import React from 'react';
import { Eye, Edit, Ban } from 'lucide-react';
import { Designation } from '@/data/hr/organization';

export function DesignationsTable({ designations, onRowClick, onEdit, onDeactivate }: { designations: Designation[], onRowClick: (d: Designation) => void, onEdit: (d: Designation) => void, onDeactivate: (d: Designation) => void }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-4 py-3 whitespace-nowrap">Designation</th>
              <th className="px-4 py-3 whitespace-nowrap">Code</th>
              <th className="px-4 py-3 whitespace-nowrap">Department</th>
              <th className="px-4 py-3 whitespace-nowrap">Level</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">Employees</th>
              <th className="px-4 py-3 whitespace-nowrap">Status</th>
              <th className="px-4 py-3 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {designations.map((desig) => (
              <tr key={desig.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => onRowClick(desig)}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{desig.name}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase tracking-wider">{desig.code}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">{desig.departmentName}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{desig.level}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-bold text-gray-900">{desig.employeesCount}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${desig.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
                    {desig.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-gray-400">
                  <div className="flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => onRowClick(desig)} className="p-1.5 hover:bg-gray-100 hover:text-indigo-600 rounded transition-colors tooltip-trigger" title="View"><Eye size={16}/></button>
                    <button onClick={() => onEdit(desig)} className="p-1.5 hover:bg-gray-100 hover:text-indigo-600 rounded transition-colors tooltip-trigger" title="Edit"><Edit size={16}/></button>
                    <button onClick={() => onDeactivate(desig)} className="p-1.5 hover:bg-rose-50 hover:text-rose-600 rounded transition-colors tooltip-trigger" title="Deactivate"><Ban size={16}/></button>
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
