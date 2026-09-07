import React from 'react';
import { Mail, Phone, MapPin, Briefcase, Calendar, Fingerprint, Clock, Activity, CheckCircle, AlertCircle } from 'lucide-react';

export function EmployeeOverview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Quick Stats Strip */}
      <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg"><Activity size={20} /></div>
          <div>
            <p className="text-xs font-medium text-gray-500">Attendance</p>
            <p className="text-lg font-bold text-gray-900">94.6%</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg"><Calendar size={20} /></div>
          <div>
            <p className="text-xs font-medium text-gray-500">Leave Balance</p>
            <p className="text-lg font-bold text-gray-900">12 days</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg"><CheckCircle size={20} /></div>
          <div>
            <p className="text-xs font-medium text-gray-500">Documents</p>
            <p className="text-lg font-bold text-gray-900">8/9 verified</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg"><AlertCircle size={20} /></div>
          <div>
            <p className="text-xs font-medium text-gray-500">Open Requests</p>
            <p className="text-lg font-bold text-gray-900">2</p>
          </div>
        </div>
      </div>

      {/* Main Info Columns */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">Employment Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1 flex items-center gap-1.5"><Fingerprint size={14}/> Employee ID</p>
              <p className="text-sm font-semibold text-gray-900">EMP001</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1 flex items-center gap-1.5"><Briefcase size={14}/> Designation</p>
              <p className="text-sm font-semibold text-gray-900">Software Developer</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Department</p>
              <p className="text-sm font-semibold text-gray-900">Engineering</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Reporting Manager</p>
              <p className="text-sm font-semibold text-gray-900">Vikram Sharma</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Date of Joining</p>
              <p className="text-sm font-semibold text-gray-900">01 Aug 2026</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1 flex items-center gap-1.5"><Clock size={14}/> Employment Type</p>
              <p className="text-sm font-semibold text-gray-900">Full-Time</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">Contact Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1 flex items-center gap-1.5"><Mail size={14}/> Work Email</p>
              <p className="text-sm font-semibold text-gray-900">anjali.rao@saathapp.com</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1 flex items-center gap-1.5"><Phone size={14}/> Mobile</p>
              <p className="text-sm font-semibold text-gray-900">+91 98765 43210</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Personal Email</p>
              <p className="text-sm font-semibold text-gray-900">anjali.rao@example.com</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs font-medium text-gray-500 mb-1 flex items-center gap-1.5"><MapPin size={14}/> Current Address</p>
              <p className="text-sm font-semibold text-gray-900">Indiranagar, Bengaluru, Karnataka, India 560038</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column / Current Status */}
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-inner">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">Current Status</h3>
          <div className="space-y-5">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-600">Employment Status</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">Active</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-600">Account Status</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-800">Active</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-600">Probation</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800">In Probation</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Confirmation</span>
              <span className="text-sm font-semibold text-gray-900">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
