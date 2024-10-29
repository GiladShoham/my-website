import React, { useState, useEffect } from 'react';
import { Video, ExternalLink, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Modal from './Modal';

interface Talk {
  id: number;
  Name: string;
  Conference: string;
  short_desc: string;
  Duration: string;
  lang: string;
  Date: string;
  Tags: string[];
  Draft_URL: string;
  URL: string;
  short_url: string;
  slides_url: string;
  slides_sho: string;
  Status: string;
  override_title: string | null;
  override_description: string | null;
  og_title: string;
  og_description: string;
  og_image_url: string;
  description_lang: 'Hebrew' | 'English';
}

const TalkCard: React.FC<{ talk: Talk }> = ({ talk }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const title = talk.override_title || talk.og_title || talk.Name;
  const description = talk.override_description || talk.og_description || talk.short_desc;
  const languageFlag = talk.lang === 'Hebrew' ? '🇮🇱' : '🇺🇸';

  const isDescriptionRTL = talk.description_lang === 'Hebrew';
  const readMoreText = isDescriptionRTL ? 'קרא עוד' : 'Read More';

  return (
    <>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        {talk.og_image_url && (
          <img src={talk.og_image_url} alt={title} className="w-full h-32 object-cover rounded-t-lg mb-2" />
        )}
        <h3 className="text-lg font-semibold mb-1 truncate text-gray-800 dark:text-gray-100">
          {languageFlag} {title}
        </h3>
        <p className={`text-sm text-gray-600 dark:text-gray-300 mb-2 flex ${isDescriptionRTL ? 'flex-row-reverse text-right' : 'flex-row'}`}>
          <span className="flex-grow" dir={isDescriptionRTL ? 'rtl' : 'ltr'}>
            {description.slice(0, 100)}
          </span>
          {description.length > 100 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className={`${isDescriptionRTL ? 'mr-2' : 'ml-2'} text-blue-600 dark:text-blue-400 hover:underline flex-shrink-0`}
            >
              {readMoreText}
            </button>
          )}
        </p>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
          <Video className="mr-1 w-4 h-4" />
          <span>{talk.Conference} - {new Date(talk.Date).toLocaleDateString()}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {talk.Tags && talk.Tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          {talk.URL && (
            <a href={talk.URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center text-sm">
              <ExternalLink size={12} className="mr-1" /> Watch
            </a>
          )}
          {talk.slides_url && (
            <a href={talk.slides_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center text-sm">
              <ExternalLink size={12} className="mr-1" /> Slides
            </a>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
      >
        <p className={`text-gray-600 dark:text-gray-300 whitespace-pre-wrap ${isDescriptionRTL ? 'text-right dir-rtl' : ''}`}>
          {description}
        </p>
      </Modal>
    </>
  );
};

const Talks: React.FC = () => {
  const [talks, setTalks] = useState<Talk[]>([]);
  const [filteredTalks, setFilteredTalks] = useState<Talk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('');
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    fetchTalks();
  }, []);

  useEffect(() => {
    filterTalks();
  }, [talks, languageFilter, tagFilter]);

  const fetchTalks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('talks')
        .select('*, og_title, og_description, og_image_url')
        .order('Date', { ascending: false });

      if (error) throw error;

      setTalks(data || []);
      const tags = Array.from(new Set(data?.flatMap(talk => talk.Tags || []) || []));
      setAllTags(tags);
    } catch (error) {
      setError('Failed to fetch talks');
      console.error('Error fetching talks:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTalks = () => {
    let filtered = talks;
    if (languageFilter !== 'all') {
      filtered = filtered.filter(talk => talk.lang === languageFilter);
    }
    if (tagFilter) {
      filtered = filtered.filter(talk => talk.Tags && talk.Tags.includes(tagFilter));
    }
    setFilteredTalks(filtered);
  };

  if (loading) return <div className="text-gray-800 dark:text-gray-100">Loading talks...</div>;
  if (error) return <div className="text-red-600 dark:text-red-400">Error: {error}</div>;

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Talks</h2>
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
        {filteredTalks.map((talk) => (
          <TalkCard key={talk.id} talk={talk} />
        ))}
      </div>
    </section>
  );
};

export default Talks;