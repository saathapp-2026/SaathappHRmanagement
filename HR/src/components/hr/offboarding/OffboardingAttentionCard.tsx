'use client';
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { OffboardingRecord } from '@/data/hr/offboarding';

export function OffboardingAttentionCard({ records }: { records: OffboardingRecord[] }) {
  const pendingReview = records.filter(r => r.status === 'Under Review' || !r.hrReview.completed).length;
  
  let overdueTasks = 0;
  records.forEach(r => {
    r.ktTasks.forEach(task => {
      if (task.status !== 'Completed' && new Date(task.dueDate) < new Date()) {
        overdueTasks++;
      }
    });
  });

  const missingAssets = records.reduce((acc, r) => acc + r.assignedAssets.filter(a => a.status === 'Return Pending').length, 0);

  const pendingInterviews = records.filter(r => r.exitInterview.status === 'Not Scheduled' && r.progress > 50 && r.status !== 'Completed' && r.status !== 'Cancelled').length;

  const attentionItems = [];
  if (pendingReview > 0) attentionItems.push(`${pendingReview} resignations awaiting HR review`);
  if (overdueTasks > 0) attentionItems.push(`${overdueTasks} KT tasks overdue`);
  if (missingAssets > 0) attentionItems.push(`${missingAssets} assets not returned`);
  if (pendingInterviews > 0) attentionItems.push(`${pendingInterviews} exit interviews not scheduled`);

  if (attentionItems.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-orange-200 overflow-hidden shadow-sm">
      <div className="bg-orange-50 border-b border-orange-200 p-4 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-orange-600" />
        <h3 className="font-semibold text-orange-900">Needs Attention</h3>
      </div>
      <div className="p-4">
        <ul className="space-y-3">
          {attentionItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
