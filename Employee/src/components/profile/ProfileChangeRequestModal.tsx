"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { profileService } from "@/services/employee/profile.service";

interface ProfileChangeRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: any;
  onSuccess: () => void;
}

export function ProfileChangeRequestModal({ isOpen, onClose, profile, onSuccess }: ProfileChangeRequestModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [field, setField] = useState("");
  const [requestedValue, setRequestedValue] = useState("");
  const [reason, setReason] = useState("");

  const restrictedFields = [
    { label: "Employee ID", value: "employee_code" },
    { label: "Department", value: "department_id" },
    { label: "Designation", value: "designation_id" },
    { label: "Reporting Manager", value: "reporting_manager_id" },
    { label: "Joining Date", value: "joining_date" },
    { label: "Employment Status", value: "employment_status" },
    { label: "Account Status", value: "account_status" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!field || !requestedValue || !reason) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const currentValue = profile[field];
      await profileService.requestChange({
        field_name: field,
        current_value: currentValue,
        requested_value: requestedValue,
        reason
      });
      onSuccess();
      onClose();
    } catch (err: any) {
       
      const e = err as unknown;
      setError((e as Error).message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Profile Change</DialogTitle>
          <DialogDescription>
            Submit a request to change restricted profile information. This requires admin approval.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="space-y-2">
            <Label>Field to Change</Label>
            <Select value={field} onValueChange={(val) => setField(val || "")}>
              <SelectTrigger>
                <SelectValue placeholder="Select a field" />
              </SelectTrigger>
              <SelectContent>
                {restrictedFields.map(f => (
                  <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Requested Value</Label>
            <Input value={requestedValue} onChange={(e) => setRequestedValue(e.target.value)} placeholder="Enter new value" />
          </div>

          <div className="space-y-2">
            <Label>Reason for Change</Label>
            <Textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Provide a reason for this change" />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Request"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
