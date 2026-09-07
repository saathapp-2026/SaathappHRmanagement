import React from 'react';
import { X, MapPin, Smartphone, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export function AttendanceDayDrawer({ day, isOpen, onClose }: { day: number | null, isOpen: boolean, onClose: () => void }) {
  if (!isOpen || day === null) return null;

  const isLate = day === 5;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose}></div>
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-lg font-bold text-gray-900">September {day}, 2026</h2>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-md transition-colors"><X size={20}/></button>
        </div>
        <div className="p-6 space-y-8">
          
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Status</p>
              <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${isLate ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{isLate ? 'Late' : 'Present'}</span>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium text-gray-500 mb-1">Working Hours</p>
              <p className="text-sm font-bold text-gray-900">{isLate ? '8h 12m' : '9h 16m'}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Timings</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Check-in</span>
                <span className={`font-semibold ${isLate ? 'text-amber-600' : 'text-gray-900'}`}>{isLate ? '09:46 AM' : '09:18 AM'}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Check-out</span>
                <span className="font-semibold text-gray-900">06:34 PM</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Late</span>
                <span className={`font-semibold ${isLate ? 'text-amber-600' : 'text-gray-900'}`}>{isLate ? '16 min' : '0 min'}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Overtime</span>
                <span className="font-semibold text-gray-900">{isLate ? '0 min' : '46 min'}</span>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Details</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 flex items-center gap-1.5"><MapPin size={14}/> Location</span>
                <span className="font-semibold text-gray-900">Bengaluru HQ</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 flex items-center gap-1.5"><Smartphone size={14}/> Source</span>
                <span className="font-semibold text-gray-900">Mobile App</span>
              </div>
            </div>
          </div>

          {isLate && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-amber-800 font-semibold text-sm">
                <ShieldAlert size={16} /> Correction Requested
              </div>
              <p className="text-xs text-amber-700">A correction request for this late arrival is pending approval.</p>
              <Link href="/hr/corrections" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 w-fit mt-1">Review Correction →</Link>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
