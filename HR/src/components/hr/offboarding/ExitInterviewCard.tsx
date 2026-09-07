'use client';
import React, { useState } from 'react';
import { Calendar, User, Video } from 'lucide-react';
import { OffboardingRecord } from '@/data/hr/offboarding';

export function ExitInterviewCard({ record, onUpdate }: { record: OffboardingRecord, onUpdate: (record: Partial<OffboardingRecord>) => void }) {
  const [isScheduling, setIsScheduling] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const ei = record.exitInterview;

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      exitInterview: {
        ...ei,
        status: 'Scheduled',
        scheduleDate: ((e.currentTarget as any)).date.value,
        scheduleTime: ((e.currentTarget as any)).time.value,
        interviewer: ((e.currentTarget as any)).interviewer.value,
        mode: ((e.currentTarget as any)).mode.value,
      }
    });
    setIsScheduling(false);
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      exitInterview: {
        ...ei,
        status: 'Completed',
        completedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        overallExperience: ((e.currentTarget as any)).rating.value,
        primaryReason: ((e.currentTarget as any)).reason.value,
        wouldRejoin: ((e.currentTarget as any)).rejoin.value,
        additionalFeedback: 'Mock feedback collected.'
      }
    });
    setIsCompleting(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-gray-900">Exit Interview</h3>
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
            ei.status === 'Completed' ? 'bg-green-100 text-green-800' :
            ei.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {ei.status}
          </span>
        </div>
        <div>
          {ei.status === 'Not Scheduled' && !isScheduling && (
            <button onClick={() => setIsScheduling(true)} className="text-sm font-medium text-blue-600 hover:text-blue-800">
              Schedule
            </button>
          )}
          {ei.status === 'Scheduled' && !isCompleting && (
            <button onClick={() => setIsCompleting(true)} className="text-sm font-medium text-blue-600 hover:text-blue-800">
              Complete Interview
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        {isScheduling ? (
          <form onSubmit={handleSchedule} className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Schedule Exit Interview</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input name="date" type="date" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input name="time" type="time" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Interviewer</label>
                <input name="interviewer" type="text" required defaultValue={record.hrOwner} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
                <select name="mode" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500">
                  <option value="Video">Video</option>
                  <option value="In Person">In Person</option>
                  <option value="Phone">Phone</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setIsScheduling(false)} className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg">Cancel</button>
              <button type="submit" className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">Save Schedule</button>
            </div>
          </form>
        ) : isCompleting ? (
          <form onSubmit={handleComplete} className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Complete Exit Interview</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Overall Experience (1-5)</label>
                <input name="rating" type="number" min="1" max="5" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Reason</label>
                <select name="reason" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500">
                  <option value={record.reason}>{record.reason}</option>
                  <option value="Career Growth">Career Growth</option>
                  <option value="Compensation">Compensation</option>
                  <option value="Manager/Team">Manager/Team</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Would Rejoin?</label>
                <select name="rejoin" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Maybe">Maybe</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setIsCompleting(false)} className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg">Cancel</button>
              <button type="submit" className="px-3 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg">Mark Completed</button>
            </div>
          </form>
        ) : ei.status === 'Completed' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="block text-gray-500 text-xs mb-1">Completed</span>
              <span className="font-medium text-gray-900">{ei.completedDate}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-xs mb-1">Interviewer</span>
              <span className="font-medium text-gray-900">{ei.interviewer}</span>
            </div>
            <div>
              <span className="block text-gray-500 text-xs mb-1">Overall Experience</span>
              <span className="font-medium text-gray-900">{ei.overallExperience} / 5</span>
            </div>
            <div>
              <span className="block text-gray-500 text-xs mb-1">Would Rejoin</span>
              <span className="font-medium text-gray-900">{ei.wouldRejoin}</span>
            </div>
            <div className="col-span-2 md:col-span-4 mt-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <span className="block text-gray-500 text-xs mb-1">Feedback Summary</span>
              <p className="text-gray-700 italic">&quot;{ei.additionalFeedback || 'No additional feedback provided.'}&quot;</p>
            </div>
          </div>
        ) : ei.status === 'Scheduled' ? (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <div className="text-sm">
                <p className="font-medium text-gray-900">{ei.scheduleDate}</p>
                <p className="text-gray-500 text-xs">{ei.scheduleTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              <div className="text-sm">
                <p className="font-medium text-gray-900">{ei.interviewer}</p>
                <p className="text-gray-500 text-xs">Interviewer</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-gray-400" />
              <div className="text-sm">
                <p className="font-medium text-gray-900">{ei.mode}</p>
                <p className="text-gray-500 text-xs">Mode</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500 text-center py-4">
            Exit interview has not been scheduled yet.
          </div>
        )}
      </div>
    </div>
  );
}
