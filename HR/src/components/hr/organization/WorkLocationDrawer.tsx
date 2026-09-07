import React from 'react';
import { X, MapPin, Edit, Users, Building2, Clock } from 'lucide-react';
import { WorkLocation } from '@/data/hr/organization';

export function WorkLocationDrawer({ isOpen, onClose, loc, onEdit }: { isOpen: boolean, onClose: () => void, loc: WorkLocation | null, onEdit: (l: WorkLocation) => void }) {
  if (!isOpen || !loc) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose}></div>
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 overflow-y-auto flex flex-col">
        <div className="p-5 border-b border-gray-100 flex justify-between items-start sticky top-0 bg-white/95 backdrop-blur z-10">
          <div>
            <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">{loc.code}</span>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">{loc.name}</h2>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-100 text-gray-500 hover:text-gray-900 rounded-full transition-colors flex-shrink-0"><X size={20}/></button>
        </div>
        
        <div className="p-6 flex-1 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-center">
              <span className="block text-xl font-bold text-indigo-600">{loc.employeesCount}</span>
              <span className="block text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">Employees</span>
            </div>
            <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-center">
              <span className="block text-xl font-bold text-emerald-600">{loc.departmentsCount}</span>
              <span className="block text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">Departments</span>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3 text-gray-700"><MapPin size={18} className="text-gray-400 mt-0.5 flex-shrink-0"/> <div><span className="font-semibold text-gray-500 block text-xs">Address:</span> <span className="leading-tight">{loc.address}</span></div></div>
            <div className="flex items-center gap-3 text-gray-700"><Building2 size={18} className="text-gray-400"/> <span className="font-semibold text-gray-500">Type:</span> <span>{loc.type}</span></div>
            <div className="flex items-center gap-3 text-gray-700"><Clock size={18} className="text-gray-400"/> <span className="font-semibold text-gray-500">Timezone:</span> <span>{loc.timezone}</span></div>
            <div className="flex items-center gap-3 text-gray-700"><span className="w-[18px] text-center font-bold text-gray-400 text-xs">St</span> <span className="font-semibold text-gray-500">Status:</span> <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${loc.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>{loc.status}</span></div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Attendance Settings</h3>
            <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl space-y-3 text-sm">
              <div className="flex justify-between border-b border-amber-100/50 pb-2">
                <span className="text-gray-600">Working Hours</span>
                <span className="font-bold text-gray-900">{loc.workingHours}</span>
              </div>
              <div className="flex justify-between border-b border-amber-100/50 pb-2">
                <span className="text-gray-600">Grace Period</span>
                <span className="font-bold text-gray-900">15 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Minimum Full Day</span>
                <span className="font-bold text-gray-900">8h</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button onClick={() => onEdit(loc)} className="w-full py-2.5 bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold rounded-lg text-sm hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2">
              <Edit size={16}/> Edit Work Location
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
