import React from 'react';
import { Eye, Edit, Ban } from 'lucide-react';
import { Team } from '@/data/hr/organization';

export function TeamsTable({ teams, onRowClick, onEdit, onDeactivate }: { teams: Team[], onRowClick: (t: Team) => void, onEdit: (t: Team) => void, onDeactivate: (t: Team) => void }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-4 py-3 whitespace-nowrap">Team</th>
              <th className="px-4 py-3 whitespace-nowrap">Department</th>
              <th className="px-4 py-3 whitespace-nowrap">Team Lead</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">Members</th>
              <th className="px-4 py-3 whitespace-nowrap">Location</th>
              <th className="px-4 py-3 whitespace-nowrap">Status</th>
              <th className="px-4 py-3 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {teams.map((team) => (
              <tr key={team.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => onRowClick(team)}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{team.name}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">{team.departmentName}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{team.leadName}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-bold text-gray-900">{team.membersCount}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{team.location}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${team.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
                    {team.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-gray-400">
                  <div className="flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => onRowClick(team)} className="p-1.5 hover:bg-gray-100 hover:text-indigo-600 rounded transition-colors tooltip-trigger" title="View"><Eye size={16}/></button>
                    <button onClick={() => onEdit(team)} className="p-1.5 hover:bg-gray-100 hover:text-indigo-600 rounded transition-colors tooltip-trigger" title="Edit"><Edit size={16}/></button>
                    <button onClick={() => onDeactivate(team)} className="p-1.5 hover:bg-rose-50 hover:text-rose-600 rounded transition-colors tooltip-trigger" title="Deactivate"><Ban size={16}/></button>
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
