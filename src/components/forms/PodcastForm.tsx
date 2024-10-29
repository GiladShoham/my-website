import React, { useState } from 'react';
import { submitContactForm } from '../../lib/submit-contact-form';
import Popup from '../common/Popup';
import { formClasses, getInputClassName } from '../common/FormStyles';

interface FormData {
  topic: string;
  name: string;
  email: string;
  podcast_name: string;
  message: string;
}

const PodcastForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    topic: 'podcast',
    name: '',
    email: '',
    podcast_name: '',
    message: '',
  });

  const [popup, setPopup] = useState({
    isOpen: false,
    message: '',
    type: 'success' as 'success' | 'error'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataWithTopic = { ...formData, topic: 'podcast' };
    const result = await submitContactForm(formDataWithTopic);
    
    if (result.success) {
      setPopup({
        isOpen: true,
        message: 'Thank you for your podcast invitation! I will get back to you soon.',
        type: 'success'
      });
      setFormData({ topic: 'podcast', name: '', email: '', podcast_name: '', message: '' });
    } else {
      setPopup({
        isOpen: true,
        message: 'There was an error submitting your form. Please try again.',
        type: 'error'
      });
    }
  };

  return (
    <div className={formClasses.container}>
      <h2 className={formClasses.formTitle}>Podcast Invitation</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={formClasses.inputWrapper}>
          <label htmlFor="name" className={formClasses.label}>
            Name<span className={formClasses.requiredStar}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={formClasses.input}
            placeholder="Enter your full name"
          />
        </div>
        <div className={formClasses.inputWrapper}>
          <label htmlFor="email" className={formClasses.label}>
            Email<span className={formClasses.requiredStar}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={formClasses.input}
            placeholder="Enter your email"
          />
        </div>
        <div className={formClasses.inputWrapper}>
          <label htmlFor="podcast_name" className={formClasses.label}>
            Podcast Name<span className={formClasses.requiredStar}>*</span>
          </label>
          <input
            type="text"
            id="podcast_name"
            name="podcast_name"
            value={formData.podcast_name}
            onChange={handleChange}
            required
            className={formClasses.input}
            placeholder="Enter the podcast name"
          />
        </div>
        <div className={formClasses.inputWrapper}>
          <label htmlFor="message" className={formClasses.label}>
            Message<span className={formClasses.requiredStar}>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className={formClasses.textarea}
            placeholder="Enter your message"
          ></textarea>
        </div>
        <button type="submit" className={formClasses.button}>
          Send Invitation
        </button>
      </form>
      <Popup
        isOpen={popup.isOpen}
        onClose={() => setPopup(prev => ({ ...prev, isOpen: false }))}
        message={popup.message}
        type={popup.type}
      />
    </div>
  );
};

export default PodcastForm;