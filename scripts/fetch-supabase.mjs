// One-time, READ-ONLY export of the public tables from Supabase -> local JSON.
//
// Uses the public anon key + PostgREST (the same read path the website used),
// so it needs no service-role secret and cannot modify Supabase. The RLS-
// protected `contact_me` table is fetched separately via the Supabase MCP.
//
// Usage: node scripts/fetch-supabase.mjs   (writes scripts/data/<table>.json)

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from './_env.mjs';

loadEnv();

const SUPABASE_URL = process.env.SUPABASE_URL;
const ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !ANON_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY (set them in .env.local).');
  process.exit(1);
}

const TABLES = ['podcasts', 'blogs', 'talks'];

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, 'data');
await mkdir(outDir, { recursive: true });

for (const table of TABLES) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
    headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${table}: ${res.status} ${await res.text()}`);
  }
  const rows = await res.json();
  const file = join(outDir, `${table}.json`);
  await writeFile(file, JSON.stringify(rows, null, 2));
  console.log(`Exported ${rows.length} rows from "${table}" -> ${file}`);
}

console.log('\nDone (public tables). Fetch contact_me via MCP, then run import-instant.mjs');
