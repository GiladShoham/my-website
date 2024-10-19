import React, { useState, useEffect } from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';

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
        .select('id, name, short_description, tags, url, short_url, og_title, og_description, og_image_url, lang')
        .order('id', { ascending: false });

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
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Blog</h2>
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
      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">No blog posts available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              {post.og_image_url && (
                <img src={post.og_image_url} alt={post.og_title || post.name} className="w-full h-40 object-cover mb-2 rounded" />
              )}
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                {post.lang === 'Hebrew' ? '🇮🇱' : '🇺🇸'} {post.og_title || post.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{post.og_description || post.short_description}</p>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <BookOpen className="mr-2" />
                <span>{new Date(post.id).toLocaleDateString()}</span>
              </div>
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                Read More <ExternalLink size={16} className="ml-1" />
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Blog;