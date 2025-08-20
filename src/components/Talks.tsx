import React, { useState, useEffect } from 'react';
import { Video } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Modal from './Modal';
import ContentCard from './common/ContentCard';
import { cardClasses } from './common/CardStyles';
import ContentFilters from './common/ContentFilters';
import { useFilterParams } from '../hooks/useFilterParams';

interface Talk {
  id: number;
  name: string;
  conference: string;
  short_desc: string;
  duration: string;
  lang: string;
  date: Date;
  tags: string[];
  draft_url: string;
  url: string;
  short_url: string;
  slides_url: string;
  slides_sho: string;
  status: string;
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
        title={talk.override_title || talk.og_title || talk.name}
        description={talk.override_description || talk.og_description || talk.short_desc}
        imageUrl={talk.og_image_url}
        date={talk.date}
        metadata={{
          conference: talk.conference
        }}
        tags={talk.tags || []}
        icon={<Video className="mr-1 w-4 h-4" />}
        language={talk.lang as 'Hebrew' | 'English'}
        descriptionLang={talk.description_lang}
        links={[
          ...(talk.url ? [{ url: talk.url, label: 'Watch' }] : []),
          ...(talk.slides_url ? [{ url: talk.slides_url, label: 'Slides' }] : [])
        ]}
        onReadMore={() => setIsModalOpen(true)}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={talk.override_title || talk.og_title || talk.name}
        isRTL={talk.description_lang === 'Hebrew'}
      >
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
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
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      const formattedData = (data || []).map(talk => ({
        ...talk,
        date: new Date(talk.date),
        tags: talk.tags || []
      }));
      setTalks(formattedData);
      const tags = Array.from(new Set(formattedData.flatMap(talk => talk.tags || [])));
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
      filtered = filtered.filter(talk => talk.tags && talk.tags.includes(tagFilter));
    }
    setFilteredTalks(filtered);
  };

  useFilterParams({
    languageFilter,
    setLanguageFilter,
    tagFilter,
    setTagFilter
  });

  if (loading) return <div className="text-gray-800 dark:text-gray-100">Loading talks...</div>;
  if (error) return <div className="text-red-600 dark:text-red-400">Error: {error}</div>;

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
        {filteredTalks.map((talk) => (
          <TalkCard key={talk.id} talk={talk} />
        ))}
      </div>
    </section>
  );
};

export default Talks;