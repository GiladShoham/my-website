import React from 'react';
import { Github, Linkedin, Link } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-900 py-12 transition-all duration-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-8">
          <div className="flex space-x-6">
            {[
              { icon: <Github size={24} />, href: 'https://github.com/GiladShoham', label: 'GitHub' },
              { icon: <Linkedin size={24} />, href: 'https://www.linkedin.com/in/shohamgilad/', label: 'LinkedIn' },
              { icon: <Link size={24} />, href: 'https://linktr.ee/giladshoham', label: 'LinkTree' },
              { 
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                  </svg>
                ), 
                href: 'https://x.com/ShohamGilad',
                label: 'X (Twitter)'
              }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transform hover:scale-110 transition-all duration-200"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              &copy; {new Date().getFullYear()} Gilad Shoham. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;