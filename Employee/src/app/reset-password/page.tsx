"use client";
import { MockPortalService } from "@/services/mockPortalService";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <Card className="w-full max-w-md shadow-xl border-slate-100 rounded-2xl">
        <CardContent className="pt-8 pb-8 px-8 flex flex-col items-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Invalid Link</h2>
          <p className="text-slate-500 text-center mb-6">This password reset link is missing or invalid.</p>
          <Button onClick={() => router.push("/forgot-password")} variant="outline" className="w-full h-12 rounded-xl font-semibold">
            Request New Link
          </Button>
        </CardContent>
      </Card>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await MockPortalService.resetPassword({ token, password });

      if (!res.success) {
        setError("Failed to reset password");
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-md shadow-xl border-slate-100 rounded-2xl">
        <CardContent className="pt-8 pb-8 px-8 flex flex-col items-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Password Reset</h2>
          <p className="text-slate-500 text-center mb-6">
            Your password has been securely updated. You can now log in.
          </p>
          <Button onClick={() => router.push("/login")} className="w-full h-12 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700">
            Go to Login
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-xl border-slate-100 rounded-2xl">
      <CardHeader className="space-y-2 text-center pt-8 pb-4">
        <div className="flex justify-center mb-2">
          <div className="w-14 h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-md">
            S
          </div>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
          Create New Password
        </CardTitle>
        <CardDescription className="text-slate-500">
          Please enter your new password below.
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-5 px-8">
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg flex items-start gap-2 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <div className="space-y-2.5">
            <Label htmlFor="password" className="text-slate-700 font-medium">New Password</Label>
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
            <Label htmlFor="confirmPassword" className="text-slate-700 font-medium">Confirm New Password</Label>
            <Input 
              id="confirmPassword" 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </CardContent>
        <CardFooter className="px-8 pb-8 pt-4">
          <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold bg-blue-600 hover:bg-blue-700" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <Suspense fallback={<div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
