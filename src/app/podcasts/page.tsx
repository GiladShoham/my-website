import type { Metadata } from 'next';
import Podcasts from '@/components/Podcasts';
import { fetchPodcasts } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Podcasts',
  description: 'Podcast appearances and episodes featuring Gilad Shoham.',
};

// Render on every request so newly-added InstantDB rows appear immediately.
export const dynamic = 'force-dynamic';

export default async function PodcastsPage() {
  const podcasts = await fetchPodcasts();

  return <Podcasts initialPodcasts={podcasts} />;
}
