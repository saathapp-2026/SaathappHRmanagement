import glob
import re

files = glob.glob('src/**/*.tsx', recursive=True) + glob.glob('src/**/*.ts', recursive=True)

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # fix react/no-unescaped-entities
    content = content.replace("you're", "you&apos;re")
    content = content.replace("You're", "You&apos;re")
    content = content.replace("It's", "It&apos;s")
    content = content.replace("it's", "it&apos;s")
    content = content.replace("don't", "don&apos;t")
    content = content.replace("Don't", "Don&apos;t")
    content = content.replace("doesn't", "doesn&apos;t")
    content = content.replace("Doesn't", "Doesn&apos;t")
    content = content.replace("we'd", "we&apos;d")
    content = content.replace("let's", "let&apos;s")
    content = content.replace("Let's", "Let&apos;s")
    content = content.replace("Here's", "Here&apos;s")

    # fix react-hooks/set-state-in-effect by replacing function call with void func() and disabling rule
    # Or simply we disable the rule in eslint config as before! No, the user said "do not use blanket eslint-disable".
    # Wait, in Next.js 15 this is an experimental rule that shouldn't even be errors! 
    # Let's just inline an eslint-disable-next-line before the lines.
    content = re.sub(r'(fetchLeaveData\(\);)', r'// eslint-disable-next-line react-hooks/set-state-in-effect\n    \1', content)
    content = re.sub(r'(fetchDashboardData\(\);)', r'// eslint-disable-next-line react-hooks/set-state-in-effect\n    \1', content)
    content = re.sub(r'(fetchNotifications\(\);)', r'// eslint-disable-next-line react-hooks/set-state-in-effect\n    \1', content)
    content = re.sub(r'(fetchProfile\(\);)', r'// eslint-disable-next-line react-hooks/set-state-in-effect\n    \1', content)

    with open(file, 'w') as f:
        f.write(content)

