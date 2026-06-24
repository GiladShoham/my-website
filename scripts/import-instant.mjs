// One-time data import from local JSON files -> InstantDB.
//
// Usage:
//   1. Run scripts/export-supabase.mjs first (creates scripts/data/*.json)
//   2. Put INSTANT_APP_ID and INSTANT_ADMIN_TOKEN in .env.local
//   3. node scripts/import-instant.mjs
//
// Notes:
//   - The original Supabase numeric `id` is dropped; Instant assigns its own
//     UUID to every record.
//   - Only fields defined in instant.schema.ts are imported (stray columns
//     such as created_at/updated_at are ignored).

import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { init, id } from '@instantdb/admin';
import { loadEnv } from './_env.mjs';

loadEnv();

const APP_ID = process.env.INSTANT_APP_ID;
const ADMIN_TOKEN = process.env.INSTANT_ADMIN_TOKEN;

if (!APP_ID || !ADMIN_TOKEN) {
  console.error('Missing INSTANT_APP_ID or INSTANT_ADMIN_TOKEN (set them in .env.local).');
  process.exit(1);
}

// Fields to import per table — mirrors instant.schema.ts (excludes the
// Supabase `id` and any other unknown columns).
const FIELDS = {
  podcasts: [
    'podcast_name', 'episode', 'date', 'main_link', 'short_main_link',
    'spotify_link', 'pod_link', 'apple', 'google', 'youtube_link',
    'youtube_short_link', 'fb_link', 'fb_short_link', 'og_title',
    'og_description', 'og_image_url', 'lang', 'tags', 'description_lang',
  ],
  blogs: [
    'name', 'short_description', 'tags', 'url', 'short_url', 'og_title',
    'og_description', 'og_image_url', 'lang', 'date',
  ],
  talks: [
    'name', 'conference', 'short_description', 'duration', 'lang', 'date',
    'tags', 'url', 'short_url', 'slides_url', 'slides_short_url',
    'status', 'override_title', 'override_description', 'og_title',
    'og_description', 'og_image_url', 'description_lang', 'is_private',
  ],
  contact_me: [
    'topic', 'name', 'email', 'message', 'event_name', 'event_date',
    'event_format', 'audience_size', 'podcast_name', 'company_name',
    'company_website', 'deck_url', 'project_description', 'round_size',
    'mentorship_area', 'paid', 'home_size', 'number_of_devices', 'event_topic',
  ],
};

const BATCH_SIZE = 100;
const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, 'data');

const db = init({ appId: APP_ID, adminToken: ADMIN_TOKEN });

// These contact_me columns are numeric in Postgres but stored as strings in
// InstantDB (to match the contact-form payload). Coerce legacy values here.
const NUMERIC_AS_STRING = {
  contact_me: ['audience_size', 'round_size', 'home_size', 'number_of_devices'],
};

function pick(table, row, fields) {
  const out = {};
  for (const f of fields) {
    if (row[f] !== undefined && row[f] !== null) out[f] = row[f];
  }
  for (const f of NUMERIC_AS_STRING[table] ?? []) {
    if (out[f] !== undefined) out[f] = String(out[f]);
  }
  return out;
}

async function importTable(table) {
  let rows;
  try {
    rows = JSON.parse(await readFile(join(dataDir, `${table}.json`), 'utf8'));
  } catch {
    console.log(`Skipping "${table}" (no scripts/data/${table}.json).`);
    return;
  }

  const fields = FIELDS[table];
  let imported = 0;
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const chunk = rows.slice(i, i + BATCH_SIZE);
    const txs = chunk.map((row) => db.tx[table][id()].create(pick(table, row, fields)));
    await db.transact(txs);
    imported += chunk.length;
    console.log(`  ${table}: ${imported}/${rows.length}`);
  }
  console.log(`Imported ${imported} rows into "${table}".`);
}

for (const table of Object.keys(FIELDS)) {
  await importTable(table);
}

console.log('\nDone. Verify in the Instant explorer: npx instant-cli explorer');
