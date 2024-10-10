import React, { useState, useEffect } from 'react';
import { Video, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Talk {
  id: number;
  Name: string;
  Conference: string;
  short_desc: string;
  Duration: string;
  Lang: string;
  Date: string;
  Tags: string[];
  Draft_URL: string;
  URL: string;
  short_url: string;
  slides_url: string;
  slides_sho: string;
  Status: string;
}

const Talks: React.FC = () => {
  const [talks, setTalks] = useState<Talk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTalks();
  }, []);

  const fetchTalks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('talks')
        .select('*')
        .order('Date', { ascending: false });

      if (error) throw error;

      setTalks(data || []);
    } catch (error) {
      setError('Failed to fetch talks');
      console.error('Error fetching talks:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading talks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-4">Talks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {talks.map((talk) => (
          <div key={talk.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{talk.Name}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">{talk.short_desc}</p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <Video className="mr-2" />
              <span>{talk.Conference} - {new Date(talk.Date).toLocaleDateString()}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {talk.Tags && talk.Tags.map((tag, index) => (
                <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              {talk.URL && (
                <a href={talk.URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                  <ExternalLink size={16} className="mr-1" /> Watch
                </a>
              )}
              {talk.slides_url && (
                <a href={talk.slides_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                  <ExternalLink size={16} className="mr-1" /> Slides
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Talks;