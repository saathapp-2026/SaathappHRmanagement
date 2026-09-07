'use client';

import React from 'react';
import { AuditLogEntry } from '@/data/hr/audit-logs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import { format } from 'date-fns';

interface AuditTableProps {
  logs: AuditLogEntry[];
  onViewDetails: (log: AuditLogEntry) => void;
}

export function AuditTable({ logs, onViewDetails }: AuditTableProps) {
  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500 mb-4">No audit activity is available for the selected period.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-medium">
            <tr>
              <th className="px-6 py-3">Date & Time</th>
              <th className="px-6 py-3">Actor</th>
              <th className="px-6 py-3">Action</th>
              <th className="px-6 py-3">Employee / Record</th>
              <th className="px-6 py-3">Module</th>
              <th className="px-6 py-3">Change</th>
              <th className="px-6 py-3">Result</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 align-top">
                  <div className="font-medium text-gray-900">{format(new Date(log.timestamp), 'dd MMM yyyy')}</div>
                  <div className="text-gray-500 text-xs">{format(new Date(log.timestamp), 'hh:mm a')}</div>
                </td>
                <td className="px-6 py-4 align-top">
                  <div className="font-medium text-gray-900">{log.actor.name}</div>
                  <div className="text-gray-500 text-xs">{log.actor.role}</div>
                </td>
                <td className="px-6 py-4 align-top">
                  <div className="font-medium text-gray-900 flex items-center gap-1.5">
                    {log.sensitive && <ShieldAlert className="w-3.5 h-3.5 text-red-500" />}
                    {log.actionDescription}
                  </div>
                  {log.sensitive && (
                    <div className="mt-1">
                      <Badge variant="outline" className="text-red-600 bg-red-50 border-red-200 text-[10px] uppercase tracking-wider">
                        Sensitive Change
                      </Badge>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 align-top">
                  <div className="font-medium text-gray-900">
                    {log.employeeName || log.entity.name || log.entity.id}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {log.employeeId || log.entity.id}
                  </div>
                </td>
                <td className="px-6 py-4 align-top text-gray-600">
                  {log.module}
                </td>
                <td className="px-6 py-4 align-top">
                  {log.fieldChanges && log.fieldChanges.length > 0 ? (
                    log.fieldChanges.length === 1 ? (
                      <div className="text-sm">
                        <span className="text-gray-500">{log.fieldChanges[0].field}:</span>{' '}
                        <span className="text-red-600 line-through text-xs mr-1">{log.fieldChanges[0].previousValue || 'None'}</span>
                        <span className="text-gray-400">→</span>{' '}
                        <span className="text-green-600 text-xs ml-1">{log.fieldChanges[0].newValue || 'None'}</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => onViewDetails(log)}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium underline-offset-2 hover:underline"
                      >
                        {log.fieldChanges.length} fields changed
                      </button>
                    )
                  ) : (
                    <span className="text-gray-400 text-sm">—</span>
                  )}
                </td>
                <td className="px-6 py-4 align-top">
                  <Badge
                    variant={log.result === 'Success' ? 'default' : log.result === 'Failed' ? 'destructive' : 'secondary'}
                    className={
                      log.result === 'Success' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                      log.result === 'Failed' ? 'bg-red-100 text-red-700 hover:bg-red-100' :
                      'bg-gray-100 text-gray-700 hover:bg-gray-100'
                    }
                  >
                    {log.result}
                  </Badge>
                </td>
                <td className="px-6 py-4 align-top text-right">
                  <Button variant="ghost" size="sm" onClick={() => onViewDetails(log)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
