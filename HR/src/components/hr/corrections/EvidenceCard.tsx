import React from 'react';
import { Paperclip, Download, Eye, FileText, Image as ImageIcon } from 'lucide-react';
import { AttendanceCorrection } from '@/data/hr/corrections';

export function EvidenceCard({ correction }: { correction: AttendanceCorrection }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Paperclip size={18} className="text-gray-400" />
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Supporting Evidence</h3>
      </div>
      
      {correction.evidence.length === 0 ? (
        <p className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded-lg border border-gray-100">No supporting evidence was attached to this request.</p>
      ) : (
        <div className="space-y-3">
          {correction.evidence.map((ev, idx) => (
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
                <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Preview"><Eye size={16}/></button>
                <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Download"><Download size={16}/></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
