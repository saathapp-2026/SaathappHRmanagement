const fs = require('fs');
let content = fs.readFileSync('src/app/login/page.tsx', 'utf8');

// Add validation and text
content = content.replace(
  'e.preventDefault();',
  `e.preventDefault();
    if (!email.includes('@') || password.length < 6) {
      setError("Please enter a valid email and a password of at least 6 characters.");
      return;
    }`
);

content = content.replace(
  'Welcome back! Please sign in to your account\n          </CardDescription>',
  `Welcome back! Please sign in to your account\n          </CardDescription>\n          <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded mt-2">Note: Uses localStorage for mock session behaviour (not secure authentication).</div>`
);

fs.writeFileSync('src/app/login/page.tsx', content);

let settings = fs.readFileSync('src/app/(portal)/settings/page.tsx', 'utf8');
settings = settings.replace(
  'const handleUpdatePassword = async () => {',
  `const handleUpdatePassword = async () => {
    const current = document.getElementById('current').value;
    const newP = document.getElementById('new').value;
    const conf = document.getElementById('confirm').value;
    if (!current || !newP || !conf) {
      alert("All fields are required.");
      return;
    }
    if (newP !== conf) {
      alert("New passwords do not match.");
      return;
    }`
);
fs.writeFileSync('src/app/(portal)/settings/page.tsx', settings);

let leave = fs.readFileSync('src/app/(portal)/leave/apply/page.tsx', 'utf8');
leave = leave.replace(
  'const handleSubmit = async (e: React.FormEvent) => {',
  `const handleSubmit = async (e: React.FormEvent) => {
    if (!leaveType || !startDate || !endDate || !reason) {
      alert("Please fill in all required fields.");
      e.preventDefault();
      return;
    }`
);
fs.writeFileSync('src/app/(portal)/leave/apply/page.tsx', leave);

