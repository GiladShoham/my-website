/**
 * API Registry - Auto-generated
 *
 * Factory-based API callbacks and metadata.
 * Uses createApiRegistry from @onui/sdk instead of code-generating
 * individual callback functions.
 *
 * Regenerate with: npx onui update
 */

import { createApiRegistry } from '@onui/sdk';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const { apiCallbacks, apisMeta } = createApiRegistry([
  { name: 'fetchBlogs', method: 'GET', path: 'supabase:blogs', description: 'select on blogs table', apiType: 'supabase-client', auth: 'rls', side: 'client', isUsed: false, table: 'blogs', operation: 'select' },
  { name: 'fetchPodcasts', method: 'GET', path: 'supabase:podcasts', description: 'select on podcasts table', apiType: 'supabase-client', auth: 'rls', side: 'client', isUsed: false, table: 'podcasts', operation: 'select' },
  { name: 'fetchTalks', method: 'GET', path: 'supabase:talks', description: 'select on talks table', apiType: 'supabase-client', auth: 'rls', side: 'client', isUsed: false, table: 'talks', operation: 'select' },
], {
  supabaseClient: supabase,
});
