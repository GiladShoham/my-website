import type { Metadata } from 'next';
import Podcasts from '@/components/Podcasts';
import { fetchPodcasts } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Podcasts',
  description: 'Podcast appearances and episodes featuring Gilad Shoham.',
};

export const revalidate = 3600;

export default async function PodcastsPage() {
  const podcasts = await fetchPodcasts();

  return <Podcasts initialPodcasts={podcasts} />;
}
