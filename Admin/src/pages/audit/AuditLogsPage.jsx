import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { ShieldAlert, Search, Lock, ShieldCheck } from 'lucide-react';

export const AuditLogsPage = () => {
  const { auditLogs } = useHR();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.affectedEntity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.changedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || log.adminRole === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full w-fit mb-2 border border-emerald-200">
          <ShieldCheck className="h-4 w-4" /> Immutable System Security Trail (Non-Editable)
        </div>
        <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
          System Audit Logs ({auditLogs.length})
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Complete, non-editable audit trail of all sensitive administrative actions, overrides, and security changes.
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search action, employee, admin..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border py-2 pl-9 pr-3 text-xs font-medium focus:border-saath-500"
          />
        </div>

        <select
          value={selectedRole}
          onChange={e => setSelectedRole(e.target.value)}
          className="rounded-xl border py-2 px-3 text-xs font-bold text-slate-800 bg-white"
        >
          <option value="All">All Admin Roles</option>
          <option value="Super Admin">Super Admin</option>
          <option value="HR/Admin">HR/Admin</option>
          <option value="Department Manager">Department Manager</option>
        </select>
      </div>

      <div className="rounded-3xl bg-white border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b text-slate-500 font-extrabold uppercase">
                <th className="py-3.5 px-4">Timestamp & ID</th>
                <th className="py-3.5 px-4">Action Performed</th>
                <th className="py-3.5 px-4">Affected Employee / Entity</th>
                <th className="py-3.5 px-4">Old → New Value</th>
                <th className="py-3.5 px-4">Changed By</th>
                <th className="py-3.5 px-4">Reason / Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{log.date}</div>
                    <div className="text-[10px] font-mono text-slate-400">{log.id}</div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-saath-700">{log.action}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">{log.affectedEntity}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-slate-400">{log.oldValue}</span> → <strong className="text-emerald-700 font-bold">{log.newValue}</strong>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{log.changedBy}</div>
                    <div className="text-[10px] text-slate-400 font-semibold">{log.adminRole}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs leading-relaxed">{log.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
