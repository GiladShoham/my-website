import React, { useState } from 'react';
import { submitContactForm } from '../../lib/submit-contact-form';
import Popup from '../common/Popup';

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
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="podcast_name" className="block text-gray-700 font-bold mb-2">Podcast Name</label>
          <input
            type="text"
            id="podcast_name"
            name="podcast_name"
            value={formData.podcast_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Send Invitation
        </button>
      </form>
      <Popup
        isOpen={popup.isOpen}
        onClose={() => setPopup(prev => ({ ...prev, isOpen: false }))}
        message={popup.message}
        type={popup.type}
      />
    </>
  );
};

export default PodcastForm;