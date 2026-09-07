'use client';

import React, { useState, useMemo } from 'react';
import { 
  mockAuditLogs, 
  AuditLogEntry 
} from '@/data/hr/audit-logs';
import { AuditTable } from '@/components/hr/audit-logs/AuditTable';
import { AuditDetailDrawer } from '@/components/hr/audit-logs/AuditDetailDrawer';
import { ExportAuditLogsModal } from '@/components/hr/audit-logs/ExportAuditLogsModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Download, Search, Filter, Calendar as CalendarIcon, Info } from 'lucide-react';
import { subDays, isAfter } from 'date-fns';

const TABS = [
  { id: 'All Activity', label: 'All Activity' },
  { id: 'Employee', label: 'Employees' },
  { id: 'Approval', label: 'Approvals' },
  { id: 'Attendance', label: 'Attendance' },
  { id: 'Leave', label: 'Leave' },
  { id: 'Document', label: 'Documents' },
  { id: 'Settings', label: 'Settings' }
];

export default function AuditLogsPage() {
  const [logs] = useState<AuditLogEntry[]>(mockAuditLogs);
  const [activeTab, setActiveTab] = useState('All Activity');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('7days');
  const [moduleFilter, setModuleFilter] = useState('all');
  
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Stats
  const todayCount = logs.filter(l => new Date(l.timestamp).toDateString() === new Date().toDateString()).length;
  const employeeChangesCount = logs.filter(l => l.category === 'Employee').length;
  const approvalsCount = logs.filter(l => l.action === 'Approved').length;
  const sensitiveCount = logs.filter(l => l.sensitive).length;

  // Filtering
  const filteredLogs = useMemo(() => {
    let result = [...logs];

    // Tab Filter
    if (activeTab === 'Approval') {
      result = result.filter(l => l.action === 'Approved' || l.action === 'Rejected' || l.actionDescription.toLowerCase().includes('approv'));
    } else if (activeTab !== 'All Activity') {
      result = result.filter(l => l.category === activeTab);
    }

    // Search Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(l => 
        l.id.toLowerCase().includes(q) ||
        l.actor.name.toLowerCase().includes(q) ||
        (l.employeeName && l.employeeName.toLowerCase().includes(q)) ||
        (l.employeeId && l.employeeId.toLowerCase().includes(q)) ||
        l.entity.id.toLowerCase().includes(q) ||
        l.actionDescription.toLowerCase().includes(q)
      );
    }

    // Module Filter
    if (moduleFilter !== 'all') {
      result = result.filter(l => l.module.toLowerCase() === moduleFilter.toLowerCase());
    }

    // Date Filter
    const now = new Date();
    if (dateRange === 'today') {
      result = result.filter(l => new Date(l.timestamp).toDateString() === now.toDateString());
    } else if (dateRange === '7days') {
      const sevenDaysAgo = subDays(now, 7);
      result = result.filter(l => isAfter(new Date(l.timestamp), sevenDaysAgo));
    } else if (dateRange === '30days') {
      const thirtyDaysAgo = subDays(now, 30);
      result = result.filter(l => isAfter(new Date(l.timestamp), thirtyDaysAgo));
    }

    // Sort: Newest First
    result.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return result;
  }, [logs, activeTab, searchQuery, dateRange, moduleFilter]);

  const handleExport = (format: string, scope: string, includeDetails: boolean) => {
    alert(`Exporting logs as ${format.toUpperCase()} (${scope}). Include Details: ${includeDetails}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Audit Logs</h1>
          <p className="text-gray-500 mt-1">Review historical HR actions, record changes and user activity across the HR portal.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2" onClick={() => setIsExportModalOpen(true)}>
            <Download className="w-4 h-4" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Integrity Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 mt-0.5" />
        <p className="text-sm text-blue-800">
          <strong>Audit History:</strong> Audit entries are historical records of HR actions and should not be edited or deleted.
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Actions Today</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{todayCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Employee Changes</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{employeeChangesCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Approvals</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{approvalsCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-red-200 bg-red-50/30">
          <p className="text-sm font-medium text-red-600">Sensitive Changes</p>
          <p className="text-2xl font-bold text-red-700 mt-1">{sensitiveCount}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
        
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search by ID, actor, employee, or action..."
            className="pl-9 w-full bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Select value={moduleFilter} onValueChange={(val) => setModuleFilter(val as string)}>
            <SelectTrigger className="w-[160px] bg-white">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <SelectValue placeholder="Module" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Modules</SelectItem>
              <SelectItem value="Employees">Employees</SelectItem>
              <SelectItem value="Leave">Leave</SelectItem>
              <SelectItem value="Attendance">Attendance</SelectItem>
              <SelectItem value="Documents">Documents</SelectItem>
              <SelectItem value="Profile Requests">Profile Requests</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateRange} onValueChange={(val) => setDateRange(val as string)}>
            <SelectTrigger className="w-[160px] bg-white">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-gray-500" />
                <SelectValue placeholder="Date Range" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="ghost" onClick={() => {
            setSearchQuery('');
            setModuleFilter('all');
            setDateRange('7days');
          }}>
            Reset
          </Button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-gray-500 mr-2">Quick Filters:</span>
        <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200" onClick={() => setDateRange('today')}>
          Today
        </Badge>
        <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200 bg-red-50 text-red-700" onClick={() => setSearchQuery('Sensitive')}>
          Sensitive Changes
        </Badge>
        <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200" onClick={() => setActiveTab('Approval')}>
          Approvals
        </Badge>
      </div>

      {/* Table Content */}
      <AuditTable 
        logs={filteredLogs} 
        onViewDetails={(log) => setSelectedLog(log)} 
      />

      {/* Pagination (Mock) */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <p>Showing 1-{filteredLogs.length} of {filteredLogs.length} logs</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>

      {/* Drawers and Modals */}
      <AuditDetailDrawer 
        log={selectedLog}
        isOpen={!!selectedLog}
        onClose={() => setSelectedLog(null)}
      />

      <ExportAuditLogsModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />

    </div>
  );
}
