export const en = {
  // Header/Navigation
  nav: {
    about: 'About',
    talks: 'Talks',
    podcasts: 'Podcasts',
    blog: 'Blog',
    contact: 'Contact',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
  },

  // Hero Section
  hero: {
    name: 'Gilad Shoham',
    title: 'Dev Leader & Open Source Enthusiast',
    description:
      "Building the future through code, community, and innovation. With 15+ years of leadership experience, I'm passionate about creating solutions that empower developers worldwide.",
    learnMoreBtn: 'Learn More About Me',
    connectBtn: 'Connect With Me',
    stats: {
      yearsLeading: 'Years Leading',
      projects: 'Projects',
      communities: 'Communities',
    },
  },

  // My Story Section
  story: {
    title: 'My Story',
    philosophy: {
      title: 'Philosophy',
      content:
        'I believe that software development is a tool to improve human life. I find software to be the most powerful way to share value in order to connect people and improve the quality of all our lives.',
    },
    passion: {
      title: 'Passion',
      content:
        "Software engineering for me is like painting or sculpting, it's a way to take a complicated and beautiful structure, connect all the dots piece by piece, and create a masterpiece. It's more than just art, it's life.",
    },
    dedication: {
      title: 'Dedication',
      content:
        "That's why I wake up with a smile and keep it on all day long. I am lucky to be paid for doing what I love the most. I'm not smarter than others, I just really care. I love what I do and do what I love, so I don't play the nine-to-five game, I live it 24/7.",
    },
    leadership: {
      title: 'Leadership',
      content:
        "This rush makes me develop community projects like Stunity and learn new paradigms and tools with the passion of a child getting a new toy. I share my beliefs with others to inspire them, and some follow. I also learn from others. That's what makes me a true leader.",
    },
  },

  // What I Do Section
  whatIDo: {
    title: 'What I Do',
    sections: [
      {
        title: 'Dev and Open Source Leader',
        content:
          "With 15+ years in leadership, I lead a global team of OSS developers at Bit.dev, focusing on Bit's CLI. I'm passionate about open source, contributing to projects like pnpm, rspack, oxc, oxlint-node, and GraphQL tools—building solutions that empower developers worldwide.",
      },
      {
        title: 'Community Leader',
        content:
          'I lead two active and fast-growing communities: MCP Israel and n8n Israel. These communities bring together developers, enthusiasts, and professionals to share knowledge, collaborate on projects, and drive innovation in their respective domains. Building and nurturing these communities allows me to foster learning and growth while connecting like-minded individuals.',
      },
      {
        title: 'Angel Investor',
        content:
          "I love connecting with entrepreneurs and helping them thrive. As an angel investor, I sometimes invest alone and other times with a group. While I primarily invest in the dev tools space, I'm open to other verticals where I can add value and help startups achieve their goals.",
      },
      {
        title: 'Public Speaker',
        content:
          'I love sharing my experience on stage, with years of speaking at events from local meetups to international conferences. My talks cover topics like web, dev tools, architecture, JS, development processes, smart homes, and more. I focus on deep technical dives and real innovation.',
      },
      {
        title: 'Entrepreneur',
        content:
          "I'm passionate about innovation and solving real-world problems. I founded a startup in the US real estate market as a business venture and have built social impact projects like Stunity voluntarily. These efforts are my way of contributing to the world and making a positive difference.",
      },
      {
        title: 'Mentor',
        content:
          "I'm passionate about guiding the next generation of tech talent. I mentor junior developers, experienced professionals, and early-stage entrepreneurs. Most of my mentoring is done pro bono, helping others grow and succeed while giving back to the community.",
      },
      {
        title: 'Smart Home Expert',
        content:
          "I'm a huge fan of smart homes, with hundreds of devices in my own setup. I share my knowledge through a podcast, blog, and YouTube channel (in Hebrew) and love helping others build their own smart homes—for free, simply out of passion for the field.",
      },
      {
        title: 'Professional Debater',
        content:
          "I'm a former professional debater and debate coach. This experience has shaped my approach to problem-solving and communication. I believe in the power of structured thinking and clear communication to drive understanding and progress.",
      },
    ],
  },

  // Contact Form
  contact: {
    title: 'Contact Me',
    topicLabel: 'How can I help you?',
    topics: {
      talk: 'I want to invite you for a talk',
      podcast: 'I want to invite you for a podcast',
      investment: "I'm looking for investment",
      mentorship: "I'm looking for a mentor",
      smarthome: "I'm looking for smart home consulting",
      other: 'Other',
    },
  },

  // Footer
  footer: {
    copyright: 'All rights reserved.',
  },

  // Content Pages (Blog, Talks, Podcasts)
  content: {
    filters: {
      all: 'All',
      tech: 'Tech',
      smartHome: 'Smart Home',
      leadership: 'Leadership',
      entrepreneurship: 'Entrepreneurship',
    },
    noResults: 'No results found',
    loading: 'Loading...',
  },
};

export type Translation = typeof en;
