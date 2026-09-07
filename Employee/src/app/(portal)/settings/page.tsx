"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Lock, Bell, Shield, Smartphone, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('password');

  const handleUpdatePassword = async () => {
    const current = (document.getElementById('current') as HTMLInputElement).value;
    const newP = (document.getElementById('new') as HTMLInputElement).value;
    const conf = (document.getElementById('confirm') as HTMLInputElement).value;
    if (!current || !newP || !conf) {
      alert("All fields are required.");
      return;
    }
    if (newP !== conf) {
      alert("New passwords do not match.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newP });
    setLoading(false);
    if (error) {
      alert(error.message);
    } else {
      alert("Password updated successfully.");
      (document.getElementById('current') as HTMLInputElement).value = '';
      (document.getElementById('new') as HTMLInputElement).value = '';
      (document.getElementById('confirm') as HTMLInputElement).value = '';
    }
  };

  const handleLogoutDevice = async () => {
    if (confirm("Are you sure you want to log out from this device?")) {
      await supabase.auth.signOut();
      window.location.href = '/login';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your account preferences and security settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="space-y-1 hidden md:block">
          <Button 
            variant="ghost" 
            className={`w-full justify-start font-semibold ${activeTab === 'account' ? 'text-blue-600 bg-blue-50/50 hover:bg-blue-50/80' : 'text-slate-600 hover:bg-slate-50'}`}
            onClick={() => setActiveTab('account')}
          >
            <Settings className="w-4 h-4 mr-3" /> Account
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start font-semibold ${activeTab === 'password' ? 'text-blue-600 bg-blue-50/50 hover:bg-blue-50/80' : 'text-slate-600 hover:bg-slate-50'}`}
            onClick={() => setActiveTab('password')}
          >
            <Lock className="w-4 h-4 mr-3" /> Password
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start font-semibold ${activeTab === 'notifications' ? 'text-blue-600 bg-blue-50/50 hover:bg-blue-50/80' : 'text-slate-600 hover:bg-slate-50'}`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell className="w-4 h-4 mr-3" /> Notifications
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start font-semibold ${activeTab === 'privacy' ? 'text-blue-600 bg-blue-50/50 hover:bg-blue-50/80' : 'text-slate-600 hover:bg-slate-50'}`}
            onClick={() => setActiveTab('privacy')}
          >
            <Shield className="w-4 h-4 mr-3" /> Privacy
          </Button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader className="border-b border-slate-50 pb-4">
              <CardTitle className="text-lg text-slate-800">Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current">Current Password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">New Password</Label>
                <Input id="new" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm New Password</Label>
                <Input id="confirm" type="password" />
              </div>
              <Button className="mt-2 h-10 w-full sm:w-auto" disabled={loading} onClick={handleUpdatePassword}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Update Password
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-slate-50 pb-4">
              <CardTitle className="text-lg text-slate-800">Active Sessions</CardTitle>
              <CardDescription>Manage your currently logged in devices.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Current Device</p>
                    <p className="text-xs text-slate-500">Active now</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-8 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200" onClick={handleLogoutDevice}>
                  Logout
                </Button>
              </div>
              <p className="text-xs text-slate-500 mt-4 text-center">
                Session history tracking is not currently available.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
