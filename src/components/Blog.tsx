'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import type { BlogPost } from '../lib/data';
import ContentCard from './common/ContentCard';
import { cardClasses } from './common/CardStyles';
import ContentFilters from './common/ContentFilters';
import { useFilterParams } from '../hooks/useFilterParams';

const Blog: React.FC<{ initialPosts: BlogPost[] }> = ({ initialPosts }) => {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(initialPosts);
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('');

  const allTags = Array.from(new Set(initialPosts.flatMap((post) => post.tags || [])));

  useFilterParams({
    languageFilter,
    setLanguageFilter,
    tagFilter,
    setTagFilter
  });

  useEffect(() => {
    let filtered = initialPosts;
    if (languageFilter !== 'all') {
      filtered = filtered.filter((post) => post.lang === languageFilter);
    }
    if (tagFilter) {
      filtered = filtered.filter((post) => post.tags && post.tags.includes(tagFilter));
    }
    setFilteredPosts(filtered);
  }, [initialPosts, languageFilter, tagFilter]);

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
            date={new Date(post.date)}
            tags={post.tags || []}
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
