"use client";
import { profileService } from "@/services/employee/profile.service";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function CompleteProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const [fatalError, setFatalError] = useState("");
  
  const [formData, setFormData] = useState({
    mobileNumber: "",
    dateOfBirth: "",
    address: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactPhone: ""
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await profileService.getEmployeeProfile();
        setFormData({
          mobileNumber: profile.mobile || "",
          dateOfBirth: profile.date_of_birth || "",
          address: profile.residential_address || profile.address || "",
          emergencyContactName: profile.emergency_contact_name || "",
          emergencyContactRelation: profile.emergency_contact_relationship || "",
          emergencyContactPhone: profile.emergency_contact_phone || ""
        });
      } catch (err: any) {
         
        const e = err as {message?: string};
        console.error("Profile load error:", err);
        const technicalError = e.message || "An unexpected error occurred.";
        setFatalError(
          process.env.NODE_ENV === 'development' 
            ? `Unable to load your employee profile. Please try again or contact HR if the problem continues. [Dev Error: ${technicalError}]`
            : "Unable to load your employee profile. Please try again or contact HR if the problem continues."
        );
      } finally {
        setIsFetching(false);
      }
    }
    loadProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await profileService.completeProfile({
        mobile: formData.mobileNumber,
        date_of_birth: formData.dateOfBirth,
        address: formData.address,
        emergency_contact_name: formData.emergencyContactName,
        emergency_contact_relationship: formData.emergencyContactRelation,
        emergency_contact_phone: formData.emergencyContactPhone
      });

      // Force refresh to update layout state and redirect
      router.push("/dashboard");
    } catch (err: any) {
       
      const e = err as {message?: string};
      console.error("Profile submit error:", err);
      const technicalError = e.message || "An unexpected error occurred.";
      setError(
        process.env.NODE_ENV === 'development' 
          ? `Submission failed. [Dev Error: ${technicalError}]`
          : "Submission failed. Please try again or contact HR."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="max-w-2xl mx-auto py-8 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (fatalError) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-800">Complete Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-start gap-3">
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold">Account Error</h3>
                <p className="text-sm mt-1">{fatalError}</p>
                <p className="text-sm mt-2">Please contact HR to resolve this issue.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                  <Input id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} required onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth} required onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Residential Address *</Label>
                <Input id="address" name="address" value={formData.address} required onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-700 border-b pb-2">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactName">Contact Name *</Label>
                  <Input id="emergencyContactName" name="emergencyContactName" value={formData.emergencyContactName} required onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactRelation">Relationship *</Label>
                  <Input id="emergencyContactRelation" name="emergencyContactRelation" value={formData.emergencyContactRelation} required onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">Contact Phone Number *</Label>
                <Input id="emergencyContactPhone" name="emergencyContactPhone" value={formData.emergencyContactPhone} required onChange={handleChange} />
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
