import React from 'react';
import { Users, Workflow, Building2, Bot, ArrowRight, Sparkles } from 'lucide-react';

interface Community {
  name: string;
  tagline: string;
  icon: React.ReactNode;
  description: string;
  highlights: string[];
  members?: string;
  registrationUrl: string;
}

const communities: Community[] = [
  {
    name: 'MCP Israel',
    tagline: 'A general AI community for engineers and builders',
    icon: <Users className="w-7 h-7" />,
    description:
      "A general AI community with more than 3,000 members, mostly engineers. It started around MCP (Model Context Protocol) but has grown into a broad AI community. A place for news, help, info, articles, and meetups.",
    highlights: ['News & trends', 'Hands-on help', 'Articles & resources', 'Meetups'],
    members: '3,000+ members',
    registrationUrl: 'https://gilad.click/mcp-israel-registration',
  },
  {
    name: 'n8n Israel',
    tagline: 'For automators, builders, and integration experts',
    icon: <Workflow className="w-7 h-7" />,
    description:
      "Whether you're building automations, working with n8n, or just curious about how to connect services smartly, this is the right place. Not sure how to get started? Ask and get help from the community. Built an interesting workflow? Share it and get feedback. Discovered a cool integration or a useful trick? Let others enjoy it too. Here you'll find guides, tips, and resources, plus discussions, news, trends, and questions about nodes, integrations, and self-hosting. Join a community of creators, automators, and integration experts and grow together.",
    highlights: ['Workflows & feedback', 'Integrations', 'Self-hosting', 'Guides & tips'],
    registrationUrl: 'https://gilad.click/n8n-israel-registration',
  },
  {
    name: 'AI Transformation Guild & AI Leaders',
    tagline: 'For professionals driving AI adoption in organizations',
    icon: <Building2 className="w-7 h-7" />,
    description:
      "A community for professionals leading the implementation, adoption, and transformation of AI within organizations. It's designed for those for whom this is part of their role: innovation managers, AI Leads, Product and Data people, and key stakeholders advancing real AI applications across the business. The community is a place to share hands-on experience from the field, get advice, discuss challenges, learn from others' approaches, and discover tools and methods that truly work. The focus is on real organizational work, not games or experiments, but implementation that creates real value.",
    highlights: ['Real-world experience', 'Org adoption', 'Advice & challenges', 'Tools that work'],
    registrationUrl: 'https://gilad.click/ai-transformation-guild-registration',
  },
  {
    name: 'The Agentcy',
    tagline: 'The Israeli HQ for agentic teams and orchestration',
    icon: <Bot className="w-7 h-7" />,
    description:
      "Welcome to The Agentcy, the Israeli headquarters for agentic teams, orchestration, and running companies powered by AI agents. We're here to turn AI from a chatbot into a Synthetic Workforce. The community focuses on building, managing, and optimizing Multi-Agent Systems, from deep technical tooling (like Paperclip and LangGraph) to leading orchestration and management products (Overcut, Agentopology). On the agenda: Field Reports (case studies and architectures of agent teams), Agentic Workflows (how to make agents actually work together), New Recruits (the newest tools and agents on the market), and the Situation Room (real-time consultations and problem-solving).",
    highlights: ['Multi-Agent Systems', 'Orchestration', 'Field reports', 'Live problem-solving'],
    registrationUrl: 'https://gilad.click/the-agentcy-registration',
  },
];

const Communities: React.FC = () => {
  return (
    <section className="relative">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 -left-32 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-4 py-16 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Community Leader
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              My Communities
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            I build and lead active, fast-growing communities that bring together developers,
            enthusiasts, and professionals to share knowledge, collaborate, and drive innovation in
            AI and automation. Here's what each one is about, and how you can join.
          </p>
        </div>
      </div>

      {/* Communities Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {communities.map((community) => (
            <div
              key={community.name}
              className="group flex flex-col bg-white/60 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-100 dark:border-gray-700 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="inline-flex shrink-0 p-3 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-md">
                  {community.icon}
                </span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {community.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {community.tagline}
                  </p>
                </div>
              </div>

              {community.members && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-sm font-medium">
                    <Users className="w-4 h-4" />
                    {community.members}
                  </span>
                </div>
              )}

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow">
                {community.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {community.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              <a
                href={community.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Join {community.name}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Communities;
