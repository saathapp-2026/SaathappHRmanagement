const fs = require('fs');
const file = 'src/app/(portal)/calendar/page.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/interface CalendarEvent {/, 'interface CalendarEvent {\n  event_type?: string;');

fs.writeFileSync(file, code);
