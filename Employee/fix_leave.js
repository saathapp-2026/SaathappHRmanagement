const fs = require('fs');
const file = 'src/app/(portal)/leave/page.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  /const arr = \[\s*\{\s*leaveType: "Casual Leave"[^\]]+\];/m,
  `const arr = balData.map((b: any) => ({
            leaveType: b.leave_types?.name || 'Unknown',
            total: b.allocated_days,
            used: b.used_days + (b.pending_days || 0)
          }));`
);

fs.writeFileSync(file, code);
