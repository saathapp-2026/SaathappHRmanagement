 
"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, Briefcase, Calendar, ShieldCheck, Clock, Loader2, AlertTriangle } from "lucide-react";
import { profileService } from "@/services/employee/profile.service";
import { ProfileChangeRequestModal } from "@/components/profile/ProfileChangeRequestModal";
import { EditProfileModal } from "@/components/profile/EditProfileModal";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProfile = async () => {
    try {
      const data = await profileService.getEmployeeProfile();
      setProfile(data);
    } catch (err: any) {
       
      const e = err as unknown;
      console.error("Failed to load profile", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!profile) {
    return <div>Failed to load profile.</div>;
  }

  const formatJoinDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const isProfileIncomplete = profile.profile_completion_status !== 'completed';

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {isProfileIncomplete && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
          <div>
            <h3 className="text-amber-800 font-semibold text-sm">Profile Incomplete</h3>
            <p className="text-amber-700 text-sm mt-1">
              Your profile is currently incomplete. Please click &quot;Edit Profile&quot; to add your personal and emergency contact information.
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your personal and employment information.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setIsEditModalOpen(true)}>Edit Profile</Button>
          <Button variant="outline" className="gap-2" onClick={() => setIsModalOpen(true)}>Request Change</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-sm border-slate-100">
            <CardContent className="p-6 text-center flex flex-col items-center">
              {profile.profile_photo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.profile_photo_url} alt={profile.full_name} className="w-24 h-24 rounded-full object-cover mb-4" />
              ) : (
                <div className="w-24 h-24 bg-blue-600 text-white text-3xl font-bold rounded-full flex items-center justify-center mb-4 uppercase">
                  {profile.full_name.charAt(0)}
                </div>
              )}
              <h2 className="text-xl font-bold text-slate-800">{profile.full_name}</h2>
              <p className="text-sm text-blue-600 font-medium mt-1">{profile.designations?.name || "N/A"}</p>
              <div className="flex items-center gap-1.5 mt-3 text-xs font-medium px-3 py-1 bg-green-50 text-green-600 rounded-full border border-green-100 uppercase">
                <ShieldCheck className="w-3.5 h-3.5" /> {profile.account_status.replace('_', ' ')}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm border-slate-100">
            <CardHeader className="border-b border-slate-50 pb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-slate-800">Personal Information</CardTitle>
              {/* <Button variant="ghost" size="sm" onClick={() => {}} className="text-blue-600 h-8">Edit Permitted Fields</Button> */}
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium"><User className="w-3.5 h-3.5" /> Full Name</div>
                <p className="text-sm font-semibold text-slate-800">{profile.full_name}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium"><Mail className="w-3.5 h-3.5" /> Official Email</div>
                <p className="text-sm font-semibold text-slate-800">{profile.official_email}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium"><Mail className="w-3.5 h-3.5" /> Personal Email</div>
                <p className="text-sm font-semibold text-slate-800">{profile.personal_email || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium"><Phone className="w-3.5 h-3.5" /> Mobile Number</div>
                <p className="text-sm font-semibold text-slate-800">{profile.mobile || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium"><Calendar className="w-3.5 h-3.5" /> Date of Birth</div>
                <p className="text-sm font-semibold text-slate-800">{profile.date_of_birth ? formatJoinDate(profile.date_of_birth) : "N/A"}</p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium"><MapPin className="w-3.5 h-3.5" /> Residential Address</div>
                <p className="text-sm font-semibold text-slate-800">{profile.address ? String(profile.address) : "N/A"}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-100">
            <CardHeader className="border-b border-slate-50 pb-4">
              <CardTitle className="text-lg text-slate-800">Employment Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium"><Briefcase className="w-3.5 h-3.5" /> Employee ID</div>
                <p className="text-sm font-semibold text-slate-800">{profile.employee_code}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium"><User className="w-3.5 h-3.5" /> Department</div>
                <p className="text-sm font-semibold text-slate-800">{profile.departments?.name || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium"><Calendar className="w-3.5 h-3.5" /> Date of Joining</div>
                <p className="text-sm font-semibold text-slate-800">{formatJoinDate(profile.joining_date)}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium"><Clock className="w-3.5 h-3.5" /> Employment Type</div>
                <p className="text-sm font-semibold text-slate-800">{profile.employment_type || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium"><User className="w-3.5 h-3.5" /> Reporting Manager</div>
                <p className="text-sm font-semibold text-slate-800">{profile.reporting_manager?.full_name || "N/A"}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-slate-100">
            <CardHeader className="border-b border-slate-50 pb-4">
              <CardTitle className="text-lg text-slate-800">Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium"><User className="w-3.5 h-3.5" /> Contact Name</div>
                <p className="text-sm font-semibold text-slate-800">{profile.emergency_contact_name || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium"><User className="w-3.5 h-3.5" /> Relationship</div>
                <p className="text-sm font-semibold text-slate-800">{profile.emergency_contact_relationship || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium"><Phone className="w-3.5 h-3.5" /> Phone Number</div>
                <p className="text-sm font-semibold text-slate-800">{profile.emergency_contact_phone || "N/A"}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {isEditModalOpen && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          profile={profile}
          onSuccess={() => {
            alert("Profile updated successfully.");
            fetchProfile();
          }}
        />
      )}

      {isModalOpen && (
        <ProfileChangeRequestModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          profile={profile}
          onSuccess={() => {
            alert("Change request submitted successfully.");
             
    fetchProfile();
          }}
        />
      )}
    </div>
  );
}
