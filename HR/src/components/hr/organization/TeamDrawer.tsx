import React from 'react';
import Link from 'next/link';
import { X, Building2, Users, MapPin, Edit, ExternalLink } from 'lucide-react';
import { Team } from '@/data/hr/organization';

export function TeamDrawer({ isOpen, onClose, team, onEdit }: { isOpen: boolean, onClose: () => void, team: Team | null, onEdit: (t: Team) => void }) {
  if (!isOpen || !team) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose}></div>
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 overflow-y-auto flex flex-col">
        <div className="p-5 border-b border-gray-100 flex justify-between items-start sticky top-0 bg-white/95 backdrop-blur z-10">
          <div>
            <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">Team</span>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">{team.name}</h2>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-100 text-gray-500 hover:text-gray-900 rounded-full transition-colors flex-shrink-0"><X size={20}/></button>
        </div>
        
        <div className="p-6 flex-1 space-y-6">
          <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-center">
            <span className="block text-xl font-bold text-indigo-600">{team.membersCount}</span>
            <span className="block text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">Team Members</span>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3 text-gray-700"><Building2 size={18} className="text-gray-400"/> <span className="font-semibold text-gray-500">Department:</span> <span className="font-bold text-gray-900">{team.departmentName}</span></div>
            <div className="flex items-center gap-3 text-gray-700"><Users size={18} className="text-gray-400"/> <span className="font-semibold text-gray-500">Team Lead:</span> <span className="font-bold text-gray-900">{team.leadName}</span></div>
            <div className="flex items-center gap-3 text-gray-700"><MapPin size={18} className="text-gray-400"/> <span className="font-semibold text-gray-500">Location:</span> <span>{team.location}</span></div>
            <div className="flex items-center gap-3 text-gray-700"><span className="w-[18px] text-center font-bold text-gray-400 text-xs">St</span> <span className="font-semibold text-gray-500">Status:</span> <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${team.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>{team.status}</span></div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Members ({Math.min(3, team.membersCount)})</h3>
            <div className="space-y-2">
              <Link href="/hr/employees/EMP001" className="flex justify-between items-center bg-white border border-gray-200 p-3 rounded-lg shadow-sm hover:border-indigo-300 transition-colors group">
                <div>
                  <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-700">Anjali Rao</p>
                  <p className="text-xs text-gray-500">Software Developer</p>
                </div>
                <ExternalLink size={16} className="text-gray-400 group-hover:text-indigo-600"/>
              </Link>
              <Link href="/hr/employees/EMP002" className="flex justify-between items-center bg-white border border-gray-200 p-3 rounded-lg shadow-sm hover:border-indigo-300 transition-colors group">
                <div>
                  <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-700">Siddharth Rao</p>
                  <p className="text-xs text-gray-500">Backend Engineer</p>
                </div>
                <ExternalLink size={16} className="text-gray-400 group-hover:text-indigo-600"/>
              </Link>
            </div>
            {team.membersCount > 2 && (
              <button className="block w-full py-2 bg-gray-50 border border-gray-200 text-indigo-600 font-semibold rounded-lg text-sm text-center hover:bg-gray-100 transition-colors mt-3">
                View All {team.membersCount} Members
              </button>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button onClick={() => onEdit(team)} className="w-full py-2.5 bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold rounded-lg text-sm hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2">
              <Edit size={16}/> Edit Team
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
