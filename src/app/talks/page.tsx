import type { Metadata } from 'next';
import Talks from '@/components/Talks';
import { fetchTalks } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Talks',
  description:
    'Talks by Gilad Shoham at meetups and international conferences on web, dev tools, architecture, JavaScript, development processes, smart homes, and more.',
};

// Re-generate the page at most once an hour (ISR) for fast, SEO-friendly pages.
export const revalidate = 3600;

export default async function TalksPage() {
  const talks = await fetchTalks();

  return <Talks initialTalks={talks} />;
}
