"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AttendanceCorrectionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ date: "", reason: "" });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.reason) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      
      // const supabase = createClientComponentClient();
      const res = await supabase.from('attendance_corrections').insert(formData);

      if (res.success) {
        setSuccess(true);
        setTimeout(() => router.push("/attendance"), 1500);
      } else {
        setError("Failed to submit request.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="shadow-md border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-800">Request Attendance Correction</CardTitle>
          <CardDescription>
            If you forgot to check in or out, or faced technical issues, submit a correction request to HR.
          </CardDescription>
        </CardHeader>
        
        {success ? (
          <CardContent className="pt-6 pb-12 flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Request Submitted Successfully</h3>
            <p className="text-slate-500 text-center max-w-sm">Your attendance correction request has been sent to HR for approval.</p>
          </CardContent>
        ) : (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="date">Date of Correction</Label>
                <Input id="date" type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Correction</Label>
                <Input id="reason" placeholder="e.g. Forgot to check out" value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Request"}
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}
