"use client";
import { PortalService } from "@/services/portalService";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function ConcernsPage() {
  const [concerns, setConcerns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchConcerns() {
      try {
        const res = await PortalService.getConcerns();
        if (res) {
          setConcerns(res);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchConcerns();
  }, []);

  const getStatusColor = (status: string) => {
    if (status === "Resolved") return "text-green-600 bg-green-50 border-green-100";
    if (status === "In Progress") return "text-orange-600 bg-orange-50 border-orange-100";
    return "text-blue-600 bg-blue-50 border-blue-100";
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">HR Concerns</h1>
          <p className="text-slate-500 text-sm mt-1">Raise confidental concerns directly with Human Resources.</p>
        </div>
         
          <Link href="/concerns/raise" className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-6 text-base font-semibold text-white hover:bg-blue-700 shadow-sm">Raise a Concern</Link>
         
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border-slate-100 bg-blue-50/50">
          <CardContent className="p-6 flex gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Confidentiality Assured</h3>
              <p className="text-sm text-slate-600 mt-1">All concerns raised here are strictly confidential and visible only to the Core HR team.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-100 bg-orange-50/50">
          <CardContent className="p-6 flex gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Whistleblower Policy</h3>
              <p className="text-sm text-slate-600 mt-1">You are protected under the company whistleblower policy against any retaliation.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-slate-100">
        <CardHeader className="border-b border-slate-50 pb-4">
          <CardTitle className="text-lg text-slate-800">My Concerns History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-medium">Ticket ID</th>
                  <th className="px-6 py-4 font-medium">Subject</th>
                  <th className="px-6 py-4 font-medium">Date Raised</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Visibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Loading concerns...</td>
                  </tr>
                ) : concerns.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No concerns raised.</td>
                  </tr>
                ) : concerns.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                    <td className="px-6 py-4 font-medium text-blue-600">{record.ticketId}</td>
                    <td className="px-6 py-4 text-slate-800 font-medium">{record.subject}</td>
                    <td className="px-6 py-4 text-slate-600">{format(new Date(record.createdAt), "d MMM yyyy")}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-xs">
                      {record.isAnonymous ? "Anonymous" : "Public"}
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
