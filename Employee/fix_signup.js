const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'src/app/signup/page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

content = content.replace(/import { MockPortalService } from "@\/services\/mockPortalService";/, `import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";`);
content = content.replace(/const res = await MockPortalService\.signup.*/, `
      const supabase = createClientComponentClient();
      const res = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
`);
content = content.replace(/if \(!res\.success\) \{/, `if (res.error) {`);

fs.writeFileSync(pagePath, content);
console.log('Patched signup page.');
