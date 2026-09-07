const fs = require('fs');
const path = require('path');

function fixManagerDecision() {
  const file = 'src/components/hr/offboarding/ManagerDecisionCard.tsx';
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/onChange=\{e => setStatus\(e.target.value as any\)\}/g, "onChange={e => setStatus(e.target.value as 'Pending' | 'Approved' | 'Discussed')}");
  fs.writeFileSync(file, content);
}

function fixUpcomingExits() {
  const file = 'src/components/hr/offboarding/UpcomingExitsCard.tsx';
  let content = fs.readFileSync(file, 'utf8');
  // Re-read it to fix the issue on line 1?
  content = content.replace(/export function UpcomingExitsCard.*$/m, "export function UpcomingExitsCard({ records }: { records: OffboardingRecord[] }) {");
  fs.writeFileSync(file, content);
}

function fixHeader() {
  const file = 'src/components/hr/offboarding/OffboardingHeader.tsx';
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/import React, \{ useState \} from 'react';/, "import React from 'react';");
  fs.writeFileSync(file, content);
}

function fixStartModal() {
  const file = 'src/components/hr/offboarding/StartOffboardingModal.tsx';
  let content = fs.readFileSync(file, 'utf8');
  // StartModal has onClose used in the JSX, wait, the warning says onClose is defined but never used. Ah, maybe in the interface?
  // Let's just suppress or check. If it's used in `<button onClick={onClose}>` it shouldn't be unused unless the component doesn't take it properly.
  // Actually, I'll ignore unused warnings, I only need to fix `any` errors.
}

fixManagerDecision();
fixUpcomingExits();
fixHeader();

