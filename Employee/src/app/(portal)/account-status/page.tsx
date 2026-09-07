"use client";
import { useEffect, useState } from "react";
import { authService } from "@/services/employee/auth.service";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle, Clock, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AccountStatusPage() {
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    authService.getCurrentEmployee().then(({ profile }) => {
      setProfile(profile);
    });
  }, []);

  if (!profile) return null;

  const handleLogout = async () => {
    await authService.signOut();
    router.replace('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <Card className="w-full max-w-md shadow-xl border-slate-100 rounded-2xl">
        <CardHeader className="text-center">
          {profile.account_status === 'under_verification' && (
            <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          )}
          {['suspended', 'deactivated', 'terminated'].includes(profile.account_status) && (
            <Ban className="w-16 h-16 text-red-500 mx-auto mb-4" />
          )}
          <CardTitle className="text-2xl font-bold">
            {profile.account_status === 'under_verification' ? 'Account Under Verification' : 'Account Restricted'}
          </CardTitle>
          <CardDescription>
            {profile.account_status === 'under_verification' 
              ? 'Your profile is currently being verified by the admin. You will be notified once it is approved.'
              : 'Your account has been restricted. Please contact HR or admin for further assistance.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={handleLogout} variant="outline" className="w-full">
            Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
