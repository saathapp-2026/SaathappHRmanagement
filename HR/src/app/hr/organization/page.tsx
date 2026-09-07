'use client';
import React, { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { 
  mockOrgChart, mockDepartments, mockDesignations, mockTeams, mockWorkLocations,
  OrgNode, Department, Designation, Team, WorkLocation
} from '@/data/hr/organization';

import { OrganizationStats } from '@/components/hr/organization/OrganizationStats';
import { OrganizationTabs } from '@/components/hr/organization/OrganizationTabs';
import { OrganizationInsights } from '@/components/hr/organization/OrganizationInsights';
import { OrganizationAttentionCard } from '@/components/hr/organization/OrganizationAttentionCard';
import { DeactivateOrganizationItemModal } from '@/components/hr/organization/DeactivateOrganizationItemModal';

import { OrgChart } from '@/components/hr/organization/OrgChart';
import { EmployeeOrgDrawer } from '@/components/hr/organization/EmployeeOrgDrawer';

import { DepartmentsTable } from '@/components/hr/organization/DepartmentsTable';
import { DepartmentDrawer } from '@/components/hr/organization/DepartmentDrawer';
import { AddDepartmentModal } from '@/components/hr/organization/AddDepartmentModal';
import { EditDepartmentModal } from '@/components/hr/organization/EditDepartmentModal';

import { DesignationsTable } from '@/components/hr/organization/DesignationsTable';
import { DesignationDrawer } from '@/components/hr/organization/DesignationDrawer';
import { AddDesignationModal } from '@/components/hr/organization/AddDesignationModal';

import { TeamsTable } from '@/components/hr/organization/TeamsTable';
import { TeamDrawer } from '@/components/hr/organization/TeamDrawer';
import { AddTeamModal } from '@/components/hr/organization/AddTeamModal';

import { WorkLocationsTable } from '@/components/hr/organization/WorkLocationsTable';
import { WorkLocationDrawer } from '@/components/hr/organization/WorkLocationDrawer';
import { AddWorkLocationModal } from '@/components/hr/organization/AddWorkLocationModal';

export default function OrganizationPage() {
  const [activeTab, setActiveTab] = useState('Org Chart');
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

  // Detail Drawer States
  const [selectedNode, setSelectedNode] = useState<OrgNode | null>(null);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [selectedDesig, setSelectedDesig] = useState<Designation | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedLoc, setSelectedLoc] = useState<WorkLocation | null>(null);

  // Add Modal States
  const [isAddDeptOpen, setIsAddDeptOpen] = useState(false);
  const [isAddDesigOpen, setIsAddDesigOpen] = useState(false);
  const [isAddTeamOpen, setIsAddTeamOpen] = useState(false);
  const [isAddLocOpen, setIsAddLocOpen] = useState(false);

  // Edit Modal States (using selected item state as trigger isn't ideal for complex apps, but fine for mock)
  const [isEditDeptOpen, setIsEditDeptOpen] = useState(false);
  
  // Deactivate Modal State
  const [deactivateTarget, setDeactivateTarget] = useState<{name: string, type: string, count: number} | null>(null);

  const handleAddClick = (type: string) => {
    setIsAddMenuOpen(false);
    if (type === 'Department') setIsAddDeptOpen(true);
    if (type === 'Designation') setIsAddDesigOpen(true);
    if (type === 'Team') setIsAddTeamOpen(true);
    if (type === 'Work Location') setIsAddLocOpen(true);
  };

  const openDeactivate = (name: string, type: string, count: number) => {
    setDeactivateTarget({ name, type, count });
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Organization</h1>
          <p className="text-sm text-gray-500 mt-1">Manage organizational structure, departments, designations, reporting relationships, teams and work locations.</p>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2"
          >
            <Plus size={16} /> Add <ChevronDown size={14} className={isAddMenuOpen ? "rotate-180 transition-transform" : "transition-transform"} />
          </button>
          
          {isAddMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsAddMenuOpen(false)}></div>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20 py-1">
                <button onClick={() => handleAddClick('Department')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors">Add Department</button>
                <button onClick={() => handleAddClick('Designation')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors">Add Designation</button>
                <button onClick={() => handleAddClick('Team')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors">Add Team</button>
                <button onClick={() => handleAddClick('Work Location')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors">Add Work Location</button>
              </div>
            </>
          )}
        </div>
      </div>

      <OrganizationStats />
      
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2 mb-6 hidden sm:block">
            <OrganizationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className="sm:hidden mb-6">
            <select 
              value={activeTab} 
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm text-sm font-bold text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {['Org Chart', 'Departments', 'Designations', 'Teams', 'Work Locations'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          
          <div>
            {activeTab === 'Org Chart' && <OrgChart onNodeClick={setSelectedNode} />}
            {activeTab === 'Departments' && <DepartmentsTable departments={mockDepartments} onRowClick={setSelectedDept} onEdit={(d) => { setSelectedDept(d); setIsEditDeptOpen(true); }} onDeactivate={(d) => openDeactivate(d.name, 'Department', d.employeesCount)} />}
            {activeTab === 'Designations' && <DesignationsTable designations={mockDesignations} onRowClick={setSelectedDesig} onEdit={() => {}} onDeactivate={(d) => openDeactivate(d.name, 'Designation', d.employeesCount)} />}
            {activeTab === 'Teams' && <TeamsTable teams={mockTeams} onRowClick={setSelectedTeam} onEdit={() => {}} onDeactivate={(t) => openDeactivate(t.name, 'Team', t.membersCount)} />}
            {activeTab === 'Work Locations' && <WorkLocationsTable locations={mockWorkLocations} onRowClick={setSelectedLoc} onEdit={() => {}} onDeactivate={(l) => openDeactivate(l.name, 'Work Location', l.employeesCount)} />}
          </div>
        </div>
        
        <div className="xl:col-span-1 space-y-6">
          <OrganizationInsights />
          <OrganizationAttentionCard />
        </div>
      </div>

      {/* Drawers */}
      <EmployeeOrgDrawer isOpen={!!selectedNode} onClose={() => setSelectedNode(null)} node={selectedNode} />
      <DepartmentDrawer isOpen={!!selectedDept && !isEditDeptOpen} onClose={() => setSelectedDept(null)} dept={selectedDept} onEdit={() => setIsEditDeptOpen(true)} />
      <DesignationDrawer isOpen={!!selectedDesig} onClose={() => setSelectedDesig(null)} desig={selectedDesig} onEdit={() => {}} />
      <TeamDrawer isOpen={!!selectedTeam} onClose={() => setSelectedTeam(null)} team={selectedTeam} onEdit={() => {}} />
      <WorkLocationDrawer isOpen={!!selectedLoc} onClose={() => setSelectedLoc(null)} loc={selectedLoc} onEdit={() => {}} />

      {/* Modals */}
      <AddDepartmentModal isOpen={isAddDeptOpen} onClose={() => setIsAddDeptOpen(false)} />
      <EditDepartmentModal isOpen={isEditDeptOpen} onClose={() => setIsEditDeptOpen(false)} dept={selectedDept} />
      <AddDesignationModal isOpen={isAddDesigOpen} onClose={() => setIsAddDesigOpen(false)} />
      <AddTeamModal isOpen={isAddTeamOpen} onClose={() => setIsAddTeamOpen(false)} />
      <AddWorkLocationModal isOpen={isAddLocOpen} onClose={() => setIsAddLocOpen(false)} />
      
      <DeactivateOrganizationItemModal 
        isOpen={!!deactivateTarget} 
        onClose={() => setDeactivateTarget(null)} 
        itemName={deactivateTarget?.name || ''}
        itemType={deactivateTarget?.type || ''}
        warningCount={deactivateTarget?.count}
      />
    </div>
  );
}
