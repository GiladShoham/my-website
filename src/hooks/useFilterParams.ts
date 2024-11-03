import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UseFilterParamsProps {
  languageFilter: string;
  setLanguageFilter: (value: string) => void;
  tagFilter: string;
  setTagFilter: (value: string) => void;
}

export const useFilterParams = ({
  languageFilter,
  setLanguageFilter,
  tagFilter,
  setTagFilter,
}: UseFilterParamsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Set initial filters from URL params
  useEffect(() => {
    const langParam = searchParams.get('lang');
    const tagParam = searchParams.get('tag');

    if (langParam && langParam !== languageFilter) {
      setLanguageFilter(langParam);
    }
    if (tagParam && tagParam !== tagFilter) {
      setTagFilter(tagParam);
    }
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (languageFilter !== 'all') {
      params.set('lang', languageFilter);
    }
    if (tagFilter) {
      params.set('tag', tagFilter);
    }

    setSearchParams(params, { replace: true });
  }, [languageFilter, tagFilter]);
}; 