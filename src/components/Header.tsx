import React, { useState } from 'react';
import { User, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-blue-600 dark:bg-blue-800 text-white p-4 transition-colors duration-200">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <User className="mr-2" />
          <h1 className="text-2xl font-bold">Gilad Shoham</h1>
        </div>
        <nav className="hidden md:flex items-center">
          <ul className="flex space-x-4 mr-4">
            <li>
              <a
                href="#about"
                className={`hover:underline ${activeTab === 'about' ? 'font-bold' : ''}`}
                onClick={(e) => { e.preventDefault(); handleTabClick('about'); }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#talks"
                className={`hover:underline ${activeTab === 'talks' ? 'font-bold' : ''}`}
                onClick={(e) => { e.preventDefault(); handleTabClick('talks'); }}
              >
                Talks
              </a>
            </li>
            <li>
              <a
                href="#podcasts"
                className={`hover:underline ${activeTab === 'podcasts' ? 'font-bold' : ''}`}
                onClick={(e) => { e.preventDefault(); handleTabClick('podcasts'); }}
              >
                Podcasts
              </a>
            </li>
            <li>
              <a
                href="#blog"
                className={`hover:underline ${activeTab === 'blog' ? 'font-bold' : ''}`}
                onClick={(e) => { e.preventDefault(); handleTabClick('blog'); }}
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={`hover:underline ${activeTab === 'contact' ? 'font-bold' : ''}`}
                onClick={(e) => { e.preventDefault(); handleTabClick('contact'); }}
              >
                Contact
              </a>
            </li>
          </ul>
          <ThemeToggle />
        </nav>
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <button onClick={toggleMenu} className="ml-4">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden mt-4">
          <ul className="flex flex-col space-y-2">
            <li>
              <a
                href="#about"
                className={`block py-2 ${activeTab === 'about' ? 'font-bold' : ''}`}
                onClick={(e) => { e.preventDefault(); handleTabClick('about'); }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#talks"
                className={`block py-2 ${activeTab === 'talks' ? 'font-bold' : ''}`}
                onClick={(e) => { e.preventDefault(); handleTabClick('talks'); }}
              >
                Talks
              </a>
            </li>
            <li>
              <a
                href="#podcasts"
                className={`block py-2 ${activeTab === 'podcasts' ? 'font-bold' : ''}`}
                onClick={(e) => { e.preventDefault(); handleTabClick('podcasts'); }}
              >
                Podcasts
              </a>
            </li>
            <li>
              <a
                href="#blog"
                className={`block py-2 ${activeTab === 'blog' ? 'font-bold' : ''}`}
                onClick={(e) => { e.preventDefault(); handleTabClick('blog'); }}
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={`block py-2 ${activeTab === 'contact' ? 'font-bold' : ''}`}
                onClick={(e) => { e.preventDefault(); handleTabClick('contact'); }}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;