"use client";

import React from 'react';
import { RecruitmentJob, mockJobs, mockCandidates } from '@/data/hr/recruitment';
import { ArrowLeft, Briefcase, MapPin, Users, Calendar, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export function JobDetail({ jobId }: { jobId: string }) {
  const job = mockJobs.find(j => j.id === jobId);
  const candidates = mockCandidates.filter(c => c.appliedJobId === jobId);

  if (!job) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Job Not Found</h2>
        <Link href="/hr/recruitment" className="text-indigo-600 mt-4 inline-block">Back to Recruitment</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Link href="/hr/recruitment" className="hover:text-indigo-600 flex items-center gap-1">
          <ArrowLeft size={16} /> Recruitment
        </Link>
        <span>/</span>
        <span>Jobs</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">{job.id}</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            {job.title}
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${job.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
              {job.status}
            </span>
          </h1>
          <div className="text-sm text-gray-500 mt-2 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-1.5"><Briefcase size={16} /> {job.department}</span>
            <span className="flex items-center gap-1.5"><MapPin size={16} /> {job.location}</span>
            <span className="flex items-center gap-1.5"><Users size={16} /> {job.openings} Openings</span>
            <span className="flex items-center gap-1.5"><Calendar size={16} /> Closing: {new Date(job.targetClosingDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {job.status === 'Open' && (
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Add Candidate</button>
          )}
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">Edit Job</button>
          <div className="relative group">
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
              More
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
              <div className="py-1">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Put On Hold</button>
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Close Job</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Job Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Employment Type</p>
                <p className="font-medium text-gray-900">{job.employmentType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Experience Required</p>
                <p className="font-medium text-gray-900">{job.experienceRange}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Hiring Manager</p>
                <p className="font-medium text-gray-900">{job.hiringManager}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Recruiter</p>
                <p className="font-medium text-gray-900">{job.recruiter}</p>
              </div>
              {job.salaryRange && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Salary Range (Internal)</p>
                  <p className="font-medium text-gray-900">{job.salaryRange}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{job.jobDescription}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkills.map(s => <span key={s} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{s}</span>)}
                </div>
              </div>
              {job.preferredSkills.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Preferred Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.preferredSkills.map(s => <span key={s} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{s}</span>)}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Candidates Pipeline</h3>
              <span className="text-sm text-gray-500">{candidates.length} total</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase">
                    <th className="px-6 py-3">Candidate</th>
                    <th className="px-6 py-3">Stage</th>
                    <th className="px-6 py-3">Applied On</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {candidates.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{c.firstName} {c.lastName}</div>
                        <div className="text-xs text-gray-500">{c.experience} • {c.currentLocation}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                          {c.stage}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(c.appliedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/hr/recruitment/candidates/${c.id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {candidates.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        No candidates found for this job yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 mb-4">Pipeline Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Applied</span>
                <span className="text-sm font-medium text-gray-900">{candidates.filter(c => c.stage === 'Applied').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Screening</span>
                <span className="text-sm font-medium text-gray-900">{candidates.filter(c => c.stage === 'Screening').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Interview</span>
                <span className="text-sm font-medium text-gray-900">{candidates.filter(c => c.stage === 'Interview').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Selected</span>
                <span className="text-sm font-medium text-gray-900">{candidates.filter(c => c.stage === 'Selected').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Offer</span>
                <span className="text-sm font-medium text-gray-900">{candidates.filter(c => c.stage === 'Offer').length}</span>
              </div>
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">Hired</span>
                <span className="text-sm font-bold text-green-600">{candidates.filter(c => c.stage === 'Hired').length} / {job.openings}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 mb-4">Job History</h3>
            <div className="relative border-l-2 border-gray-100 ml-3 space-y-6 pb-2">
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-100 border-2 border-gray-300"></div>
                <p className="text-sm font-medium text-gray-900">Published</p>
                <p className="text-xs text-gray-500 mt-0.5">{job.postedAt ? new Date(job.postedAt).toLocaleDateString() : 'N/A'}</p>
              </div>
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-100 border-2 border-gray-300"></div>
                <p className="text-sm font-medium text-gray-900">Created</p>
                <p className="text-xs text-gray-500 mt-0.5">{new Date(job.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
