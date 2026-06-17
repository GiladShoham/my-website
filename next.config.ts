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
  // Redirect the bare root to /about at the CDN edge (the Netlify Next.js
  // runtime emits config redirects as edge redirects), avoiding the runtime
  // 307 that booted the SSR function and cost ~1s on the most-hit URL.
  async redirects() {
    return [{ source: '/', destination: '/about', permanent: true }];
  },
};

export default nextConfig;
