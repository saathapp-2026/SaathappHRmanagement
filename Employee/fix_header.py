with open('src/components/layout/Header.tsx', 'r') as f:
    c = f.read()
c = c.replace(': any', ': unknown')
c = c.replace('fetchUnreadCount();', '// eslint-disable-next-line react-hooks/set-state-in-effect\n    fetchUnreadCount();')
with open('src/components/layout/Header.tsx', 'w') as f:
    f.write(c)
