'use client';
import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { OffboardingInternalNote } from '@/data/hr/offboarding';

export function OffboardingInternalNotes({ notes }: { notes: OffboardingInternalNote[] }) {
  const [internalNotes, setInternalNotes] = useState(notes || []);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setInternalNotes([
      {
        id: Date.now().toString(),
        author: 'Current User', // Mock
        timestamp: new Date().toLocaleString(),
        note: newNote
      },
      ...internalNotes
    ]);
    setNewNote('');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50 flex-shrink-0">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-gray-500" />
          <h3 className="font-semibold text-gray-900 text-sm">Internal HR Notes</h3>
        </div>
        <span className="text-[10px] uppercase font-bold text-gray-400">Private</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {internalNotes.length === 0 ? (
          <div className="text-center text-xs text-gray-500 h-full flex items-center justify-center">
            No internal notes yet.
          </div>
        ) : (
          internalNotes.map(note => (
            <div key={note.id} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-medium text-gray-900">{note.author}</span>
                <span className="text-[10px] text-gray-500">{note.timestamp}</span>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{note.note}</p>
            </div>
          ))
        )}
      </div>

      <div className="p-3 border-t border-gray-200 flex-shrink-0">
        <form onSubmit={handleAddNote} className="flex gap-2">
          <input
            type="text"
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
            placeholder="Add an internal note..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <button 
            type="submit"
            disabled={!newNote.trim()}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
