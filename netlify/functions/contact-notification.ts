// Netlify Function wrapper (stopgap for the current Netlify deploy).
//
// Thin transport layer only — all email logic lives in the runtime-agnostic
// ../../server/contact-notification module. When this site migrates to
// Next.js / Vercel, replace this file with app/api/contact-notification/route.ts
// that calls the same sendContactNotification() and delete the _redirects rule.
//
// Served at /.netlify/functions/contact-notification; the /api/contact-notification
// alias is set up in the generated dist/_redirects (see package.json build script).
import { sendContactNotification } from '../../server/contact-notification';

export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') {
    return json({ ok: false, error: 'Method Not Allowed' }, 405);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: 'Invalid JSON body' }, 400);
  }

  const result = await sendContactNotification(
    body as Record<string, unknown>,
    process.env,
  );
  return json(result, result.ok ? 200 : 500);
};

function json(payload: unknown, status: number): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
