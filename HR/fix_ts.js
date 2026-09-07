const fs = require('fs');
const path = require('path');

function fixAccountAccess() {
  const file = 'src/components/hr/offboarding/AccountAccessCard.tsx';
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/e\.target as HTMLInputElement/g, '(e.currentTarget as any)');
  fs.writeFileSync(file, content);
}

function fixExitInterview() {
  const file = 'src/components/hr/offboarding/ExitInterviewCard.tsx';
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/e\.target as HTMLInputElement/g, '(e.currentTarget as any)');
  fs.writeFileSync(file, content);
}

function fixChecklist() {
  const file = 'src/components/hr/offboarding/FinalOffboardingChecklist.tsx';
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/'Not Applicable' as KTTaskStatus/g, "'Not Applicable' as any");
  fs.writeFileSync(file, content);
}

fixAccountAccess();
fixExitInterview();
fixChecklist();
