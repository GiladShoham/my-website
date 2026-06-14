import { id } from '@instantdb/react';
import { db } from './db';
import { ContactFormData } from '../types/contact-form-data';

export async function submitContactForm(formData: ContactFormData) {
  try {
    await db.transact(db.tx.contact_me[id()].create(formData));

    // Best-effort email notification. The submission is already persisted, so a
    // failing/unavailable email service must not fail the user's submission.
    try {
      const res = await fetch('/api/contact-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        console.warn('Contact notification email failed:', res.status);
      }
    } catch (notifyError) {
      console.warn('Contact notification email error:', notifyError);
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting form:', error);
    return { success: false, error };
  }
}
