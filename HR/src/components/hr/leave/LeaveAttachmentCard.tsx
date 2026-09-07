import React from 'react';
import { Paperclip, Download, Eye, FileText, Image as ImageIcon } from 'lucide-react';
import { LeaveRequest } from '@/data/hr/leave';

export function LeaveAttachmentCard({ request }: { request: LeaveRequest }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Paperclip size={18} className="text-gray-400" />
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Supporting Document</h3>
      </div>
      
      {request.attachments.length === 0 ? (
        <div className="flex-1 flex items-center justify-center bg-gray-50 border border-gray-100 rounded-lg p-4">
          <p className="text-sm text-gray-500 italic">No supporting document attached.</p>
        </div>
      ) : (
        <div className="space-y-3 flex-1">
          {request.attachments.map((ev, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${ev.type === 'PDF' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'}`}>
                  {ev.type === 'PDF' ? <FileText size={16} /> : <ImageIcon size={16} />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{ev.name}</p>
                  <p className="text-xs text-gray-500 font-medium">{ev.type} • {ev.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Preview"><Eye size={16}/></button>
                <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Download"><Download size={16}/></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
