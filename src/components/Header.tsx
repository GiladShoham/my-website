import React from 'react';
import { User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-blue-600 dark:bg-blue-800 text-white p-4 transition-colors duration-200">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <User className="mr-2" />
          <h1 className="text-2xl font-bold">Gilad Shoham</h1>
        </div>
        <nav className="flex items-center">
          <ul className="flex space-x-4 mr-4">
            <li>
              <a
                href="#about"
                className={`hover:underline ${activeTab === 'about' ? 'font-bold' : ''}`}
                onClick={(e) => { e.preventDefault(); setActiveTab('about'); }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#talks"
                className={`hover:underline ${activeTab === 'talks' ? 'font-bold' : ''}`}
                onClick={(e) => { e.preventDefault(); setActiveTab('talks'); }}
              >
                Talks
              </a>
            </li>
            <li>
              <a
                href="#podcasts"
                className={`hover:underline ${activeTab === 'podcasts' ? 'font-bold' : ''}`}
                onClick={(e) => { e.preventDefault(); setActiveTab('podcasts'); }}
              >
                Podcasts
              </a>
            </li>
            <li>
              <a
                href="#blog"
                className={`hover:underline ${activeTab === 'blog' ? 'font-bold' : ''}`}
                onClick={(e) => { e.preventDefault(); setActiveTab('blog'); }}
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={`hover:underline ${activeTab === 'contact' ? 'font-bold' : ''}`}
                onClick={(e) => { e.preventDefault(); setActiveTab('contact'); }}
              >
                Contact
              </a>
            </li>
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;