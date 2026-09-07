"use client";
import { PortalService } from "@/services/portalService";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CheckCircle2, ShieldAlert } from "lucide-react";

export default function RaiseConcernPage() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ subject: "", description: "", isAnonymous: false });

  const handleChange = (e: React.ChangeEvent<any>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!formData.subject || !formData.description) {
      setError("Please fill in all required fields.");
      e.preventDefault();
      return;
    }
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const res = await PortalService.submitConcern(formData);
      if (!res.success) {
        setError("Failed to raise concern");
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        router.push("/concerns");
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
          <CardTitle className="text-2xl font-bold text-slate-800">Raise a Concern</CardTitle>
        </CardHeader>
        
        {!success ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-md flex gap-3 text-sm text-slate-700">
                <ShieldAlert className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p>All concerns are treated with strict confidentiality. If you choose to submit anonymously, your name and employee ID will be hidden from the HR team.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" required onChange={handleChange} placeholder="Brief summary of the issue" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <textarea 
                  id="description" 
                  name="description"
                  required 
                  onChange={handleChange}
                  rows={5}
                  className="w-full flex min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Please provide as much detail as possible..."
                ></textarea>
              </div>
              
              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="isAnonymous" 
                  name="isAnonymous" 
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600"
                />
                <Label htmlFor="isAnonymous" className="text-sm font-medium text-slate-700 cursor-pointer">
                  Submit this concern anonymously
                </Label>
              </div>
            </CardContent>
            
            <CardFooter className="bg-slate-50 border-t p-6 rounded-b-lg flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit to HR"}
              </Button>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <h2 className="text-xl font-bold text-slate-800">Concern Submitted</h2>
            <p className="text-slate-500 text-center max-w-sm">
              Your concern has been securely transmitted to the HR department. Redirecting...
            </p>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
