import React from 'react';
import { ConcernMessage } from '@/data/hr/concerns';

export function ConcernConversation({ messages }: { messages: ConcernMessage[] }) {
  if (messages.length === 0) {
    return (
      <div className="py-8 text-center border-2 border-dashed border-gray-200 rounded-xl mb-6">
        <p className="text-sm text-gray-500">No conversation messages have been added yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mb-6">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 px-1">Employee Conversation</h3>
      {messages.map((m) => {
        const isHR = m.senderRole === 'HR Member' || m.senderRole === 'HR System';
        return (
          <div key={m.id} className={`flex flex-col ${isHR ? 'items-end' : 'items-start'}`}>
            <div className="flex items-baseline gap-2 mb-1 px-1">
              <span className="text-xs font-bold text-gray-900">{isHR ? `HR — ${m.senderName}` : m.senderName}</span>
              <span className="text-[10px] text-gray-500">{m.date}</span>
            </div>
            <div className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl shadow-sm text-sm ${
              isHR 
                ? 'bg-indigo-600 text-white rounded-tr-sm' 
                : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
