import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TalkForm from './forms/TalkForm';
import PodcastForm from './forms/PodcastForm';
import InvestmentForm from './forms/InvestmentForm';
import MentorshipForm from './forms/MentorshipForm';
import SmartHomeForm from './forms/SmartHomeForm';
import OtherForm from './forms/OtherForm';
import { formClasses } from './common/FormStyles';

type Topic = 'talk' | 'podcast' | 'investment' | 'mentorship' | 'smarthome' | 'other';

const ContactMe: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [topic, setTopic] = useState<Topic>('other');
  const [initialMessage, setInitialMessage] = useState<string>('');

  useEffect(() => {
    const topicParam = searchParams.get('topic');
    const messageParam = searchParams.get('message');

    if (topicParam && ['talk', 'podcast', 'investment', 'mentorship', 'smarthome', 'other'].includes(topicParam)) {
      setTopic(topicParam as Topic);
    }

    if (messageParam) {
      setInitialMessage(decodeURIComponent(messageParam));
    }
  }, [searchParams]);

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTopic(e.target.value as Topic);
  };

  const renderForm = () => {
    switch (topic) {
      case 'talk':
        return <TalkForm initialMessage={initialMessage} />;
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
    <section id="contact" className="mb-12 flex justify-center">
      <div className="max-w-lg w-full">
        <h2 className={`${formClasses.formTitle} !mb-8`}>Contact Me</h2>
        <div className={formClasses.container}>
          <div className={formClasses.inputWrapper}>
            <label htmlFor="topic" className={formClasses.label}>
              How can I help you?<span className={formClasses.requiredStar}>*</span>
            </label>
            <select
              id="topic"
              name="topic"
              value={topic}
              onChange={handleTopicChange}
              required
              className={formClasses.select}
            >
              <option value="talk">I want to invite you for a talk</option>
              <option value="podcast">I want to invite you for a podcast</option>
              <option value="investment">I'm looking for investment</option>
              <option value="mentorship">I'm looking for a mentor</option>
              <option value="smarthome">I'm looking for smart home consulting</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          {renderForm()}
        </div>
      </div>
    </section>
  );
};

export default ContactMe;