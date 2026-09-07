import React from 'react';
import Link from 'next/link';
import { X, Calendar as CalendarIcon, Clock, MapPin, Users, Info, ExternalLink } from 'lucide-react';
import { CalendarEvent, getEventColor } from '@/data/hr/calendar';

export function EventDetailDrawer({ isOpen, onClose, event }: { isOpen: boolean, onClose: () => void, event: CalendarEvent | null }) {
  if (!isOpen || !event) return null;

  const renderContent = () => {
    if (event.type === 'Employee Leave') {
      return (
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
            <h3 className="text-amber-900 font-bold mb-4 flex items-center gap-2">Employee Leave</h3>
            <div className="mb-4">
              <p className="text-sm font-bold text-gray-900">{event.employeeName}</p>
              <p className="text-xs text-gray-600">{event.employeeId} · {event.department}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div><span className="text-gray-500 block text-xs">Leave Type</span><span className="font-semibold text-gray-900">Casual Leave</span></div>
              <div><span className="text-gray-500 block text-xs">Status</span><span className="font-semibold text-emerald-600">Approved</span></div>
              <div><span className="text-gray-500 block text-xs">From</span><span className="font-semibold text-gray-900">{event.date}</span></div>
              <div><span className="text-gray-500 block text-xs">To</span><span className="font-semibold text-gray-900">{event.endDate}</span></div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Link href={`/hr/leave/${event.leaveId}`} className="w-full py-2.5 bg-indigo-50 text-indigo-700 font-semibold rounded-lg text-sm text-center hover:bg-indigo-100 transition-colors flex justify-center items-center gap-2">View Leave Request <ExternalLink size={16}/></Link>
            <Link href={`/hr/employees/${event.employeeId}`} className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg text-sm text-center hover:bg-gray-50 transition-colors">View Employee</Link>
          </div>
        </div>
      );
    }
    
    if (event.type === 'Birthday' || event.type === 'Work Anniversary' || event.type === 'Joining Date') {
      return (
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
            <h3 className="text-purple-900 font-bold mb-4">{event.type}</h3>
            <div className="mb-4">
              <p className="text-base font-bold text-gray-900">{event.employeeName}</p>
              <p className="text-sm text-gray-600">{event.designation} · {event.department}</p>
            </div>
            <div className="text-sm">
              <span className="text-gray-500 block text-xs">Date</span>
              <span className="font-semibold text-gray-900">{event.date}</span>
            </div>
            {event.yearsCompleted && (
              <div className="mt-4 text-sm">
                <span className="text-gray-500 block text-xs">Years Completed</span>
                <span className="font-semibold text-gray-900">{event.yearsCompleted}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            {event.type === 'Birthday' && <button className="w-full py-2.5 bg-indigo-50 text-indigo-700 font-semibold rounded-lg text-sm hover:bg-indigo-100 transition-colors">Send Greeting</button>}
            <Link href={event.type === 'Joining Date' ? `/hr/onboarding/${event.employeeId}` : `/hr/employees/${event.employeeId}`} className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg text-sm text-center hover:bg-gray-50 transition-colors">
              {event.type === 'Joining Date' ? 'View Onboarding' : 'View Employee Profile'}
            </Link>
          </div>
        </div>
      );
    }
    
    if (event.type === 'Company Holiday' || event.type === 'Public Holiday') {
      return (
        <div className="space-y-6">
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-5 space-y-4">
            <div><span className="text-gray-500 block text-xs">Type</span><span className="font-semibold text-gray-900">{event.type}</span></div>
            <div><span className="text-gray-500 block text-xs">Date</span><span className="font-semibold text-gray-900">{event.date}</span></div>
            <div><span className="text-gray-500 block text-xs">Applicable Locations</span><span className="font-semibold text-gray-900">{event.location}</span></div>
            <div><span className="text-gray-500 block text-xs">Description</span><span className="text-sm text-gray-700">{event.description}</span></div>
          </div>
          <button className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg text-sm hover:bg-gray-50 transition-colors">Edit Holiday</button>
        </div>
      );
    }

    // Standard HR Event / Training / Meeting
    return (
      <div className="space-y-6">
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-3 text-gray-700"><CalendarIcon size={18} className="text-gray-400"/> <span className="font-semibold">{event.date}</span></div>
          {!event.allDay && <div className="flex items-center gap-3 text-gray-700"><Clock size={18} className="text-gray-400"/> <span>{event.startTime} – {event.endTime}</span></div>}
          {event.location && <div className="flex items-center gap-3 text-gray-700"><MapPin size={18} className="text-gray-400"/> <span>{event.location}</span></div>}
          {event.audience && <div className="flex items-center gap-3 text-gray-700"><Users size={18} className="text-gray-400"/> <span>{event.audience}</span></div>}
          {event.description && (
            <div className="flex items-start gap-3 text-gray-700 mt-6 pt-4 border-t border-gray-100">
              <Info size={18} className="text-gray-400 flex-shrink-0 mt-0.5"/> 
              <span className="leading-relaxed">{event.description}</span>
            </div>
          )}
        </div>
        <div className="flex gap-3 pt-6 border-t border-gray-100">
          <button className="flex-1 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg text-sm hover:bg-gray-50 transition-colors">Edit Event</button>
          <button className="flex-1 py-2 bg-rose-50 border border-rose-200 text-rose-700 font-semibold rounded-lg text-sm hover:bg-rose-100 transition-colors">Cancel Event</button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose}></div>
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 overflow-y-auto flex flex-col">
        <div className="p-5 border-b border-gray-100 flex justify-between items-start sticky top-0 bg-white/95 backdrop-blur z-10">
          <div className="pr-4">
            <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2 ${getEventColor(event.type)}`}>{event.type}</span>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">{event.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-100 text-gray-500 hover:text-gray-900 rounded-full transition-colors flex-shrink-0"><X size={20}/></button>
        </div>
        <div className="p-6 flex-1">
          {renderContent()}
        </div>
      </div>
    </>
  );
}
