import React, { useState, useEffect } from 'react';
import { Mic } from 'lucide-react';
import { fetchContentFromAirtable, ContentItem } from '../utils/airtable';

interface OpenGraphData {
  title: string;
  description: string;
  image: string;
}

interface Podcast extends ContentItem {
  ogData?: OpenGraphData;
}

const Podcasts: React.FC = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      const content = await fetchContentFromAirtable();
      const podcastsData = content.filter(item => item.type === 'podcast') as Podcast[];
      setPodcasts(podcastsData);
    };

    fetchPodcasts();
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

    const updatePodcastsWithOGData = async () => {
      const updatedPodcasts = await Promise.all(
        podcasts.map(async (podcast) => {
          if (!podcast.ogData) {
            const ogData = await fetchOpenGraphData(podcast.url);
            return { 
              ...podcast, 
              ogData: {
                ...ogData,
                title: podcast.title || ogData.title,
                description: podcast.description || ogData.description,
              }
            };
          }
          return podcast;
        })
      );
      setPodcasts(updatedPodcasts);
    };

    updatePodcastsWithOGData();
  }, [podcasts]);

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-4">Podcasts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {podcasts.map((podcast) => (
          <div key={podcast.id} className="bg-white p-4 rounded-lg shadow">
            {podcast.ogData && (
              <>
                <img src={podcast.ogData.image} alt={podcast.ogData.title} className="w-full h-40 object-cover mb-2 rounded" />
                <h3 className="text-xl font-semibold mb-2">{podcast.ogData.title}</h3>
                <p className="text-gray-600 mb-2">{podcast.ogData.description}</p>
              </>
            )}
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Mic className="mr-2" />
              <span>{podcast.date} - {podcast.show}</span>
            </div>
            <audio controls className="w-full">
              <source src={podcast.url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Podcasts;