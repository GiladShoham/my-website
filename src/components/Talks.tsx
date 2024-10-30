import React, { useState, useEffect } from 'react';
import { Video, ExternalLink, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Modal from './Modal';
import ContentCard from './common/ContentCard';
import { cardClasses } from './common/CardStyles';
import { formClasses } from './common/FormStyles';

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

  return (
    <>
      <ContentCard
        title={talk.override_title || talk.og_title || talk.Name}
        description={talk.override_description || talk.og_description || talk.short_desc}
        imageUrl={talk.og_image_url}
        date={`${talk.Conference} - ${new Date(talk.Date).toLocaleDateString()}`}
        tags={talk.Tags || []}
        icon={<Video className="mr-1 w-4 h-4" />}
        language={talk.description_lang}
        links={[
          ...(talk.URL ? [{ url: talk.URL, label: 'Watch' }] : []),
          ...(talk.slides_url ? [{ url: talk.slides_url, label: 'Slides' }] : [])
        ]}
        onReadMore={() => setIsModalOpen(true)}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={talk.override_title || talk.og_title || talk.Name}
      >
        <p className={`text-gray-600 dark:text-gray-300 whitespace-pre-wrap ${talk.description_lang === 'Hebrew' ? 'text-right dir-rtl' : ''}`}>
          {talk.override_description || talk.og_description || talk.short_desc}
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
              className={`${formClasses.select} w-full`}
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
              className={`${formClasses.select} w-full`}
            >
              <option value="">All Topics</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className={cardClasses.container}>
        {filteredTalks.map((talk) => (
          <TalkCard key={talk.id} talk={talk} />
        ))}
      </div>
    </section>
  );
};

export default Talks;