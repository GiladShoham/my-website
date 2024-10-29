import React, { useState } from 'react';
import { submitContactForm } from '../../lib/submit-contact-form';
import Popup from '../common/Popup';

interface FormData {
  topic: string;
  name: string;
  email: string;
  mentorship_area: string;
  paid: boolean;
  message: string;
}

const MentorshipForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    topic: 'mentorship',
    name: '',
    email: '',
    mentorship_area: '',
    paid: false,
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
    const result = await submitContactForm(formData);
    
    if (result.success) {
      setPopup({
        isOpen: true,
        message: 'Thank you for your mentorship request! I will review your application and get back to you soon.',
        type: 'success'
      });
      setFormData({ 
        topic: 'mentorship', 
        name: '', 
        email: '', 
        mentorship_area: '', 
        paid: false, 
        message: '' 
      });
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
          <label htmlFor="mentorship_area" className="block text-gray-700 font-bold mb-2">Area of Mentorship</label>
          <input
            type="text"
            id="mentorship_area"
            name="mentorship_area"
            value={formData.mentorship_area}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="paid"
              checked={formData.paid}
              onChange={(e) => setFormData(prev => ({ ...prev, paid: e.target.checked }))}
              className="mr-2"
            />
            <span className="text-gray-700 font-bold">Willing to pay for mentorship</span>
          </label>
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
          Request Mentorship
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

export default MentorshipForm;