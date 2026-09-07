const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('src');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  let changed = false;

  // Fix unescaped entities
  if (content.includes("we'd")) { content = content.replace(/we'd/g, 'we&apos;d'); changed = true; }
  
  // Fix exhaustive-deps suppression warnings
  if (content.includes('eslint-disable-next-line react-hooks/exhaustive-deps')) {
    content = content.replace(/\/\/\s*eslint-disable-next-line react-hooks\/exhaustive-deps/g, '');
    changed = true;
  }
  
  // Convert unused catch(err) to catch(_err)
  if (content.match(/catch\s*\(\s*err\s*:/)) {
     content = content.replace(/catch\s*\(\s*err\s*:/g, 'catch (_err:');
     content = content.replace(/console.error\(err\)/g, 'console.error(_err)');
     changed = true;
  }
  if (content.match(/catch\s*\(\s*e\s*:/)) {
     content = content.replace(/catch\s*\(\s*e\s*:/g, 'catch (_e:');
     content = content.replace(/console.error\(e\)/g, 'console.error(_e)');
     changed = true;
  }
  if (content.match(/catch\s*\(\s*error\s*:/)) {
     content = content.replace(/catch\s*\(\s*error\s*:/g, 'catch (_error:');
     content = content.replace(/console.error\(error\)/g, 'console.error(_error)');
     changed = true;
  }

  // Any specific 'any' or other warnings
  if (content.includes('(balData as any).')) {
    content = content.replace(/\(balData as any\)\./g, '(balData as Record<string, number>).');
    changed = true;
  }
  if (content.includes(': any')) {
    content = content.replace(/:\s*any/g, ': unknown');
    changed = true;
  }
  if (content.includes('as any')) {
    content = content.replace(/as\s*any/g, 'as unknown');
    changed = true;
  }

  if (content.includes('let subscription: unknown = null;')) {
    content = content.replace('let subscription: unknown = null;', 'let subscription: Record<string, unknown> | null = null;');
    changed = true;
  }
  
  // Unused imports - we can't easily parse them safely without AST, but we can comment them out or remove them manually below
  // For Supabase unused imports in services:
  if (file.includes('services/') && content.includes(`import { supabase } from '@/lib/supabase/client';`)) {
     if (content.split('supabase').length <= 2) {
        content = content.replace(`import { supabase } from '@/lib/supabase/client';`, '');
        changed = true;
     }
  }

  if (changed) fs.writeFileSync(file, content);
}
