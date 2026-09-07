"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { authService } from "@/services/employee/auth.service";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      const isAuthPage = pathname.startsWith('/login') || 
                         pathname.startsWith('/forgot-password') || 
                         pathname.startsWith('/reset-password') ||
                         pathname.startsWith('/invite') ||
                         pathname.startsWith('/signup'); // allow signup just in case

      const { user, profile } = await authService.getCurrentEmployee();

      if (!mounted) return;

      if (!user) {
        if (!isAuthPage) {
          router.replace('/login');
        } else {
          setIsChecking(false);
        }
        return;
      }

      // If user is authenticated, handle routing based on profile status
      if (profile) {
        const status = profile.account_status || 'profile_pending'; // Fallback

        if (status === 'invited') {
          if (!pathname.startsWith('/invite')) router.replace('/invite');
          else setIsChecking(false);
          return;
        }

        if (['suspended', 'deactivated', 'terminated'].includes(status)) {
          if (!pathname.startsWith('/account-status')) router.replace('/account-status');
          else setIsChecking(false);
          return;
        }

        // For active, profile_pending, under_verification, etc., allow portal access
        // Prevent users from going back to auth pages
        if (isAuthPage || pathname.startsWith('/account-status')) {
          router.replace('/dashboard');
        } else {
          setIsChecking(false);
          setIsAuthenticated(true);
        }
        return;
      } else {
        // Assume portal access is allowed even if profile doesn't exist yet but user is logged in
        if (isAuthPage || pathname.startsWith('/account-status')) {
          router.replace('/dashboard');
        } else {
          setIsChecking(false);
          setIsAuthenticated(true);
        }
      }
    };

    checkAuth();

    const { data: authListener } = authService.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.replace('/login');
      } else if (event === 'SIGNED_IN') {
        checkAuth();
      }
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
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
