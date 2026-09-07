const fs = require('fs');
let content = fs.readFileSync('src/app/(portal)/calendar/page.tsx', 'utf-8');
content = content.replace(/interface CalendarEvent \{[\s\S]*?\}/, `interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  event_type?: string;
  all_day: boolean;
}`);
fs.writeFileSync('src/app/(portal)/calendar/page.tsx', content);
