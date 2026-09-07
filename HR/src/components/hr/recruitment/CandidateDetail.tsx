"use client";

import React, { useState } from 'react';
import { Candidate, mockCandidates } from '@/data/hr/recruitment';
import { ArrowLeft, User, Briefcase, MapPin, Mail, Phone, Calendar, Clock, FileText, CheckCircle, XCircle, FilePlus, Play, MessageSquare, Tag, Users } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow, parseISO } from 'date-fns';

export function CandidateDetail({ candidateId }: { candidateId: string }) {
  const [candidate, setCandidate] = useState<Candidate | undefined>(mockCandidates.find(c => c.id === candidateId));
  const [isOfferPreviewOpen, setIsOfferPreviewOpen] = useState(false);
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);

  if (!candidate) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Candidate Not Found</h2>
        <Link href="/hr/recruitment" className="text-indigo-600 mt-4 inline-block">Back to Recruitment</Link>
      </div>
    );
  }

  const handleStageChange = (newStage: Candidate['stage']) => {
    // In real app, this would open a modal for remarks.
    setCandidate(prev => prev ? { ...prev, stage: newStage, timeline: [...prev.timeline, { id: Date.now().toString(), action: `Moved to ${newStage}`, actor: 'HR User', timestamp: new Date().toISOString() }] } : prev);
  };

  const handleConvert = () => {
    setCandidate(prev => prev ? { 
      ...prev, 
      status: 'Hired', 
      stage: 'Hired',
      convertedEmployeeId: 'EMP249',
      timeline: [...prev.timeline, { id: Date.now().toString(), action: 'Converted to Employee', actor: 'HR User', timestamp: new Date().toISOString() }]
    } : prev);
    setIsConvertModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Link href="/hr/recruitment" className="hover:text-indigo-600 flex items-center gap-1">
          <ArrowLeft size={16} /> Recruitment
        </Link>
        <span>/</span>
        <span>Candidates</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">{candidate.id}</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xl flex-shrink-0">
            {candidate.firstName.charAt(0)}{candidate.lastName.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              {candidate.firstName} {candidate.lastName}
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${candidate.status === 'Active' ? 'bg-green-100 text-green-700' : candidate.status === 'Hired' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                {candidate.status}
              </span>
            </h1>
            <div className="text-sm text-gray-500 mt-1 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="flex items-center gap-1.5"><Briefcase size={16} /> {candidate.appliedJobTitle}</span>
              <span className="flex items-center gap-1.5"><MapPin size={16} /> {candidate.currentLocation}</span>
              <span className="flex items-center gap-1.5"><Mail size={16} /> {candidate.email}</span>
              <span className="flex items-center gap-1.5"><Phone size={16} /> {candidate.phone}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {candidate.status === 'Active' && candidate.stage === 'Applied' && (
            <button onClick={() => handleStageChange('Screening')} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Move to Screening</button>
          )}
          {candidate.status === 'Active' && candidate.stage === 'Screening' && (
            <button onClick={() => handleStageChange('Interview')} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Schedule Interview</button>
          )}
          {candidate.status === 'Active' && candidate.stage === 'Interview' && (
            <button onClick={() => handleStageChange('Selected')} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Select Candidate</button>
          )}
          {candidate.status === 'Active' && candidate.stage === 'Selected' && (
            <button onClick={() => setIsOfferPreviewOpen(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Prepare Offer</button>
          )}
          {candidate.status === 'Active' && candidate.stage === 'Offer' && candidate.offer?.status === 'Accepted' && (
            <button onClick={() => setIsConvertModalOpen(true)} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">Convert to Employee</button>
          )}
          {candidate.convertedEmployeeId && (
            <>
              <Link href={`/hr/employees/${candidate.convertedEmployeeId}`} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                <User size={16} /> View Employee
              </Link>
              <Link href={`/hr/onboarding/${candidate.convertedEmployeeId}`} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
                Start Onboarding
              </Link>
            </>
          )}
          
          <div className="relative group">
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
              More Actions
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
              <div className="py-1">
                {candidate.status === 'Active' && (
                  <>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Put On Hold</button>
                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Reject Candidate</button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Mark Withdrawn</button>
                  </>
                )}
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Edit Candidate</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col - Overview */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Application Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Applied Job</p>
                <p className="font-medium text-gray-900">{candidate.appliedJobTitle} <Link href={`/hr/recruitment/jobs/${candidate.appliedJobId}`} className="text-indigo-600 text-xs ml-1 hover:underline">({candidate.appliedJobId})</Link></p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Current Stage</p>
                <p className="font-medium text-blue-700">{candidate.stage}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Experience</p>
                <p className="font-medium text-gray-900">{candidate.experience}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Current Company</p>
                <p className="font-medium text-gray-900">{candidate.currentCompany} <span className="text-gray-500 text-xs">({candidate.currentDesignation})</span></p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Notice Period</p>
                <p className="font-medium text-gray-900">{candidate.noticePeriod}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Source</p>
                <p className="font-medium text-gray-900">{candidate.source} {candidate.referredBy && <span className="text-gray-500 text-xs">(Ref: {candidate.referredBy})</span>}</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-4">
              <button className="flex items-center gap-2 text-sm text-indigo-600 font-medium hover:text-indigo-800">
                <FileText size={16} /> View Resume
              </button>
            </div>
          </div>

          {candidate.interviews.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Interviews</h3>
                <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800">Schedule Interview</button>
              </div>
              
              <div className="space-y-4">
                {candidate.interviews.map(int => (
                  <div key={int.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{int.round}</h4>
                        <div className="text-sm text-gray-500 mt-1 flex flex-wrap gap-3">
                          <span className="flex items-center gap-1"><Calendar size={14} /> {int.date}</span>
                          <span className="flex items-center gap-1"><Clock size={14} /> {int.time} ({int.duration})</span>
                          <span className="flex items-center gap-1"><User size={14} /> {int.interviewers.join(', ')}</span>
                          <span className="flex items-center gap-1"><Tag size={14} /> {int.mode}</span>
                        </div>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-700`}>{int.status}</span>
                    </div>

                    {int.feedbacks.length > 0 ? (
                      <div className="mt-4 bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Internal Feedback</div>
                        {int.feedbacks.map(fb => (
                          <div key={fb.id}>
                            <p className="text-sm font-medium text-gray-900">{fb.interviewer} <span className="text-gray-500 font-normal ml-1">({fb.interviewerRole})</span></p>
                            <div className="flex gap-4 mt-1 text-sm">
                              <span className="text-gray-600">Recommendation: <span className="font-medium text-indigo-700">{fb.recommendation}</span></span>
                              <span className="text-gray-600">Tech: {fb.technicalSkills}/5</span>
                              <span className="text-gray-600">Fit: {fb.roleFit}/5</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">&quot;{fb.finalRemarks}&quot;</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end">
                        <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800 flex items-center gap-1">
                          <MessageSquare size={16} /> Add Feedback
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Col - Timeline */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 mb-4">Timeline</h3>
            <div className="relative border-l-2 border-gray-100 ml-3 space-y-6 pb-2">
              {candidate.timeline.map((evt, idx) => (
                <div key={evt.id} className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo-100 border-2 border-indigo-500"></div>
                  <p className="text-sm font-medium text-gray-900">{evt.action}</p>
                  <p className="text-xs text-gray-500 mt-0.5">by {evt.actor} • {new Date(evt.timestamp).toLocaleDateString()} {new Date(evt.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 shadow-sm">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Internal Notes</h3>
            <div className="space-y-3 mb-3">
              {candidate.notes.map(n => (
                <div key={n.id} className="bg-white p-3 rounded shadow-sm border border-gray-100">
                  <p className="text-xs font-medium text-gray-900">{n.author} <span className="text-gray-400 font-normal ml-1">• {formatDistanceToNow(parseISO(n.timestamp))} ago</span></p>
                  <p className="text-sm text-gray-600 mt-1">{n.content}</p>
                </div>
              ))}
              {candidate.notes.length === 0 && <p className="text-sm text-gray-500">No internal notes.</p>}
            </div>
            <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800">Add Note</button>
          </div>
        </div>

      </div>

      {/* Convert to Employee Modal */}
      {isConvertModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Convert Candidate to Employee?</h2>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600">This action will convert the candidate and start the onboarding process. Please confirm the details.</p>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 block mb-1">Candidate</span>
                  <span className="font-medium text-gray-900">{candidate.firstName} {candidate.lastName}</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">Employee ID</span>
                  <span className="font-medium text-indigo-600">EMP249 (Mocked)</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">Department</span>
                  <span className="font-medium text-gray-900">{candidate.department}</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">Designation</span>
                  <span className="font-medium text-gray-900">{candidate.appliedJobTitle}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" id="confirmConvert" className="rounded border-gray-300 text-indigo-600" />
                <label htmlFor="confirmConvert" className="text-sm text-gray-700">I confirm the hiring details are correct.</label>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsConvertModalOpen(false)} className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
              <button onClick={handleConvert} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Create Employee & Start Onboarding</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
