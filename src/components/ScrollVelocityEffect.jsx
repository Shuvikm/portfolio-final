// ScrollVelocityEffect.jsx
//
// Applies a CSS skewY effect to approved wrapper elements based on scroll velocity.
// Writes --skew-x custom property to its container div.
// Children with className="scroll-skew" receive the skew via CSS (defined in globals.css).
//
// IMPORTANT: only wraps approved large typography sections.
// NEVER applied to: body, main, nav, horizontal tracks, proof viewers.
//
// RAF: starts only when scrolling, decays when velocity returns to zero.
// Passive scroll listener.
// Max skew: 5deg.
// prefers-reduced-motion: completely disabled.

import { useEffect, useRef } from 'react';

const MAX_SKEW     = 5;
const DECAY_FACTOR = 0.85;
const THRESHOLD    = 0.01;

export default function ScrollVelocityEffect({ children }) {
  const containerRef  = useRef(null);
  const rafRef        = useRef(null);
  const lastScrollY   = useRef(window.scrollY);
  const velocityRef   = useRef(0);
  const skewRef       = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const container = containerRef.current;
    if (!container) return;

    const decay = () => {
      // Decay velocity toward zero
      velocityRef.current *= DECAY_FACTOR;
      // Target skew proportional to velocity
      const targetSkew = Math.max(-MAX_SKEW, Math.min(MAX_SKEW, velocityRef.current * 0.02));
      // Lerp current skew toward target
      skewRef.current += (targetSkew - skewRef.current) * 0.15;

      container.style.setProperty('--skew-x', `${skewRef.current.toFixed(3)}deg`);

      if (Math.abs(skewRef.current) > THRESHOLD || Math.abs(velocityRef.current) > THRESHOLD) {
        rafRef.current = requestAnimationFrame(decay);
      } else {
        skewRef.current    = 0;
        velocityRef.current = 0;
        container.style.setProperty('--skew-x', '0deg');
        rafRef.current = null;
      }
    };

    const onScroll = () => {
      const currentY = window.scrollY;
      velocityRef.current = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(decay);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ '--skew-x': '0deg', position: 'relative' }}
    >
      {children}
    </div>
  );
}
