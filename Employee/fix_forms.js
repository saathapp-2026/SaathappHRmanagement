const fs = require('fs');

let leave = fs.readFileSync('src/app/(portal)/leave/apply/page.tsx', 'utf8');
leave = leave.replace(
  'if (!leaveType || !startDate || !endDate || !reason) {',
  'if (!formData.leaveType || !formData.startDate || !formData.endDate || !formData.reason) {'
);
fs.writeFileSync('src/app/(portal)/leave/apply/page.tsx', leave);

let attendance = fs.readFileSync('src/app/(portal)/attendance/correction/page.tsx', 'utf8');
attendance = attendance.replace(
  'const handleSubmit = async (e: React.FormEvent) => {',
  `const handleSubmit = async (e: React.FormEvent) => {
    if (!formData.date || !formData.reason) {
      setError("Please fill in all required fields.");
      e.preventDefault();
      return;
    }`
);
fs.writeFileSync('src/app/(portal)/attendance/correction/page.tsx', attendance);

let help = fs.readFileSync('src/app/(portal)/help/new/page.tsx', 'utf8');
help = help.replace(
  'const handleSubmit = async (e: React.FormEvent) => {',
  `const handleSubmit = async (e: React.FormEvent) => {
    if (!formData.subject || !formData.category || !formData.description) {
      setError("Please fill in all required fields.");
      e.preventDefault();
      return;
    }`
);
fs.writeFileSync('src/app/(portal)/help/new/page.tsx', help);

let concern = fs.readFileSync('src/app/(portal)/concerns/raise/page.tsx', 'utf8');
concern = concern.replace(
  'const handleSubmit = async (e: React.FormEvent) => {',
  `const handleSubmit = async (e: React.FormEvent) => {
    if (!formData.subject || !formData.description) {
      setError("Please fill in all required fields.");
      e.preventDefault();
      return;
    }`
);
fs.writeFileSync('src/app/(portal)/concerns/raise/page.tsx', concern);
