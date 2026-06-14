// Runtime-agnostic contact-form notification sender.
//
// Uses only the global `fetch` and Resend's REST API — no SDK — so it runs
// unchanged in Node, Cloudflare Workers, and Vercel / Next.js (Edge or Node).
// When this site moves to Next.js, import this from an app/api route handler
// and delete the Netlify wrapper.
//
// Required environment variables:
//   RESEND_API_KEY            Resend API key (secret — server-side only)
//   CONTACT_NOTIFICATION_TO   Recipient address(es), comma-separated
//   CONTACT_NOTIFICATION_FROM Verified Resend sender, e.g. "Website <noreply@yourdomain.com>"

export type ContactSubmission = {
  topic?: string;
  name?: string;
  email?: string;
  message?: string;
  [key: string]: unknown;
};

export type SendResult = { ok: true } | { ok: false; error: string };

type Env = Record<string, string | undefined>;

const FIELD_LABELS: Record<string, string> = {
  topic: 'Topic',
  name: 'Name',
  email: 'Email',
  message: 'Message',
  event_name: 'Event name',
  event_date: 'Event date',
  event_format: 'Event format',
  audience_size: 'Audience size',
  podcast_name: 'Podcast name',
  company_name: 'Company name',
  company_website: 'Company website',
  deck_url: 'Deck URL',
  project_description: 'Project description',
  round_size: 'Round size',
  mentorship_area: 'Mentorship area',
  paid: 'Paid',
  home_size: 'Home size',
  number_of_devices: 'Number of devices',
  event_topic: 'Event topic',
};

function label(key: string): string {
  return FIELD_LABELS[key] ?? key;
}

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string,
  );
}

export async function sendContactNotification(
  submission: ContactSubmission,
  env: Env = (globalThis as { process?: { env?: Env } }).process?.env ?? {},
): Promise<SendResult> {
  const apiKey = env.RESEND_API_KEY;
  const to = env.CONTACT_NOTIFICATION_TO;
  const from = env.CONTACT_NOTIFICATION_FROM;

  if (!apiKey || !to || !from) {
    return {
      ok: false,
      error:
        'Missing RESEND_API_KEY / CONTACT_NOTIFICATION_TO / CONTACT_NOTIFICATION_FROM',
    };
  }

  const rows = Object.entries(submission).filter(
    ([, v]) => v !== undefined && v !== null && v !== '',
  );

  const text = rows
    .map(([k, v]) => `${label(k)}: ${typeof v === 'object' ? JSON.stringify(v) : String(v)}`)
    .join('\n');

  const html = `<h2>New contact form submission</h2><table cellpadding="6" style="border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="vertical-align:top"><strong>${escapeHtml(label(k))}</strong></td><td>${escapeHtml(
          typeof v === 'object' ? JSON.stringify(v) : String(v),
        )}</td></tr>`,
    )
    .join('')}</table>`;

  const replyTo =
    typeof submission.email === 'string' && submission.email ? submission.email : undefined;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: to.split(',').map((s) => s.trim()),
      subject: `New contact form submission: ${submission.topic ?? 'general'}`,
      text,
      html,
      reply_to: replyTo,
    }),
  });

  if (!res.ok) {
    return { ok: false, error: `Resend responded ${res.status}: ${await res.text()}` };
  }
  return { ok: true };
}
