import { Language } from '../context/LanguageContext';
import { en, Translation } from './en';
import { he } from './he';

export const translations: Record<Language, Translation> = {
  en,
  he,
};

export const useTranslation = (language: Language): Translation => {
  return translations[language];
};

export type { Translation } from './en';
