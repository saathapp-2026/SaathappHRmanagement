with open('test_leave_db.js', 'r') as f:
    c = f.read()

# Replace the specific INSERT line that failed
import re
c = re.sub(r'client\.query\("INSERT INTO leave_types.*?"\);', 'client.query("INSERT INTO leave_types (name, code, paid, requires_document) VALUES (\'Casual Leave\', \'CL\', true, false) ON CONFLICT (code) DO NOTHING RETURNING id;");', c)

with open('test_leave_db.js', 'w') as f:
    f.write(c)
