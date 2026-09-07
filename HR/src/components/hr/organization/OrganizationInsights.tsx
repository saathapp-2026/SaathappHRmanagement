import React from 'react';
import { Lightbulb } from 'lucide-react';

export function OrganizationInsights() {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4 text-indigo-600">
        <Lightbulb size={18} />
        <h3 className="text-sm font-bold uppercase tracking-wider">Organization Overview</h3>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-gray-50 pb-3">
          <span className="text-sm text-gray-600">Largest Department</span>
          <span className="text-sm font-bold text-gray-900">Engineering · 72 employees</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-50 pb-3">
          <span className="text-sm text-gray-600">Average Team Size</span>
          <span className="text-sm font-bold text-gray-900">9 employees</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-50 pb-3">
          <span className="text-sm text-gray-600">Managers</span>
          <span className="text-sm font-bold text-gray-900">32</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-50 pb-3">
          <span className="text-sm text-gray-600">Manager-to-Employee</span>
          <span className="text-sm font-bold text-gray-900">1 : 7.8</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Locations</span>
          <span className="text-sm font-bold text-gray-900">4</span>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Employees by Department</p>
        <div className="space-y-2">
          {[{d:'Engineering',v:72,p:100},{d:'Operations',v:54,p:75},{d:'Marketing',v:26,p:36},{d:'Finance',v:18,p:25},{d:'Human Resources',v:12,p:16}].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <div className="w-24 truncate text-gray-600 font-medium">{item.d}</div>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${item.p}%` }}></div>
              </div>
              <div className="w-6 text-right font-bold text-gray-900">{item.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
