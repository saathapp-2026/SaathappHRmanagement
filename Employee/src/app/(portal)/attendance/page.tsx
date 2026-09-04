"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function AttendanceHistoryPage() {
  // Static mock data for attendance history.

  const mockHistory = [
    { date: "3 September 2026", in: "09:05 AM", out: "06:10 PM", status: "Present", color: "text-green-600 bg-green-50 border-green-100" },
    { date: "2 September 2026", in: "09:15 AM", out: "06:05 PM", status: "Late", color: "text-orange-600 bg-orange-50 border-orange-100" },
    { date: "1 September 2026", in: "-", out: "-", status: "On Leave", color: "text-purple-600 bg-purple-50 border-purple-100" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Attendance History</h1>
        <p className="text-slate-500 text-sm mt-1">Review your past attendance records and request corrections if needed.</p>
      </div>

      <Card className="shadow-sm border-slate-100">
        <CardHeader className="border-b border-slate-50 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg text-slate-800">September 2026</CardTitle>
              <CardDescription>22 Working Days</CardDescription>
            </div>
            <div className="flex gap-2">
              <select className="text-sm border rounded-md px-3 py-1.5 text-slate-600 bg-white shadow-sm outline-none">
                <option>September 2026</option>
                <option>August 2026</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Check In</th>
                  <th className="px-6 py-4 font-medium">Check Out</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockHistory.map((record, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{record.date}</td>
                    <td className="px-6 py-4 text-slate-600">{record.in}</td>
                    <td className="px-6 py-4 text-slate-600">{record.out}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${record.color}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm" className="text-xs h-8">Request Correction</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
