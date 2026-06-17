import type { Metadata } from 'next';
import Communities from '@/components/Communities';

export const metadata: Metadata = {
  title: 'Communities',
  description:
    'AI and automation communities built and led by Gilad Shoham - MCP Israel, n8n Israel, the AI Transformation Guild & AI Leaders, and The Agentcy.',
};

export default function CommunitiesPage() {
  return <Communities />;
}
