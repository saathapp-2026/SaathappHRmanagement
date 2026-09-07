import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function NewJoinersCard() {
  const joiners = [
    { name: 'Siddharth Rao', role: 'Backend Engineer', date: 'Joining Sep 09', status: 'Documents 5/6', ready: false, initials: 'SR' },
    { name: 'Meera Srinivasan', role: 'Product Designer', date: 'Joining Sep 12', status: 'Ready to Join', ready: true, initials: 'MS' },
    { name: 'Arjun Nair', role: 'Operations Executive', date: 'Joining Sep 15', status: 'Documents 4/6', ready: false, initials: 'AN' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <h3 className="font-bold text-gray-900 text-lg mb-6">New Joiners</h3>
      
      <div className="flex-1 space-y-5">
        {joiners.map((joiner, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600 flex-shrink-0">
              {joiner.initials}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-bold text-gray-900">{joiner.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{joiner.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-gray-700">{joiner.date}</p>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={joiner.ready ? 'text-emerald-600 font-semibold flex items-center gap-1' : 'text-gray-500'}>
                    {joiner.ready && <CheckCircle2 size={12} />}
                    {joiner.status}
                  </span>
                </div>
                {!joiner.ready && (
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div 
                      className="bg-indigo-500 h-1.5 rounded-full" 
                      style={{ width: joiner.status.includes('5/6') ? '83%' : '66%' }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1 group">
          View onboarding <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
