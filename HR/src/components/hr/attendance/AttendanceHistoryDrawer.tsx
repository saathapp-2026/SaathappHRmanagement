import React from 'react';
import { X, MapPin, Smartphone, Laptop, ShieldAlert } from 'lucide-react';
import { AttendanceRecord, getStatusColor } from '@/data/hr/attendance';
import Link from 'next/link';

export function AttendanceHistoryDrawer({ record, isOpen, onClose }: { record: AttendanceRecord | null, isOpen: boolean, onClose: () => void }) {
  if (!isOpen || !record) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose}></div>
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-lg font-bold text-gray-900">Attendance Details</h2>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-md transition-colors"><X size={20}/></button>
        </div>
        <div className="p-6 space-y-8">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-700 font-bold rounded-full flex items-center justify-center flex-shrink-0">
              {record.avatar}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{record.employeeName}</h3>
              <p className="text-sm text-gray-500 font-medium">{record.date}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Status</p>
              <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${getStatusColor(record.status)}`}>{record.status}</span>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium text-gray-500 mb-1">Working Hours</p>
              <p className="text-sm font-bold text-gray-900">{record.workingHours || '—'}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Timings</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Check-in</span>
                <span className="font-semibold text-gray-900">{record.checkIn || '—'}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Check-out</span>
                <span className="font-semibold text-gray-900">{record.checkOut || '—'}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Required Hours</span>
                <span className="font-semibold text-gray-900">8h 30m</span>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Variances</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Late Minutes</span>
                <span className={`font-semibold ${record.lateMinutes > 0 ? 'text-amber-600' : 'text-gray-900'}`}>{record.lateMinutes} min</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Early Checkout</span>
                <span className={`font-semibold ${record.earlyCheckoutMinutes > 0 ? 'text-amber-600' : 'text-gray-900'}`}>{record.earlyCheckoutMinutes} min</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Overtime</span>
                <span className={`font-semibold ${record.overtimeMinutes > 0 ? 'text-emerald-600' : 'text-gray-900'}`}>{record.overtimeMinutes} min</span>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">System Information</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 flex items-center gap-1.5"><Smartphone size={14}/> Source</span>
                <span className="font-semibold text-gray-900">{record.source}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 flex items-center gap-1.5"><MapPin size={14}/> Check-in Location</span>
                <span className="font-semibold text-gray-900">{record.location}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 flex items-center gap-1.5"><MapPin size={14}/> Check-out Location</span>
                <span className="font-semibold text-gray-900">{record.checkOut ? record.location : '—'}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 flex items-center gap-1.5"><Laptop size={14}/> IP Address</span>
                <span className="font-mono text-xs text-gray-500">192.168.1.104</span>
              </div>
            </div>
          </div>

          {record.lateMinutes > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex flex-col gap-2 mt-4">
              <div className="flex items-center gap-2 text-amber-800 font-semibold text-sm">
                <ShieldAlert size={16} /> Correction Requested
              </div>
              <p className="text-xs text-amber-700">Employee has submitted an attendance correction for late arrival.</p>
              <Link href="/hr/corrections" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 w-fit mt-1">Review Correction →</Link>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
