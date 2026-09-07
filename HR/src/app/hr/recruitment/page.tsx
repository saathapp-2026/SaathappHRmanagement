import { Metadata } from 'next';
import { RecruitmentDashboard } from '@/components/hr/recruitment/RecruitmentDashboard';

export const metadata: Metadata = {
  title: 'Recruitment | HR Portal',
  description: 'Manage recruitment pipeline and jobs.',
};

export default function RecruitmentPage() {
  return <RecruitmentDashboard />;
}
