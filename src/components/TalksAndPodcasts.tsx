import React, { useState, useEffect } from 'react';
import { Video, Mic } from 'lucide-react';

interface OpenGraphData {
  title: string;
  description: string;
  image: string;
}

interface Talk {
  type: 'talk';
  url: string;
  date: string;
  venue: string;
  ogData?: OpenGraphData;
}

interface Podcast {
  type: 'podcast';
  url: string;
  date: string;
  show: string;
  ogData?: OpenGraphData;
}

interface TalksAndPodcastsProps {
  initialTab: 'talks' | 'podcasts';
}

const TalksAndPodcasts: React.FC<TalksAndPodcastsProps> = ({ initialTab }) => {
  const [activeTab, setActiveTab] = useState<'talks' | 'podcasts'>(initialTab);
  const [talks, setTalks] = useState<Talk[]>([
    { type: 'talk', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', date: '2023-05-15', venue: 'React Conf 2023' },
    { type: 'talk', url: 'https://www.youtube.com/watch?v=C0DPdy98e4c', date: '2023-08-10', venue: 'GraphQL Summit' },
  ]);
  const [podcasts, setPodcasts] = useState<Podcast[]>([
    { type: 'podcast', url: 'https://example.com/podcast1', date: '2023-06-22', show: 'Tech Talk Podcast' },
    { type: 'podcast', url: 'https://example.com/podcast2', date: '2023-09-05', show: 'Web Dev Insights' },
  ]);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

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

    const updateTalksWithOGData = async () => {
      const updatedTalks = await Promise.all(
        talks.map(async (talk) => {
          if (!talk.ogData) {
            const ogData = await fetchOpenGraphData(talk.url);
            return { ...talk, ogData };
          }
          return talk;
        })
      );
      setTalks(updatedTalks);
    };

    const updatePodcastsWithOGData = async () => {
      const updatedPodcasts = await Promise.all(
        podcasts.map(async (podcast) => {
          if (!podcast.ogData) {
            const ogData = await fetchOpenGraphData(podcast.url);
            return { ...podcast, ogData };
          }
          return podcast;
        })
      );
      setPodcasts(updatedPodcasts);
    };

    if (activeTab === 'talks') {
      updateTalksWithOGData();
    } else {
      updatePodcastsWithOGData();
    }
  }, [activeTab]);

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-4">{activeTab === 'talks' ? 'Talks' : 'Podcasts'}</h2>
      {activeTab === 'talks' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {talks.map((talk, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              {talk.ogData && (
                <>
                  <img src={talk.ogData.image} alt={talk.ogData.title} className="w-full h-40 object-cover mb-2 rounded" />
                  <h3 className="text-xl font-semibold mb-2">{talk.ogData.title}</h3>
                  <p className="text-gray-600 mb-2">{talk.ogData.description}</p>
                </>
              )}
              <div className="flex items-center text-sm text-gray-500">
                <Video className="mr-2" />
                <span>{talk.date} - {talk.venue}</span>
              </div>
              <a href={talk.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-blue-600 hover:underline">
                Watch on YouTube
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {podcasts.map((podcast, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
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
      )}
    </section>
  );
};

export default TalksAndPodcasts;