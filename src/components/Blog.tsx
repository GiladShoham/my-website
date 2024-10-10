import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { fetchContentFromAirtable, ContentItem } from '../utils/airtable';

interface OpenGraphData {
  title: string;
  description: string;
  image: string;
}

interface BlogPost extends ContentItem {
  ogData?: OpenGraphData;
}

const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const content = await fetchContentFromAirtable();
      const blogPostsData = content.filter(item => item.type === 'blog') as BlogPost[];
      setBlogPosts(blogPostsData);
    };

    fetchBlogPosts();
  }, []);

  useEffect(() => {
    const fetchOpenGraphData = async (url: string) => {
      // In a real application, you would make an API call to a server that can fetch OG data
      // For this example, we'll simulate the API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      return {
        title: `Title for ${url}`,
        description: `Description for ${url}`,
        image: `https://picsum.photos/seed/${url}/300/200`,
      };
    };

    const updateBlogPostsWithOGData = async () => {
      const updatedBlogPosts = await Promise.all(
        blogPosts.map(async (post) => {
          if (!post.ogData) {
            const ogData = await fetchOpenGraphData(post.url);
            return { 
              ...post, 
              ogData: {
                ...ogData,
                title: post.title || ogData.title,
                description: post.description || ogData.description,
              }
            };
          }
          return post;
        })
      );
      setBlogPosts(updatedBlogPosts);
    };

    updateBlogPostsWithOGData();
  }, [blogPosts]);

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-4">Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow">
            {post.ogData && (
              <>
                <img src={post.ogData.image} alt={post.ogData.title} className="w-full h-40 object-cover mb-2 rounded" />
                <h3 className="text-xl font-semibold mb-2">{post.ogData.title}</h3>
                <p className="text-gray-600 mb-2">{post.ogData.description}</p>
              </>
            )}
            <div className="flex items-center text-sm text-gray-500">
              <BookOpen className="mr-2" />
              <span>{post.date}</span>
            </div>
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-blue-600 hover:underline">
              Read More
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;