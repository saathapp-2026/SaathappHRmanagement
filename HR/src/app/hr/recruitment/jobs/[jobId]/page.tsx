import { Metadata } from 'next';
import { JobDetail } from '@/components/hr/recruitment/JobDetail';

export const metadata: Metadata = {
  title: 'Job Details | Recruitment',
};

export default async function Page(props: { params: Promise<{ jobId: string }> }) {
  const params = await props.params;
  return <JobDetail jobId={params.jobId} />;
}
