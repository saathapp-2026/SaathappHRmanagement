"use client";
import { helpService, HelpRequest } from "@/services/employee/help.service";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Laptop, Monitor, Mail, Phone, Users, Wallet, Briefcase, HelpCircle, FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function HelpPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<HelpRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchTickets() {
      setIsLoading(true);
      try {
        const res = await helpService.getHelpRequests(statusFilter);
        if (res) {
          setTickets(res);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTickets();
  }, [statusFilter]);

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s === "resolved" || s === "closed") return "text-green-600 bg-green-50 border-green-100";
    if (s === "in_progress" || s === "assigned") return "text-orange-600 bg-orange-50 border-orange-100";
    return "text-blue-600 bg-blue-50 border-blue-100";
  };

  const paginatedTickets = tickets.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(tickets.length / itemsPerPage);

  const categories = [
    { title: "HR Help", icon: Users, desc: "Policies, onboarding, conflicts" },
    { title: "IT Help", icon: Laptop, desc: "Devices, access, software" },
    { title: "Office Help", icon: Briefcase, desc: "Facilities, desk, supplies" },
    { title: "Manager Assistance", icon: Monitor, desc: "Approvals, team issues" },
    { title: "Payroll Help", icon: Wallet, desc: "Salary, taxes, benefits" },
    { title: "General Help", icon: HelpCircle, desc: "Anything else" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Help & Support</h1>
          <p className="text-slate-500 text-sm mt-1">Get help with HR, IT, Payroll, and more.</p>
        </div>
        <Link href="/help/new" className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-6 text-base font-semibold text-white hover:bg-blue-700 shadow-sm">
          Create Ticket
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <Link key={i} href={`/help/new?category=${encodeURIComponent(cat.title)}`}>
            <Card className="shadow-sm border-slate-100 hover:border-blue-600/30 transition-colors cursor-pointer h-full">
              <CardContent className="p-6 text-center space-y-3 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
                  <cat.icon className="w-6 h-6 text-slate-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{cat.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{cat.desc}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="shadow-sm border-slate-100">
        <CardHeader className="border-b border-slate-50 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg text-slate-800">Support Tickets</CardTitle>
          <div className="flex space-x-2">
            {["all", "submitted", "open", "in_progress", "resolved", "closed"].map((status) => (
              <button
                key={status}
                onClick={() => { setStatusFilter(status); setPage(1); }}
                className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${statusFilter === status ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ")}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-medium">Ticket ID</th>
                  <th className="px-6 py-4 font-medium">Subject</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Loading tickets...</td>
                  </tr>
                ) : paginatedTickets.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No support tickets found.</td>
                  </tr>
                ) : paginatedTickets.map((record) => (
                  <tr 
                    key={record.id} 
                    className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                    onClick={() => router.push(`/help/${record.id}`)}
                  >
                    <td className="px-6 py-4 font-medium text-blue-600">{record.help_id}</td>
                    <td className="px-6 py-4 text-slate-800 font-medium">{record.subject}</td>
                    <td className="px-6 py-4 text-slate-600">{record.category}</td>
                    <td className="px-6 py-4 text-slate-600">{format(new Date(record.created_at), "d MMM yyyy")}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                        {record.status.replace("_", " ")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
              <span className="text-sm text-slate-500">
                Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, tickets.length)} of {tickets.length} tickets
              </span>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
