import React from 'react';
import { X, Clock, MapPin, Calendar } from 'lucide-react';

export function AttendancePolicyDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose}></div>
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-lg font-bold text-gray-900">Attendance Policy</h2>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-md transition-colors"><X size={20}/></button>
        </div>
        <div className="p-6 space-y-8">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-sm text-blue-800 font-medium">This is a read-only context view. Global attendance settings can be modified in HR Settings.</p>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold">
              <Clock size={18} className="text-indigo-600" /> Working Hours
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Standard Shift</span>
                <span className="font-semibold text-gray-900">09:30 AM – 06:30 PM</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Grace Period</span>
                <span className="font-semibold text-gray-900">15 minutes</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Minimum Full Day</span>
                <span className="font-semibold text-gray-900">8 hours</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Half Day Threshold</span>
                <span className="font-semibold text-gray-900">4 hours</span>
              </div>
            </div>
          </div>
          
          <div className="w-full h-px bg-gray-100"></div>

          <div>
            <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold">
              <MapPin size={18} className="text-indigo-600" /> Work Location
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Primary Office</span>
                <span className="font-semibold text-gray-900">Bengaluru HQ</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Remote Work</span>
                <span className="font-semibold text-gray-900">Approved required</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Geofencing</span>
                <span className="font-semibold text-gray-900">Disabled</span>
              </div>
            </div>
          </div>
          
          <div className="w-full h-px bg-gray-100"></div>

          <div>
            <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold">
              <Calendar size={18} className="text-indigo-600" /> Weekly Off
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Standard</span>
                <span className="font-semibold text-gray-900">Saturday & Sunday</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
