import { supabase } from './supabase';
import { ContactFormData } from '../types/contact-form-data';

export async function submitContactForm(formData: ContactFormData) {
  try {
    const { data, error } = await supabase
      .from('contact_me')
      .insert([formData]);

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error submitting form:', error);
    return { success: false, error };
  }
} 