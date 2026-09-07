"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { authService } from "@/services/employee/auth.service";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: resetError } = await authService.resetPassword(email);

      if (resetError) {
        setError(resetError.message || "Failed to send reset email");
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <Card className="w-full max-w-md shadow-xl border-slate-100 rounded-2xl">
        <CardHeader className="space-y-2 text-center pt-8 pb-4">
          <div className="flex justify-center mb-2">
            <div className="w-14 h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-md">
              S
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
            Reset Password
          </CardTitle>
          <CardDescription className="text-slate-500">
            Enter your email to receive a password reset link.
          </CardDescription>
        </CardHeader>
        
        {success ? (
          <CardContent className="px-8 pb-8 pt-4 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <p className="text-slate-700">
              We&apos;ve sent a password reset link to <br/>
              <span className="font-semibold">{email}</span>
            </p>
            <Link href="/login" className="inline-flex shrink-0 items-center justify-center border-slate-200 bg-white hover:bg-slate-50 text-slate-700 border transition-all outline-none mt-4 w-full h-12 rounded-xl text-base font-semibold">
              Return to Login
            </Link>
          </CardContent>
        ) : (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5 px-8">
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg flex items-start gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              
              <div className="space-y-2.5">
                <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@company.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4 px-8 pb-8 pt-4">
              <Button type="submit" className="w-full h-12 rounded-xl text-base bg-blue-600 hover:bg-blue-700 font-semibold" disabled={loading || !email}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
              <Link href="/login" className="flex items-center justify-center text-sm text-slate-500 hover:text-blue-600 font-medium transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}
