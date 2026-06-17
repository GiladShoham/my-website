import AboutMe from '@/components/AboutMe';

// The landing page renders the About content directly at the apex URL so
// gilad.dev no longer pays a redirect hop. /about now redirects here
// (see next.config.ts). Metadata is inherited from the root layout.
export default function HomePage() {
  return <AboutMe />;
}
