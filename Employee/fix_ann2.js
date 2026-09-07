const fs = require('fs');
const file = 'src/app/(portal)/announcements/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// The original file probably had `interface Announcement {` replaced with `interface Announcement {\n  announcement_reads?: any[];\n  archived_at?: string | null;`
// Then it also had `interface Announcement {` again? No, it just inserted inside. Let's reset the interface.

code = code.replace(/interface Announcement \{\s*announcement_reads\?: any\[\];\s*archived_at\?: string \| null;/, 'interface Announcement {');

fs.writeFileSync(file, code);
