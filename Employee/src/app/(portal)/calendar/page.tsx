"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarIcon, Filter, List, CalendarDays, CalendarRange } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  event_type: string;
  all_day: boolean;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'month' | 'week' | 'list'>('month');
  const [filters, setFilters] = useState({
    holidays: true,
    my_leave: true,
    meetings: true,
    events: true,
    birthdays: true,
    anniversaries: true,
  });

  // const supabase = createClientComponentClient();

  async function fetchEvents() {
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) return;

    const { data: profile } = await supabase.from('employee_profiles').select('id, date_of_birth, joining_date').eq('user_id', userId).single();
    
    // Fetch Calendar Events
    const { data: calEvents, error } = await supabase
      .from('calendar_events')
      .select('*')
      .order('start_at', { ascending: true });

    // Fetch My Leave
    let leaveEvents: CalendarEvent[] = [];
    if (profile) {
      const { data: leaves } = await supabase
        .from('leave_requests')
        .select('*')
        .eq('employee_id', profile.id)
        .eq('status', 'approved');
      
      if (leaves) {
        leaveEvents = leaves.map((l: any) => ({
          id: `leave-${l.id}`,
          title: 'Approved Leave',
          description: l.reason,
          start_at: l.start_date,
          end_at: l.end_date,
          event_type: 'my_leave',
          all_day: true,
        }));
      }
    }

    let allEvents: any[] = [];
    if (calEvents) {
      allEvents = [...calEvents.map((e: CalendarEvent) => ({...e, event_type: e.event_type || 'events'}))];
    }
    allEvents = [...allEvents, ...leaveEvents];

    setEvents(allEvents);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchEvents();
  }, []);

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredEvents = events.filter((eventItem: CalendarEvent) => {
    if (eventItem.event_type === 'holiday' && !filters.holidays) return false;
    if (eventItem.event_type === 'my_leave' && !filters.my_leave) return false;
    if (eventItem.event_type === 'meeting' && !filters.meetings) return false;
    if (eventItem.event_type === 'event' && !filters.events) return false;
    if (eventItem.event_type === 'birthday' && !filters.birthdays) return false;
    if (eventItem.event_type === 'anniversary' && !filters.anniversaries) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Company Calendar</h1>
          <p className="text-slate-500 text-sm mt-1">View holidays, leaves, and company events.</p>
        </div>
        <div className="flex gap-2">
          <Button variant={view === 'month' ? 'default' : 'outline'} size="sm" onClick={() => setView('month')}>
            <CalendarDays className="w-4 h-4 mr-2" /> Month
          </Button>
          <Button variant={view === 'week' ? 'default' : 'outline'} size="sm" onClick={() => setView('week')}>
            <CalendarRange className="w-4 h-4 mr-2" /> Week
          </Button>
          <Button variant={view === 'list' ? 'default' : 'outline'} size="sm" onClick={() => setView('list')}>
            <List className="w-4 h-4 mr-2" /> List
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <BadgeFilter active={filters.holidays} onClick={() => toggleFilter('holidays')} label="Holidays" />
        <BadgeFilter active={filters.my_leave} onClick={() => toggleFilter('my_leave')} label="My Leave" />
        <BadgeFilter active={filters.meetings} onClick={() => toggleFilter('meetings')} label="Meetings" />
        <BadgeFilter active={filters.events} onClick={() => toggleFilter('events')} label="Events" />
        <BadgeFilter active={filters.birthdays} onClick={() => toggleFilter('birthdays')} label="Birthdays" />
        <BadgeFilter active={filters.anniversaries} onClick={() => toggleFilter('anniversaries')} label="Anniversaries" />
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-500">Loading events...</div>
      ) : filteredEvents.length === 0 ? (
        <Card className="shadow-sm border-slate-200 text-center py-20 bg-slate-50/50">
          <CardContent className="flex flex-col items-center justify-center space-y-4 pt-6">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
              <CalendarIcon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-lg">No Upcoming Events</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto mt-2">There are no events matching your current filters.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {/* A simple list view for now, could be expanded to grid for month/week */}
          {filteredEvents.map((evt) => (
            <Card key={evt.id} className="shadow-sm border-slate-200 p-4">
              <div className="flex gap-4 items-center">
                 <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs font-semibold uppercase">{new Date(evt.start_at).toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-lg font-bold leading-none">{new Date(evt.start_at).getDate()}</span>
                 </div>
                 <div>
                    <h3 className="font-semibold text-slate-800">{evt.title}</h3>
                    <p className="text-sm text-slate-500">
                      {evt.all_day ? 'All Day' : new Date(evt.start_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      {' • '}
                      <span className="capitalize">{evt.event_type.replace('_', ' ')}</span>
                    </p>
                    {evt.description && <p className="text-sm text-slate-600 mt-1">{evt.description}</p>}
                 </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function BadgeFilter({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${active ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
    >
      {label}
    </button>
  );
}
