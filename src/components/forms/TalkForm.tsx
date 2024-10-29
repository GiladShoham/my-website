import React, { useState } from 'react';
import { submitContactForm } from '../../lib/submit-contact-form';

interface FormData {
  topic: string;
  name: string;
  email: string;
  event_name: string;
  event_date: string;
  event_format: string;
  audience_size: string;
  event_topic: string;
  message: string;
}

const TalkForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    topic: 'talk',
    name: '',
    email: '',
    event_name: '',
    event_date: '',
    event_format: '',
    audience_size: '',
    event_topic: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await submitContactForm(formData);
    
    if (result.success) {
      alert('Thank you for your invitation! I will get back to you soon.');
      setFormData({ 
        topic: 'talk', 
        name: '', 
        email: '', 
        event_name: '', 
        event_date: '', 
        event_format: '', 
        audience_size: '', 
        event_topic: '', 
        message: '' 
      });
    } else {
      alert('There was an error submitting your form. Please try again.');
    }
  };

  return (
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
        <label htmlFor="event_name" className="block text-gray-700 font-bold mb-2">Event Name</label>
        <input
          type="text"
          id="event_name"
          name="event_name"
          value={formData.event_name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="event_date" className="block text-gray-700 font-bold mb-2">Event Date</label>
        <input
          type="date"
          id="event_date"
          name="event_date"
          value={formData.event_date}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="event_format" className="block text-gray-700 font-bold mb-2">Event Format</label>
        <select
          id="event_format"
          name="event_format"
          value={formData.event_format}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Format</option>
          <option value="in-person">In Person</option>
          <option value="virtual">Virtual</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="event_topic" className="block text-gray-700 font-bold mb-2">Event Topic</label>
        <select
          id="event_topic"
          name="event_topic"
          value={formData.event_topic}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Topic</option>
          <option value="technology">Technology</option>
          <option value="entrepreneurship">Entrepreneurship</option>
          <option value="startup">Startup</option>
          <option value="innovation">Innovation</option>
          <option value="leadership">Leadership</option>
          <option value="digital-transformation">Digital Transformation</option>
          <option value="ai">Artificial Intelligence</option>
          <option value="smart-home">Smart Home Technology</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="audience_size" className="block text-gray-700 font-bold mb-2">Expected Audience Size</label>
        <input
          type="number"
          id="audience_size"
          name="audience_size"
          value={formData.audience_size}
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
  );
};

export default TalkForm;