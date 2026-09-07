import React from 'react';
import Link from 'next/link';
import { MoreHorizontal, FileText } from 'lucide-react';
import { Announcement } from '@/data/hr/announcements';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface AnnouncementsTableProps {
  announcements: Announcement[];
}

export function AnnouncementsTable({ announcements }: AnnouncementsTableProps) {
  
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

  if (announcements.length === 0) {
    return (
      <div className="text-center py-12 border rounded-md">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <FileText className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>
        <h3 className="text-lg font-medium">No announcements found</h3>
        <p className="text-muted-foreground mt-2">No announcements match your filters or criteria.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted text-muted-foreground text-xs uppercase">
          <tr>
            <th className="px-4 py-3 font-medium">Announcement</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Audience</th>
            <th className="px-4 py-3 font-medium">Priority</th>
            <th className="px-4 py-3 font-medium">Publish Date</th>
            <th className="px-4 py-3 font-medium">Expiry</th>
            <th className="px-4 py-3 font-medium">Reach</th>
            <th className="px-4 py-3 font-medium">Read</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {announcements.map((announcement) => (
            <tr key={announcement.id} className="hover:bg-muted/50 transition-colors">
              <td className="px-4 py-3">
                <Link href={`/hr/announcements/${announcement.id}`} className="block">
                  <div className="font-medium text-foreground hover:underline">{announcement.title}</div>
                  <div className="text-xs text-muted-foreground">{announcement.id}</div>
                </Link>
              </td>
              <td className="px-4 py-3">
                {announcement.category}
              </td>
              <td className="px-4 py-3">
                {announcement.audience.type}
              </td>
              <td className="px-4 py-3">
                <Badge variant={getPriorityColor(announcement.priority) as any} className="font-normal text-[10px] px-1.5 py-0">
                  {announcement.priority}
                </Badge>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                {announcement.status === 'Draft' ? '—' : formatDate(announcement.publishDate)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                {formatDate(announcement.expiryDate)}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {announcement.estimatedReach || '—'}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {announcement.readStats ? `${announcement.readStats.read} / ${announcement.readStats.delivered}` : '—'}
              </td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(announcement.status)}`}>
                  {announcement.status}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger >
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem >
                      <Link href={`/hr/announcements/${announcement.id}`}>View Details</Link>
                    </DropdownMenuItem>
                    {(announcement.status === 'Draft' || announcement.status === 'Scheduled') && (
                      <DropdownMenuItem >
                         <Link href={`/hr/announcements/${announcement.id}?edit=true`}>Edit</Link>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
