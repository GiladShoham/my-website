import React, { useState } from 'react';
import { submitContactForm } from '../../lib/submit-contact-form';

interface FormData {
  topic: string;
  name: string;
  email: string;
  company_name: string;
  company_website: string;
  deck_url: string;
  project_description: string;
  round_size: string;
  message: string;
}

const InvestmentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    topic: 'investment',
    name: '',
    email: '',
    company_name: '',
    company_website: '',
    deck_url: '',
    project_description: '',
    round_size: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await submitContactForm(formData);
    
    if (result.success) {
      alert('Thank you for your investment inquiry! I will review your proposal and get back to you soon.');
      setFormData({ 
        topic: 'investment', 
        name: '', 
        email: '', 
        company_name: '', 
        company_website: '', 
        deck_url: '', 
        project_description: '', 
        round_size: '', 
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
        <label htmlFor="company_name" className="block text-gray-700 font-bold mb-2">Company Name</label>
        <input
          type="text"
          id="company_name"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="company_website" className="block text-gray-700 font-bold mb-2">Company Website</label>
        <input
          type="text"
          id="company_website"
          name="company_website"
          value={formData.company_website}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="deck_url" className="block text-gray-700 font-bold mb-2">Deck URL</label>
        <input
          type="text"
          id="deck_url"
          name="deck_url"
          value={formData.deck_url}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="project_description" className="block text-gray-700 font-bold mb-2">Project Description</label>
        <textarea
          id="project_description"
          name="project_description"
          value={formData.project_description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="round_size" className="block text-gray-700 font-bold mb-2">Round Size</label>
        <input
          type="text"
          id="round_size"
          name="round_size"
          value={formData.round_size}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Additional Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
        Submit Proposal
      </button>
    </form>
  );
};

export default InvestmentForm;