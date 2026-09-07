import React from 'react';
import { Paperclip, Send } from 'lucide-react';

export function ConcernReplyComposer({ onReply }: { onReply: () => void }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
      <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-sm font-bold text-gray-900">Reply to Employee</h3>
      </div>
      <div className="p-4">
        <textarea 
          rows={3} 
          placeholder="Type your response to the employee here..."
          className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
        ></textarea>
        <div className="flex justify-between items-center mt-3">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            <Paperclip size={16} /> Attach File
          </button>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
              Save Draft
            </button>
            <button onClick={onReply} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2">
              Send Reply <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
