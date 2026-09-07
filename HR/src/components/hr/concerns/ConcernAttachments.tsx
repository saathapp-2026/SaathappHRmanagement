import React from 'react';
import { Paperclip, Download, FileText, Image as ImageIcon } from 'lucide-react';
import { ConcernAttachment } from '@/data/hr/concerns';

export function ConcernAttachments({ attachments }: { attachments: ConcernAttachment[] }) {
  if (attachments.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 mb-6">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2"><Paperclip size={16} className="text-gray-400" /> Attachments</h3>
        <p className="text-sm text-gray-500 italic">No attachments were submitted.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 mb-6">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2"><Paperclip size={16} className="text-gray-400" /> Attachments ({attachments.length})</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {attachments.map(a => (
          <div key={a.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                {a.type === 'Image' ? <ImageIcon size={20} /> : <FileText size={20} />}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-gray-900 truncate">{a.name}</p>
                <p className="text-xs text-gray-500">{a.type} • {a.size}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"><Download size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
