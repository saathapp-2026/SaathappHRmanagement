const fs = require('fs');

const fileReplacements = {
  "src/app/(portal)/complete-profile/page.tsx": [
    {
      find: `const res = await fetch("/api/profile/complete", {`,
      replace: `import { completeProfile } from "@/services/mockApi";\n//...\nconst resData = await completeProfile({ ...data, userId: "emp-001" });`
    }
  ],
};
