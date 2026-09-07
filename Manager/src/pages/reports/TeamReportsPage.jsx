import React from 'react';
import { useHR } from '../../context/HRContext';
import { FileText, Download, ShieldAlert } from 'lucide-react';

export const TeamReportsPage = () => {
  const reportsList = [
    { title: 'Team Attendance Report', desc: 'Daily and monthly attendance records for your team', icon: FileText },
    { title: 'Leave Report', desc: 'Leave requests, approvals, and balance details for direct reports', icon: FileText },
    { title: 'Attendance Percentage Report', desc: 'Monthly attendance compliance percentages', icon: FileText },
    { title: 'Late Arrival Report', desc: 'Late check-in logs and frequency analysis', icon: FileText },
    { title: 'Goal Progress Report', desc: 'Active KRAs, weightages, and completion progress', icon: FileText },
    { title: 'Performance Report', desc: 'Rating distributions and review cycle summaries', icon: FileText },
    { title: 'Probation Report', desc: 'Probation timelines and confirmation recommendations', icon: FileText }
  ];

  const handleExport = (reportName, format) => {
    alert(`Exporting ${reportName} in ${format} format...`);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Team Reports & Export Center</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Generate and export authorized performance, attendance, and leave reports for your team
          </p>
        </div>
      </div>

      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium flex items-center gap-2">
        <ShieldAlert className="h-4 w-4 text-saath-600 shrink-0" />
        <span>Reports contain only authorized team member data within your reporting hierarchy.</span>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportsList.map((r, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-saath-50 text-saath-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">{r.title}</h3>
                  <p className="text-xs text-slate-500 font-medium">{r.desc}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => handleExport(r.title, 'CSV')}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs inline-flex items-center gap-1"
              >
                <Download className="h-3.5 w-3.5" /> CSV
              </button>
              <button
                onClick={() => handleExport(r.title, 'Excel')}
                className="px-3 py-1.5 rounded-xl border border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-bold text-xs inline-flex items-center gap-1"
              >
                <Download className="h-3.5 w-3.5" /> Excel
              </button>
              <button
                onClick={() => handleExport(r.title, 'PDF')}
                className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-bold text-xs inline-flex items-center gap-1"
              >
                <Download className="h-3.5 w-3.5" /> PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
