'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, UserPlus, CheckCircle, HelpCircle, Lock } from 'lucide-react';
import { mockHelpRequests, getHelpPriorityColor, getHelpStatusColor } from '@/data/hr/help';

export default function HelpDetailPage() {
  const params = useParams();
  const requestId = params?.id as string;
  const req = mockHelpRequests.find(r => r.id === requestId);

  if (!req) return (
    <div className="p-12 text-center text-gray-500 space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Help Request Not Found</h2>
      <p>The help request you are looking for does not exist.</p>
      <Link href="/hr/help" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
        Back to Help Requests
      </Link>
    </div>
  );

  return (
    <div className="pb-12 bg-slate-50/30 min-h-screen -mx-6 -my-6">
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-20 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link href="/hr/help" className="p-2 -ml-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-gray-900 leading-tight">Help Request</h1>
              <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded tracking-wider">{req.id}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getHelpStatusColor(req.status)}`}>{req.status}</span>
              <span className="text-gray-300">•</span>
              <span className={`inline-flex px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border ${getHelpPriorityColor(req.priority)}`}>{req.priority}</span>
              <span className="text-gray-300">•</span>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded uppercase tracking-wider">{req.category}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors shadow-sm">
            <UserPlus size={16} /> Assign
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors shadow-sm">
            <CheckCircle size={16} /> Resolve
          </button>
        </div>
      </div>
      
      <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-2">{req.subject}</h2>
            <p className="text-sm text-gray-800 bg-gray-50 p-4 rounded-lg border border-gray-100">{req.description}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-sm font-bold text-gray-900">Ticket Conversation</h3>
            </div>
            <div className="p-5 space-y-6">
              {req.messages.map((m) => {
                const isAgent = m.senderRole === 'Support Agent' || m.senderRole === 'System';
                return (
                  <div key={m.id} className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-baseline gap-2 mb-1 px-1">
                      <span className="text-xs font-bold text-gray-900">{isAgent ? `Agent — ${m.senderName}` : m.senderName}</span>
                      <span className="text-[10px] text-gray-500">{m.date}</span>
                    </div>
                    <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm ${isAgent ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'}`}>
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <textarea rows={3} placeholder="Reply to employee..." className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
              <div className="flex justify-end mt-2"><button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg">Send Reply</button></div>
            </div>
          </div>
          
          <div className="bg-amber-50/30 border-2 border-amber-200 border-dashed rounded-xl overflow-hidden p-5">
            <div className="flex items-center gap-2 text-amber-900 mb-4">
              <Lock size={16} />
              <h2 className="text-sm font-bold uppercase tracking-wider">Internal Agent Notes</h2>
            </div>
            {req.internalNotes.length === 0 && <p className="text-sm text-amber-700/70 italic text-center py-4">No internal notes added yet.</p>}
            {req.internalNotes.map(note => (
              <div key={note.id} className="bg-white border border-amber-200 p-4 rounded-lg shadow-sm mb-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-amber-900">{note.authorName}</span>
                  <span className="text-[10px] text-amber-600/70">{note.date}</span>
                </div>
                <p className="text-sm text-amber-950">{note.content}</p>
              </div>
            ))}
            <button className="w-full py-2 mt-2 bg-amber-100 text-amber-900 text-sm font-bold rounded-lg border border-amber-300 border-dashed">Add Note</button>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Employee Details</h3>
            <div className="space-y-3 text-sm">
              <div><span className="text-gray-500 block text-xs">Name</span><span className="font-semibold">{req.employeeName}</span></div>
              <div><span className="text-gray-500 block text-xs">ID</span><span className="font-semibold">{req.employeeId}</span></div>
              <div><span className="text-gray-500 block text-xs">Department</span><span className="font-semibold">{req.employeeDepartment}</span></div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Ticket Details</h3>
            <div className="space-y-3 text-sm">
              <div><span className="text-gray-500 block text-xs">Assigned To</span><span className="font-semibold text-indigo-700">{req.assignedTo || 'Unassigned'}</span></div>
              <div><span className="text-gray-500 block text-xs">Submitted</span><span className="font-semibold">{req.submittedAt}</span></div>
              <div><span className="text-gray-500 block text-xs">SLA Status</span><span className="font-semibold">{req.slaStatus}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
