"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { profileService } from "@/services/employee/profile.service";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: any;
  onSuccess: () => void;
}

export function EditProfileModal({ isOpen, onClose, profile, onSuccess }: EditProfileModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    mobile: profile?.mobile || "",
    personal_email: profile?.personal_email || "",
    address: profile?.address || "",
    emergency_contact_name: profile?.emergency_contact_name || "",
    emergency_contact_relationship: profile?.emergency_contact_relationship || "",
    emergency_contact_phone: profile?.emergency_contact_phone || "",
    date_of_birth: profile?.date_of_birth ? new Date(profile.date_of_birth).toISOString().split('T')[0] : "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // First update permitted fields
      await profileService.updatePermittedFields({
        mobile: formData.mobile,
        personal_email: formData.personal_email,
        address: formData.address,
        emergency_contact_name: formData.emergency_contact_name,
        emergency_contact_relationship: formData.emergency_contact_relationship,
        emergency_contact_phone: formData.emergency_contact_phone,
      });
      
      // Also complete profile to update DOB and set profile_completion_status to completed
      await profileService.completeProfile({
        mobile: formData.mobile,
        date_of_birth: formData.date_of_birth,
        address: formData.address,
        emergency_contact_name: formData.emergency_contact_name,
        emergency_contact_relationship: formData.emergency_contact_relationship,
        emergency_contact_phone: formData.emergency_contact_phone,
      });

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal and emergency contact information.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          
          <div className="space-y-2">
            <Label>Mobile Number</Label>
            <Input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" />
          </div>

          <div className="space-y-2">
            <Label>Personal Email</Label>
            <Input name="personal_email" type="email" value={formData.personal_email} onChange={handleChange} placeholder="Personal Email" />
          </div>

          <div className="space-y-2">
            <Label>Date of Birth</Label>
            <Input name="date_of_birth" type="date" value={formData.date_of_birth} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label>Address</Label>
            <Input name="address" value={formData.address as string} onChange={handleChange} placeholder="Address" />
          </div>

          <div className="space-y-2 mt-4 pt-4 border-t">
            <Label className="font-bold">Emergency Contact</Label>
          </div>

          <div className="space-y-2">
            <Label>Contact Name</Label>
            <Input name="emergency_contact_name" value={formData.emergency_contact_name} onChange={handleChange} placeholder="Contact Name" />
          </div>

          <div className="space-y-2">
            <Label>Relationship</Label>
            <Input name="emergency_contact_relationship" value={formData.emergency_contact_relationship} onChange={handleChange} placeholder="Relationship" />
          </div>

          <div className="space-y-2">
            <Label>Contact Phone</Label>
            <Input name="emergency_contact_phone" value={formData.emergency_contact_phone} onChange={handleChange} placeholder="Contact Phone" />
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
