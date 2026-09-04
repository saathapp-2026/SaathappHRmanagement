"use client";
import { MockPortalService } from "@/services/mockPortalService";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CheckCircle2, Laptop } from "lucide-react";

export default function AskForHelpPage() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ category: "", subject: "", description: "" });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!formData.subject || !formData.category || !formData.description) {
      setError("Please fill in all required fields.");
      e.preventDefault();
      return;
    }
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const res = await MockPortalService.submitHelpTicket(formData);
      if (!res.success) {
        setError("Failed to submit request");
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        router.push("/help");
      }, 2000);
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
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
                <p>Use this form for general IT, admin, or software support. For sensitive HR issues, please use the <a href="/concerns" className="text-blue-600 font-medium hover:underline">Raise a Concern</a> feature instead.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Help Category</Label>
                <select id="category" name="category" onChange={handleChange} className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" required>
                  <option value="">Select a category...</option>
                  <option value="IT Hardware">IT Hardware</option>
                  <option value="Software & Access">Software & Access</option>
                  <option value="Email & Accounts">Email & Accounts</option>
                  <option value="Admin & Facilities">Admin & Facilities</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" required onChange={handleChange} placeholder="Brief summary of what you need help with" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Message</Label>
                <textarea 
                  id="description" 
                  name="description"
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
    </div>
  );
}
