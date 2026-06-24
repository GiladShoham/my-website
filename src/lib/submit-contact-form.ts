'use server';

import { id } from '@instantdb/admin';
import { adminDb } from './db-admin';
import { sendContactNotification } from './contact-notification';
import { ContactFormData } from '../types/contact-form-data';

// Server action: persists the submission to InstantDB (via the admin client,
// server-side) and sends the notification email. Replaces the Supabase insert
// + AFTER INSERT webhook that previously triggered the contact_me_email
// edge function.
export async function submitContactForm(formData: ContactFormData) {
  try {
    const data = Object.fromEntries(
      Object.entries(formData).filter(([, value]) => value !== undefined)
    );
    await adminDb.transact(adminDb.tx.contact_me[id()].create(data));

    // Best-effort: the submission is already saved, so a mail failure must not
    // fail the request (the old webhook behaved the same way).
    await sendContactNotification(formData);

    return { success: true };
  } catch (error) {
    console.error('Error submitting form:', error);
    return { success: false };
  }
}
