[![Netlify Status](https://api.netlify.com/api/v1/badges/7ede07f6-4df7-4dfe-87e9-015b5260768a/deploy-status)](https://app.netlify.com/sites/gilad-website/deploys)

# Personal Website

This is the source code for my personal website, built with [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), and [Vite](https://vitejs.dev/). The website uses [InstantDB](https://www.instantdb.com/) as its backend (live queries — data updates in real time without manual refresh).

## Features

- **React** for building the user interface.
- **TypeScript** for static typing.
- **Vite** for fast development and bundling.
- **InstantDB** for backend and database (real-time `db.useQuery`).
  
## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version >= 14)
- [pnpm](https://pnpm.io/), [npm](https://www.npmjs.com/), or [yarn](https://yarnpkg.com/)

### Installation

Clone the repository:

```bash
git clone https://github.com/GiladShoham/my-website.git
cd my-website
```

Install dependencies:

```bash
pnpm install
# or
npm install
# or
yarn install
```

### Environment Variables

The app needs your InstantDB app id. Copy `.env.example` to get the full list of
variables, then set the app id in `.env`:

```env
VITE_INSTANT_APP_ID=your-instant-app-id
```

The InstantDB admin token and (one-time) Supabase migration credentials go in
`.env.local` (git-ignored). See [`.env.example`](./.env.example) and
[`RUNBOOK.md`](./RUNBOOK.md).

> **First-time setup / migration:** This project was migrated from Supabase to
> InstantDB. Follow [`RUNBOOK.md`](./RUNBOOK.md) to create the InstantDB app,
> push the schema/permissions, and (optionally) migrate existing data.

### Scripts

- **dev**: Starts the development server.
- **lint**: Lints the project using ESLint.
- **build**: Builds the project for production.
- **preview**: Previews the production build.

```bash
pnpm dev        # Start development server
pnpm lint       # Lint the project
pnpm build      # Build the project for production
pnpm preview    # Preview the production build
```

You can also use `npm` or `yarn` as follows:

```bash
npm run dev        # Start development server
npm run lint       # Lint the project
npm run build      # Build the project for production
npm run preview    # Preview the production build
```

### Deployment

1. Build the project:
   ```bash
   pnpm build
   ```

2. Serve the `dist/` folder or deploy it to your preferred hosting provider.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: InstantDB

## License

This project is licensed under the [MIT License](./LICENSE).
