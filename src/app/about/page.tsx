import type { Metadata } from 'next';
import AboutMe from '@/components/AboutMe';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Gilad Shoham - Dev and Open Source Leader, Community Leader, Angel Investor, Public Speaker, Mentor, and Smart Home Expert.',
};

export default function AboutPage() {
  return <AboutMe />;
}
