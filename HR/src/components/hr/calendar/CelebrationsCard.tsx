import React from 'react';
import { Gift } from 'lucide-react';

export function CelebrationsCard() {
  const celebrations = [
    { name: 'Rahul Mehta', event: 'Birthday', date: '09 Sep' },
    { name: 'Anjali Rao', event: '2-year Anniversary', date: '05 Sep' },
    { name: 'Meera Srinivasan', event: 'Birthday', date: '21 Sep' },
  ];

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4 text-purple-600">
        <Gift size={18} />
        <h3 className="text-sm font-bold uppercase tracking-wider">Celebrations</h3>
      </div>
      <div className="space-y-4">
        {celebrations.map((c, idx) => (
          <div key={idx} className="flex justify-between items-center border-b border-gray-50 last:border-0 last:pb-0 pb-3">
            <div>
              <p className="text-sm font-bold text-gray-900">{c.name}</p>
              <p className="text-xs text-purple-600 font-medium">{c.event}</p>
            </div>
            <p className="text-xs text-gray-400 font-medium">{c.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
