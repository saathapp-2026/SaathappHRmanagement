const fs = require('fs');
const file = 'src/app/(portal)/calendar/page.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/events\.filter\(\(e: any\) =>/g, 'events.filter((eventItem: any) =>');
code = code.replace(/e\.event_type/g, 'eventItem.event_type');

fs.writeFileSync(file, code);
