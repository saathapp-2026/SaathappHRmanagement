"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, Briefcase, Calendar, ShieldCheck, Clock } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your personal and employment information.</p>
        </div>
        <Button variant="outline" className="gap-2">Request Change</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-sm border-slate-100">
            <CardContent className="p-6 text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-blue-600 text-white text-3xl font-bold rounded-full flex items-center justify-center mb-4">
                A
              </div>
              <h2 className="text-xl font-bold text-slate-800">Anjali</h2>
              <p className="text-sm text-blue-600 font-medium mt-1">Software Engineer</p>
              <div className="flex items-center gap-1.5 mt-3 text-xs font-medium px-3 py-1 bg-green-50 text-green-600 rounded-full border border-green-100">
                <ShieldCheck className="w-3.5 h-3.5" /> Active Employee
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm border-slate-100">
            <CardHeader className="border-b border-slate-50 pb-4">
              <CardTitle className="text-lg text-slate-800">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium"><User className="w-3.5 h-3.5" /> Full Name</div>
                <p className="text-sm font-semibold text-slate-800">Anjali</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium"><Mail className="w-3.5 h-3.5" /> Email Address</div>
                <p className="text-sm font-semibold text-slate-800">anjali@saath.hr</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium"><Phone className="w-3.5 h-3.5" /> Mobile Number</div>
                <p className="text-sm font-semibold text-slate-800">06363154526</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium"><Calendar className="w-3.5 h-3.5" /> Date of Birth</div>
                <p className="text-sm font-semibold text-slate-800">30 Dec 2003</p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium"><MapPin className="w-3.5 h-3.5" /> Residential Address</div>
                <p className="text-sm font-semibold text-slate-800">Shri Lakshmi Venkateshwara Reddy ladies PG, AECS Layout, Kundalahalli</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-100">
            <CardHeader className="border-b border-slate-50 pb-4">
              <CardTitle className="text-lg text-slate-800">Employment Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium"><Briefcase className="w-3.5 h-3.5" /> Employee ID</div>
                <p className="text-sm font-semibold text-slate-800">EMP-001</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium"><User className="w-3.5 h-3.5" /> Department</div>
                <p className="text-sm font-semibold text-slate-800">Engineering</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium"><Calendar className="w-3.5 h-3.5" /> Date of Joining</div>
                <p className="text-sm font-semibold text-slate-800">15 Aug 2026</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium"><Clock className="w-3.5 h-3.5" /> Employment Type</div>
                <p className="text-sm font-semibold text-slate-800">Full-Time</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
