[![Netlify Status](https://api.netlify.com/api/v1/badges/7ede07f6-4df7-4dfe-87e9-015b5260768a/deploy-status)](https://app.netlify.com/sites/gilad-website/deploys)

# Personal Website

This is the source code for my personal website, built with [Next.js](https://nextjs.org/) (App Router), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/). The website fetches data from [Supabase](https://supabase.com/).

The site is **server-side rendered (SSR)** for fast load times and great SEO: the Talks, Podcasts, and Blog pages fetch their data on the server, and every page ships proper `<title>` / Open Graph / Twitter metadata.

## Features

- **Next.js (App Router)** with server-side rendering and incremental static regeneration (ISR).
- **React + TypeScript** for the UI and static typing.
- **Tailwind CSS** for styling, with a no-flash dark mode.
- **Supabase** for backend and database integration (queried on the server for SSR).
- **Per-page SEO metadata** (title templates, Open Graph, Twitter cards) via the Next.js Metadata API.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version >= 18.18)
- [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), or [yarn](https://yarnpkg.com/)

### Installation

Clone the repository:

```bash
git clone https://github.com/GiladShoham/my-website.git
cd my-website
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file at the root of the project (see `.env.example`) and add your Supabase credentials. The anon key is safe to expose publicly (it is protected by row-level security) and is used for both server-side rendering and client-side data access:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Optionally set `NEXT_PUBLIC_SITE_URL` to your production URL so Open Graph / canonical
URLs resolve correctly (defaults to the current Netlify URL):

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Scripts

```bash
npm run dev     # Start the development server (http://localhost:3000)
npm run build   # Build the project for production
npm run start   # Run the production build locally
npm run lint    # Lint the project with ESLint
```

## Deployment

This app is a standard Next.js application and can be deployed to either Vercel or Netlify.

### Vercel (zero-config)

1. Import the repository at [vercel.com/new](https://vercel.com/new).
2. Vercel auto-detects Next.js — no build configuration is required.
3. Add the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   environment variables (and optionally `NEXT_PUBLIC_SITE_URL`) in
   **Project Settings → Environment Variables**.
4. Deploy. SSR, ISR, and image optimization work out of the box.

### Netlify

Netlify fully supports Next.js SSR via the official
[`@netlify/plugin-nextjs`](https://github.com/netlify/next-runtime) runtime,
which is configured in `netlify.toml`. The existing Netlify site keeps working:

1. The build command is `npm run build` and the plugin handles routing/SSR/ISR.
2. Add the same environment variables under
   **Site settings → Environment variables**.
3. Push to the connected branch and Netlify deploys automatically.

> Either platform works. Vercel is the first-party host for Next.js (simplest
> setup); Netlify is fully supported and lets you keep your current site/URL.

## Tech Stack

- **Framework**: Next.js (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase

## License

This project is licensed under the [MIT License](./LICENSE).
