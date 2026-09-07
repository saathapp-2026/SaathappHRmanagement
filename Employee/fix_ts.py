import os
import re

def fix_file(path, replacements):
    with open(path, 'r') as f:
        content = f.read()
    for o, n in replacements:
        content = content.replace(o, n)
    with open(path, 'w') as f:
        f.write(content)

fix_file('src/app/(portal)/concerns/page.tsx', [
    ('history.map((record: any', 'history.map((record: Record<string, any>'),
    ('history.map((record: unknown', 'history.map((record: Record<string, any>')
])

fix_file('src/app/(portal)/dashboard/page.tsx', [
    ('.message', '?.message')
])

fix_file('src/app/(portal)/documents/page.tsx', [
    ('catch (err: any)', 'catch (err)'),
    ('catch (err: unknown)', 'catch (err)'),
    ('err.message', '(err as Error).message')
])

fix_file('src/app/(portal)/help/new/page.tsx', [
    ('e.message', '(e as Error).message')
])

fix_file('src/app/(portal)/leave/page.tsx', [
    ('balances.map((b: unknown', 'balances.map((b: Record<string, any>'),
    ('balances.map((b: any', 'balances.map((b: Record<string, any>'),
    ('history.map((record: unknown', 'history.map((record: Record<string, any>'),
    ('history.map((record: any', 'history.map((record: Record<string, any>')
])

fix_file('src/components/profile/ProfileChangeRequestModal.tsx', [
    ('e.message', '(e as Error).message')
])
