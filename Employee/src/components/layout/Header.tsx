"use client";

import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/attendance": "Attendance",
  "/attendance/correction": "Attendance Correction",
  "/leave": "Leave",
  "/leave/apply": "Apply Leave",
  "/concerns": "Concerns",
  "/concerns/raise": "Raise a Concern",
  "/help": "Ask for Help",
  "/help/new": "New Help Request",
  "/calendar": "Calendar",
  "/announcements": "Announcements",
  "/documents": "Documents",
  "/profile": "My Profile",
  "/complete-profile": "Complete Profile",
  "/notifications": "Notifications",
  "/settings": "Settings",
};

export default function Header() {
  const pathname = usePathname();
  
  // Default to Employee Portal if exact match not found, or try to get prefix
  const pageTitle = pathname === "/dashboard" ? "Welcome, Anjali!" : (routeTitles[pathname] || "Employee Portal");

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 z-10 sticky top-0">
      <div className="flex items-center text-xl font-bold text-slate-800">
        {pageTitle}
      </div>
      
      <div className="flex items-center gap-5">
        <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors bg-slate-50 hover:bg-slate-100 rounded-full">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="text-sm text-right hidden sm:block">
            <p className="font-semibold text-slate-800 leading-none">Anjali</p>
            <p className="text-xs text-green-500 mt-1 font-medium">Active</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white shadow-sm overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-blue-600 bg-blue-50 font-bold text-lg">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
