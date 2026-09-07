const fs = require('fs');
const file = 'src/app/(portal)/calendar/page.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/calEvents\.map\(\(e: any\) => \(\{...\w+, eventItem\.event_type: eventItem\.event_type \|\| 'events'\}\)\)/g, "calEvents.map((e: any) => ({...e, event_type: e.event_type || 'events'}))");
code = code.replace(/eventItem\.event_type: eventItem\.event_type/g, "event_type: eventItem.event_type");

// actually let's just do a string replacement
code = code.replace(/\{\.\.\.e, eventItem\.event_type: eventItem\.event_type/g, "{...e, event_type: e.event_type");

fs.writeFileSync(file, code);
