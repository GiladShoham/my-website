import React from 'react';
import { formClasses } from './FormStyles';

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="relative">
        <label htmlFor="language-filter" className={formClasses.label}>
          Language
        </label>
        <select
          id="language-filter"
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
          className={`${formClasses.select} w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
        >
          <option value="all">All Languages</option>
          <option value="English">English</option>
          <option value="Hebrew">Hebrew</option>
        </select>
      </div>
      
      <div className="relative">
        <label htmlFor="tag-filter" className={formClasses.label}>
          Topic
        </label>
        <select
          id="tag-filter"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          className={`${formClasses.select} w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
        >
          <option value="">All Topics</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ContentFilters; 