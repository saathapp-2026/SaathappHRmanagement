const fs = require('fs');

function fix(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/val: string/g, 'val: string | null');
  content = content.replace(/val => setTypeFilter\(val\)/g, 'val => setTypeFilter(val || "")');
  content = content.replace(/val => setStatusFilter\(val\)/g, 'val => setStatusFilter(val || "")');
  content = content.replace(/value=\{typeFilter\} onValueChange=\{setTypeFilter\}/g, 'value={typeFilter} onValueChange={(val: string | null) => setTypeFilter(val || "")}');
  content = content.replace(/value=\{statusFilter\} onValueChange=\{setStatusFilter\}/g, 'value={statusFilter} onValueChange={(val: string | null) => setStatusFilter(val || "")}');
  content = content.replace(/onValueChange=\{\(val: string\) => setExportFormat\(val\)\}/g, 'onValueChange={(val: string | null) => setExportFormat(val || "csv")}');
  content = content.replace(/onValueChange=\{\(val: string\) => setExportRange\(val\)\}/g, 'onValueChange={(val: string | null) => setExportRange(val || "all")}');
  fs.writeFileSync(file, content);
}

fix('src/app/hr/audit-logs/page.tsx');
fix('src/components/hr/audit-logs/ExportAuditLogsModal.tsx');

