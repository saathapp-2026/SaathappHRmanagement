"use client";
import { MockPortalService } from "@/services/mockPortalService";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function CompleteProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    mobileNumber: "",
    dateOfBirth: "",
    address: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactPhone: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await MockPortalService.completeProfile(formData);

      if (!res.success) {
        setError("Failed to complete profile");
      } else {
        // Force refresh to update layout state and redirect
        window.location.href = "/dashboard";
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
          <CardTitle className="text-2xl font-bold text-slate-800">Complete Your Profile</CardTitle>
          <CardDescription>
            Please provide your personal information to activate your account. This information will be reviewed by HR.
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-start gap-2 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-700 border-b pb-2">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">Mobile Number *</Label>
                  <Input id="mobileNumber" name="mobileNumber" required onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input id="dateOfBirth" name="dateOfBirth" type="date" required onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Residential Address *</Label>
                <Input id="address" name="address" required onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-700 border-b pb-2">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactName">Contact Name *</Label>
                  <Input id="emergencyContactName" name="emergencyContactName" required onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactRelation">Relationship *</Label>
                  <Input id="emergencyContactRelation" name="emergencyContactRelation" required onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">Contact Phone Number *</Label>
                <Input id="emergencyContactPhone" name="emergencyContactPhone" required onChange={handleChange} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-slate-50 border-t p-6 rounded-b-lg">
            <Button type="submit" className="w-full sm:w-auto ml-auto" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Profile for Verification"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
