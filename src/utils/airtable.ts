import Airtable from 'airtable';

// Replace with your Airtable base ID and API key
const base = new Airtable({ apiKey: 'YOUR_AIRTABLE_API_KEY' }).base('YOUR_AIRTABLE_BASE_ID');

export interface ContentItem {
  id: string;
  type: 'talk' | 'podcast' | 'blog';
  url: string;
  date: string;
  title?: string;
  description?: string;
  venue?: string;
  show?: string;
}

export const fetchContentFromAirtable = async (): Promise<ContentItem[]> => {
  try {
    const records = await base('Content').select().all();
    return records.map(record => ({
      id: record.id,
      type: record.get('Type') as 'talk' | 'podcast' | 'blog',
      url: record.get('URL') as string,
      date: record.get('Date') as string,
      title: record.get('Title') as string | undefined,
      description: record.get('Description') as string | undefined,
      venue: record.get('Venue') as string | undefined,
      show: record.get('Show') as string | undefined,
    }));
  } catch (error) {
    console.error('Error fetching data from Airtable:', error);
    return [];
  }
};