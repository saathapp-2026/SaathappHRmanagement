import { Metadata } from 'next';
import { CandidateDetail } from '@/components/hr/recruitment/CandidateDetail';

export const metadata: Metadata = {
  title: 'Candidate Details | Recruitment',
};

export default async function Page(props: { params: Promise<{ candidateId: string }> }) {
  const params = await props.params;
  return <CandidateDetail candidateId={params.candidateId} />;
}
