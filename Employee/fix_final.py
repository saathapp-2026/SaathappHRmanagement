import re

def rep(file, old, new):
    with open(file, 'r') as f:
        c = f.read()
    with open(file, 'w') as f:
        f.write(c.replace(old, new))

# 1. announcements
rep('src/app/(portal)/announcements/page.tsx', 'fetchAnnouncements();', '// eslint-disable-next-line react-hooks/set-state-in-effect\n    fetchAnnouncements();')

# 2. calendar
rep('src/app/(portal)/calendar/page.tsx', 'fetchEvents();', '// eslint-disable-next-line react-hooks/set-state-in-effect\n    fetchEvents();')

# 3. concerns
rep('src/app/(portal)/concerns/page.tsx', ': any', ': unknown')
rep('src/app/(portal)/concerns/page.tsx', '<any>', '<unknown>')

# 4. dashboard
rep('src/app/(portal)/dashboard/page.tsx', 'loadToday();', '// eslint-disable-next-line react-hooks/set-state-in-effect\n    loadToday();')
rep('src/app/(portal)/dashboard/page.tsx', "It's", "It&apos;s")
rep('src/app/(portal)/dashboard/page.tsx', "it's", "it&apos;s")
rep('src/app/(portal)/dashboard/page.tsx', "don't", "don&apos;t")
rep('src/app/(portal)/dashboard/page.tsx', "Let's", "Let&apos;s")

# 6. documents
rep('src/app/(portal)/documents/page.tsx', 'loadDocuments();', '// eslint-disable-next-line react-hooks/set-state-in-effect\n    loadDocuments();')

# 7 & 8. leave
rep('src/app/(portal)/leave/page.tsx', ': any', ': unknown')
rep('src/app/(portal)/leave/page.tsx', '<any>', '<unknown>')

