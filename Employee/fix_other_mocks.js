const fs = require('fs');
const path = require('path');

const fixCorrection = () => {
  const p = path.join(__dirname, 'src/app/(portal)/attendance/correction/page.tsx');
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(/import { MockPortalService } from "@\/services\/mockPortalService";/, `import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";`);
  content = content.replace(/const res = await MockPortalService\.submitAttendanceCorrection\(formData\);/, `
      const supabase = createClientComponentClient();
      const res = await supabase.from('attendance_corrections').insert(formData);
`);
  content = content.replace(/if \(!res\.success\)/, `if (res.error)`);
  fs.writeFileSync(p, content);
};

const fixSettings = () => {
  const p = path.join(__dirname, 'src/app/(portal)/settings/page.tsx');
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(/import { MockPortalService } from "@\/services\/mockPortalService";/, `import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";`);
  content = content.replace(/MockPortalService/g, '/* Mock */');
  fs.writeFileSync(p, content);
};

const fixDashboard = () => {
  const p = path.join(__dirname, 'src/app/(portal)/dashboard/page.tsx');
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(/import { MockPortalService } from "@\/services\/mockPortalService";/, ``);
  fs.writeFileSync(p, content);
};

fixCorrection();
fixSettings();
fixDashboard();
console.log('Fixed other mocks');
