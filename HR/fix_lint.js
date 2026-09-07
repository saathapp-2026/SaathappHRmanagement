const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix e.target as any
  content = content.replace(/e\.target as any/g, 'e.target as HTMLInputElement');

  // Fix quotes
  content = content.replace(/"\{record\.employeeRemarks\}"/g, '&quot;{record.employeeRemarks}&quot;');
  content = content.replace(/"\{record\.managerDecision\.remark\}"/g, '&quot;{record.managerDecision.remark}&quot;');
  content = content.replace(/"\{ei\.additionalFeedback \|\| 'No additional feedback provided\.'\}"/g, '&quot;{ei.additionalFeedback || \'No additional feedback provided.\'}&quot;');
  
  // Final checklist any
  content = content.replace(/t.status === 'Not Applicable' as any/g, "t.status === ('Not Applicable' as KTTaskStatus)");

  // Upcoming exits any
  content = content.replace(/UpcomingExitsCard\(\{ records \}: \{ records: OffboardingRecord\[\] \}/g, 'UpcomingExitsCard({ records }: { records: OffboardingRecord[] })');
  
  // onUpdate: any -> onUpdate: (record: Partial<OffboardingRecord>) => void (already done by sed maybe, let's make sure)
  content = content.replace(/onUpdate: any/g, 'onUpdate: (record: Partial<OffboardingRecord>) => void');

  // unused vars removal where possible, but not strict.
  content = content.replace(/import \{ Edit \} from 'lucide-react';/g, '');
  content = content.replace(/import \{ IndianRupee, AlertTriangle \}/g, 'import { AlertTriangle }');
  content = content.replace(/import \{ Plus, Edit2, CheckCircle2 \}/g, 'import { Plus }');

  fs.writeFileSync(filePath, content);
}

const dir = 'src/components/hr/offboarding';
fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.tsx')) {
    processFile(path.join(dir, file));
  }
});
