"use client";
import { MockPortalService } from "@/services/mockPortalService";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Laptop, Monitor, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function HelpPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const res = await MockPortalService.getHelpTickets();
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
  }, []);

  const getStatusColor = (status: string) => {
    if (status === "Resolved" || status === "Closed") return "text-green-600 bg-green-50 border-green-100";
    if (status === "In Progress" || status === "Assigned") return "text-orange-600 bg-orange-50 border-orange-100";
    return "text-blue-600 bg-blue-50 border-blue-100";
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">IT & Admin Support</h1>
          <p className="text-slate-500 text-sm mt-1">Get help with your devices, software access, and facility management.</p>
        </div>
        <Link href="/help/new" className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-6 text-base font-semibold text-white hover:bg-blue-700 shadow-sm">
          Create Ticket
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "IT Hardware", icon: Laptop, desc: "Laptops, monitors, accessories" },
          { title: "Software & Access", icon: Monitor, desc: "App access, VPN, software installs" },
          { title: "Email & Accounts", icon: Mail, desc: "Password resets, email issues" },
          { title: "Admin & Facilities", icon: Phone, desc: "Desk repair, ID cards, cafeteria" },
        ].map((cat, i) => (
          <Card key={i} className="shadow-sm border-slate-100 hover:border-blue-600/30 transition-colors cursor-pointer">
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
        ))}
      </div>

      <Card className="shadow-sm border-slate-100">
        <CardHeader className="border-b border-slate-50 pb-4">
          <CardTitle className="text-lg text-slate-800">Recent Support Tickets</CardTitle>
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
                ) : tickets.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No support tickets found.</td>
                  </tr>
                ) : tickets.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                    <td className="px-6 py-4 font-medium text-blue-600">{record.ticketId}</td>
                    <td className="px-6 py-4 text-slate-800 font-medium">{record.subject}</td>
                    <td className="px-6 py-4 text-slate-600">{record.category}</td>
                    <td className="px-6 py-4 text-slate-600">{format(new Date(record.createdAt), "d MMM yyyy")}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
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
