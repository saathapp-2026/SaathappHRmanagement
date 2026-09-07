'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Upload, Mail } from 'lucide-react';

export default function AddEmployeeFlow() {
  const [step, setStep] = useState(1);
  const [isCreated, setIsCreated] = useState(false);
  const [invitationSent, setInvitationSent] = useState(false);
  
  const steps = [
    { id: 1, title: 'Basic Information' },
    { id: 2, title: 'Employment Details' },
    { id: 3, title: 'Work Details' },
    { id: 4, title: 'Review & Create' }
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCreate = () => {
    setIsCreated(true);
  };

  const handleSendInvite = () => {
    setInvitationSent(true);
  };

  if (isCreated) {
    return (
      <div className="max-w-3xl mx-auto py-12">
        <div className="bg-white p-10 rounded-2xl border border-gray-200 shadow-sm text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Employee created successfully</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            The employee profile has been created and is now in the onboarding queue. You can send them an invitation to complete their profile.
          </p>
          
          {invitationSent && (
            <div className="bg-emerald-50 text-emerald-700 p-3 rounded-lg text-sm font-medium mb-8 max-w-sm mx-auto flex items-center justify-center gap-2">
              <Check size={16}/> Invitation sent successfully.
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {!invitationSent && (
              <button onClick={handleSendInvite} className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center justify-center gap-2">
                <Mail size={18} /> Send Invitation
              </button>
            )}
            <Link href="/hr/onboarding/EMP018" className="w-full sm:w-auto px-6 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium shadow-sm transition-colors text-center">
              View Employee
            </Link>
            <Link href="/hr/onboarding" className="w-full sm:w-auto px-6 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium shadow-sm transition-colors text-center">
              Back to Onboarding
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <Link href="/hr/onboarding" className="text-sm text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-4 font-medium w-fit">
        <ArrowLeft size={16} /> Back to Onboarding
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add New Employee</h1>
        <p className="text-sm text-gray-500 mt-1">Create a new employee profile and start their onboarding process.</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 -z-10"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-500 transition-all duration-300 -z-10" style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}></div>
          
          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-2 bg-white px-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step > s.id ? 'bg-indigo-500 border-indigo-500 text-white' : step === s.id ? 'bg-white border-indigo-500 text-indigo-600' : 'bg-white border-gray-200 text-gray-400'}`}>
                {step > s.id ? <Check size={16} /> : s.id}
              </div>
              <span className={`text-xs font-semibold ${step >= s.id ? 'text-gray-900' : 'text-gray-400'}`}>{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">1. Basic Information</h2>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-400">
                  <Upload size={24} />
                </div>
                <div>
                  <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Upload Photo</button>
                  <p className="text-xs text-gray-500 mt-2">Optional. Max size 2MB.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Rahul Mehta" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. EMP123" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Work Email <span className="text-red-500">*</span></label>
                  <input type="email" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="name@saathapp.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Personal Email</label>
                  <input type="email" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="name@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                  <input type="tel" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="+91 98765 43210" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">2. Employment Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department <span className="text-red-500">*</span></label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Select Department</option>
                    <option>Engineering</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>HR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Designation <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Software Engineer" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reporting Manager <span className="text-red-500">*</span></label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Select Manager</option>
                    <option>Priya Sharma</option>
                    <option>Vikram Sharma</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type <span className="text-red-500">*</span></label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Full-Time</option>
                    <option>Part-Time</option>
                    <option>Contract</option>
                    <option>Intern</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date <span className="text-red-500">*</span></label>
                  <input type="date" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Probation Period <span className="text-red-500">*</span></label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>6 Months</option>
                    <option>3 Months</option>
                    <option>Custom</option>
                    <option>None</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">3. Work Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Work Location <span className="text-red-500">*</span></label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Bengaluru HQ</option>
                    <option>Mumbai Branch</option>
                    <option>Remote</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Work Mode <span className="text-red-500">*</span></label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Hybrid</option>
                    <option>On-site</option>
                    <option>Remote</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shift <span className="text-red-500">*</span></label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>General Shift</option>
                    <option>Morning Shift</option>
                    <option>Evening Shift</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours</label>
                  <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. 09:30 AM – 06:30 PM" defaultValue="09:30 AM – 06:30 PM" />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8">
              <h2 className="text-lg font-bold text-gray-900 mb-2">4. Review & Create</h2>
              
              <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Basic Information</h3>
                    <button onClick={() => setStep(1)} className="text-xs font-semibold text-indigo-600 hover:underline">Edit</button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-500 block">Full Name</span><span className="font-medium text-gray-900">Rahul Mehta</span></div>
                    <div><span className="text-gray-500 block">Employee ID</span><span className="font-medium text-gray-900">EMP018</span></div>
                    <div><span className="text-gray-500 block">Work Email</span><span className="font-medium text-gray-900">rahul.m@saathapp.com</span></div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Employment</h3>
                    <button onClick={() => setStep(2)} className="text-xs font-semibold text-indigo-600 hover:underline">Edit</button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-500 block">Department</span><span className="font-medium text-gray-900">Design</span></div>
                    <div><span className="text-gray-500 block">Designation</span><span className="font-medium text-gray-900">Product Designer</span></div>
                    <div><span className="text-gray-500 block">Manager</span><span className="font-medium text-gray-900">Priya Sharma</span></div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Work Details</h3>
                    <button onClick={() => setStep(3)} className="text-xs font-semibold text-indigo-600 hover:underline">Edit</button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-500 block">Location</span><span className="font-medium text-gray-900">Bengaluru HQ</span></div>
                    <div><span className="text-gray-500 block">Work Mode</span><span className="font-medium text-gray-900">Hybrid</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50/80 border-t border-gray-200 flex justify-between items-center">
          {step > 1 ? (
            <button onClick={handleBack} className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Back
            </button>
          ) : <div></div>}
          
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Save as Draft
            </button>
            {step < 4 ? (
              <button onClick={handleNext} className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                Next Step
              </button>
            ) : (
              <button onClick={handleCreate} className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm">
                Create Employee
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
