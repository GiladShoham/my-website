'use client';

import { useEffect } from 'react';

interface UseFilterParamsProps {
  languageFilter: string;
  setLanguageFilter: (value: string) => void;
  tagFilter: string;
  setTagFilter: (value: string) => void;
}

/**
 * Syncs the language/tag filters with the URL query string using the History
 * API. This intentionally avoids `useSearchParams()` so the surrounding page
 * can be fully server-rendered (no prerender bailout), which keeps the content
 * crawlable for SEO. Filters from the URL are applied on the client after mount.
 */
export const useFilterParams = ({
  languageFilter,
  setLanguageFilter,
  tagFilter,
  setTagFilter,
}: UseFilterParamsProps) => {
  // Set initial filters from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang');
    const tagParam = params.get('tag');

    if (langParam && langParam !== languageFilter) {
      setLanguageFilter(langParam);
    }
    if (tagParam && tagParam !== tagFilter) {
      setTagFilter(tagParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const queryString = params.toString();
    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;
    window.history.replaceState(null, '', newUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageFilter, tagFilter]);
};
