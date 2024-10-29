import React, { useState } from 'react';
import { submitContactForm } from '../../lib/submit-contact-form';
import Popup from '../common/Popup';

interface FormData {
  topic: string;
  name: string;
  email: string;
  home_size: string;
  number_of_devices: string;
  message: string;
}

const SmartHomeForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    topic: 'smarthome',
    name: '',
    email: '',
    home_size: '',
    number_of_devices: '',
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
        message: 'Thank you for your smart home consulting request! I will get back to you soon with more information.',
        type: 'success'
      });
      setFormData({ 
        topic: 'smarthome', 
        name: '', 
        email: '', 
        home_size: '', 
        number_of_devices: '', 
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
          <label htmlFor="home_size" className="block text-gray-700 font-bold mb-2">Home Size (sq ft/m²)</label>
          <input
            type="text"
            id="home_size"
            name="home_size"
            value={formData.home_size}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="number_of_devices" className="block text-gray-700 font-bold mb-2">Number of Smart Devices</label>
          <input
            type="number"
            id="number_of_devices"
            name="number_of_devices"
            value={formData.number_of_devices}
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
          Request Consultation
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

export default SmartHomeForm;