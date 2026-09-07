import React, { useState } from 'react';
import { useHR } from '../../context/HRContext';
import { UserCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

export const ProbationReviewsPage = () => {
  const { probationReviews, submitProbationRecommendation } = useHR();

  const [selectedReview, setSelectedReview] = useState(null);
  const [recommendation, setRecommendation] = useState('confirm');
  const [justification, setJustification] = useState('');
  const [extensionMonths, setExtensionMonths] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedReview && justification.trim()) {
      submitProbationRecommendation(selectedReview.id, recommendation, justification, extensionMonths);
      setSelectedReview(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Probation Reviews Center</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Submit confirmation recommendations to HR for team members in probation
          </p>
        </div>
      </div>

      {/* Probation Ending Soon Alerts */}
      <div className="space-y-4">
        {probationReviews.map(p => (
          <div key={p.id} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold">
                  Ends in {p.daysRemaining} days
                </span>
                <span className="text-xs text-slate-400 font-medium">Probation End Date: {p.probationEndDate}</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mt-1">{p.employeeName}</h3>
              <p className="text-xs text-slate-600 mt-1">Status: <strong>{p.status}</strong></p>
              {p.justification && (
                <p className="text-xs text-slate-500 italic mt-1">"{p.justification}"</p>
              )}
            </div>

            <div className="shrink-0">
              {p.status === 'Pending' ? (
                <button
                  onClick={() => { setSelectedReview(p); setRecommendation('confirm'); setJustification(''); }}
                  className="px-4 py-2 rounded-xl bg-saath-600 hover:bg-saath-700 text-white font-bold text-xs shadow-md shadow-saath-600/30"
                >
                  Submit Recommendation
                </button>
              ) : (
                <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  {p.recommendation === 'confirm' ? 'Confirmed' : p.recommendation}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900">Probation Recommendation for {selectedReview.employeeName}</h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Recommendation *</label>
                <select
                  value={recommendation}
                  onChange={e => setRecommendation(e.target.value)}
                  className="w-full rounded-xl border p-2.5 font-medium"
                >
                  <option value="confirm">Confirm Employment</option>
                  <option value="extend">Extend Probation</option>
                  <option value="needs_improvement">Needs Improvement</option>
                  <option value="recommend_separation">Recommend Separation</option>
                </select>
              </div>

              {recommendation === 'extend' && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Extension Duration (Months)</label>
                  <input
                    type="number"
                    value={extensionMonths}
                    onChange={e => setExtensionMonths(parseInt(e.target.value) || 1)}
                    className="w-full rounded-xl border p-2.5 font-medium"
                  />
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">Manager Justification & Performance Notes *</label>
                <textarea
                  rows={3}
                  required
                  value={justification}
                  onChange={e => setJustification(e.target.value)}
                  placeholder="Explain your performance evaluation rationale..."
                  className="w-full rounded-xl border p-2.5 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedReview(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-saath-600 text-white font-bold"
                >
                  Send Recommendation to HR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
