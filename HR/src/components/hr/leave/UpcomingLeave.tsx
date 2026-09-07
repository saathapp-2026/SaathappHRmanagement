import React from 'react';

export function UpcomingLeave() {
  const upcoming = [
    { date: '10 Sep', name: 'Anjali Rao', type: 'Casual Leave', days: '2 days', dept: 'Engineering' },
    { date: '12 Sep', name: 'Meera Srinivasan', type: 'Earned Leave', days: '3 days', dept: 'Design' },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 space-y-6">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">This Week</h3>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-100">
            {upcoming.map((u, idx) => (
              <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-lg flex flex-col items-center justify-center border border-indigo-100">
                    <span className="text-xs font-bold text-indigo-400 uppercase leading-none">{u.date.split(' ')[1]}</span>
                    <span className="text-lg font-bold text-indigo-700 leading-none mt-0.5">{u.date.split(' ')[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{u.name}</p>
                    <p className="text-xs font-medium text-gray-500">{u.dept} • {u.days}</p>
                  </div>
                </div>
                <div>
                  <span className="inline-flex px-2 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-700">{u.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Department Coverage</h3>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div>
            <div className="flex justify-between items-center text-xs font-medium text-gray-500 mb-1">
              <span>Engineering</span>
              <span className="text-rose-600 font-bold">2 upcoming leaves</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-rose-500 h-1.5 rounded-full w-[25%]"></div></div>
          </div>
          <div>
            <div className="flex justify-between items-center text-xs font-medium text-gray-500 mb-1">
              <span>Operations</span>
              <span className="text-amber-600 font-bold">4 upcoming leaves</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-amber-500 h-1.5 rounded-full w-[40%]"></div></div>
          </div>
          <div>
            <div className="flex justify-between items-center text-xs font-medium text-gray-500 mb-1">
              <span>Design</span>
              <span className="text-gray-900 font-bold">1 upcoming leave</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-gray-400 h-1.5 rounded-full w-[10%]"></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
