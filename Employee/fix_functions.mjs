import fs from 'fs';

function fixFile(file) {
  let code = fs.readFileSync(file, 'utf8');
  
  // Find useEffect and the function, swap them
  if (file.includes('announcements')) {
    code = code.replace(/useEffect\(\(\) => \{\n\s*fetchAnnouncements\(\);\n\s*\}, \[\]\);\n\n\s*async function fetchAnnouncements\(\) \{([\s\S]*?)  \};/m, (match, p1) => {
      return `async function fetchAnnouncements() {${p1}  }\n\n  useEffect(() => {\n    fetchAnnouncements();\n  }, []);`;
    });
  } else if (file.includes('calendar')) {
    code = code.replace(/useEffect\(\(\) => \{\n\s*fetchEvents\(\);\n\s*\}, \[\]\);\n\n\s*async function fetchEvents\(\) \{([\s\S]*?)  \};/m, (match, p1) => {
      return `async function fetchEvents() {${p1}  }\n\n  useEffect(() => {\n    fetchEvents();\n  }, []);`;
    });
  }
  
  fs.writeFileSync(file, code);
}

fixFile('src/app/(portal)/announcements/page.tsx');
fixFile('src/app/(portal)/calendar/page.tsx');
