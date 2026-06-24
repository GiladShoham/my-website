// Quick post-import sanity check: counts + a sample of each namespace,
// ordered by date desc (the same query the app uses).
import { init } from '@instantdb/admin';
import { loadEnv } from './_env.mjs';

loadEnv();

const db = init({
  appId: process.env.INSTANT_APP_ID,
  adminToken: process.env.INSTANT_ADMIN_TOKEN,
});

const data = await db.query({
  podcasts: { $: { order: { date: 'desc' } } },
  blogs: { $: { order: { date: 'desc' } } },
  talks: { $: { order: { date: 'desc' } } },
  contact_me: {},
});

for (const [ns, rows] of Object.entries(data)) {
  console.log(`${ns}: ${rows.length}`);
}

const p = data.podcasts[0];
console.log('\nNewest podcast:', JSON.stringify({
  podcast_name: p.podcast_name, episode: p.episode, typeofEpisode: typeof p.episode,
  date: p.date, tags: p.tags,
}, null, 2));

const t = data.talks[0];
console.log('\nNewest talk:', JSON.stringify({
  name: t.name, duration: t.duration, typeofDuration: typeof t.duration,
  slides_short_url: t.slides_short_url, date: t.date, is_private: t.is_private,
}, null, 2));
