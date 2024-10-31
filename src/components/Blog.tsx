import React, { useState, useEffect } from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ContentCard from './common/ContentCard';
import { cardClasses } from './common/CardStyles';
import { formClasses } from './common/FormStyles';
import ContentFilters from './common/ContentFilters';

interface BlogPost {
  id: number;
  name: string;
  short_description: string;
  tags: string[];
  url: string;
  short_url: string;
  og_title: string;
  og_description: string;
  og_image_url: string;
  lang: string;
  date: string;
}

const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('');
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [blogPosts, languageFilter, tagFilter]);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('id, name, short_description, tags, url, short_url, og_title, og_description, og_image_url, lang, date')
        .order('date', { ascending: false });

      if (error) throw error;

      if (data) {
        const posts = data.map(post => ({ ...post, tags: post.tags || [] }));
        setBlogPosts(posts);
        const tags = Array.from(new Set(posts.flatMap(post => post.tags)));
        setAllTags(tags);
      } else {
        setBlogPosts([]);
      }
    } catch (error) {
      setError('Failed to fetch blog posts');
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = blogPosts;
    if (languageFilter !== 'all') {
      filtered = filtered.filter(post => post.lang === languageFilter);
    }
    if (tagFilter) {
      filtered = filtered.filter(post => post.tags.includes(tagFilter));
    }
    setFilteredPosts(filtered);
  };

  if (loading) return <div className="text-center">Loading blog posts...</div>;
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;

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
            date={post.date || new Date(post.id).toLocaleDateString()}
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