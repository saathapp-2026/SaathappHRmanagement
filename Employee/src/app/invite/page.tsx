"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { authService } from "@/services/employee/auth.service";

function InviteForm() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [inviteData, setInviteData] = useState<{ email: string; name: string } | null>(null);
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function checkToken() {
      // Check hash for error
      if (window.location.hash.includes('error=')) {
        setError("Invalid or expired invitation link.");
        setLoading(false);
        return;
      }

      try {
        const { user, profile } = await authService.getCurrentEmployee();
        if (!user) {
          setError("Invalid or expired invitation link.");
        } else {
          setInviteData({ email: user.email || '', name: profile?.name || 'Employee' });
        }
      } catch (err) {
        setError("Failed to verify invitation. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    
    // Give Supabase client a moment to process the hash
    setTimeout(checkToken, 1000);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const { error: updateError } = await authService.updatePassword(password);
      
      if (updateError) {
        setError(updateError.message || "Failed to set password.");
        return;
      }
      
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-slate-100 rounded-2xl">
        {error && !inviteData ? (
          <CardContent className="pt-8 pb-8 px-8 flex flex-col items-center">
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Invalid Invitation</h2>
            <p className="text-slate-500 text-center mb-6">{error}</p>
            <Button onClick={() => router.push("/login")} variant="outline" className="w-full h-12 rounded-xl font-semibold">
              Go to Login
            </Button>
          </CardContent>
        ) : success ? (
          <CardContent className="pt-8 pb-8 px-8 flex flex-col items-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Account Activated!</h2>
            <p className="text-slate-500 text-center mb-6">
              Your password has been set and your account is active. Logging you in...
            </p>
          </CardContent>
        ) : (
          <>
            <CardHeader className="space-y-2 text-center pt-8 pb-4 px-8">
              <div className="flex justify-center mb-2">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-md">
                  S
                </div>
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                Welcome, {inviteData?.name}!
              </CardTitle>
              <CardDescription className="text-slate-500 text-center mt-2">
                Accept your invitation to Saath HR by creating a secure password for <b>{inviteData?.email}</b>.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg flex items-start gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                <div className="space-y-2.5">
                  <Label htmlFor="password" className="text-slate-700 font-medium">Create Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2.5">
                  <Label htmlFor="confirmPassword" className="text-slate-700 font-medium">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold bg-blue-600 hover:bg-blue-700 mt-2" disabled={submitting}>
                  {submitting ? "Setting Password..." : "Set Password & Login"}
                </Button>
              </form>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}

export default function InvitePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>}>
      <InviteForm />
    </Suspense>
  );
}
