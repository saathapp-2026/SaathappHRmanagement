import React from 'react';
import { ArrowRight } from 'lucide-react';

export function AttendanceOverview() {
  const present = 182;
  const onLeave = 14;
  const absent = 12;
  const late = 14;
  const notCheckedIn = 14;
  const total = present + onLeave + absent + late + notCheckedIn;
  
  // Quick SVG pie chart math
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getOffset = (val: number, prevOffset: number) => {
    return prevOffset - (val / total) * circumference;
  };

  const p_stroke = (present / total) * circumference;
  const l_stroke = (onLeave / total) * circumference;
  const a_stroke = (absent / total) * circumference;
  const la_stroke = (late / total) * circumference;
  const n_stroke = (notCheckedIn / total) * circumference;

  let offset = circumference;
  const p_dashoffset = offset;
  offset -= p_stroke;
  const l_dashoffset = offset;
  offset -= l_stroke;
  const a_dashoffset = offset;
  offset -= a_stroke;
  const la_dashoffset = offset;
  offset -= la_stroke;
  const n_dashoffset = offset;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900 text-lg">Today&apos;s Attendance</h3>
        <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1 group">
          View attendance <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="relative w-40 h-40 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r={radius} fill="none" stroke="#F3F4F6" strokeWidth="16" />
              
              <circle cx="70" cy="70" r={radius} fill="none" stroke="#34D399" strokeWidth="16" strokeDasharray={`${p_stroke} ${circumference}`} strokeDashoffset={p_dashoffset} className="transition-all duration-1000 ease-out" />
              <circle cx="70" cy="70" r={radius} fill="none" stroke="#FBBF24" strokeWidth="16" strokeDasharray={`${l_stroke} ${circumference}`} strokeDashoffset={l_dashoffset} className="transition-all duration-1000 ease-out" />
              <circle cx="70" cy="70" r={radius} fill="none" stroke="#F87171" strokeWidth="16" strokeDasharray={`${a_stroke} ${circumference}`} strokeDashoffset={a_dashoffset} className="transition-all duration-1000 ease-out" />
              <circle cx="70" cy="70" r={radius} fill="none" stroke="#FB923C" strokeWidth="16" strokeDasharray={`${la_stroke} ${circumference}`} strokeDashoffset={la_dashoffset} className="transition-all duration-1000 ease-out" />
              <circle cx="70" cy="70" r={radius} fill="none" stroke="#9CA3AF" strokeWidth="16" strokeDasharray={`${n_stroke} ${circumference}`} strokeDashoffset={n_dashoffset} className="transition-all duration-1000 ease-out" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">{total}</span>
              <span className="text-xs text-gray-500 font-medium text-center leading-tight">Active<br/>Employees</span>
            </div>
          </div>

          <div className="flex-1 w-full space-y-2.5">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#34D399]"></div><span className="text-gray-600 font-medium">Present</span></div>
              <span className="font-semibold text-gray-900">{present}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#FBBF24]"></div><span className="text-gray-600 font-medium">On Leave</span></div>
              <span className="font-semibold text-gray-900">{onLeave}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#F87171]"></div><span className="text-gray-600 font-medium">Absent</span></div>
              <span className="font-semibold text-gray-900">{absent}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#FB923C]"></div><span className="text-gray-600 font-medium">Late</span></div>
              <span className="font-semibold text-gray-900">{late}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#9CA3AF]"></div><span className="text-gray-600 font-medium">Not Checked In</span></div>
              <span className="font-semibold text-gray-900">{notCheckedIn}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-gray-100 flex gap-6">
        <div>
          <p className="text-xs text-gray-500 font-medium">Attendance rate</p>
          <p className="text-lg font-bold text-gray-900">91.4%</p>
        </div>
        <div className="w-px bg-gray-200"></div>
        <div>
          <p className="text-xs text-gray-500 font-medium">Average check-in</p>
          <p className="text-lg font-bold text-gray-900">9:18 AM</p>
        </div>
      </div>
    </div>
  );
}
