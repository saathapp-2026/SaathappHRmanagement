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

  if (content.includes(': unknown')) {
    content = content.replace(/:\s*unknown/g, ': any');
    changed = true;
  }
  if (content.includes('as unknown')) {
    content = content.replace(/as\s*unknown/g, 'as any');
    changed = true;
  }
  if (content.includes('Record<string, unknown>')) {
    content = content.replace(/Record<string, unknown>/g, 'any');
    changed = true;
  }
  // Revert catch variable renaming
  if (content.includes('catch (_err:')) { content = content.replace(/catch \(_err:/g, 'catch (err:'); changed = true; }
  if (content.includes('console.error(_err)')) { content = content.replace(/console\.error\(_err\)/g, 'console.error(err)'); changed = true; }
  if (content.includes('catch (_e:')) { content = content.replace(/catch \(_e:/g, 'catch (e:'); changed = true; }
  if (content.includes('console.error(_e)')) { content = content.replace(/console\.error\(_e\)/g, 'console.error(e)'); changed = true; }
  if (content.includes('catch (_error:')) { content = content.replace(/catch \(_error:/g, 'catch (error:'); changed = true; }
  if (content.includes('console.error(_error)')) { content = content.replace(/console\.error\(_error\)/g, 'console.error(error)'); changed = true; }
  
  if (changed) fs.writeFileSync(file, content);
}

