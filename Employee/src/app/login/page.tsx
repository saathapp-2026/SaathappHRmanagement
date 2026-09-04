"use client";
import { MockPortalService } from "@/services/mockPortalService";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || password.length < 6) {
      setError("Please enter a valid email and a password of at least 6 characters.");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      const res = await MockPortalService.login({ email, password });
      if (!res.success) {
        setError("Failed to log in");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <Card className="w-full max-w-md shadow-xl border-slate-100 rounded-2xl">
        <CardHeader className="space-y-2 text-center pt-8 pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-md">
              S
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
            Saath HR
          </CardTitle>
          <CardDescription className="text-slate-500">
            Welcome back! Please sign in to your account
          </CardDescription>
          <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded mt-2">Note: Uses localStorage for mock session behaviour (not secure authentication).</div>
        </CardHeader>
        
        <form onSubmit={handleLogin}>
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
                disabled={isLoading}
                className="h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
                <Link href="/forgot-password" className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col px-8 pb-8 pt-4">
            <Button type="submit" className="w-full h-12 rounded-xl text-base bg-blue-600 hover:bg-blue-700 font-semibold" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
