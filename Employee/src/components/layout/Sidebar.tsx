"use client";
import { MockPortalService } from "@/services/mockPortalService";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  CalendarCheck,
  Briefcase,
  MessageSquare,
  HelpCircle, 
  CalendarDays, 
  Megaphone, 
  FolderOpen, 
  User, 
  Bell,
  Settings, 
  LogOut 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Attendance", href: "/attendance", icon: CalendarCheck },
  { name: "Leave", href: "/leave", icon: Briefcase },
  { name: "Concerns", href: "/concerns", icon: MessageSquare },
  { name: "Ask for Help", href: "/help", icon: HelpCircle },
  { name: "Calendar", href: "/calendar", icon: CalendarDays },
  { name: "Announcements", href: "/announcements", icon: Megaphone },
  { name: "Documents", href: "/documents", icon: FolderOpen },
  { name: "My Profile", href: "/profile", icon: User },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await MockPortalService.logout();
    router.push("/login");
  };

  return (
    <div className="flex flex-col w-64 h-full bg-[#0b132c] text-white shadow-xl transition-all duration-300">
      <div className="flex items-center h-16 px-6 bg-[#080e22] font-bold text-xl tracking-tight">
        <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-3 text-white">
          S
        </div>
        Saath HR
      </div>
      
      <div className="flex-1 py-6 overflow-y-auto overflow-x-hidden space-y-1 px-3 custom-scrollbar">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                isActive 
                  ? "bg-blue-600 text-white shadow-sm" 
                  : "text-slate-300 hover:bg-[#131d3e] hover:text-white"
              )}
            >
              <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-white" : "text-slate-400")} />
              {item.name}
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 bg-[#080e22]">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-[#131d3e] hover:text-red-400 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 text-slate-400" />
          Logout
        </button>
      </div>
    </div>
  );
}
