import React, { useState, useEffect } from 'react';
import { Mic, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Modal from './Modal';
import { cardClasses } from './common/CardStyles';
import { formClasses } from './common/FormStyles';
import ContentCard from './common/ContentCard';

interface Podcast {
  id: number;
  podcast_name: string;
  episode: string;
  date: string;
  main_link: string;
  short_main_link: string;
  spotify_link: string | null;
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
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('');
  const [allTags, setAllTags] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);

  useEffect(() => {
    fetchPodcasts();
  }, []);

  useEffect(() => {
    filterPodcasts();
  }, [podcasts, languageFilter, tagFilter]);

  const fetchPodcasts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('podcasts')
        .select('*, og_title, og_description, og_image_url, lang, tags')
        .order('date', { ascending: false });

      if (error) throw error;

      setPodcasts(data || []);
      const tags = Array.from(new Set(data?.flatMap(podcast => podcast.tags || []) || []));
      setAllTags(tags);
    } catch (error) {
      setError('Failed to fetch podcasts');
      console.error('Error fetching podcasts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPodcasts = () => {
    let filtered = podcasts;
    if (languageFilter !== 'all') {
      filtered = filtered.filter(podcast => podcast.lang === languageFilter);
    }
    if (tagFilter) {
      filtered = filtered.filter(podcast => podcast.tags && podcast.tags.includes(tagFilter));
    }
    setFilteredPodcasts(filtered);
  };

  if (loading) return <div>Loading podcasts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className={cardClasses.filterSection}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label htmlFor="language-filter" className={formClasses.label}>
              Language
            </label>
            <select
              id="language-filter"
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className={formClasses.select}
            >
              <option value="all">All Languages</option>
              <option value="English">English</option>
              <option value="Hebrew">Hebrew</option>
            </select>
          </div>
          
          <div className="relative">
            <label htmlFor="tag-filter" className={formClasses.label}>
              Topic
            </label>
            <select
              id="tag-filter"
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className={formClasses.select}
            >
              <option value="">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={cardClasses.container}>
        {filteredPodcasts.map((podcast) => (
          <ContentCard
            key={podcast.id}
            title={podcast.og_title || `${podcast.podcast_name} - ${podcast.episode}`}
            description={podcast.og_description || ''}
            imageUrl={podcast.og_image_url}
            date={new Date(podcast.date).toLocaleDateString()}
            tags={podcast.tags || []}
            icon={<Mic className="w-4 h-4" />}
            language={podcast.lang as 'Hebrew' | 'English'}
            descriptionLang={podcast.description_lang}
            onReadMore={() => {
              setIsModalOpen(true);
              setSelectedPodcast(podcast);
            }}
            links={[
              ...(podcast.main_link ? [{ url: podcast.main_link, label: 'Listen' }] : []),
              ...(podcast.spotify_link ? [{ url: podcast.spotify_link, label: 'Spotify', color: 'text-green-600 dark:text-green-400' }] : []),
              ...(podcast.apple ? [{ url: podcast.apple, label: 'Apple', color: 'text-purple-600 dark:text-purple-400' }] : []),
              ...(podcast.google ? [{ url: podcast.google, label: 'Google', color: 'text-red-600 dark:text-red-400' }] : [])
            ]}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPodcast ? (selectedPodcast.og_title || `${selectedPodcast.podcast_name} - ${selectedPodcast.episode}`) : ''}
      >
        <p className={`text-gray-600 dark:text-gray-300 whitespace-pre-wrap ${selectedPodcast?.description_lang === 'Hebrew' ? 'text-right dir-rtl' : ''}`}>
          {selectedPodcast?.og_description || ''}
        </p>
      </Modal>
    </section>
  );
};

export default Podcasts;