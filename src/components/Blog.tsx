import React, { useState, useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import { db } from '../lib/db';
import ContentCard from './common/ContentCard';
import { cardClasses } from './common/CardStyles';
import ContentFilters from './common/ContentFilters';
import { useFilterParams } from '../hooks/useFilterParams';

interface BlogPost {
  id: string;
  name: string;
  short_description: string;
  tags: string[];
  url: string;
  short_url: string;
  og_title: string;
  og_description: string;
  og_image_url: string;
  lang: string;
  date: Date;
}

const Blog: React.FC = () => {
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('');

  useFilterParams({
    languageFilter,
    setLanguageFilter,
    tagFilter,
    setTagFilter
  });

  // Live query — results update automatically, no manual refresh needed.
  const { isLoading, error, data } = db.useQuery({
    blogs: { $: { order: { date: 'desc' } } }
  });

  const blogPosts = useMemo<BlogPost[]>(
    () =>
      (data?.blogs ?? []).map((post) => ({
        ...post,
        date: new Date(post.date as string | number | Date),
        tags: post.tags || []
      })) as BlogPost[],
    [data]
  );

  const allTags = useMemo(
    () => Array.from(new Set(blogPosts.flatMap((post) => post.tags))),
    [blogPosts]
  );

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;
    if (languageFilter !== 'all') {
      filtered = filtered.filter(post => post.lang === languageFilter);
    }
    if (tagFilter) {
      filtered = filtered.filter(post => post.tags.includes(tagFilter));
    }
    return filtered;
  }, [blogPosts, languageFilter, tagFilter]);

  if (isLoading) return <div className="text-center">Loading blog posts...</div>;
  if (error) return <div className="text-center text-red-600">Error: {error.message}</div>;

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
        {filteredPosts.map((post) => (
          <ContentCard
            key={post.id}
            title={post.og_title || post.name}
            description={post.og_description || post.short_description}
            imageUrl={post.og_image_url}
            date={post.date}
            tags={post.tags}
            icon={<BookOpen className="w-4 h-4" />}
            language={post.lang as 'Hebrew' | 'English'}
            links={[
              { url: post.url, label: 'Read More' }
            ]}
          />
        ))}
      </div>
    </section>
  );
};

export default Blog;