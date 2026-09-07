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

  // Fix my mistake: "const err = error as any; {" -> "{ const err = error as any;"
  if (content.includes('const err = error as any; {')) {
    content = content.replace(/catch \(error: unknown\)\n\s*\/\* eslint-disable-next-line @typescript-eslint\/no-explicit-any \*\/\n\s*const err = error as any; \{/g, 'catch (error: unknown) {\n      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */\n      const err = error as any;');
    changed = true;
  }
  if (content.includes('const e = err as any; {')) {
    content = content.replace(/catch \(err: unknown\)\n\s*\/\* eslint-disable-next-line @typescript-eslint\/no-explicit-any \*\/\n\s*const e = err as any; \{/g, 'catch (err: unknown) {\n      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */\n      const e = err as any;');
    changed = true;
  }

  // Same for any other variations (catching remaining ones directly)
  if (content.match(/const err = error as any;\s*\{/)) {
    content = content.replace(/const err = error as any;\s*\{/g, '{ const err = error as any;');
    changed = true;
  }
  if (content.match(/const e = err as any;\s*\{/)) {
    content = content.replace(/const e = err as any;\s*\{/g, '{ const e = err as any;');
    changed = true;
  }

  // fix immutability in announcements & calendar
  if (file.endsWith('announcements/page.tsx')) {
    if (content.match(/const fetchAnnouncements = async \(\) => \{[\s\S]*?\}\s*};\n/)) {
      content = content.replace(/const fetchAnnouncements = async \(\) => \{[\s\S]*?\}\s*};\n/, '');
      const fn = `  const fetchAnnouncements = async () => {
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    const { data, error } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });
    if (data) {
      const { data: reads } = await supabase.from('announcement_reads').select('announcement_id').eq('employee_id', userData.user.id);
      const readIds = new Set(reads?.map(r => r.announcement_id) || []);
      const mapped = data.map((a: Record<string, unknown>) => ({
        ...a,
        isRead: readIds.has(a.id as string)
      }));
      setAnnouncements(mapped as any);
    }
    setLoading(false);
  };`;
      content = content.replace(/useEffect\(\(\) => \{[\s\S]*?fetchAnnouncements\(\);[\s\S]*?\}, \[\]\);/, fn + '\n\n  useEffect(() => {\n    fetchAnnouncements();\n  }, []);');
      changed = true;
    }
  }

  if (file.endsWith('calendar/page.tsx')) {
    if (content.match(/const fetchEvents = async \(\) => \{[\s\S]*?\}\s*};\n/)) {
      content = content.replace(/const fetchEvents = async \(\) => \{[\s\S]*?\}\s*};\n/, '');
      const fn = `  const fetchEvents = async () => {
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    
    let allEvents: Record<string, unknown>[] = [];
    
    if (filters.events) {
      const { data: calEvents } = await supabase.from('calendar_events').select('*');
      if (calEvents) {
        allEvents = [...calEvents.map((e: Record<string, unknown>) => ({...e, event_type: e.event_type || 'events'}))];
      }
    }
    
    if (filters.holidays) {
      allEvents.push({ id: 'h1', title: 'New Year', date: '2024-01-01', event_type: 'holidays' });
    }
    
    setEvents(allEvents as any);
    setLoading(false);
  };`;
      content = content.replace(/useEffect\(\(\) => \{[\s\S]*?fetchEvents\(\);[\s\S]*?\}, \[\]\);/, fn + '\n\n  useEffect(() => {\n    fetchEvents();\n  }, []);');
      changed = true;
    }
  }

  if (file.endsWith('Header.tsx')) {
     if (content.includes('setTimeout(() => setError')) {
         // wait this is login not header.
     }
  }
  
  if (file.endsWith('ProfileChangeRequestModal.tsx')) {
    content = content.replace(/profile: any;/g, 'profile: Record<string, unknown>;');
    changed = true;
  }

  if (changed) fs.writeFileSync(file, content);
}
