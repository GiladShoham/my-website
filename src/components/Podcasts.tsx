import React, { useState, useMemo } from 'react';
import { Mic } from 'lucide-react';
import { db } from '../lib/db';
import Modal from './Modal';
import { cardClasses } from './common/CardStyles';
import ContentCard from './common/ContentCard';
import ContentFilters from './common/ContentFilters';
import { useFilterParams } from '../hooks/useFilterParams';

interface Podcast {
  id: string;
  podcast_name: string;
  episode: string;
  date: Date;
  main_link: string;
  short_main_link: string;
  spotify_link: string | null;
  pod_link: string | null;
  apple: string | null;
  google: string | null;
  youtube_link: string | null;
  youtube_short_link: string | null;
  fb_link: string | null;
  fb_short_link: string | null;
  og_title: string;
  og_description: string;
  og_image_url: string;
  lang: string;
  tags: string[];
  description_lang: 'Hebrew' | 'English';
}

const Podcasts: React.FC = () => {
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);

  useFilterParams({
    languageFilter,
    setLanguageFilter,
    tagFilter,
    setTagFilter
  });

  // Live query — results update automatically, no manual refresh needed.
  const { isLoading, error, data } = db.useQuery({
    podcasts: { $: { order: { date: 'desc' } } }
  });

  const podcasts = useMemo<Podcast[]>(
    () =>
      (data?.podcasts ?? []).map((podcast) => ({
        ...podcast,
        date: new Date(podcast.date as string | number | Date),
        tags: podcast.tags || []
      })) as Podcast[],
    [data]
  );

  const allTags = useMemo(
    () => Array.from(new Set(podcasts.flatMap((podcast) => podcast.tags))),
    [podcasts]
  );

  const filteredPodcasts = useMemo(() => {
    let filtered = podcasts;
    if (languageFilter !== 'all') {
      filtered = filtered.filter(podcast => podcast.lang === languageFilter);
    }
    if (tagFilter) {
      filtered = filtered.filter(podcast => podcast.tags && podcast.tags.includes(tagFilter));
    }
    return filtered;
  }, [podcasts, languageFilter, tagFilter]);

  if (isLoading) return <div>Loading podcasts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className={cardClasses.filterSection}>
        <ContentFilters
          languageFilter={languageFilter}
          setLanguageFilter={setLanguageFilter}
          tagFilter={tagFilter}
          setTagFilter={setTagFilter}
          allTags={allTags}
        />
      </div>

      <div className={cardClasses.container}>
        {filteredPodcasts.map((podcast) => (
          <ContentCard
            key={podcast.id}
            title={podcast.og_title || `${podcast.podcast_name} - ${podcast.episode}`}
            description={podcast.og_description || ''}
            imageUrl={podcast.og_image_url}
            date={podcast.date}
            metadata={{
              podcastName: podcast.podcast_name,
              episodeNumber: podcast.episode
            }}
            tags={podcast.tags || []}
            icon={<Mic className="w-4 h-4" />}
            language={podcast.lang as 'Hebrew' | 'English'}
            descriptionLang={podcast.description_lang}
            onReadMore={() => {
              setIsModalOpen(true);
              setSelectedPodcast(podcast);
            }}
            links={[
              ...(podcast.pod_link ? [{ url: podcast.pod_link, label: 'Listen' }] : []),
              ...(podcast.spotify_link ? [{ url: podcast.spotify_link, label: 'Spotify', color: 'text-green-600 dark:text-green-400' }] : []),
              ...(podcast.apple ? [{ url: podcast.apple, label: 'Apple', color: 'text-purple-600 dark:text-purple-400' }] : []),
              ...(podcast.youtube_link ? [{ url: podcast.youtube_link, label: 'YouTube', color: 'text-red-600 dark:text-red-400' }] : [])
            ]}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPodcast ? (selectedPodcast.og_title || `${selectedPodcast.podcast_name} - ${selectedPodcast.episode}`) : ''}
        isRTL={selectedPodcast?.description_lang === 'Hebrew'}
      >
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
          {selectedPodcast?.og_description || ''}
        </p>
      </Modal>
    </section>
  );
};

export default Podcasts;