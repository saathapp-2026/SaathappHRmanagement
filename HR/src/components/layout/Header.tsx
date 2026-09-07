 
"use client";

import { Bell } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { notificationsService } from "@/services/employee/notifications.service";
import { profileService } from "@/services/employee/profile.service";

const routeTitles: Record<string, string> = {
  "/hr/dashboard": "Dashboard",
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
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);
   
  interface EmployeeProfile {
    full_name?: string;
    account_status?: string;
    profile_photo_url?: string;
    [key: string]: any;
  }
  const [profile, setProfile] = useState<EmployeeProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getEmployeeProfile();
        setProfile(data);
      } catch (err) {
        // Ignore or handle
      } finally {
        setIsLoading(false);
      }
    };
     
    fetchProfile();
  }, []);

  const employeeName = profile?.full_name || "Employee";
  const firstName = employeeName.split(" ")[0];
  const initial = employeeName.charAt(0).toUpperCase();
  const accountStatus = profile?.account_status ? profile.account_status.replace('_', ' ') : "Loading...";

  let pageTitle = "HR Portal";
  if (pathname === "/hr/dashboard") {
    pageTitle = isLoading ? "Welcome!" : `Welcome, ${firstName}!`;
  } else if (routeTitles[pathname]) {
    pageTitle = routeTitles[pathname];
  } else {
    // try prefix
    if (pathname.startsWith('/help/')) pageTitle = "Help Request Details";
    else if (pathname.startsWith('/concerns/')) pageTitle = "Concern Details";
  }


  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationsService.getNotifications();
        setUnreadCount(data.filter((n: any) => !(n as {is_read: boolean}).is_read).length);
      } catch (e) {
        // Ignore auth errors here
      }
    };

    fetchNotifications();

    const unsubscribe = notificationsService.subscribeToNotifications(() => {
      fetchNotifications();
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 z-10 sticky top-0">
      <div className="flex items-center text-xl font-bold text-slate-800">
        {pageTitle}
      </div>
      
      <div className="flex items-center gap-5">
        <button 
          onClick={() => router.push('/notifications')}
          className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors bg-slate-50 hover:bg-slate-100 rounded-full"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border border-white text-[10px] text-white flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
        
        <div className="flex items-center gap-3">
          <div className="text-sm text-right hidden sm:block">
            {isLoading ? (
               <div className="h-8 w-20 bg-slate-200 animate-pulse rounded"></div>
            ) : (
               <>
                 <p className="font-semibold text-slate-800 leading-none">{firstName}</p>
                 <p className="text-xs text-green-500 mt-1 font-medium capitalize">{accountStatus}</p>
               </>
            )}
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white shadow-sm overflow-hidden">
            {profile?.profile_photo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.profile_photo_url} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-blue-600 bg-blue-50 font-bold text-lg">
                {isLoading ? "" : initial}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
