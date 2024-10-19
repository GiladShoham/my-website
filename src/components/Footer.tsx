import React from 'react';
import { Github, Linkedin, Link } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2024 Gilad Shoham. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://github.com/GiladShoham" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <Github />
            </a>
            <a href="https://www.linkedin.com/in/shohamgilad/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <Linkedin />
            </a>
            <a href="https://linktr.ee/giladshoham" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <Link />
            </a>
            <a href="https://x.com/ShohamGilad" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;