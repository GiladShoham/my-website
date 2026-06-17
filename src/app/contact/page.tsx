import type { Metadata } from 'next';
import ContactMe from '@/components/ContactMe';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Gilad Shoham - invite for a talk or podcast, seek investment, mentorship, or smart home consulting.',
};

export default function ContactPage() {
  return <ContactMe />;
}
