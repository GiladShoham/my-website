import 'server-only';
import { ContactFormData } from '../types/contact-form-data';

// Sends the "new contact submission" email via Resend. This replaces the old
// Supabase Edge Function (contact_me_email) that was triggered AFTER INSERT on
// the contact_me table. Defaults match that function; override via env.
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO = process.env.CONTACT_NOTIFICATION_TO || 'shoham.gilad@gmail.com';
const FROM = process.env.CONTACT_NOTIFICATION_FROM || 'me@gilad.dev';

// Field order mirrors the original edge function (with event_topic added).
const FIELDS: { label: string; key: keyof ContactFormData }[] = [
  { label: 'Topic', key: 'topic' },
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Message', key: 'message' },
  { label: 'Event Name', key: 'event_name' },
  { label: 'Event Date', key: 'event_date' },
  { label: 'Event Format', key: 'event_format' },
  { label: 'Audience Size', key: 'audience_size' },
  { label: 'Event Topic', key: 'event_topic' },
  { label: 'Podcast Name', key: 'podcast_name' },
  { label: 'Company Name', key: 'company_name' },
  { label: 'Company Website', key: 'company_website' },
  { label: 'Deck URL', key: 'deck_url' },
  { label: 'Project Description', key: 'project_description' },
  { label: 'Round Size', key: 'round_size' },
  { label: 'Mentorship Area', key: 'mentorship_area' },
  { label: 'Home Size', key: 'home_size' },
  { label: 'Number of Devices', key: 'number_of_devices' },
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\n/g, '<br/>');
}

export async function sendContactNotification(
  record: ContactFormData
): Promise<{ ok: boolean; skipped?: boolean; error?: unknown }> {
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set; skipping contact-notification email.');
    return { ok: false, skipped: true };
  }

  const subject = `[contact-me] ${record.topic || 'No Topic Provided'}`;

  const rows = FIELDS.map(({ label, key }) => {
    const value = record[key];
    return value
      ? `<p><strong>${label}:</strong> ${escapeHtml(String(value))}</p>`
      : '';
  }).join('');
  const html =
    (rows + `<p><strong>Paid:</strong> ${record.paid ? 'Yes' : 'No'}</p>`) ||
    '<p>No details provided.</p>';

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM,
        to: TO,
        subject,
        html,
        // Lets you reply straight to the person who reached out.
        reply_to: record.email || undefined,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error('Resend API error:', res.status, body);
      return { ok: false, error: body };
    }
    return { ok: true };
  } catch (error) {
    console.error('Failed to send contact-notification email:', error);
    return { ok: false, error };
  }
}
