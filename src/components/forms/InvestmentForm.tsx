import React, { useState } from 'react';

interface FormData {
  topic: string;
  name: string;
  email: string;
  companyName: string;
  companyWebsite: string;
  deckUrl: string;
  projectDescription: string;
  roundSize: string;
  message: string;
}

const InvestmentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    topic: 'investment',
    name: '',
    email: '',
    companyName: '',
    companyWebsite: '',
    deckUrl: '',
    projectDescription: '',
    roundSize: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Investment Form submitted:', formData);
    // Here you would typically send the form data to a server
    alert('Thank you for your investment inquiry! I will review your proposal and get back to you soon.');
    setFormData({ topic: 'investment', name: '', email: '', companyName: '', companyWebsite: '', deckUrl: '', projectDescription: '', roundSize: '', message: '' });
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
        <label htmlFor="companyName" className="block text-gray-700 font-bold mb-2">Company Name</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="companyWebsite" className="block text-gray-700 font-bold mb-2">Company Website</label>
        <input
          type="text"
          id="companyWebsite"
          name="companyWebsite"
          value={formData.companyWebsite}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="deckUrl" className="block text-gray-700 font-bold mb-2">Deck URL</label>
        <input
          type="text"
          id="deckUrl"
          name="deckUrl"
          value={formData.deckUrl}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="projectDescription" className="block text-gray-700 font-bold mb-2">Project Description</label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          value={formData.projectDescription}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="roundSize" className="block text-gray-700 font-bold mb-2">Round Size</label>
        <input
          type="text"
          id="roundSize"
          name="roundSize"
          value={formData.roundSize}
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