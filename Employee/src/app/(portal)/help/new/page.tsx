"use client";
import { helpService } from "@/services/employee/help.service";

import { useState, useEffect, Suspense } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Laptop } from "lucide-react";

function AskForHelpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ category: searchParams.get("category") || "", subject: "", description: "", priority: "medium" });

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.category || !formData.description) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setIsLoading(true);
    
    try {
      await helpService.submitHelpRequest(formData);
      setSuccess(true);
      setTimeout(() => {
        router.push("/help");
      }, 2000);
    } catch (err: any) {
       
      const e = err as unknown;
      setError((e as Error).message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-md border-0">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-slate-800">Ask for Help</CardTitle>
      </CardHeader>
      
      {!success ? (
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-md flex gap-3 text-sm text-slate-700">
              <Laptop className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              <p>Use this form for general IT, admin, or HR support. For serious issues, please use the <a href="/concerns" className="text-blue-600 font-medium hover:underline">Raise a Concern</a> feature instead.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Help Category</Label>
              <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" required>
                <option value="">Select a category...</option>
                <option value="HR Help">HR Help</option>
                <option value="IT Help">IT Help</option>
                <option value="Office Help">Office Help</option>
                <option value="Manager Assistance">Manager Assistance</option>
                <option value="Payroll Help">Payroll Help</option>
                <option value="General Help">General Help</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <select id="priority" name="priority" value={formData.priority} onChange={handleChange} className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" required>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" value={formData.subject} required onChange={handleChange} placeholder="Brief summary of what you need help with" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Message</Label>
              <textarea 
                id="description" 
                name="description"
                value={formData.description}
                required 
                onChange={handleChange}
                rows={5}
                className="w-full flex min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Please describe your issue or request in detail..."
              ></textarea>
            </div>
          </CardContent>
          
          <CardFooter className="bg-slate-50 border-t p-6 rounded-b-lg flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Request"}
            </Button>
          </CardFooter>
        </form>
      ) : (
        <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
          <h2 className="text-xl font-bold text-slate-800">Request Submitted</h2>
          <p className="text-slate-500 text-center max-w-sm">
            Your help request has been assigned to the support team. Redirecting...
          </p>
        </CardContent>
      )}
    </Card>
  );
}

export default function AskForHelpPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <Suspense fallback={<div>Loading form...</div>}>
        <AskForHelpForm />
      </Suspense>
    </div>
  );
}
