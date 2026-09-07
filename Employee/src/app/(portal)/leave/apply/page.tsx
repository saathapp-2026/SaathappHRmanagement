"use client";
import { PortalService } from "@/services/portalService";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function ApplyLeavePage() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ leaveType: "", startDate: "", endDate: "", reason: "" });

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!formData.leaveType || !formData.startDate || !formData.endDate || !formData.reason) {
      alert("Please fill in all required fields.");
      e.preventDefault();
      return;
    }
    e.preventDefault();
    setError("");
    
    try {
      const res = await PortalService.applyLeave(formData);
      if (!res.success) {
        setError("Failed to apply for leave");
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        router.push("/leave");
      }, 2000);
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="shadow-md border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-800">Apply for Leave</CardTitle>
        </CardHeader>
        
        {!success ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="leaveType">Leave Type</Label>
                <select id="leaveType" name="leaveType" onChange={handleChange} className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" required>
                  <option value="">Select type...</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Earned Leave">Earned Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" name="startDate" type="date" required onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" name="endDate" type="date" required onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Leave</Label>
                <textarea 
                  id="reason" 
                  name="reason"
                  required 
                  onChange={handleChange}
                  rows={4}
                  className="w-full flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Please provide a brief reason..."
                ></textarea>
              </div>
            </CardContent>
            
            <CardFooter className="bg-slate-50 border-t p-6 rounded-b-lg flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit">Submit Application</Button>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <h2 className="text-xl font-bold text-slate-800">Application Submitted</h2>
            <p className="text-slate-500 text-center max-w-sm">
              Your leave request has been sent to your manager. Redirecting...
            </p>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
