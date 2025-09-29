import { Language } from '../context/LanguageContext';

interface Translations {
  // Navigation
  about: string;
  talks: string;
  podcasts: string;
  blog: string;
  contact: string;
  
  // Common UI
  lightMode: string;
  darkMode: string;
  english: string;
  hebrew: string;
  
  // Page titles
  aboutMe: string;
  myTalks: string;
  myPodcasts: string;
  myBlog: string;
  contactMe: string;
  
  // Content filtering
  language: string;
  allLanguages: string;
  topic: string;
  allTopics: string;
  
  // Other common text
  readMore: string;
  toggleTheme: string;
  toggleLanguage: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    about: 'About',
    talks: 'Talks',
    podcasts: 'Podcasts',
    blog: 'Blog',
    contact: 'Contact',
    
    // Common UI
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    english: 'English',
    hebrew: 'Hebrew',
    
    // Page titles
    aboutMe: 'About Me',
    myTalks: 'My Talks',
    myPodcasts: 'My Podcasts',
    myBlog: 'My Blog',
    contactMe: 'Contact Me',
    
    // Content filtering
    language: 'Language',
    allLanguages: 'All Languages',
    topic: 'Topic',
    allTopics: 'All Topics',
    
    // Other common text
    readMore: 'Read More',
    toggleTheme: 'Toggle theme',
    toggleLanguage: 'Toggle language',
  },
  he: {
    // Navigation
    about: 'אודות',
    talks: 'הרצאות',
    podcasts: 'פודקאסטים',
    blog: 'בלוג',
    contact: 'צור קשר',
    
    // Common UI
    lightMode: 'מצב בהיר',
    darkMode: 'מצב כהה',
    english: 'אנגלית',
    hebrew: 'עברית',
    
    // Page titles
    aboutMe: 'אודותיי',
    myTalks: 'ההרצאות שלי',
    myPodcasts: 'הפודקאסטים שלי',
    myBlog: 'הבלוג שלי',
    contactMe: 'צור קשר',
    
    // Content filtering
    language: 'שפה',
    allLanguages: 'כל השפות',
    topic: 'נושא',
    allTopics: 'כל הנושאים',
    
    // Other common text
    readMore: 'קרא עוד',
    toggleTheme: 'החלף ערכת נושא',
    toggleLanguage: 'החלף שפה',
  }
};

export const useTranslations = (language: Language): Translations => {
  return translations[language];
};

export default translations;