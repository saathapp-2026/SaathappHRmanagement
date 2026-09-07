// @ts-nocheck

import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AnnouncementFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (value: string | null) => void;
  priorityFilter: string;
  onPriorityFilterChange: (value: string | null) => void;
  onReset: () => void;
}

export function AnnouncementFilters({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  onReset
}: AnnouncementFiltersProps) {
  const hasActiveFilters = searchTerm !== '' || categoryFilter !== 'all' || priorityFilter !== 'all';

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search announcements, ID, or creator..." 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <div className="flex gap-2">
        <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="General">General</SelectItem>
            <SelectItem value="Policy">Policy</SelectItem>
            <SelectItem value="Holiday">Holiday</SelectItem>
            <SelectItem value="Event">Event</SelectItem>
            <SelectItem value="Training">Training</SelectItem>
            <SelectItem value="Payroll">Payroll</SelectItem>
            <SelectItem value="Benefits">Benefits</SelectItem>
            <SelectItem value="Emergency">Emergency</SelectItem>
            <SelectItem value="HR Update">HR Update</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={onPriorityFilterChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="Normal">Normal</SelectItem>
            <SelectItem value="Important">Important</SelectItem>
            <SelectItem value="Urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="ghost" size="icon" onClick={onReset} title="Reset filters">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
