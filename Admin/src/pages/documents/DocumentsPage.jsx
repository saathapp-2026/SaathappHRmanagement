import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { FileText, CheckCircle2, XCircle, Eye, Download, ShieldCheck } from 'lucide-react';

export const DocumentsPage = () => {
  const { documents, verifyDocument, rejectDocument } = useHR();
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [noteModalDoc, setNoteModalDoc] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [actionType, setActionType] = useState('verify');

  const filteredDocs = documents.filter(d => {
    if (selectedStatus === 'All') return true;
    return d.status === selectedStatus;
  });

  const handleConfirmAction = () => {
    if (!noteModalDoc) return;
    if (actionType === 'verify') {
      verifyDocument(noteModalDoc.id, noteText || 'Verified by HR');
    } else {
      rejectDocument(noteModalDoc.id, noteText || 'Rejected document scan quality');
    }
    setNoteModalDoc(null);
    setNoteText('');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
          Employee Document Management
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Review offer letters, onboarding IDs, educational records, and verify employee documents.
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between">
        <select
          value={selectedStatus}
          onChange={e => setSelectedStatus(e.target.value)}
          className="rounded-xl border py-2 px-3 text-xs font-bold text-slate-800 bg-white"
        >
          <option value="All">All Verification Statuses</option>
          <option value="Pending Verification">Pending Verification</option>
          <option value="Verified">Verified</option>
          <option value="Rejected">Rejected</option>
        </select>
        <span className="text-xs text-slate-400 font-semibold">Total Documents ({filteredDocs.length})</span>
      </div>

      <div className="rounded-3xl bg-white border border-slate-200/80 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b text-slate-500 font-extrabold uppercase">
              <th className="py-3.5 px-4">Document Type & File</th>
              <th className="py-3.5 px-4">Employee</th>
              <th className="py-3.5 px-4">Upload Date</th>
              <th className="py-3.5 px-4">Verification Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredDocs.map(doc => (
              <tr key={doc.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900">{doc.documentType}</div>
                  <div className="text-[11px] text-saath-700 font-mono">{doc.fileName}</div>
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-800">{doc.employeeName}</td>
                <td className="py-3.5 px-4 font-semibold text-slate-600">{doc.uploadDate}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-1 rounded-full font-extrabold text-[11px] ${
                    doc.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' :
                    doc.status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {doc.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {doc.status === 'Pending Verification' && (
                      <>
                        <button
                          onClick={() => { setNoteModalDoc(doc); setActionType('verify'); }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => { setNoteModalDoc(doc); setActionType('reject'); }}
                          className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {noteModalDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">{actionType === 'verify' ? 'Verify Document' : 'Reject Document'}</h3>
            <p className="text-xs text-slate-500 mt-1">{noteModalDoc.fileName} ({noteModalDoc.employeeName})</p>

            <div className="mt-4">
              <label className="block text-xs font-bold text-slate-700 mb-1">Administrative Note</label>
              <textarea
                rows={3}
                placeholder="Optional verification note or rejection reason..."
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                className="w-full rounded-xl border p-2.5 text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setNoteModalDoc(null)} className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-600">Cancel</button>
              <button onClick={handleConfirmAction} className="px-4 py-2 rounded-xl bg-saath-600 text-xs font-bold text-white">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
