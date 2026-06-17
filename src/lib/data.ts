import { supabase } from './supabase';

// Rows are returned with `date` as an ISO string so the data can be safely
// serialized across the server -> client component boundary. Components convert
// to a `Date` at render time.

export interface Talk {
  id: number;
  name: string;
  conference: string;
  short_description: string;
  duration: string;
  lang: string;
  date: string;
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

export interface Podcast {
  id: number;
  podcast_name: string;
  episode: string;
  date: string;
  main_link: string;
  short_main_link: string;
  spotify_link: string | null;
  pod_link: string | null;
  apple: string | null;
  google: string | null;
  youtube_link: string | null;
  youtube_short_link: string | null;
  fb_link: string | null;
  fb_short_link: string | null;
  og_title: string;
  og_description: string;
  og_image_url: string;
  lang: string;
  tags: string[];
  description_lang: 'Hebrew' | 'English';
}

export interface BlogPost {
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

export async function fetchTalks(): Promise<Talk[]> {
  const { data, error } = await supabase
    .from('talks')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching talks:', error);
    return [];
  }

  return (data || []).map((talk) => ({ ...talk, tags: talk.tags || [] }));
}

export async function fetchPodcasts(): Promise<Podcast[]> {
  const { data, error } = await supabase
    .from('podcasts')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching podcasts:', error);
    return [];
  }

  return (data || []).map((podcast) => ({ ...podcast, tags: podcast.tags || [] }));
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return (data || []).map((post) => ({ ...post, tags: post.tags || [] }));
}
