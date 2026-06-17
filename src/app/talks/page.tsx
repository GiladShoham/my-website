import type { Metadata } from 'next';
import Talks from '@/components/Talks';
import { fetchTalks } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Talks',
  description:
    'Talks by Gilad Shoham at meetups and international conferences on web, dev tools, architecture, JavaScript, development processes, smart homes, and more.',
};

// Render on every request so newly-added InstantDB rows appear immediately.
// The page is still server-rendered (content in the HTML for SEO); the only
// cost is one fast DB query per request.
export const dynamic = 'force-dynamic';

export default async function TalksPage() {
  const talks = await fetchTalks();

  return <Talks initialTalks={talks} />;
}
