# Supabase → InstantDB Migration Runbook

The code migration is **done** (app rewritten to InstantDB, `instant.schema.ts`,
`instant.perms.ts`, and migration scripts are in place). The remaining steps talk
to the InstantDB / Supabase APIs, so run them **on a machine with normal network
access** (the cloud session they were prepared in had a restricted network policy
that blocks `instantdb.com` and `*.supabase.co`).

Run everything from the project root.

---

## 1. Log in & create the InstantDB app

```bash
npx instant-cli login        # opens a browser; if headless, add --print
npx instant-cli init-without-files --title "Gilad's Website"
```

`init-without-files` prints (and writes to `.env`) an **app id** and **admin
token**. Then:

1. Put the app id in `.env`:
   ```env
   VITE_INSTANT_APP_ID=<app-id>
   ```
2. Put the admin token + app id in `.env.local` (git-ignored — never commit):
   ```env
   INSTANT_APP_ID=<app-id>
   INSTANT_ADMIN_TOKEN=<admin-token>
   ```

Verify with `npx instant-cli info`.

---

## 2. Push schema & permissions

```bash
npx instant-cli push schema --yes
npx instant-cli push perms --yes
```

- Schema source: [`instant.schema.ts`](./instant.schema.ts) — entities
  `podcasts`, `blogs`, `talks`, `contact_me`. (`date` is indexed so the app can
  order by it; Postgres `text[]` columns became JSON arrays; numeric ids are
  dropped in favor of Instant UUIDs.)
- Permissions source: [`instant.perms.ts`](./instant.perms.ts) — public read on
  `podcasts`/`blogs`/`talks`, public create-only on `contact_me`, everything else
  denied. `$files` is left disabled (storage is not used).

---

## 3. (Optional) Migrate existing data

Only if you have data in Supabase you want to keep.

1. Add your Supabase credentials to `.env.local` (service role key — keep secret,
   delete after):
   ```env
   SUPABASE_URL=https://fwryiadctrgptlybktza.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
   ```
2. Export from Supabase, then import into InstantDB:
   ```bash
   node scripts/export-supabase.mjs   # -> scripts/data/*.json (git-ignored)
   node scripts/import-instant.mjs    # reads .env.local, writes to InstantDB
   ```
3. Verify in the explorer:
   ```bash
   npx instant-cli explorer
   ```

There is **no Supabase Storage** in this project, so no file migration is needed.

---

## 4. Run & verify

```bash
npm run dev      # check /, blog, talks, podcasts render; submit the contact form
npm run build    # already passes; confirm again locally
```

The contact form writes via `db.transact(...create(...))`; the list pages use
live `db.useQuery(...)`, so new rows appear without a refresh.

---

## 5. (Optional) Install InstantDB agent rules

```bash
npx skills add instantdb/skills --yes
```

---

## What changed in the code (already committed)

- `package.json`: removed `@supabase/supabase-js`; added `@instantdb/react` and
  `@instantdb/admin`.
- `src/lib/supabase.ts` → `src/lib/db.ts` (`init({ appId, schema })`).
- `Podcasts.tsx`, `Blog.tsx`, `Talks.tsx`: Supabase `select().order()` →
  `db.useQuery({ ... $: { order: { date: 'desc' } } })` with `useMemo` for
  derived tags/filtering. Manual `loading`/`error` state removed in favor of
  `useQuery`'s `isLoading`/`error`.
- `src/lib/submit-contact-form.ts`: Supabase `insert` → `db.transact(db.tx.contact_me[id()].create(...))`.
- `.env` / `.env.example` / `.gitignore`: Instant vars; secrets moved to
  `.env.local`; `scripts/data` ignored.

> This is a Vite SPA, so there was no middleware, auth proxy, session
> management, or `router.refresh()` to remove. The app has no authentication;
> if you add it later, use InstantDB magic codes or OAuth and tighten
> `instant.perms.ts` with `auth.id` checks.
