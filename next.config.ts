import type { NextConfig } from 'next';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the workspace root so Turbopack doesn't pick up a stray lockfile
  // higher up the filesystem when inferring it.
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // The landing content lives at / now; keep the old /about URL working by
  // redirecting it home (permanent 308, served at the Netlify CDN edge).
  async redirects() {
    return [{ source: '/about', destination: '/', permanent: true }];
  },
};

export default nextConfig;
