import React, { useState } from 'react';
import { submitContactForm } from '../../lib/submit-contact-form';
import Popup from '../common/Popup';
import { formClasses, getInputClassName } from '../common/FormStyles';

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
    <div className={formClasses.container}>
      <h2 className={formClasses.formTitle}>Request Mentorship</h2>
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
          <label htmlFor="mentorship_area" className={formClasses.label}>
            Mentorship Area<span className={formClasses.requiredStar}>*</span>
          </label>
          <select
            id="mentorship_area"
            name="mentorship_area"
            value={formData.mentorship_area}
            onChange={handleChange}
            required
            className={formClasses.select}
          >
            <option value="">Select an area</option>
            <option value="career">Career Development</option>
            <option value="technical">Technical Skills</option>
            <option value="leadership">Leadership</option>
            <option value="entrepreneurship">Entrepreneurship</option>
          </select>
        </div>

        <div className={formClasses.checkbox.wrapper}>
          <input
            type="checkbox"
            id="paid"
            name="paid"
            checked={formData.paid}
            onChange={(e) => setFormData(prev => ({ ...prev, paid: e.target.checked }))}
            className={formClasses.checkbox.input}
          />
          <label htmlFor="paid" className={formClasses.checkbox.label}>
            Willing to pay for mentorship
          </label>
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
            placeholder="Tell me about your goals and expectations..."
          />
        </div>

        <button type="submit" className={formClasses.button}>
          Request Mentorship
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

export default MentorshipForm;