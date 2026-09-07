"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarCheck, Briefcase, MessageSquare, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Attendance", href: "/attendance", icon: CalendarCheck },
    { name: "Leave", href: "/leave", icon: Briefcase },
    { name: "Concerns", href: "/concerns", icon: MessageSquare },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 z-50 px-2 py-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-colors ${
                isActive ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-full mb-0.5 ${isActive ? 'bg-blue-50' : ''}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? "text-blue-600" : "text-slate-500"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
