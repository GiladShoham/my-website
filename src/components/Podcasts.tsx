import React, { useState, useEffect } from 'react';
import { Mic, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Modal from './Modal';

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
}

const PodcastCard: React.FC<{ podcast: Podcast }> = ({ podcast }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const title = podcast.og_title || `${podcast.podcast_name} - ${podcast.episode}`;
  const description = podcast.og_description || '';

  const languageFlag = podcast.lang === 'Hebrew' ? '🇮🇱' : '🇺🇸';

  return (
    <>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        {podcast.og_image_url && (
          <img src={podcast.og_image_url} alt={title} className="w-full h-32 object-cover rounded-t-lg mb-2" />
        )}
        <h3 className="text-lg font-semibold mb-1 truncate">
          {languageFlag} {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          {description.slice(0, 100)}
          {description.length > 100 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="ml-1 text-blue-600 dark:text-blue-400 hover:underline"
            >
              Read More
            </button>
          )}
        </p>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
          <Mic className="mr-1 w-4 h-4" />
          <span>{podcast.podcast_name} - {new Date(podcast.date).toLocaleDateString()}</span>
        </div>
        {podcast.tags && podcast.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {podcast.tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {podcast.main_link && (
            <a href={podcast.main_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center text-sm">
              <ExternalLink size={12} className="mr-1" /> Listen
            </a>
          )}
          {podcast.spotify_link && (
            <a href={podcast.spotify_link} target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-400 hover:underline flex items-center text-sm">
              <ExternalLink size={12} className="mr-1" /> Spotify
            </a>
          )}
          {podcast.apple && (
            <a href={podcast.apple} target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline flex items-center text-sm">
              <ExternalLink size={12} className="mr-1" /> Apple
            </a>
          )}
          {podcast.google && (
            <a href={podcast.google} target="_blank" rel="noopener noreferrer" className="text-red-600 dark:text-red-400 hover:underline flex items-center text-sm">
              <ExternalLink size={12} className="mr-1" /> Google
            </a>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
      >
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
          {description}
        </p>
      </Modal>
    </>
  );
};

const Podcasts: React.FC = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('');
  const [allTags, setAllTags] = useState<string[]>([]);

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
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-4">Podcasts</h2>
      <div className="mb-4 flex flex-wrap gap-4">
        <div>
          <label htmlFor="language-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Language
          </label>
          <select
            id="language-filter"
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="all">All Languages</option>
            <option value="English">English</option>
            <option value="Hebrew">Hebrew</option>
          </select>
        </div>
        <div>
          <label htmlFor="tag-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tag
          </label>
          <select
            id="tag-filter"
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPodcasts.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </section>
  );
};

export default Podcasts;