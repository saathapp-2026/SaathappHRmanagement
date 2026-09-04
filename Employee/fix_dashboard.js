const fs = require('fs');
let file = fs.readFileSync('src/app/(portal)/dashboard/page.tsx', 'utf8');
file = file.replace('import { MockPortalService } from "@/services/mockPortalService";\n\n"use client";\n', '"use client";\nimport { MockPortalService } from "@/services/mockPortalService";\n');
fs.writeFileSync('src/app/(portal)/dashboard/page.tsx', file);
