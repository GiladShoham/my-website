import 'server-only';
import { init } from '@instantdb/admin';
import schema from '../../instant.schema';

// Server-only InstantDB admin client, used for SSR/ISR data fetching in
// ./data.ts. The admin token bypasses permissions, so it must never reach the
// browser — the `server-only` import above makes a client-side import fail the
// build.
const APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID;
const ADMIN_TOKEN = process.env.INSTANT_ADMIN_TOKEN;

if (!APP_ID || !ADMIN_TOKEN) {
  throw new Error(
    'Missing NEXT_PUBLIC_INSTANT_APP_ID or INSTANT_ADMIN_TOKEN. Set them in your environment (see .env.example).'
  );
}

export const adminDb = init({ appId: APP_ID, adminToken: ADMIN_TOKEN, schema });
