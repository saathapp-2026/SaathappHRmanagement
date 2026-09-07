'use client';

import React from 'react';
import Link from 'next/link';
import { AuditLogEntry } from '@/data/hr/audit-logs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, ExternalLink, Clock, User, FileText, ArrowRight, ShieldAlert } from 'lucide-react';
import { format } from 'date-fns';

interface AuditDetailDrawerProps {
  log: AuditLogEntry | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AuditDetailDrawer({ log, isOpen, onClose }: AuditDetailDrawerProps) {
  if (!isOpen || !log) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-white shadow-xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out border-l border-gray-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Audit Details</h2>
            <p className="text-sm text-gray-500">{log.id}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Main Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-medium text-gray-900 flex items-center gap-2">
                {log.sensitive && <ShieldAlert className="w-5 h-5 text-red-500" />}
                {log.actionDescription}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Clock className="w-4 h-4" />
              {format(new Date(log.timestamp), 'dd MMM yyyy · hh:mm:ss a')}
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-6 bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Actor</p>
                <p className="font-medium text-gray-900">{log.actor.name}</p>
                <p className="text-gray-500 text-xs">{log.actor.role}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Module</p>
                <p className="font-medium text-gray-900">{log.module}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Result</p>
                <Badge
                  variant={log.result === 'Success' ? 'default' : log.result === 'Failed' ? 'destructive' : 'secondary'}
                  className={
                    log.result === 'Success' ? 'bg-green-100 text-green-700' :
                    log.result === 'Failed' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }
                >
                  {log.result}
                </Badge>
              </div>
              {log.decision && (
                <div>
                  <p className="text-gray-500 mb-1">Decision</p>
                  <p className={`font-medium ${log.decision === 'Approved' ? 'text-green-600' : 'text-red-600'}`}>
                    {log.decision}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Change Details */}
          {log.fieldChanges && log.fieldChanges.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Change Details</h4>
              <div className="space-y-4">
                {log.fieldChanges.map((change, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                      <span className="font-medium text-sm text-gray-700">{change.field}</span>
                    </div>
                    <div className="p-4 grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
                      <div className="bg-red-50/50 p-3 rounded text-sm text-gray-600 border border-red-100/50">
                        <span className="block text-xs text-gray-500 mb-1">BEFORE</span>
                        {change.previousValue || <span className="text-gray-400 italic">None</span>}
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <div className="bg-green-50/50 p-3 rounded text-sm text-gray-900 border border-green-100/50 font-medium">
                        <span className="block text-xs text-gray-500 mb-1 font-normal">AFTER</span>
                        {change.newValue || <span className="text-gray-400 italic">None</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reason / Remarks */}
          {log.reason && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Reason / Remark</h4>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm text-gray-700">
                &quot;{log.reason}&quot;
              </div>
            </div>
          )}

          {/* Context Links */}
          <div className="pt-4 border-t border-gray-200 space-y-4">
            
            {log.relatedRoute && (
              <div className="flex items-center justify-between p-3 bg-blue-50/50 border border-blue-100 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Related Record</p>
                    <p className="text-xs text-gray-500">{log.entity.type} · {log.entity.id}</p>
                  </div>
                </div>
                <Link href={log.relatedRoute} className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  View Record
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {log.employeeId && log.employeeName && (
              <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{log.employeeName}</p>
                    <p className="text-xs text-gray-500">{log.employeeId}</p>
                  </div>
                </div>
                <Link href={`/hr/employees/${log.employeeId}`} className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
                  View Employee
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

          </div>

        </div>
        
      </div>
    </>
  );
}
