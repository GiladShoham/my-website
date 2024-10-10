import React, { useState } from 'react';
import TalkForm from './forms/TalkForm';
import PodcastForm from './forms/PodcastForm';
import InvestmentForm from './forms/InvestmentForm';
import MentorshipForm from './forms/MentorshipForm';
import SmartHomeForm from './forms/SmartHomeForm';
import OtherForm from './forms/OtherForm';

type Topic = 'talk' | 'podcast' | 'investment' | 'mentorship' | 'smarthome' | 'other';

const ContactMe: React.FC = () => {
  const [topic, setTopic] = useState<Topic>('other');

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTopic(e.target.value as Topic);
  };

  const renderForm = () => {
    switch (topic) {
      case 'talk':
        return <TalkForm />;
      case 'podcast':
        return <PodcastForm />;
      case 'investment':
        return <InvestmentForm />;
      case 'mentorship':
        return <MentorshipForm />;
      case 'smarthome':
        return <SmartHomeForm />;
      default:
        return <OtherForm />;
    }
  };

  return (
    <section id="contact" className="mb-12">
      <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
      <div className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="topic" className="block text-gray-700 font-bold mb-2">Topic</label>
          <select
            id="topic"
            name="topic"
            value={topic}
            onChange={handleTopicChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="talk">I want to invite you for a talk</option>
            <option value="podcast">I want to invite you for a podcast</option>
            <option value="investment">I'm looking for investment</option>
            <option value="mentorship">I'm looking for a mentor</option>
            <option value="smarthome">I'm looking for smart home consulting</option>
            <option value="other">Other</option>
          </select>
        </div>
        {renderForm()}
      </div>
    </section>
  );
};

export default ContactMe;