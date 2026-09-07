import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AnnouncementAudience, AnnouncementAudienceType } from '@/data/hr/announcements';
import { mockDepartments, mockWorkLocations, mockDesignations } from '@/data/hr/organization';
import { mockEmployee } from '@/data/hr/employees';

interface AnnouncementAudienceSelectorProps {
  audience: AnnouncementAudience;
  onChange: (audience: AnnouncementAudience) => void;
  isLocked?: boolean;
}

export function AnnouncementAudienceSelector({ audience, onChange, isLocked = false }: AnnouncementAudienceSelectorProps) {
  
  const handleTypeChange = (type: AnnouncementAudienceType) => {
    onChange({ type });
  };

  const handleMultipleSelect = (field: keyof AnnouncementAudience, value: string) => {
    const current = (audience[field] as string[]) || [];
    const updated = current.includes(value) 
      ? current.filter(item => item !== value)
      : [...current, value];
      
    onChange({ ...audience, [field]: updated });
  };

  return (
    <div className="space-y-4 border p-4 rounded-md">
      <div className="grid gap-2">
        <Label>Target Audience {isLocked && <span className="text-red-500 text-xs ml-2">(Locked after publication)</span>}</Label>
        <Select 
          value={audience.type} 
          onValueChange={(val) => handleTypeChange(val as AnnouncementAudienceType)}
          disabled={isLocked}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select audience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Everyone">Everyone</SelectItem>
            <SelectItem value="Department">Department Specific</SelectItem>
            <SelectItem value="Location">Location Specific</SelectItem>
            <SelectItem value="Designation">Designation Specific</SelectItem>
            <SelectItem value="Selected Employees">Selected Employees</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {audience.type === 'Everyone' && (
        <div className="bg-muted p-3 rounded-md text-sm text-muted-foreground">
          Estimated Reach: <strong>248 employees</strong>
        </div>
      )}

      {audience.type === 'Department' && (
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Select Departments (Multiple allowed)</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {mockDepartments.map(dept => {
              const isSelected = audience.departments?.includes(dept.id);
              return (
                <div 
                  key={dept.id}
                  className={`p-2 border rounded-md text-sm cursor-pointer transition-colors ${isSelected ? 'bg-primary/10 border-primary' : 'hover:bg-muted'} ${isLocked ? 'pointer-events-none opacity-70' : ''}`}
                  onClick={() => handleMultipleSelect('departments', dept.id)}
                >
                  <div className="font-medium">{dept.name}</div>
                  <div className="text-xs text-muted-foreground">{dept.employeesCount} employees</div>
                </div>
              );
            })}
          </div>
          {audience.departments && audience.departments.length > 0 && (
            <div className="bg-muted p-3 rounded-md text-sm text-muted-foreground mt-2">
              Estimated Reach: <strong>
                {mockDepartments
                  .filter(d => audience.departments?.includes(d.id))
                  .reduce((sum, d) => sum + d.employeesCount, 0)} employees
              </strong>
            </div>
          )}
        </div>
      )}

      {audience.type === 'Location' && (
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Select Locations (Multiple allowed)</Label>
          <div className="grid grid-cols-2 gap-2">
            {mockWorkLocations.map(loc => {
              const isSelected = audience.locations?.includes(loc.id);
              return (
                <div 
                  key={loc.id}
                  className={`p-2 border rounded-md text-sm cursor-pointer transition-colors ${isSelected ? 'bg-primary/10 border-primary' : 'hover:bg-muted'} ${isLocked ? 'pointer-events-none opacity-70' : ''}`}
                  onClick={() => handleMultipleSelect('locations', loc.id)}
                >
                  <div className="font-medium">{loc.name}</div>
                  <div className="text-xs text-muted-foreground">{loc.employeesCount} employees</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {audience.type === 'Designation' && (
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Select Designations (Multiple allowed)</Label>
          <div className="grid grid-cols-2 gap-2">
            {mockDesignations.map(desig => {
              const isSelected = audience.designations?.includes(desig.id);
              return (
                <div 
                  key={desig.id}
                  className={`p-2 border rounded-md text-sm cursor-pointer transition-colors ${isSelected ? 'bg-primary/10 border-primary' : 'hover:bg-muted'} ${isLocked ? 'pointer-events-none opacity-70' : ''}`}
                  onClick={() => handleMultipleSelect('designations', desig.id)}
                >
                  <div className="font-medium">{desig.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {audience.type === 'Selected Employees' && (
        <div className="space-y-2">
           <Label className="text-xs text-muted-foreground">Selected Employees</Label>
           <div className={`p-2 border rounded-md text-sm transition-colors ${isLocked ? 'pointer-events-none opacity-70' : ''}`}>
              {/* Mocking selection interaction since true employee search is out of scope for pure frontend UI */}
              <div 
                  className={`inline-flex items-center px-2 py-1 rounded bg-secondary text-secondary-foreground text-xs cursor-pointer ${audience.employees?.includes('EMP001') ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => handleMultipleSelect('employees', 'EMP001')}
              >
                  {mockEmployee.name} ({mockEmployee.id})
              </div>
           </div>
           {audience.employees && audience.employees.length > 0 && (
            <div className="bg-muted p-2 rounded-md text-sm text-muted-foreground mt-2">
              Selected: <strong>{audience.employees.length} employees</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
