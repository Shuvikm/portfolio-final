// ─────────────────────────────────────────────────────────────────────────────
// useReducedMotion.js
// Returns true if the user has requested reduced motion.
// Reactively updates when the media query changes.
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';

export function useReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';

  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setPrefersReduced(e.matches);

    // Modern API
    if (mql.addEventListener) {
      mql.addEventListener('change', handler);
      return () => mql.removeEventListener('change', handler);
    }
    // Legacy fallback
    mql.addListener(handler);
    return () => mql.removeListener(handler);
  }, []);

  return prefersReduced;
}
