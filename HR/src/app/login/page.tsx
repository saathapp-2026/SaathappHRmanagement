"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { authService } from "@/services/employee/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Check for expired session in hash or url
    if (window.location.hash.includes('error=unauthorized_client') || window.location.search.includes('error=')) {
      
      setTimeout(() => setError("Session expired or unauthorized. Please log in again."), 0);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || password.length < 6) {
      setError("Please enter a valid email and a password of at least 6 characters.");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      const { data, error: signInError } = await authService.signIn({ email, password });
      
      if (signInError) {
        setError(signInError.message || "Invalid credentials. Please try again.");
      } else if (data.session) {
        // Will be redirected by AuthGuard or can explicitly push
        router.push("/hr/dashboard");
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
          
          <CardFooter className="flex flex-col space-y-4 px-8 pb-8 pt-4">
            <Button type="submit" className="w-full h-12 rounded-xl text-base bg-blue-600 hover:bg-blue-700 font-semibold" disabled={isLoading || !email || !password}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            
            <div className="relative w-full py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <Button variant="outline" type="button" className="w-full rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50" onClick={() => {}}>
                <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                  <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
                Google
              </Button>
              <Button variant="outline" type="button" className="w-full rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50" onClick={() => {}}>
                <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                  <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                GitHub
              </Button>
            </div>
            
            <div className="mt-2 text-center text-sm text-slate-600 w-full">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
