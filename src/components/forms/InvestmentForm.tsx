import React, { useState } from 'react';
import { submitContactForm } from '../../lib/submit-contact-form';
import Popup from '../common/Popup';
import { formClasses, getInputClassName } from '../common/FormStyles';

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
        message: 'Thank you for your investment inquiry! I will review your proposal and get back to you soon.',
        type: 'success'
      });
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
      setPopup({
        isOpen: true,
        message: 'There was an error submitting your form. Please try again.',
        type: 'error'
      });
    }
  };

  return (
    <div className={formClasses.container}>
      <h2 className={formClasses.formTitle}>Investment Proposal</h2>
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
          <label htmlFor="company_name" className={formClasses.label}>
            Company Name<span className={formClasses.requiredStar}>*</span>
          </label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            required
            className={formClasses.input}
            placeholder="Your company name"
          />
        </div>

        <div className={formClasses.inputWrapper}>
          <label htmlFor="company_website" className={formClasses.label}>
            Company Website<span className={formClasses.requiredStar}>*</span>
          </label>
          <input
            type="url"
            id="company_website"
            name="company_website"
            value={formData.company_website}
            onChange={handleChange}
            required
            className={formClasses.input}
            placeholder="https://your-company.com"
          />
        </div>

        <div className={formClasses.inputWrapper}>
          <label htmlFor="deck_url" className={formClasses.label}>
            Deck URL<span className={formClasses.requiredStar}>*</span>
          </label>
          <input
            type="url"
            id="deck_url"
            name="deck_url"
            value={formData.deck_url}
            onChange={handleChange}
            required
            className={formClasses.input}
            placeholder="https://deck-url.com"
          />
        </div>

        <div className={formClasses.inputWrapper}>
          <label htmlFor="round_size" className={formClasses.label}>
            Round Size<span className={formClasses.requiredStar}>*</span>
          </label>
          <input
            type="text"
            id="round_size"
            name="round_size"
            value={formData.round_size}
            onChange={handleChange}
            required
            className={formClasses.input}
            placeholder="e.g., $1M - $5M"
          />
        </div>

        <div className={formClasses.inputWrapper}>
          <label htmlFor="project_description" className={formClasses.label}>
            Project Description<span className={formClasses.requiredStar}>*</span>
          </label>
          <textarea
            id="project_description"
            name="project_description"
            value={formData.project_description}
            onChange={handleChange}
            required
            className={formClasses.textarea}
            placeholder="Describe your project in detail..."
          />
        </div>

        <div className={formClasses.inputWrapper}>
          <label htmlFor="message" className={formClasses.label}>
            Additional Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={formClasses.textarea}
            placeholder="Any additional information..."
          />
        </div>

        <button type="submit" className={formClasses.button}>
          Submit Proposal
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

export default InvestmentForm;