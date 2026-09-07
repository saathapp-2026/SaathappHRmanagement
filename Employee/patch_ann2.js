const fs = require('fs');
let content = fs.readFileSync('src/app/(portal)/announcements/page.tsx', 'utf-8');
content = content.replace(/interface Announcement \{[\s\S]*?\}/, `interface Announcement {
  id: string;
  title: string;
  content: string;
  description?: string;
  type: string;
  priority: string;
  isRead?: boolean;
  created_at: string;
  published_at?: string;
  archived_at?: string;
  announcement_reads?: any[];
}`);
fs.writeFileSync('src/app/(portal)/announcements/page.tsx', content);
