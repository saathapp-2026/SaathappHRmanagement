import React from 'react';
import Link from 'next/link';
import { X, ExternalLink, CalendarDays } from 'lucide-react';
import { OrgNode } from '@/data/hr/organization';

export function EmployeeOrgDrawer({ isOpen, onClose, node }: { isOpen: boolean, onClose: () => void, node: OrgNode | null }) {
  if (!isOpen || !node) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose}></div>
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 overflow-y-auto flex flex-col">
        <div className="p-5 border-b border-gray-100 flex justify-between items-start sticky top-0 bg-white/95 backdrop-blur z-10">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xl flex-shrink-0">
              {node.avatar}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 leading-tight">{node.name}</h2>
              <p className="text-sm font-semibold text-gray-500">{node.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-100 text-gray-500 hover:text-gray-900 rounded-full transition-colors flex-shrink-0"><X size={20}/></button>
        </div>
        
        <div className="p-6 flex-1 space-y-6">
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-5 space-y-4">
            <div><span className="text-gray-500 block text-xs">Designation</span><span className="font-semibold text-gray-900">{node.designation}</span></div>
            <div><span className="text-gray-500 block text-xs">Department</span><span className="font-semibold text-gray-900">{node.department}</span></div>
            <div><span className="text-gray-500 block text-xs">Manager</span><span className="font-semibold text-indigo-700">{node.reportsTo || 'N/A'}</span></div>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 space-y-4 text-sm">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Location</span>
              <span className="font-semibold text-gray-900">Bengaluru HQ</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Employment</span>
              <span className="font-semibold text-gray-900">Full-Time</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Joining Date</span>
              <span className="font-semibold text-gray-900">01 Aug 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Direct Reports</span>
              <span className="font-semibold text-gray-900">{node.directReports?.length || 0}</span>
            </div>
          </div>

          {node.directReports && node.directReports.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Direct Reports</h3>
              <div className="space-y-2">
                {node.directReports.map(dr => (
                  <div key={dr.id} className="flex justify-between items-center bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{dr.name}</p>
                      <p className="text-xs text-gray-500">{dr.designation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 pt-4">
            <Link href={`/hr/employees/${node.id}`} className="w-full py-2.5 bg-indigo-600 text-white font-semibold rounded-lg text-sm text-center hover:bg-indigo-700 transition-colors shadow-sm flex justify-center items-center gap-2">View Employee Profile <ExternalLink size={16}/></Link>
            <Link href={`/hr/attendance/${node.id}`} className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg text-sm text-center hover:bg-gray-50 transition-colors flex justify-center items-center gap-2"><CalendarDays size={16}/> View Attendance</Link>
          </div>
        </div>
      </div>
    </>
  );
}
