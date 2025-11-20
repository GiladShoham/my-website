import React, { useState, useEffect, useRef } from 'react';
import { Video, Lock, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Modal from './Modal';
import ContentCard from './common/ContentCard';
import Tooltip from './common/Tooltip';
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
  is_private: boolean;
}

const TalkCard: React.FC<{ talk: Talk }> = ({ talk }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const infoIconRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const handleInviteClick = () => {
    const talkTopic = talk.tags && talk.tags.length > 0 ? talk.tags[0] : 'your talk';
    const conferenceName = talk.conference && talk.conference.trim() ? talk.conference : 'the conference';
    const message = `I want a talk similar to the talk about ${talkTopic} you did in ${conferenceName}`;
    navigate(`/contact?topic=talk&message=${encodeURIComponent(message)}`);
  };

  // Create links array - exclude watch and slides for private talks
  const links = talk.is_private ? [] : [
    ...(talk.url ? [{ url: talk.url, label: 'Watch' }] : []),
    ...(talk.slides_url ? [{ url: talk.slides_url, label: 'Slides' }] : [])
  ];

  return (
    <>
      <div className="relative">
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
          links={links}
          onReadMore={() => setIsModalOpen(true)}
          privateBadge={
            talk.is_private ? (
              <div className="flex items-center gap-2 mt-2">
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                  <Lock size={14} />
                  <span>Private</span>
                </div>
                <button
                  ref={infoIconRef}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsTooltipOpen(!isTooltipOpen);
                  }}
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  aria-label="More information about private talk"
                >
                  <Info size={14} />
                </button>
                {isTooltipOpen && (
                  <Tooltip
                    isOpen={isTooltipOpen}
                    onClose={() => setIsTooltipOpen(false)}
                    anchorRef={infoIconRef}
                  >
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        This is a private talk
                      </p>
                      <button
                        onClick={handleInviteClick}
                        className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm font-medium"
                      >
                        Invite for your organization
                      </button>
                    </div>
                  </Tooltip>
                )}
              </div>
            ) : undefined
          }
        />
      </div>
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