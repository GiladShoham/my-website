import React, { useState } from 'react';
import { submitContactForm } from '../../lib/submit-contact-form';
import Popup from '../common/Popup';
import { formClasses, getInputClassName } from '../common/FormStyles';

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
    <div className={formClasses.container}>
      <h2 className={formClasses.formTitle}>Smart Home Consulting Request</h2>
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
            placeholder="your@email.com"
          />
        </div>

        <div className={formClasses.inputWrapper}>
          <label htmlFor="home_size" className={formClasses.label}>
            Home Size (sq ft/m²)<span className={formClasses.requiredStar}>*</span>
          </label>
          <input
            type="text"
            id="home_size"
            name="home_size"
            value={formData.home_size}
            onChange={handleChange}
            required
            className={formClasses.input}
            placeholder="e.g., 2000 sq ft"
          />
        </div>

        <div className={formClasses.inputWrapper}>
          <label htmlFor="number_of_devices" className={formClasses.label}>
            Number of Smart Devices<span className={formClasses.requiredStar}>*</span>
          </label>
          <input
            type="number"
            id="number_of_devices"
            name="number_of_devices"
            value={formData.number_of_devices}
            onChange={handleChange}
            required
            className={formClasses.input}
            placeholder="e.g., 10"
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
            className={formClasses.textarea}
            placeholder="Describe your smart home needs..."
          />
        </div>

        <button type="submit" className={formClasses.button}>
          Request Consultation
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

export default SmartHomeForm;