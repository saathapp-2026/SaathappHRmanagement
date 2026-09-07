import React from 'react';
import { UserPlus, UserCheck, CalendarCheck, Clock, Megaphone, UploadCloud } from 'lucide-react';

export function QuickActions() {
  const actions = [
    { name: 'Invite Employee', icon: UserCheck, primary: false },
    { name: 'Review Leave', icon: CalendarCheck, primary: false },
    { name: 'Mark Attendance', icon: Clock, primary: false },
    { name: 'Create Announcement', icon: Megaphone, primary: false },
    { name: 'Upload Document', icon: UploadCloud, primary: false },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <UserPlus size={18} />
        Add Employee
      </button>
      
      {actions.map((action, idx) => (
        <button 
          key={idx}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
        >
          <action.icon size={18} className="text-gray-500" />
          {action.name}
        </button>
      ))}
    </div>
  );
}
