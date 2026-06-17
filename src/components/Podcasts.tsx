'use client';

import React, { useState, useEffect } from 'react';
import { Mic } from 'lucide-react';
import type { Podcast } from '../lib/data';
import Modal from './Modal';
import { cardClasses } from './common/CardStyles';
import ContentCard from './common/ContentCard';
import ContentFilters from './common/ContentFilters';
import { useFilterParams } from '../hooks/useFilterParams';

const Podcasts: React.FC<{ initialPodcasts: Podcast[] }> = ({ initialPodcasts }) => {
  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>(initialPodcasts);
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);

  const allTags = Array.from(new Set(initialPodcasts.flatMap((podcast) => podcast.tags || [])));

  useFilterParams({
    languageFilter,
    setLanguageFilter,
    tagFilter,
    setTagFilter
  });

  useEffect(() => {
    let filtered = initialPodcasts;
    if (languageFilter !== 'all') {
      filtered = filtered.filter((podcast) => podcast.lang === languageFilter);
    }
    if (tagFilter) {
      filtered = filtered.filter((podcast) => podcast.tags && podcast.tags.includes(tagFilter));
    }
    setFilteredPodcasts(filtered);
  }, [initialPodcasts, languageFilter, tagFilter]);

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
            date={new Date(podcast.date)}
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
