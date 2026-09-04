
"use client";
import { MockPortalService } from "@/services/mockPortalService";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { 
  CheckCircle2, Clock, MapPin, ChevronRight, Bell, Calendar, 
  Briefcase, MessageSquare, HelpCircle, User, FileText, AlertCircle, Phone, Monitor
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState("");
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState("");
  
  useEffect(() => {
    // Current time ticker
    const timer = setInterval(() => {
      setCurrentTime(format(new Date(), "hh:mm a"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function loadToday() {
      const today = await MockPortalService.getAttendanceToday();
      if (today && today.checkIn) {
        setIsCheckedIn(true);
        setCheckInTime(today.checkIn);
      }
    }
    loadToday();
  }, []);

  const handleCheckIn = async () => {
    const res = await MockPortalService.checkIn();
    setIsCheckedIn(true);
    setCheckInTime(res.checkIn);
  };
  
  const handleCheckOut = async () => {
    await MockPortalService.checkOut();
    // In a real app we might update UI, but for mock we can just alert or redirect
    alert("Checked out successfully");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Mobile Top Welcome (Hidden on desktop as it's in the header) */}
      <div className="md:hidden flex items-center justify-between mb-2">
        <div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight">Good Morning,<br/>Anjali! 👋</h1>
          <p className="text-xs text-slate-500 mt-1">Have a productive day ahead.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Mobile-first Action Card (Left column on Desktop) */}
        <div className="lg:col-span-4 space-y-6">
          
          <Card className="shadow-sm border-slate-100 overflow-hidden relative">
            <div className="absolute top-0 w-full h-1 bg-blue-600"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-slate-800 text-sm">Today's Status</h3>
                <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">View Details</span>
              </div>
              
              {!isCheckedIn ? (
                <Button onClick={handleCheckIn} className="w-full h-12 text-base font-semibold shadow-md gap-2 rounded-xl mb-4">
                  <CheckCircle2 className="w-5 h-5" /> Check In
                </Button>
              ) : (
                <div className="space-y-3 mb-4">
                  <div className="w-full h-12 bg-green-50 text-green-700 font-semibold flex items-center justify-center rounded-xl border border-green-200">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    Checked in at {checkInTime}
                  </div>
                  <Button variant="outline" onClick={handleCheckOut} className="w-full h-12 text-base font-semibold text-slate-700 rounded-xl gap-2">
                    <MapPin className="w-4 h-4" /> Check Out
                  </Button>
                </div>
              )}
              
              <p className="text-center text-[10px] text-slate-400 font-medium">
                {!isCheckedIn ? "Not Checked In Yet" : "Currently working..."}
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="shadow-sm border-slate-100">
              <CardContent className="p-4 flex gap-3 items-center">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Working Hours</p>
                  <p className="text-sm font-bold text-slate-800 leading-tight">02h 35m</p>
                  <p className="text-[10px] text-slate-400">Today</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-sm border-slate-100">
              <CardContent className="p-4 flex gap-3 items-center">
                <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Leave Balance</p>
                  <p className="text-sm font-bold text-slate-800 leading-tight">12 Days</p>
                  <p className="text-[10px] text-slate-400">Available</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-sm border-slate-100">
            <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Upcoming Leave</CardTitle>
              <Link href="/leave" className="text-[10px] text-blue-600 font-medium hover:underline">View All</Link>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex justify-between items-center border border-slate-100 p-3 rounded-lg bg-slate-50/50">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-md bg-white border border-slate-100 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Family Vacation</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">12 May - 16 May 2025</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-medium rounded-full border border-green-100">Approved</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Link href="/attendance">
              <Card className="shadow-sm border-slate-100 hover:border-blue-600/40 transition-colors">
                <CardContent className="p-4 flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Attendance</p>
                    <p className="text-[10px] text-slate-500">View history</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/leave/apply">
              <Card className="shadow-sm border-slate-100 hover:border-blue-600/40 transition-colors">
                <CardContent className="p-4 flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Apply Leave</p>
                    <p className="text-[10px] text-slate-500">Submit request</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/concerns/raise">
              <Card className="shadow-sm border-slate-100 hover:border-blue-600/40 transition-colors">
                <CardContent className="p-4 flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 leading-tight">Raise a Concern</p>
                    <p className="text-[10px] text-slate-500">Get help</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/profile">
              <Card className="shadow-sm border-slate-100 hover:border-blue-600/40 transition-colors">
                <CardContent className="p-4 flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">My Profile</p>
                    <p className="text-[10px] text-slate-500">View details</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Desktop Grid Layout (Right column) */}
        <div className="lg:col-span-8 space-y-6 hidden lg:block">
          
          <div className="grid grid-cols-2 gap-6">
            
            {/* Attendance History Calendar */}
            <Card className="shadow-sm border-slate-100">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-800">Attendance History</CardTitle>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-semibold text-slate-700 mb-4">April 2025</div>
                <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center text-xs">
                  <div className="font-medium text-slate-400">Mon</div>
                  <div className="font-medium text-slate-400">Tue</div>
                  <div className="font-medium text-slate-400">Wed</div>
                  <div className="font-medium text-slate-400">Thu</div>
                  <div className="font-medium text-slate-400">Fri</div>
                  <div className="font-medium text-slate-400">Sat</div>
                  <div className="font-medium text-slate-400">Sun</div>
                  
                  {/* Calendar Days Mockup */}
                  <div className="text-slate-300">31</div>
                  <div className="flex flex-col items-center">1<span className="w-1 h-1 rounded-full bg-green-500 mt-1"></span></div>
                  <div className="flex flex-col items-center">2<span className="w-1 h-1 rounded-full bg-green-500 mt-1"></span></div>
                  <div className="flex flex-col items-center">3<span className="w-1 h-1 rounded-full bg-green-500 mt-1"></span></div>
                  <div className="flex flex-col items-center">4<span className="w-1 h-1 rounded-full bg-green-500 mt-1"></span></div>
                  <div className="text-slate-400">5</div>
                  <div className="text-slate-400">6</div>
                  
                  <div className="flex flex-col items-center">7<span className="w-1 h-1 rounded-full bg-green-500 mt-1"></span></div>
                  <div className="flex flex-col items-center">8<span className="w-1 h-1 rounded-full bg-green-500 mt-1"></span></div>
                  <div className="flex flex-col items-center">9<span className="w-1 h-1 rounded-full bg-orange-400 mt-1"></span></div>
                  <div className="flex flex-col items-center">10<span className="w-1 h-1 rounded-full bg-green-500 mt-1"></span></div>
                  <div className="flex flex-col items-center">11<span className="w-1 h-1 rounded-full bg-green-500 mt-1"></span></div>
                  <div className="text-slate-400">12</div>
                  <div className="text-slate-400">13</div>
                  
                  <div className="flex flex-col items-center">14<span className="w-1 h-1 rounded-full bg-purple-500 mt-1"></span></div>
                  <div className="flex flex-col items-center">15<span className="w-1 h-1 rounded-full bg-purple-500 mt-1"></span></div>
                  <div className="flex flex-col items-center">16<span className="w-1 h-1 rounded-full bg-green-500 mt-1"></span></div>
                  <div className="flex flex-col items-center">17<span className="w-1 h-1 rounded-full bg-green-500 mt-1"></span></div>
                  <div className="flex flex-col items-center">18<span className="w-1 h-1 rounded-full bg-green-500 mt-1"></span></div>
                  <div className="text-slate-400">19</div>
                  <div className="text-slate-400">20</div>
                  
                  <div className="flex flex-col items-center">21<span className="w-1 h-1 rounded-full bg-green-500 mt-1"></span></div>
                  <div className="flex flex-col items-center">22<span className="w-1 h-1 rounded-full bg-green-500 mt-1"></span></div>
                  <div className="flex flex-col items-center">23<span className="w-1 h-1 rounded-full bg-red-500 mt-1"></span></div>
                  <div className="flex flex-col items-center bg-blue-600 text-white rounded-full w-6 h-6 justify-center mx-auto">24</div>
                  <div className="text-slate-800">25</div>
                  <div className="text-slate-400">26</div>
                  <div className="text-slate-400">27</div>
                </div>
                <div className="flex justify-between items-center mt-6 text-[10px] text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500"></span> Present</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-400"></span> Half Day</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span> Absent</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Leave</div>
                </div>
              </CardContent>
            </Card>

            {/* Leave Requests */}
            <Card className="shadow-sm border-slate-100">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-800">Leave Requests</CardTitle>
                <Link href="/leave" className="text-[10px] text-blue-600 font-medium hover:underline">View All</Link>
              </CardHeader>
              <CardContent className="space-y-4 mt-2">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-md bg-purple-50 flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Family Vacation</p>
                      <p className="text-[10px] text-slate-500">12 May - 16 May 2025</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-medium rounded-full border border-green-100">Approved</span>
                </div>
                <div className="w-full h-px bg-slate-50"></div>
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Personal Leave</p>
                      <p className="text-[10px] text-slate-500">23 Apr 2025</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[10px] font-medium rounded-full border border-orange-100">Pending</span>
                </div>
                <div className="w-full h-px bg-slate-50"></div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-md bg-orange-50 flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Medical Leave</p>
                      <p className="text-[10px] text-slate-500">5 Mar 2025</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-medium rounded-full border border-green-100">Approved</span>
                </div>
              </CardContent>
            </Card>

            {/* HR Notifications */}
            <Card className="shadow-sm border-slate-100">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-800">HR Notifications</CardTitle>
                <Link href="/notifications" className="text-[10px] text-blue-600 font-medium hover:underline">View All</Link>
              </CardHeader>
              <CardContent className="space-y-4 mt-2">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Bell className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-xs font-bold text-slate-800">Holiday on 1 May</p>
                      <p className="text-[10px] text-slate-400">2h ago</p>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">Office will remain closed.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-xs font-bold text-slate-800">Policy Update</p>
                      <p className="text-[10px] text-slate-400">1d ago</p>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">New Leave Policy is now effective.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-xs font-bold text-slate-800">Team Outing</p>
                      <p className="text-[10px] text-slate-400">3d ago</p>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">Join us for a fun team outing!</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ask for Help */}
            <Card className="shadow-sm border-slate-100">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-800">Ask for Help</CardTitle>
                <Link href="/help" className="text-[10px] text-blue-600 font-medium hover:underline">View All</Link>
              </CardHeader>
              <CardContent className="space-y-4 mt-2">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center">
                      <Monitor className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">IT Support</p>
                      <p className="text-[10px] text-slate-500">Facing an issue with systems?</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-medium rounded-full border border-blue-100">Open</span>
                </div>
                <div className="w-full h-px bg-slate-50"></div>
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-md bg-green-50 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Payroll Query</p>
                      <p className="text-[10px] text-slate-500">Have a question on salary?</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-medium rounded-full border border-blue-100">Open</span>
                </div>
                <div className="w-full h-px bg-slate-50"></div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-md bg-purple-50 flex items-center justify-center">
                      <HelpCircle className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">General Enquiry</p>
                      <p className="text-[10px] text-slate-500">We are here to help.</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-medium rounded-full border border-blue-100">Open</span>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
