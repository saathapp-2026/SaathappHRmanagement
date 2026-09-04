const fs = require('fs');

const filesToFix = [
  'src/app/(portal)/announcements/page.tsx',
  'src/app/(portal)/calendar/page.tsx',
  'src/app/(portal)/notifications/page.tsx'
];

for (const file of filesToFix) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace('useState([])', 'useState<any[]>([])');
  fs.writeFileSync(file, content);
}

let settings = fs.readFileSync('src/app/(portal)/settings/page.tsx', 'utf8');
settings = settings.replace(/document\.getElementById\('([^']+)'\)\.value/g, "(document.getElementById('$1') as HTMLInputElement).value");
fs.writeFileSync('src/app/(portal)/settings/page.tsx', settings);
