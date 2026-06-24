// One-time data export from Supabase -> local JSON files.
//
// Usage:
//   1. Put SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
//   2. node scripts/export-supabase.mjs
//
// Output: scripts/data/<table>.json
//
// Uses the Supabase REST (PostgREST) API directly, so it needs no SDK.

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from './_env.mjs';

loadEnv();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY (set them in .env.local).');
  process.exit(1);
}

const TABLES = ['podcasts', 'blogs', 'talks', 'contact_me'];
const PAGE_SIZE = 1000;

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, 'data');

async function fetchAll(table) {
  const rows = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const to = from + PAGE_SIZE - 1;
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        Range: `${from}-${to}`,
        'Range-Unit': 'items',
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch ${table}: ${res.status} ${await res.text()}`);
    }
    const batch = await res.json();
    rows.push(...batch);
    if (batch.length < PAGE_SIZE) break;
  }
  return rows;
}

await mkdir(outDir, { recursive: true });

for (const table of TABLES) {
  const rows = await fetchAll(table);
  const file = join(outDir, `${table}.json`);
  await writeFile(file, JSON.stringify(rows, null, 2));
  console.log(`Exported ${rows.length} rows from "${table}" -> ${file}`);
}

console.log('\nDone. Review scripts/data/*.json, then run: node scripts/import-instant.mjs');
