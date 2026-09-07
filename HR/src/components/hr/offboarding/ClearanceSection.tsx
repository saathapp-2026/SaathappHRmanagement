'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle } from 'lucide-react';
import { OffboardingRecord, ClearanceStatus } from '@/data/hr/offboarding';

export function ClearanceSection({ record, onUpdate }: { record: OffboardingRecord, onUpdate: (record: Partial<OffboardingRecord>) => void }) {
  const [checklist, setChecklist] = useState(record.clearanceChecklist);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const updateStatus = (id: string, status: ClearanceStatus) => {
    const updated = checklist.map(item => item.id === id ? { ...item, status } : item);
    setChecklist(updated);
    onUpdate({ clearanceChecklist: updated });
  };

  const completedCount = checklist.filter(c => c.status === 'Cleared' || c.status === 'Not Applicable').length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-gray-900">Clearance Checklist</h3>
          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
            {completedCount} of {checklist.length} Cleared
          </span>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {checklist.map(item => (
          <div key={item.id} className="flex flex-col">
            <div 
              className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            >
              <div className="flex items-center gap-3">
                {expandedId === item.id ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{item.department}</h4>
                  <p className="text-xs text-gray-500">Owner: {item.owner}</p>
                </div>
              </div>
              <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
                <select
                  value={item.status}
                  onChange={(e) => updateStatus(item.id, e.target.value as ClearanceStatus)}
                  className={`text-xs border-gray-300 rounded-lg pr-8 focus:ring-blue-500 focus:border-blue-500 ${
                    item.status === 'Cleared' ? 'bg-green-50 text-green-700 border-green-200' :
                    item.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                    item.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''
                  }`}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Cleared">Cleared</option>
                  <option value="Blocked">Blocked</option>
                  <option value="Not Applicable">Not Applicable</option>
                </select>
              </div>
            </div>
            
            {expandedId === item.id && (
              <div className="px-11 pb-4 pt-1 bg-gray-50">
                <div className="text-sm text-gray-700 space-y-2">
                  <p className="font-medium text-xs text-gray-500 uppercase">Pending Items</p>
                  {item.pendingItems.length === 0 ? (
                    <p className="text-gray-500 italic">No specific items listed.</p>
                  ) : (
                    <ul className="list-disc list-inside space-y-1">
                      {item.pendingItems.map((pItem, idx) => (
                        <li key={idx}>{pItem}</li>
                      ))}
                    </ul>
                  )}
                  {item.status !== 'Cleared' && (
                    <button 
                      onClick={() => updateStatus(item.id, 'Cleared')}
                      className="mt-3 flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Mark Clearance Completed
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
