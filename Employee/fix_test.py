import re
with open('test_leave_db.js', 'r') as f:
    text = f.read()

text = text.replace("if (leaveTypeRes.rows.length === 0) throw new Error('Casual Leave'type not found.\");", "if (leaveTypeRes.rows.length === 0) throw new Error('Casual Leave type not found');")
text = text.replace("client.query(\"INSERT INTO leave_types (name, description, default_days, is_paid) VALUES ('Casual Leave', 'desc', 10, true) ON CONFLICT (name) DO UPDATE SET default_days=10 RETURNING id;\");", "client.query(\"INSERT INTO leave_types (name, description, default_days, is_paid) VALUES ('Casual Leave', 'desc', 10, true) RETURNING id;\");")

with open('test_leave_db.js', 'w') as f:
    f.write(text)
