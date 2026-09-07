import React from 'react';
import { useHR } from '../../context/HRContext';
import { User, Mail, Phone, MapPin, Building, ShieldCheck } from 'lucide-react';

export const ProfilePage = () => {
  const { currentUser } = useHR();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-4">
          <img src={currentUser?.avatar} alt="" className="h-20 w-20 rounded-full object-cover ring-4 ring-saath-500/20" />
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">{currentUser?.fullName}</h1>
            <p className="text-xs font-bold text-saath-600">{currentUser?.role}</p>
            <p className="text-xs text-slate-500 font-medium">{currentUser?.departmentName} Department</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-slate-400 block text-[10px]">Email</span>
            <span className="font-bold text-slate-900">{currentUser?.email}</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-slate-400 block text-[10px]">Employee ID</span>
            <span className="font-bold text-slate-900">{currentUser?.employeeId}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
