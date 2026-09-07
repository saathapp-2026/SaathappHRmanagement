const fs = require('fs');

function fix(file, param) {
  let content = fs.readFileSync(file, 'utf8');
  content = `import { Metadata } from 'next';
import { ${param === 'candidateId' ? 'CandidateDetail' : 'JobDetail'} } from '@/components/hr/recruitment/${param === 'candidateId' ? 'CandidateDetail' : 'JobDetail'}';

export const metadata: Metadata = {
  title: '${param === 'candidateId' ? 'Candidate Details' : 'Job Details'} | Recruitment',
};

export default async function Page({ params }: { params: Promise<{ ${param}: string }> }) {
  const resolved = await params;
  return <${param === 'candidateId' ? 'CandidateDetail' : 'JobDetail'} ${param}={resolved.${param}} />;
}
`;
  fs.writeFileSync(file, content);
}

fix('src/app/hr/recruitment/candidates/[candidateId]/page.tsx', 'candidateId');
fix('src/app/hr/recruitment/jobs/[jobId]/page.tsx', 'jobId');

