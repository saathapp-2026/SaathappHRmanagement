'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MonitorPlay } from 'lucide-react';
import { mockAssets, getStatusColor, getConditionColor } from '@/data/hr/assets';
import { mockEmployee } from '@/data/hr/employees';

export default function EmployeeAssetsPage() {
  const params = useParams();
  const employeeId = params?.employeeId as string;
  
  const assignedAssets = mockAssets.filter(a => a.assignedEmployeeId === employeeId && a.status !== 'Returned');
  const historyAssets = mockAssets.filter(a => 
    a.assignmentHistory.some(h => h.employeeId === employeeId && h.returnedDate)
  );

  return (
    <div className="pb-12 bg-slate-50/30 min-h-screen -mx-6 -my-6">
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-20 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link href="/hr/assets" className="p-2 -ml-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-gray-900 leading-tight">Employee Assets</h1>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="font-semibold text-gray-700">{mockEmployee.name}</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500">{employeeId}</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500">{mockEmployee.department}</span>
            </div>
          </div>
        </div>
        
        <Link href={`/hr/employees/${employeeId}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors shadow-sm">
          View Profile
        </Link>
      </div>

      <div className="p-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
            <p className="text-sm font-bold text-gray-500 mb-1">Assigned Assets</p>
            <p className="text-3xl font-black text-indigo-600">{assignedAssets.length}</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
            <p className="text-sm font-bold text-gray-500 mb-1">Return Pending</p>
            <p className="text-3xl font-black text-amber-600">{assignedAssets.filter(a => a.status === 'Return Pending').length}</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
            <p className="text-sm font-bold text-gray-500 mb-1">Returned History</p>
            <p className="text-3xl font-black text-gray-900">{historyAssets.length}</p>
          </div>
        </div>

        <h2 className="text-lg font-bold text-gray-900 mb-4">Currently Assigned</h2>
        {assignedAssets.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center mb-8 shadow-sm">
            <MonitorPlay size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">This employee currently has no assigned assets.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {assignedAssets.map(asset => (
              <Link key={asset.id} href={`/hr/assets/${asset.assetId}`} className="block bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <MonitorPlay size={20} />
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(asset.status)}`}>{asset.status}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors truncate">{asset.name}</h3>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">{asset.assetId}</p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
                  <span className="font-medium text-gray-600">{asset.type}</span>
                  <span className={`px-1.5 py-0.5 rounded border font-semibold ${getConditionColor(asset.condition)}`}>{asset.condition}</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <h2 className="text-lg font-bold text-gray-900 mb-4">Returned / Historical</h2>
        {historyAssets.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center text-sm text-gray-500">
            No previous assignment history found.
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-3">Asset</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Assigned</th>
                  <th className="px-4 py-3">Returned</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {historyAssets.map(asset => {
                  const assignment = asset.assignmentHistory.find(h => h.employeeId === employeeId && h.returnedDate);
                  return (
                    <tr key={asset.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3">
                        <Link href={`/hr/assets/${asset.assetId}`} className="font-bold text-indigo-600 hover:underline">{asset.name}</Link>
                        <p className="text-xs text-gray-500">{asset.assetId}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{asset.type}</td>
                      <td className="px-4 py-3 text-gray-600">{assignment?.assignedDate}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{assignment?.returnedDate}</td>
                      <td className="px-4 py-3">
                        <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded uppercase tracking-wider border border-gray-200">Returned</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
