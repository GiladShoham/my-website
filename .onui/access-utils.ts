/**
 * Access Control Utilities - Auto-generated
 *
 * Contains utility functions for checking route/API access levels.
 * Regenerate with: npx onui update
 */

import access from './access.json';

export type AccessLevel = 'public' | 'restricted' | 'hidden';

/**
 * Check access level for a path
 */
export function resolveAccess(path: string, type: 'route' | 'api'): AccessLevel {
  // Check exact match
  const exactMatch = type === 'route'
    ? (access.routes as Record<string, AccessLevel>)[path]
    : (access.apis as Record<string, AccessLevel>)[path];
  if (exactMatch) return exactMatch;

  // Check glob rules
  for (const rule of access.rules.filter((r: any) => r.type === type)) {
    if (matchGlob(path, rule.pattern)) return rule.accessLevel as AccessLevel;
  }

  return 'public';
}

/**
 * Simple glob matching
 */
function matchGlob(path: string, pattern: string): boolean {
  const regex = pattern
    .replace(/\*\*/g, '.*')
    .replace(/\*/g, '[^/]*');
  return new RegExp(`^${regex}$`).test(path);
}

/**
 * Filter visible routes (not hidden)
 */
export function filterVisibleRoutes<T extends { path: string }>(routes: T[]): T[] {
  return routes.filter(route => resolveAccess(route.path, 'route') !== 'hidden');
}
