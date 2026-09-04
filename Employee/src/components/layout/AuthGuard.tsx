"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('mock_token');
    
    // Ignore checking for auth pages
    const isAuthPage = pathname.startsWith('/login') || 
                       pathname.startsWith('/forgot-password') || 
                       pathname.startsWith('/reset-password') ||
                       pathname.startsWith('/invite');

    if (!token && !isAuthPage) {
      router.replace('/login');
    } else {
      setIsChecking(false);
    }
  }, [pathname, router]);

  if (isChecking) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#f4f8fc]">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
