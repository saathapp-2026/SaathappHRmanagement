import React, { useState } from 'react';
import { Lock, Plus } from 'lucide-react';

export function InternalHRNote() {
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState('');

  return (
    <div className="bg-amber-50/50 p-6 rounded-xl border border-amber-200 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2"><Lock size={16} /> Internal HR Note</h3>
        <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded uppercase tracking-wider">Not visible to employee</span>
      </div>
      
      {savedNote ? (
        <div className="bg-white border border-amber-100 p-4 rounded-lg">
          <p className="text-sm text-gray-800">{savedNote}</p>
          <button onClick={() => setSavedNote('')} className="text-xs font-bold text-amber-600 hover:text-amber-700 mt-2">Edit Note</button>
        </div>
      ) : (
        <div className="space-y-3">
          <textarea 
            className="w-full px-3 py-2 border border-amber-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white" 
            rows={3} 
            placeholder="Add a private note regarding this correction..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
          <button 
            onClick={() => setSavedNote(note || 'Manager confirmed employee remained in office until 6:30 PM.')}
            className="px-4 py-2 text-sm font-medium text-amber-900 bg-amber-200 rounded-lg hover:bg-amber-300 transition-colors flex items-center gap-2"
          >
            <Plus size={16} /> Add Note
          </button>
        </div>
      )}
    </div>
  );
}
