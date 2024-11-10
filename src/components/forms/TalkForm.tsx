import React, { useState } from 'react';
import { submitContactForm } from '../../lib/submit-contact-form';
import Popup from '../common/Popup';
import { formClasses, getInputClassName } from '../common/FormStyles';

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
  paid: boolean;
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
    paid: false,
  });

  const [popup, setPopup] = useState({
    isOpen: false,
    message: '',
    type: 'success' as 'success' | 'error'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await submitContactForm(formData);
    
    if (result.success) {
      setPopup({
        isOpen: true,
        message: 'Thank you for your invitation! I will get back to you soon.',
        type: 'success'
      });
      setFormData({ 
        topic: 'talk', 
        name: '', 
        email: '', 
        event_name: '', 
        event_date: '', 
        event_format: '', 
        audience_size: '', 
        event_topic: '', 
        message: '', 
        paid: false 
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
      <h2 className={formClasses.formTitle}>Speaking Engagement Request</h2>
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
          <label htmlFor="event_name" className={formClasses.label}>
            Event Name<span className={formClasses.requiredStar}>*</span>
          </label>
          <input
            type="text"
            id="event_name"
            name="event_name"
            value={formData.event_name}
            onChange={handleChange}
            required
            className={formClasses.input}
            placeholder="Enter the event name"
          />
        </div>
        <div className={formClasses.inputWrapper}>
          <label htmlFor="event_date" className={formClasses.label}>
            Event Date<span className={formClasses.requiredStar}>*</span>
          </label>
          <input
            type="date"
            id="event_date"
            name="event_date"
            value={formData.event_date}
            onChange={handleChange}
            required
            className={formClasses.input}
            placeholder="Enter the event date"
          />
        </div>
        <div className={formClasses.inputWrapper}>
          <label htmlFor="event_format" className={formClasses.label}>
            Event Format<span className={formClasses.requiredStar}>*</span>
          </label>
          <select
            id="event_format"
            name="event_format"
            value={formData.event_format}
            onChange={handleChange}
            required
            className={formClasses.select}
          >
            <option value="">Select Format</option>
            <option value="in-person">In Person</option>
            <option value="virtual">Virtual</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div className={formClasses.inputWrapper}>
          <label htmlFor="event_topic" className={formClasses.label}>
            Event Topic<span className={formClasses.requiredStar}>*</span>
          </label>
          <select
            id="event_topic"
            name="event_topic"
            value={formData.event_topic}
            onChange={handleChange}
            required
            className={formClasses.select}
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
        <div className={formClasses.inputWrapper}>
          <label htmlFor="audience_size" className={formClasses.label}>
            Expected Audience Size<span className={formClasses.requiredStar}>*</span>
          </label>
          <input
            type="number"
            id="audience_size"
            name="audience_size"
            value={formData.audience_size}
            onChange={handleChange}
            required
            className={formClasses.input}
            placeholder="Enter the expected audience size"
          />
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
            Willing to pay for the talk
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
            rows={4}
            className={formClasses.input}
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

export default TalkForm;