import os
import glob

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    if 'fetch("/api' not in content and "fetch(`/api" not in content and "fetch('/api" not in content:
        return

    print(f"Patching {filepath}")
    
    # Replace fetch with mockFetch
    content = content.replace('fetch("/api', 'mockFetch("/api')
    content = content.replace('fetch(`/api', 'mockFetch(`/api')
    content = content.replace("fetch('/api", "mockFetch('/api")
    
    # Add import statement after 'use client' or at the top
    import_stmt = 'import { mockFetch } from "@/services/mockFetch";\n'
    if 'mockFetch' not in content:
        if '"use client";' in content:
            content = content.replace('"use client";', '"use client";\n' + import_stmt)
        elif "'use client';" in content:
            content = content.replace("'use client';", "'use client';\n" + import_stmt)
        else:
            content = import_stmt + content

    with open(filepath, 'w') as f:
        f.write(content)

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            process_file(os.path.join(root, file))

