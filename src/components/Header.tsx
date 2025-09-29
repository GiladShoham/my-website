import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, Languages } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useTranslations } from '../lib/translations';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, isRTL } = useLanguage();
  const t = useTranslations(language);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationTabs = [
    { key: 'about', label: t.about },
    { key: 'talks', label: t.talks },
    { key: 'podcasts', label: t.podcasts },
    { key: 'blog', label: t.blog },
    { key: 'contact', label: t.contact }
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    navigate(`/${tab}`);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
            >
              Gilad Shoham
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-grow justify-center">
            <ul className={`flex space-x-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {navigationTabs.map((tab) => (
                <li key={tab.key}>
                  <button
                    onClick={() => handleTabClick(tab.key)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                      activeTab === tab.key
                        ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Theme Toggle and Language Toggle - Desktop */}
          <div className={`hidden md:flex space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <button
              onClick={toggleLanguage}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={t.toggleLanguage}
            >
              <Languages size={20} />
            </button>
            <button
              onClick={toggleTheme}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={t.toggleTheme}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <ul className="flex flex-col space-y-2">
              {navigationTabs.map((tab) => (
                <li key={tab.key}>
                  <button
                    onClick={() => handleTabClick(tab.key)}
                    className={`w-full px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                      activeTab === tab.key
                        ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    } ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={toggleLanguage}
                  className={`w-full px-4 py-2 text-sm font-medium rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center ${isRTL ? 'flex-row-reverse justify-end' : 'justify-center'}`}
                >
                  <Languages size={16} className={isRTL ? 'ml-2' : 'mr-2'} /> {language === 'en' ? t.hebrew : t.english}
                </button>
              </li>
              <li>
                <button
                  onClick={toggleTheme}
                  className={`w-full px-4 py-2 text-sm font-medium rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center ${isRTL ? 'flex-row-reverse justify-end' : 'justify-center'}`}
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun size={16} className={isRTL ? 'ml-2' : 'mr-2'} /> {t.lightMode}
                    </>
                  ) : (
                    <>
                      <Moon size={16} className={isRTL ? 'ml-2' : 'mr-2'} /> {t.darkMode}
                    </>
                  )}
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;