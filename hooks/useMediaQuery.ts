'use client';

import { useEffect, useState } from 'react';

/**
 * Subscribe to a media query.
 *
 * Always returns `false` on the server and on the first client render, so the
 * markup React hydrates against is the markup the server sent. Anything that
 * depends on the result must therefore be safe in its "false" state — for the
 * custom cursor and the desktop-only scroll effects, that means "off", which
 * is the correct fallback anyway.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => setMatches(e.matches);
    onChange(mql);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** True on touch/pen devices. Custom cursor and hover-only effects stay off. */
export function useIsCoarsePointer(): boolean {
  return useMediaQuery('(pointer: coarse)');
}

/** True where hover is genuinely available — not merely a wide viewport. */
export function useHasHover(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}
