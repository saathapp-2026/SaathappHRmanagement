const fs = require('fs');
let content = fs.readFileSync('supabase/migrations/20240101000001_rls_policies.sql', 'utf8');

const lines = content.split('\n');
let newLines = [];
let skip = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.includes('ALTER TABLE help_requests ENABLE ROW LEVEL SECURITY;')) {
        skip = true;
    } else if (line.includes('ALTER TABLE employee_documents ENABLE ROW LEVEL SECURITY;')) {
        skip = false;
    } else if (line.includes('ALTER TABLE employee_notifications ENABLE ROW LEVEL SECURITY;')) {
        skip = true;
    } else if (line.includes('ALTER TABLE employee_sessions ENABLE ROW LEVEL SECURITY;')) {
        skip = false;
    }
    
    if (!skip) {
        newLines.push(line);
    }
}

fs.writeFileSync('supabase/migrations/20240101000001_rls_policies.sql', newLines.join('\n'));
