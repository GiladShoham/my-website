/**
 * OnUI Provider - Auto-generated
 * Framework: React (React Router v6)
 * Generated: 2026-03-09T13:01:40.905Z
 *
 * Regenerate with: npx onui update
 */

import '@onui/sdk/styles';
import { OnUIProvider as OnUISDKProvider, Sidebar } from '@onui/sdk';
import type { DesignTokens } from '@onui/sdk';
import { useNavigate } from 'react-router-dom';

// Generated API registry (factory-based — replaces api-callbacks.ts + api-meta.ts)
import { apiCallbacks, apisMeta } from './api-registry';
import { resolveAccess } from './access-utils';

// Cached analysis data
import config from './config.json';
import designTokens from './design-tokens.json';
import routeSuggestionsData from './route-suggestions.json';
import access from './access.json';

// Transform suggestions to SDK format (string arrays)
const routeSuggestions: Record<string, string[]> = Object.fromEntries(
  Object.entries(routeSuggestionsData.suggestions || {}).map(([path, items]) => [
    path,
    (items as Array<{ text: string }>).map((s) => s.text),
  ])
);

export function OnUIProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <OnUISDKProvider
      projectKey={import.meta.env.VITE_ONUI_KEY || config.projectKey}
      position="right"
      theme="auto"
      toggleMode="tag"
      layoutMode="overlay"
      designTokens={designTokens as DesignTokens}
      routeSuggestions={routeSuggestions}
      router={{
        push: (path) => {
          const accessLevel = resolveAccess(path, 'route');
          if (accessLevel === 'hidden') {
            console.warn('[OnUI] Navigation blocked: route is hidden');
            return;
          }
          if (accessLevel === 'restricted') {
            console.warn('[OnUI] Navigation blocked: route is restricted');
            return;
          }
          navigate(path);
        },
      }}
      apis={apiCallbacks}
      apisMeta={apisMeta}
    >
      {children}
      <Sidebar />
    </OnUISDKProvider>
  );
}

export default OnUIProvider;

