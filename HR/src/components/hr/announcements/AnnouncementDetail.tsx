// @ts-nocheck

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, Users, Eye, BarChart2, Edit, Calendar, Clock, Download, Copy, Ban, Archive, Search } from 'lucide-react';
import { Announcement } from '@/data/hr/announcements';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface AnnouncementDetailProps {
  announcement: Announcement;
  onEdit: () => void;
}

export function AnnouncementDetail({ announcement, onEdit }: AnnouncementDetailProps) {
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'destructive';
      case 'Important': return 'default';
      default: return 'secondary';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800 border-green-200';
      case 'Scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Draft': return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'Expired': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Archived': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 bg-card p-6 rounded-lg border shadow-sm">
         <div>
            <div className="flex items-center gap-3 mb-2">
               <span className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${getStatusColor(announcement.status)}`}>
                 {announcement.status}
               </span>
               <span className="text-sm text-muted-foreground">{announcement.id}</span>
            </div>
            <h1 className="text-2xl font-bold">{announcement.title}</h1>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-muted-foreground">
               <div className="flex items-center gap-1.5">
                  <span className="font-medium">Category:</span> {announcement.category}
               </div>
               <div className="flex items-center gap-1.5">
                  <span className="font-medium">Priority:</span> 
                  <Badge variant={getPriorityColor(announcement.priority) as any} className="text-[10px] px-1.5 py-0 font-normal">
                    {announcement.priority}
                  </Badge>
               </div>
               <div className="flex items-center gap-1.5">
                  <span className="font-medium">Published By:</span> {announcement.createdByName}
               </div>
               {announcement.status !== 'Draft' && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {formatDate(announcement.publishDate)} · {formatTime(announcement.publishDate)}
                  </div>
               )}
            </div>
         </div>
         
         <div className="flex gap-2">
            {(announcement.status === 'Draft' || announcement.status === 'Scheduled' || announcement.status === 'Published') && (
               <Button variant="outline" onClick={onEdit}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
               </Button>
            )}
            
            <Dialog>
              <DialogTrigger >
                <Button variant="outline">More Actions</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Announcement Actions</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Button variant="outline" className="justify-start">
                    <Copy className="w-4 h-4 mr-2" /> Duplicate as Draft
                  </Button>
                  {(announcement.status === 'Published' || announcement.status === 'Scheduled') && (
                     <Button variant="outline" className="justify-start text-orange-600 hover:text-orange-700">
                       <Ban className="w-4 h-4 mr-2" /> Cancel Announcement
                     </Button>
                  )}
                  {(announcement.status === 'Published' || announcement.status === 'Expired') && (
                     <Button variant="outline" className="justify-start text-red-600 hover:text-red-700">
                       <Archive className="w-4 h-4 mr-2" /> Archive
                     </Button>
                  )}
                </div>
              </DialogContent>
            </Dialog>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
           <Card>
             <CardHeader>
               <CardTitle className="text-lg">Message</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="prose max-w-none text-sm whitespace-pre-wrap">
                 {announcement.description}
               </div>
             </CardContent>
           </Card>

           {announcement.attachments && announcement.attachments.length > 0 && (
             <Card>
               <CardHeader>
                 <CardTitle className="text-lg">Attachments</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="space-y-3">
                    {announcement.attachments.map(att => (
                       <div key={att.id} className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center gap-3">
                             <FileText className="w-8 h-8 text-blue-500" />
                             <div>
                                <div className="text-sm font-medium">{att.fileName}</div>
                                <div className="text-xs text-muted-foreground">{(att.fileSize / 1024 / 1024).toFixed(2)} MB</div>
                             </div>
                          </div>
                          <Button variant="ghost" size="sm">Download</Button>
                       </div>
                    ))}
                 </div>
               </CardContent>
             </Card>
           )}
           
           {announcement.revisions && announcement.revisions.length > 0 && (
             <Card>
               <CardHeader>
                 <CardTitle className="text-lg">Revision History</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                     {announcement.revisions.map((rev, idx) => (
                        <div key={rev.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                          <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-slate-300 text-slate-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow"></div>
                          <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded border border-slate-200 shadow-sm bg-white">
                            <div className="flex items-center justify-between space-x-2 mb-1">
                              <div className="font-medium text-sm text-slate-900">{rev.updatedByName}</div>
                              <time className="font-medium text-xs text-slate-500">{formatDate(rev.updatedAt)} {formatTime(rev.updatedAt)}</time>
                            </div>
                            <div className="text-sm text-slate-500">{rev.changes}</div>
                          </div>
                        </div>
                     ))}
                  </div>
               </CardContent>
             </Card>
           )}
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-6">
           <Card>
             <CardHeader className="pb-3">
               <CardTitle className="text-base flex items-center gap-2">
                 <Users className="w-4 h-4 text-primary" /> Audience
               </CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <div>
                   <div className="text-sm font-medium">Target</div>
                   <div className="text-sm text-muted-foreground">{announcement.audience.type}</div>
                </div>
                <div>
                   <div className="text-sm font-medium">Estimated Reach</div>
                   <div className="text-sm text-muted-foreground">{announcement.estimatedReach} employees</div>
                </div>
                {announcement.expiryDate && (
                  <div>
                     <div className="text-sm font-medium">Expires On</div>
                     <div className="text-sm text-muted-foreground">{formatDate(announcement.expiryDate)}</div>
                  </div>
                )}
             </CardContent>
           </Card>

           {announcement.status === 'Published' && announcement.readStats && (
             <Card>
               <CardHeader className="pb-3">
                 <CardTitle className="text-base flex items-center gap-2">
                   <BarChart2 className="w-4 h-4 text-primary" /> Read Analytics
                 </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  
                  <div className="space-y-1">
                     <div className="flex justify-between text-sm">
                       <span>Read</span>
                       <span className="font-medium">{announcement.readStats.read} / {announcement.readStats.delivered}</span>
                     </div>
                     <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${announcement.readStats.readRate}%` }}></div>
                     </div>
                     <div className="text-xs text-muted-foreground text-right">{announcement.readStats.readRate}%</div>
                  </div>

                  <div className="pt-2">
                    <Dialog>
                      <DialogTrigger >
                        <Button variant="outline" className="w-full text-xs" size="sm">
                           View Unread Employees ({announcement.readStats.unread})
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col">
                        <DialogHeader>
                          <DialogTitle>Unread Employees</DialogTitle>
                          <DialogDescription>
                             Employees who have not yet viewed this announcement.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="relative flex-1 overflow-hidden flex flex-col mt-2">
                           <div className="mb-4">
                              <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input type="search" placeholder="Search employees..." className="pl-8" />
                              </div>
                           </div>
                           <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                              {announcement.unreadEmployees && announcement.unreadEmployees.length > 0 ? (
                                 announcement.unreadEmployees.map(emp => (
                                    <div key={emp.id} className="flex items-center justify-between p-3 border rounded-md">
                                       <div>
                                          <div className="font-medium text-sm">{emp.name}</div>
                                          <div className="text-xs text-muted-foreground">{emp.department} • {emp.location}</div>
                                       </div>
                                       <Button variant="ghost" size="sm" >
                                          <Link href={`/hr/employees/${emp.id}`}>View Profile</Link>
                                       </Button>
                                    </div>
                                 ))
                              ) : (
                                <div className="text-center py-8 text-muted-foreground text-sm">
                                   Everyone in the target audience has read this announcement.
                                </div>
                              )}
                           </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
               </CardContent>
             </Card>
           )}
           
           {announcement.requireAcknowledgement && announcement.status === 'Published' && (
             <Card>
               <CardHeader className="pb-3">
                 <CardTitle className="text-base flex items-center gap-2">
                   <Eye className="w-4 h-4 text-primary" /> Acknowledgements
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="text-center py-4 text-muted-foreground text-sm">
                    Acknowledgement tracking active.<br/>(Mock data)
                 </div>
               </CardContent>
             </Card>
           )}

        </div>
      </div>
    </div>
  );
}
