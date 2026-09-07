"use client";
import { PortalService } from "@/services/portalService";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function LeavePage() {
  const [balances, setBalances] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const balData = await PortalService.getLeaveBalances();
        const histData = await PortalService.getLeaveHistory();
        
        if (balData) {
          // Map balances to array format expected by component
          const arr: { leaveType: string; total: number; used: number; }[] = balData.map((b: any) => ({
            leaveType: b.leave_types?.name || 'Unknown',
            total: b.allocated,
            used: b.used + (b.pending || 0)
          }));
          setBalances(arr);
        }
        if (histData) setHistory(histData.map(h => ({ leaveType: h.type, startDate: h.startDate, endDate: h.endDate, status: h.status })));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const getIcon = (type: string) => {
    if (type.includes("Sick")) return Clock;
    if (type.includes("Earned")) return CheckCircle2;
    return Briefcase;
  };

  const getColor = (type: string) => {
    if (type.includes("Sick")) return { text: "text-orange-500", bg: "bg-orange-50" };
    if (type.includes("Earned")) return { text: "text-green-500", bg: "bg-green-50" };
    return { text: "text-purple-500", bg: "bg-purple-50" };
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leave Management</h1>
          <p className="text-slate-500 text-sm mt-1">View your balances, apply for leave, and track request status.</p>
        </div>
        <Link href="/leave/apply" className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-6 text-base font-semibold text-white hover:bg-blue-700 shadow-sm">
          Apply Leave
        </Link>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-slate-500">Loading your leave data...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {balances.map((b, i) => {
              const Icon = getIcon(b.leaveType);
              const color = getColor(b.leaveType);
              return (
                <Card key={i} className="shadow-sm border-slate-100">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color.bg}`}>
                          <Icon className={`w-5 h-5 ${color.text}`} />
                        </div>
                        <div>
                          <p className="text-slate-500 text-sm font-medium">{b.leaveType}</p>
                          <h3 className="text-3xl font-bold text-slate-800">{b.total - b.used} <span className="text-sm font-medium text-slate-500">Days Left</span></h3>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <p className="text-slate-500">Total: <span className="font-semibold text-slate-800">{b.total}</span></p>
                        <p className="text-slate-500 mt-1">Used: <span className="font-semibold text-slate-800">{b.used}</span></p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="shadow-sm border-slate-100">
            <CardHeader className="border-b border-slate-50 pb-4">
              <CardTitle className="text-lg text-slate-800">Leave History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4 font-medium">Leave Type</th>
                      <th className="px-6 py-4 font-medium">Duration</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {history.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-slate-500">No leave history found.</td>
                      </tr>
                    ) : history.map((record, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-800">{record.leaveType}</td>
                        <td className="px-6 py-4 text-slate-600">
                          {format(new Date(record.startDate), "d MMM yyyy")} - {format(new Date(record.endDate), "d MMM yyyy")}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${record.status === "Approved" ? "text-green-600 bg-green-50 border-green-100" : record.status === "Pending" ? "text-orange-600 bg-orange-50 border-orange-100" : "text-slate-600 bg-slate-50 border-slate-200"}`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {record.status === "Pending" ? (
                            <Button variant="outline" size="sm" className="text-xs h-8 text-red-600 hover:text-red-700 hover:bg-red-50">Cancel</Button>
                          ) : (
                            <span className="text-slate-400 text-xs">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
