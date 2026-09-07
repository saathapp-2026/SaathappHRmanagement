import { Metadata } from 'next';
import NotificationsClient from '@/components/hr/notifications/NotificationsClient';

export const metadata: Metadata = {
  title: 'Notifications | HR Portal',
  description: 'Manage HR notifications and alerts.',
};

export default function NotificationsPage() {
  return <NotificationsClient />;
}
