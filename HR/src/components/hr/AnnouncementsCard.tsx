import React from 'react';
import { Megaphone, ArrowRight } from 'lucide-react';

export function AnnouncementsCard() {
  const announcements = [
    { title: 'Office Closed – Ganesh Chaturthi', type: 'Company Holiday', date: 'Sep 14', badgeColor: 'bg-indigo-100 text-indigo-700' },
    { title: 'Updated Work From Office Policy', type: 'Policy', date: 'Sep 05', badgeColor: 'bg-rose-100 text-rose-700' },
    { title: 'Health Check-up Camp', type: 'Event', date: 'Sep 18', badgeColor: 'bg-emerald-100 text-emerald-700' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Megaphone size={20} className="text-gray-900" />
        <h3 className="font-bold text-gray-900 text-lg">Important Announcements</h3>
      </div>
      
      <div className="flex-1 space-y-4">
        {announcements.map((ann, idx) => (
          <div key={idx} className="group cursor-pointer">
            <h4 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1.5">{ann.title}</h4>
            <div className="flex items-center gap-2 text-xs">
              <span className={`px-2 py-0.5 rounded-md font-semibold ${ann.badgeColor}`}>{ann.type}</span>
              <span className="text-gray-400 font-medium">• {ann.date}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1 group">
          View all announcements <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
