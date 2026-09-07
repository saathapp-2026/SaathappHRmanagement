import React from 'react';
import { Check, Circle } from 'lucide-react';

export function OnboardingStepper() {
  const steps = [
    { title: 'Employee Created', date: '06 Sep 2026', completed: true },
    { title: 'Invitation Sent', date: '06 Sep 2026', completed: true },
    { title: 'Account Created', date: 'Waiting', completed: false },
    { title: 'Profile Completed', date: 'Waiting', completed: false },
    { title: 'Documents Submitted', date: 'Waiting', completed: false },
    { title: 'HR Verified', date: 'Waiting', completed: false },
    { title: 'Completed', date: 'Waiting', completed: false },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Onboarding Progress</h3>
      <div className="space-y-6">
        {steps.map((step, idx) => (
          <div key={idx} className="flex gap-4 relative group">
            {idx !== steps.length - 1 && (
              <div className={`absolute left-3.5 top-8 bottom-[-1.5rem] w-[2px] ${step.completed && steps[idx+1].completed ? 'bg-indigo-500' : 'bg-gray-200'}`}></div>
            )}
            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${step.completed ? 'bg-indigo-500 text-white' : 'bg-white border-2 border-gray-300 text-gray-300'}`}>
              {step.completed ? <Check size={14} /> : <Circle size={10} fill="currentColor" className="text-gray-200" />}
            </div>
            <div>
              <p className={`text-sm font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>{step.title}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">{step.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
