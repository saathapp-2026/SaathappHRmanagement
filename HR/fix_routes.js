const fs = require('fs');

function fixPage(file, paramName) {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(`params: { ${paramName}: string }`, `params: Promise<{ ${paramName}: string }>`);
  content = content.replace(`const { ${paramName} } = params;`, `const { ${paramName} } = React.use(params);`);
  content = content.replace(`const { ${paramName} } = params`, `const { ${paramName} } = React.use(params)`);
  if (!content.includes('React.use') && content.includes(`{ params }: { params: Promise<{ ${paramName}: string }> }`)) {
    // maybe they do `export default function Page({ params })`
  }
  
  if (content.includes(`React.use`) && !content.includes(`import React`)) {
    content = `import React from 'react';\n` + content;
  }
  fs.writeFileSync(file, content);
}

fixPage('src/app/hr/recruitment/candidates/[candidateId]/page.tsx', 'candidateId');
fixPage('src/app/hr/recruitment/jobs/[jobId]/page.tsx', 'jobId');

