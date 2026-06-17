import type { Metadata } from 'next';
import Blog from '@/components/Blog';
import { fetchBlogPosts } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles and blog posts written by Gilad Shoham.',
};

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await fetchBlogPosts();

  return <Blog initialPosts={posts} />;
}
