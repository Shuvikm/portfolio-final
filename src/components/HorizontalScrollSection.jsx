// HorizontalScrollSection.jsx — shared horizontal scroll track
//
// Design: As the user scrolls vertically past this section, the inner track
// translates horizontally so cards move left (cinematic scroll-linked).
//
// Architecture:
//   - Uses IntersectionObserver to start/stop the scroll listener (perf).
//   - Sticky positioning: the outer wrapper is `position: sticky; top: 0`.
//   - A sentinel wrapper below the sticky panel has a calculated height so that
//     the total scrollable distance maps 1:1 to the track travel distance.
//   - Transform ownership: the .track div owns translateX. Cards must NOT set
//     any transform on their root element.
//   - Reduced-motion: falls back to a horizontal CSS scroll (overflow-x: auto).
//   - Ref-based RAF loop; cleans up on unmount.
//
// Props:
//   label      — section label string (e.g. "— 003 / WORK")
//   heading    — h2 text array or string
//   children   — the cards
//   id         — section id for anchor links
//   ariaLabel  — aria-label for the <section>

import { useRef, useEffect, useState, useCallback } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import SectionLabel from './SectionLabel';

export default function HorizontalScrollSection({
  label,
  heading,
  children,
  id,
  ariaLabel,
}) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef  = useRef(null); // outer sentinel wrapper
  const stickyRef   = useRef(null); // the sticky panel
  const trackRef    = useRef(null); // the card track that slides
  const rafRef      = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const isVisible   = useRef(false);

  // ── Measure track width on mount / resize ────────────────────────────────
  useEffect(() => {
    if (!trackRef.current) return;
    const measure = () => {
      if (trackRef.current) setTrackWidth(trackRef.current.scrollWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  // ── Viewport height (used for sentinel height calculation) ───────────────
  const [vh, setVh] = useState(window.innerHeight);
  useEffect(() => {
    const handler = () => setVh(window.innerHeight);
    window.addEventListener('resize', handler, { passive: true });
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Sentinel height = viewport height + amount we want to scroll horizontally
  // We apply a speed multiplier so the user doesn't have to scroll as far vertically.
  const SCROLL_SPEED_MULTIPLIER = 1.75;
  const horizontalScrollRange = Math.max(0, trackWidth - vh * 0.9);
  const travelDistance = horizontalScrollRange / SCROLL_SPEED_MULTIPLIER;
  const sentinelHeight = vh + travelDistance;

  // ── Scroll handler ───────────────────────────────────────────────────────
  const updateTrack = useCallback(() => {
    if (!sectionRef.current || !trackRef.current) return;
    const rect     = sectionRef.current.getBoundingClientRect();
    const progress = travelDistance > 0 
      ? Math.max(0, Math.min(1, -rect.top / travelDistance))
      : 0;
    const xOffset  = -(progress * horizontalScrollRange);
    trackRef.current.style.transform = `translate3d(${xOffset}px, 0, 0)`;
    rafRef.current = null;
  }, [travelDistance, horizontalScrollRange]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    const onScroll = () => {
      if (!isVisible.current) return;
      if (!rafRef.current) rafRef.current = requestAnimationFrame(updateTrack);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion, isMobile, updateTrack]);

  // ── IntersectionObserver: only process scroll when visible ───────────────
  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return;
    const io = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting; },
      { rootMargin: '200px' }
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, [prefersReducedMotion]);

  // ── Reduced-motion fallback ───────────────────────────────────────────────
  if (prefersReducedMotion || isMobile) {
    return (
      <section
        id={id}
        className="section"
        aria-label={ariaLabel}
        style={{ zIndex: 'var(--z-content)', position: 'relative' }}
      >
        <div style={{ padding: '0 var(--page-padding-x) 3rem' }}>
          <SectionLabel>{label}</SectionLabel>
          <h2 style={{
            fontFamily:  'var(--font-display)',
            fontSize:    'clamp(1.5rem, 5vw, 4rem)',
            marginTop:   '2rem',
            marginBottom: '3rem',
          }}>
            {Array.isArray(heading)
              ? heading.map((line, i) => <span key={i}>{line}{i < heading.length - 1 && <br />}</span>)
              : heading}
          </h2>
        </div>
        <div style={{
          display:        'flex',
          gap:            '2rem',
          overflowX:      'auto',
          padding:        '0 var(--page-padding-x) 2rem',
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--color-border) transparent',
        }}>
          {children}
        </div>
      </section>
    );
  }

  return (
    // Outer sentinel — sets the scroll-linked height
    <div
      ref={sectionRef}
      id={id}
      aria-label={ariaLabel}
      style={{ height: `${sentinelHeight}px`, position: 'relative' }}
    >
      {/* Sticky panel — viewport height, sticks while sentinel scrolls past */}
      <div
        ref={stickyRef}
        style={{
          position:   'sticky',
          top:         0,
          height:     '100vh',
          overflow:   'hidden',
          display:    'flex',
          flexDirection: 'column',
          zIndex:     'var(--z-content)',
        }}
      >
        {/* Section header */}
        <div style={{
          padding:      'clamp(3rem, 6vw, 5rem) var(--page-padding-x) 2rem',
          flexShrink:    0,
          display:      'flex',
          flexDirection: 'column',
          gap:           '1rem',
        }}>
          <SectionLabel>{label}</SectionLabel>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <h2 style={{
              fontFamily:  'var(--font-display)',
              fontSize:    'clamp(1.5rem, 5vw, 4rem)',
              lineHeight:   1,
              flexShrink:   0,
            }}>
              {Array.isArray(heading)
                ? heading.map((line, i) => <span key={i}>{line}{i < heading.length - 1 && <br />}</span>)
                : heading}
            </h2>
            <span style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '0.65rem',
              letterSpacing: '0.2em',
              color:         'var(--color-muted)',
              textTransform: 'uppercase',
              alignSelf:     'flex-end',
            }}>
              SCROLL →
            </span>
          </div>
          <div style={{ height: '1px', background: 'var(--color-border)' }} aria-hidden="true" />
        </div>

        {/* Horizontally scrolling track */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <div
            ref={trackRef}
            style={{
              display:         'flex',
              gap:             'clamp(1rem, 2vw, 1.5rem)',
              alignItems:      'stretch',
              padding:         '0 var(--page-padding-x) 2rem',
              willChange:      'transform',
              height:          '100%',
              // NO transform here on mount — updated by scroll handler
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
