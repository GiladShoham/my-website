import { id } from '@instantdb/react';
import { db } from './db';
import { ContactFormData } from '../types/contact-form-data';

export async function submitContactForm(formData: ContactFormData) {
  try {
    await db.transact(db.tx.contact_me[id()].create(formData));
    return { success: true };
  } catch (error) {
    console.error('Error submitting form:', error);
    return { success: false, error };
  }
}
