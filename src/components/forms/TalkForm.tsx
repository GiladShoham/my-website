import React, { useState } from 'react';

interface FormData {
  topic: string;
  eventTopic: string;
  name: string;
  email: string;
  eventName: string;
  eventDate: string;
  eventFormat: string;
  audienceSize: string;
  message: string;
}

const TalkForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    topic: 'talk',
    eventTopic: '',
    name: '',
    email: '',
    eventName: '',
    eventDate: '',
    eventFormat: '',
    audienceSize: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Talk Form submitted:', formData);
    // Here you would typically send the form data to a server
    alert('Thank you for your invitation! I will get back to you soon.');
    setFormData({ 
      topic: 'talk', 
      eventTopic: '', 
      name: '', 
      email: '', 
      eventName: '', 
      eventDate: '', 
      eventFormat: '', 
      audienceSize: '', 
      message: '' 
    });
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
        <label htmlFor="eventName" className="block text-gray-700 font-bold mb-2">Event Name</label>
        <input
          type="text"
          id="eventName"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="eventDate" className="block text-gray-700 font-bold mb-2">Event Date</label>
        <input
          type="date"
          id="eventDate"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="eventFormat" className="block text-gray-700 font-bold mb-2">Event Format</label>
        <select
          id="eventFormat"
          name="eventFormat"
          value={formData.eventFormat}
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
        <label htmlFor="eventTopic" className="block text-gray-700 font-bold mb-2">Event Topic</label>
        <select
          id="eventTopic"
          name="eventTopic"
          value={formData.eventTopic}
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
        <label htmlFor="audienceSize" className="block text-gray-700 font-bold mb-2">Expected Audience Size</label>
        <input
          type="number"
          id="audienceSize"
          name="audienceSize"
          value={formData.audienceSize}
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