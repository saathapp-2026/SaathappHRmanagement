import React from 'react';
import { AssetHistoryEvent, AssetAssignmentHistory } from '@/data/hr/assets';

export function AssetHistory({ history, assignmentHistory }: { history: AssetHistoryEvent[], assignmentHistory: AssetAssignmentHistory[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">Lifecycle Timeline</h3>
      <div className="relative border-l-2 border-gray-100 ml-3 space-y-6 pb-2">
        {history.map((event, idx) => (
          <div key={event.id} className="relative pl-6">
            <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full ${idx === history.length - 1 ? 'bg-indigo-600 ring-4 ring-indigo-50' : 'bg-gray-300'}`}></div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900">{event.action}</span>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
                <span className="font-semibold text-gray-700">{event.actor}</span>
                <span>•</span>
                <span>{event.date}</span>
              </div>
              {event.description && <p className="text-xs text-gray-600 mt-1">{event.description}</p>}
            </div>
          </div>
        ))}
      </div>
      
      {assignmentHistory.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Assignment Log</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-100">
                  <th className="pb-2 font-medium">Employee</th>
                  <th className="pb-2 font-medium">Assigned</th>
                  <th className="pb-2 font-medium">Returned</th>
                  <th className="pb-2 font-medium">Cond. Out</th>
                  <th className="pb-2 font-medium">Cond. In</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {assignmentHistory.map(a => (
                  <tr key={a.id}>
                    <td className="py-2 font-semibold text-gray-900">{a.employeeName}</td>
                    <td className="py-2 text-gray-600">{a.assignedDate}</td>
                    <td className="py-2 text-gray-600">{a.returnedDate || '—'}</td>
                    <td className="py-2"><span className="px-1.5 bg-gray-100 rounded text-xs">{a.conditionOut}</span></td>
                    <td className="py-2">{a.conditionIn ? <span className="px-1.5 bg-gray-100 rounded text-xs">{a.conditionIn}</span> : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
