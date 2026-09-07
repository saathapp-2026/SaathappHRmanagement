import React from 'react';
import { Lock, Plus } from 'lucide-react';
import { ConcernInternalNote } from '@/data/hr/concerns';

export function InternalNotes({ notes, onAddNote }: { notes: ConcernInternalNote[], onAddNote: () => void }) {
  return (
    <div className="bg-amber-50/30 border-2 border-amber-200 border-dashed rounded-xl overflow-hidden mb-6 relative">
      <div className="px-5 py-4 border-b border-amber-200 bg-amber-100/50 flex justify-between items-center">
        <div className="flex items-center gap-2 text-amber-900">
          <Lock size={16} />
          <h2 className="text-sm font-bold uppercase tracking-wider">Internal HR Notes</h2>
        </div>
        <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded uppercase tracking-wider">Never visible to employee</span>
      </div>
      
      <div className="p-5 space-y-4">
        {notes.length === 0 ? (
          <p className="text-sm text-amber-700/70 italic text-center py-4">No internal notes added yet.</p>
        ) : (
          notes.map(note => (
            <div key={note.id} className="bg-white border border-amber-200 p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-amber-900">{note.authorName}</span>
                <span className="text-[10px] text-amber-600/70">{note.date}</span>
              </div>
              <p className="text-sm text-amber-950 leading-relaxed whitespace-pre-wrap">{note.content}</p>
            </div>
          ))
        )}
        
        <button onClick={onAddNote} className="w-full py-2.5 mt-2 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 border-dashed rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2">
          <Plus size={16} /> Add Internal Note
        </button>
      </div>
    </div>
  );
}
