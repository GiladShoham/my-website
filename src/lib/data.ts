import { adminDb } from './db-admin';

// Rows are returned with `date` as an ISO string so the data can be safely
// serialized across the server -> client component boundary. Components convert
// to a `Date` at render time.

export interface Talk {
  id: string;
  name: string;
  conference: string;
  short_description: string;
  duration: number;
  lang: string;
  date: string;
  tags: string[];
  url: string;
  short_url: string;
  slides_url: string;
  slides_short_url: string;
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
  id: string;
  podcast_name: string;
  episode: number;
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
  date: string;
}

// InstantDB `i.date()` fields come back as epoch milliseconds; normalize to an
// ISO string (empty string when missing) for safe serialization.
function toISODate(value: unknown): string {
  if (value === null || value === undefined) return '';
  const d = new Date(value as string | number);
  return Number.isNaN(d.getTime()) ? '' : d.toISOString();
}

export async function fetchTalks(): Promise<Talk[]> {
  try {
    const { talks } = await adminDb.query({
      talks: { $: { order: { date: 'desc' } } },
    });
    return (talks ?? []).map((talk) => ({
      ...talk,
      date: toISODate(talk.date),
      tags: talk.tags ?? [],
    })) as unknown as Talk[];
  } catch (error) {
    console.error('Error fetching talks:', error);
    return [];
  }
}

export async function fetchPodcasts(): Promise<Podcast[]> {
  try {
    const { podcasts } = await adminDb.query({
      podcasts: { $: { order: { date: 'desc' } } },
    });
    return (podcasts ?? []).map((podcast) => ({
      ...podcast,
      date: toISODate(podcast.date),
      tags: podcast.tags ?? [],
    })) as unknown as Podcast[];
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    return [];
  }
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const { blogs } = await adminDb.query({
      blogs: { $: { order: { date: 'desc' } } },
    });
    return (blogs ?? []).map((post) => ({
      ...post,
      date: toISODate(post.date),
      tags: post.tags ?? [],
    })) as unknown as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}
