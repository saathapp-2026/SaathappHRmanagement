import React from 'react';
import { X, Building2, ChevronUp, Users, Edit } from 'lucide-react';
import { Designation } from '@/data/hr/organization';

export function DesignationDrawer({ isOpen, onClose, desig, onEdit }: { isOpen: boolean, onClose: () => void, desig: Designation | null, onEdit: (d: Designation) => void }) {
  if (!isOpen || !desig) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose}></div>
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 overflow-y-auto flex flex-col">
        <div className="p-5 border-b border-gray-100 flex justify-between items-start sticky top-0 bg-white/95 backdrop-blur z-10">
          <div>
            <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">{desig.code}</span>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">{desig.name}</h2>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-100 text-gray-500 hover:text-gray-900 rounded-full transition-colors flex-shrink-0"><X size={20}/></button>
        </div>
        
        <div className="p-6 flex-1 space-y-6">
          <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-center">
            <span className="block text-2xl font-bold text-indigo-600">{desig.employeesCount}</span>
            <span className="block text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">Employees Holding Role</span>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3 text-gray-700"><Building2 size={18} className="text-gray-400"/> <span className="font-semibold text-gray-500">Department:</span> <span className="font-bold text-gray-900">{desig.departmentName}</span></div>
            <div className="flex items-center gap-3 text-gray-700"><ChevronUp size={18} className="text-gray-400"/> <span className="font-semibold text-gray-500">Level:</span> <span>{desig.level}</span></div>
            <div className="flex items-center gap-3 text-gray-700"><Users size={18} className="text-gray-400"/> <span className="font-semibold text-gray-500">Reports To:</span> <span>Engineering Manager</span></div>
            <div className="flex items-center gap-3 text-gray-700"><span className="w-[18px] text-center font-bold text-gray-400 text-xs">St</span> <span className="font-semibold text-gray-500">Status:</span> <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${desig.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>{desig.status}</span></div>
          </div>

          <button className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg text-sm hover:bg-gray-50 transition-colors">
            View {desig.employeesCount} Employees
          </button>

          <div className="pt-4 border-t border-gray-100">
            <button onClick={() => onEdit(desig)} className="w-full py-2.5 bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold rounded-lg text-sm hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2">
              <Edit size={16}/> Edit Designation
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
