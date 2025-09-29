import React from 'react';
import { formClasses } from './FormStyles';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslations } from '../../lib/translations';

interface ContentFiltersProps {
  languageFilter: string;
  setLanguageFilter: (value: string) => void;
  tagFilter: string;
  setTagFilter: (value: string) => void;
  allTags: string[];
}

const ContentFilters: React.FC<ContentFiltersProps> = ({
  languageFilter,
  setLanguageFilter,
  tagFilter,
  setTagFilter,
  allTags,
}) => {
  const { language, isRTL } = useLanguage();
  const t = useTranslations(language);
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${isRTL ? 'text-right' : ''}`}>
      <div className="relative">
        <label htmlFor="language-filter" className={formClasses.label}>
          {t.language}
        </label>
        <select
          id="language-filter"
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
          className={`${formClasses.select} w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${isRTL ? 'text-right' : ''}`}
        >
          <option value="all">{t.allLanguages}</option>
          <option value="English">{t.english}</option>
          <option value="Hebrew">{t.hebrew}</option>
        </select>
      </div>
      
      <div className="relative">
        <label htmlFor="tag-filter" className={formClasses.label}>
          {t.topic}
        </label>
        <select
          id="tag-filter"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          className={`${formClasses.select} w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${isRTL ? 'text-right' : ''}`}
        >
          <option value="">{t.allTopics}</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ContentFilters; 