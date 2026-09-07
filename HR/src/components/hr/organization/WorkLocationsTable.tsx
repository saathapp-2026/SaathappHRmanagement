import React from 'react';
import { Eye, Edit, Ban } from 'lucide-react';
import { WorkLocation } from '@/data/hr/organization';

export function WorkLocationsTable({ locations, onRowClick, onEdit, onDeactivate }: { locations: WorkLocation[], onRowClick: (l: WorkLocation) => void, onEdit: (l: WorkLocation) => void, onDeactivate: (l: WorkLocation) => void }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-4 py-3 whitespace-nowrap">Location</th>
              <th className="px-4 py-3 whitespace-nowrap">Code</th>
              <th className="px-4 py-3 whitespace-nowrap">Type</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">Employees</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">Departments</th>
              <th className="px-4 py-3 whitespace-nowrap">Working Hours</th>
              <th className="px-4 py-3 whitespace-nowrap">Status</th>
              <th className="px-4 py-3 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {locations.map((loc) => (
              <tr key={loc.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => onRowClick(loc)}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{loc.name}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase tracking-wider">{loc.code}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{loc.type}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-bold text-gray-900">{loc.employeesCount}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium text-gray-500">{loc.departmentsCount}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{loc.workingHours}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${loc.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
                    {loc.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-gray-400">
                  <div className="flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => onRowClick(loc)} className="p-1.5 hover:bg-gray-100 hover:text-indigo-600 rounded transition-colors tooltip-trigger" title="View"><Eye size={16}/></button>
                    <button onClick={() => onEdit(loc)} className="p-1.5 hover:bg-gray-100 hover:text-indigo-600 rounded transition-colors tooltip-trigger" title="Edit"><Edit size={16}/></button>
                    <button onClick={() => onDeactivate(loc)} className="p-1.5 hover:bg-rose-50 hover:text-rose-600 rounded transition-colors tooltip-trigger" title="Deactivate"><Ban size={16}/></button>
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
