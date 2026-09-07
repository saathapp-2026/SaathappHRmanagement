"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Megaphone, CheckCircle, Search, Filter } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Announcement {
  id: string;
  title: string;
  content: string;
  description: string;
  type: string;
  priority: string;
  isRead?: boolean;
  created_at: string;
  published_at?: string;
  archived_at?: string;
  announcement_reads?: any[];
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all"); // all, unread, important, archived
  // const supabase = createClientComponentClient();

  async function fetchAnnouncements() {
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) return;

    const { data: profile } = await supabase.from('employee_profiles').select('id').eq('user_id', userId).single();
    if (!profile) return;

    const { data, error } = await supabase
      .from('announcements')
      .select('*, announcement_reads(employee_id)')
      .order('published_at', { ascending: false });

    if (!error && data) {
      const mapped = data.map((a: Announcement) => ({
        ...a,
        isRead: a.announcement_reads && a.announcement_reads.length > 0,
      }));
      setAnnouncements(mapped);
    }
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAnnouncements();
  }, []);

  const markAsRead = async (id: string) => {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) return;

    const { data: profile } = await supabase.from('employee_profiles').select('id').eq('user_id', userId).single();
    if (!profile) return;

    await supabase.from('announcement_reads').insert({ announcement_id: id, employee_id: profile.id });
    setAnnouncements(prev => prev.map((a: Announcement) => a.id === id ? { ...a, isRead: true } : a));
  };

  const filtered = announcements.filter((a: Announcement) => {
    if (search && !a.title.toLowerCase().includes(search.toLowerCase()) && !(a.description || "").toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (filterType === 'unread' && a.isRead) return false;
    if (filterType === 'important' && a.priority !== 'high') return false;
    if (filterType === 'archived' && !a.archived_at) return false;
    if (filterType !== 'archived' && a.archived_at) return false; // Hide archived by default
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Announcements</h1>
          <p className="text-slate-500 text-sm mt-1">Company news, policy updates, and important notices.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
           <div className="relative flex-1 sm:w-64">
             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
             <Input 
               placeholder="Search announcements..." 
               className="pl-9"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
           </div>
           <select 
             className="border rounded-md px-3 py-2 text-sm bg-white"
             value={filterType}
             onChange={(e) => setFilterType(e.target.value)}
           >
             <option value="all">All Active</option>
             <option value="unread">Unread</option>
             <option value="important">Important</option>
             <option value="archived">Archived</option>
           </select>
        </div>
      </div>
      
      {loading ? (
        <div className="py-20 text-center text-slate-500">Loading announcements...</div>
      ) : filtered.length === 0 ? (
        <Card className="shadow-sm border-slate-200 text-center py-20 bg-slate-50/50">
          <CardContent className="flex flex-col items-center justify-center space-y-4 pt-6">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-lg">You&apos;re all caught up!</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto mt-2">No announcements found matching your filters.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((ann) => (
            <Card key={ann.id} className={`shadow-sm transition-colors ${ann.isRead ? 'bg-white border-slate-200' : 'bg-blue-50/30 border-blue-200'}`}>
               <CardHeader className="pb-3 flex flex-row justify-between items-start">
                 <div className="space-y-1">
                   <div className="flex items-center gap-2">
                     <CardTitle className="text-lg text-slate-800">{ann.title}</CardTitle>
                     {!ann.isRead && <Badge variant="default" className="bg-blue-600">New</Badge>}
                     {ann.priority === 'high' && <Badge variant="destructive">Important</Badge>}
                   </div>
                   <p className="text-xs text-slate-500">
                     Published: {ann.published_at ? new Date(ann.published_at).toLocaleDateString() : 'N/A'} 
                     {ann.type && ` • ${ann.type}`}
                   </p>
                 </div>
               </CardHeader>
               <CardContent>
                 <p className="text-sm text-slate-700 whitespace-pre-wrap">{ann.description}</p>
                 
                 {!ann.isRead && (
                   <div className="mt-4 flex justify-end">
                     <Button variant="outline" size="sm" onClick={() => markAsRead(ann.id)}>
                       Mark as Read
                     </Button>
                   </div>
                 )}
               </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
