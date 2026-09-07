'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Download } from 'lucide-react';

interface ExportAuditLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: string, scope: string, includeDetails: boolean) => void;
}

export function ExportAuditLogsModal({ isOpen, onClose, onExport }: ExportAuditLogsModalProps) {
  const [format, setFormat] = useState('csv');
  const [scope, setScope] = useState('current');
  const [includeDetails, setIncludeDetails] = useState(true);

  const handleExport = () => {
    onExport(format, scope, includeDetails);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Audit Logs</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <div className="space-y-3">
            <Label>Format</Label>
            <Select value={format} onValueChange={(val) => setFormat(val as string)}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV (Spreadsheet)</SelectItem>
                <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                <SelectItem value="pdf">PDF Document</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Scope</Label>
            <Select value={scope} onValueChange={(val) => setScope(val as string)}>
              <SelectTrigger>
                <SelectValue placeholder="Select scope" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Filtered View</SelectItem>
                <SelectItem value="all">All Logs (Last 30 Days)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Include Change Details</Label>
              <p className="text-sm text-gray-500">Export before & after values</p>
            </div>
            <Switch
              checked={includeDetails}
              onCheckedChange={setIncludeDetails}
            />
          </div>
          
          <div className="bg-amber-50 p-3 rounded text-sm text-amber-800 border border-amber-200">
            Sensitive data will automatically be masked in the exported file.
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleExport} className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
