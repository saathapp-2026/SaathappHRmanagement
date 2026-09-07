'use client';
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import { mockCalendarEvents } from '@/data/hr/calendar';

import { CalendarStats } from '@/components/hr/calendar/CalendarStats';
import { CalendarFilters } from '@/components/hr/calendar/CalendarFilters';
import { CalendarNavigation } from '@/components/hr/calendar/CalendarNavigation';
import { MonthCalendar } from '@/components/hr/calendar/MonthCalendar';
import { WeekCalendar } from '@/components/hr/calendar/WeekCalendar';
import { CalendarListView } from '@/components/hr/calendar/CalendarListView';
import { UpcomingEventsCard } from '@/components/hr/calendar/UpcomingEventsCard';
import { UpcomingHolidaysCard } from '@/components/hr/calendar/UpcomingHolidaysCard';
import { CelebrationsCard } from '@/components/hr/calendar/CelebrationsCard';
import { CalendarLegend } from '@/components/hr/calendar/CalendarLegend';

import { DayEventsDrawer } from '@/components/hr/calendar/DayEventsDrawer';
import { EventDetailDrawer } from '@/components/hr/calendar/EventDetailDrawer';
import { CreateEventModal } from '@/components/hr/calendar/CreateEventModal';
import { AddHolidayModal } from '@/components/hr/calendar/AddHolidayModal';

export default function CalendarPage() {
  const [view, setView] = useState('Month');
  const [activeFilter, setActiveFilter] = useState('All');
  
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isAddHolidayOpen, setIsAddHolidayOpen] = useState(false);

  const selectedEvent = selectedEventId ? mockCalendarEvents.find(e => e.id === selectedEventId) || null : null;

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">HR Calendar</h1>
          <p className="text-sm text-gray-500 mt-1">View company holidays, employee leave, celebrations and HR events in one place.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={() => setIsAddHolidayOpen(true)} className="px-3 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
            Add Holiday
          </button>
          <button onClick={() => setIsCreateOpen(true)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2">
            <Plus size={16} /> Create Event
          </button>
        </div>
      </div>

      <CalendarStats />
      
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 flex flex-col h-full">
          <CalendarFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          <CalendarNavigation view={view} setView={setView} />
          
          <div className="flex-1">
            {view === 'Month' && <MonthCalendar onDayClick={(date) => setSelectedDate(date)} />}
            {view === 'Week' && <WeekCalendar />}
            {view === 'List' && <CalendarListView />}
          </div>
          
          <CalendarLegend />
        </div>
        
        <div className="xl:col-span-1 space-y-6">
          <UpcomingEventsCard />
          <UpcomingHolidaysCard />
          <CelebrationsCard />
        </div>
      </div>

      <DayEventsDrawer isOpen={!!selectedDate} onClose={() => setSelectedDate(null)} dateStr={selectedDate || ''} onEventClick={setSelectedEventId} />
      <EventDetailDrawer isOpen={!!selectedEventId} onClose={() => setSelectedEventId(null)} event={selectedEvent} />
      <CreateEventModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
      <AddHolidayModal isOpen={isAddHolidayOpen} onClose={() => setIsAddHolidayOpen(false)} />
    </div>
  );
}
