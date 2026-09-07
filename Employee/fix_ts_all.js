const fs = require('fs');

let cal = fs.readFileSync('src/app/(portal)/calendar/page.tsx', 'utf8');
cal = cal.replace(/event_type\?: string;/, "event_type: string;");
fs.writeFileSync('src/app/(portal)/calendar/page.tsx', cal);

let ann = fs.readFileSync('src/app/(portal)/announcements/page.tsx', 'utf8');
ann = ann.replace(/interface Announcement \{/, "interface Announcement {\n  announcement_reads?: any[];\n  archived_at?: string | null;");
fs.writeFileSync('src/app/(portal)/announcements/page.tsx', ann);
