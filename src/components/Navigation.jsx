// Navigation.jsx — ALERAK-style brutal floating nav
//
// === Transform ownership architecture (three-wrapper law) ===
//   nav-position wrapper  → owns: fixed position, translateX (centering in float state)
//   nav-tilt ref          → owns: perspective rotateX rotateY (float state only)
//   MagneticElement inner → owns: translate3d of each link item
//
// These three systems NEVER write to the same transform property.
//
// === States ===
//   Initial (scrollY ≤ 100): full-width, transparent, large horizontal padding
//   Scrolled (scrollY > 100): centred floating panel, blur, border, shadow, radius
//
// === React state ===
//   Only the boolean `scrolled` triggers re-render.
//   Scroll listener updates state only on threshold crossing.
//   Tilt is written via ref — never state.

import { useState, useEffect, useRef, useCallback } from 'react';
import HackerText     from './HackerText';
import MagneticElement from './MagneticElement';

const NAV_LINKS = [
  { label: 'WORK',    href: '#projects' },
  { label: 'ABOUT',   href: '#about'    },
  { label: 'SKILLS',  href: '#skills'   },
];

const MAX_TILT  = 10;  // degrees

export default function Navigation() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const navTiltRef                  = useRef(null);

  // ── Scroll threshold — only one boolean state update on crossing ───────────
  useEffect(() => {
    let current = false;
    const handler = () => {
      const next = window.scrollY > 100;
      if (next !== current) {
        current  = next;
        setScrolled(next);
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // ── Tilt — pointer tracking written via ref, no state ─────────────────────
  const onPointerMove = useCallback((e) => {
    if (!scrolled || !navTiltRef.current) return;
    const vw   = window.innerWidth;
    const vh   = window.innerHeight;
    const nx   = (e.clientX / vw - 0.5) * 2;   // -1 → 1
    const ny   = (e.clientY / vh - 0.5) * 2;   // -1 → 1
    const rotY =  nx * MAX_TILT;
    const rotX = -ny * MAX_TILT;
    navTiltRef.current.style.transform =
      `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  }, [scrolled]);

  // Reset tilt when returning to initial state
  useEffect(() => {
    if (!scrolled && navTiltRef.current) {
      navTiltRef.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    }
  }, [scrolled]);

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, [onPointerMove]);

  const scrollTo = (href) => {
    const id = href.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  // ── Styles ────────────────────────────────────────────────────────────────
  const wrapStyle = scrolled ? {
    // Floating centred panel — position wrapper
    position:   'fixed',
    top:        '1.25rem',
    left:       '50%',
    transform:  'translateX(-50%)',
    zIndex:     'var(--z-nav)',
    width:      'min(92vw, 700px)',
    // No transition on transform — tilt is written directly
  } : {
    // Full-width initial state
    position:   'fixed',
    top:        0,
    left:       0,
    right:      0,
    zIndex:     'var(--z-nav)',
  };

  const tiltStyle = {
    // Tilt wrapper — receives perspective rotateX/Y from ref
    transformStyle: 'preserve-3d',
    transition:     scrolled ? 'none' : 'transform 400ms var(--ease-out)',
  };

  const panelStyle = scrolled ? {
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
    padding:        '0.75rem 1.5rem',
    background:     'rgba(3, 3, 3, 0.88)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border:         '1px solid var(--color-border)',
    borderRadius:   '12px',
    boxShadow:      '0 16px 48px rgba(0,0,0,0.6)',
  } : {
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
    padding:        '1.5rem var(--page-padding-x)',
    background:     'transparent',
  };

  return (
    <header id="nav-header" aria-label="Site navigation">
      {/* ── Position wrapper ── */}
      <div style={wrapStyle}>
        {/* ── Tilt wrapper (ref-controlled, no state) ── */}
        <div ref={navTiltRef} style={tiltStyle}>
          {/* ── Panel ── */}
          <nav style={panelStyle} role="navigation" aria-label="Main navigation">

            {/* Left: Glitch logo */}
            <MagneticElement strength={0.4} style={{ flexShrink: 0 }}>
              <button
                className="glitch-logo"
                onClick={() => scrollTo('#hero')}
                aria-label="Go to top — Shuvik M"
                style={{ background: 'none', border: 'none' }}
              >
                SHUVIK
              </button>
            </MagneticElement>

            {/* Centre: HackerText nav links (hidden on mobile via inline) */}
            <ul
              role="list"
              style={{
                display:        window.innerWidth > 640 ? 'flex' : (menuOpen ? 'flex' : 'none'),
                listStyle:      'none',
                gap:            'clamp(1.5rem, 3vw, 2.5rem)',
                alignItems:     'center',
              }}
            >
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <MagneticElement strength={0.3}>
                    <button
                      onClick={() => scrollTo(href)}
                      style={{
                        fontFamily:    'var(--font-body)',
                        fontSize:      '0.65rem',
                        fontWeight:     600,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color:         'var(--color-muted)',
                        background:    'none',
                        border:        'none',
                        cursor:        'pointer',
                        transition:    'color 150ms ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-fg)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-muted)'; }}
                      aria-label={`Navigate to ${label.toLowerCase()} section`}
                    >
                      <HackerText>{label}</HackerText>
                    </button>
                  </MagneticElement>
                </li>
              ))}
            </ul>

            {/* Right: CTA + mobile toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
              <MagneticElement strength={0.35}>
                <button
                  onClick={() => scrollTo('#contact')}
                  style={{
                    fontFamily:    'var(--font-body)',
                    fontSize:      '0.62rem',
                    fontWeight:     600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color:         'var(--color-bg)',
                    background:    'var(--color-accent)',
                    border:        'none',
                    padding:       '0.55rem 1.1rem',
                    cursor:        'pointer',
                    transition:    'background 150ms ease, color 150ms ease',
                    whiteSpace:    'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-fg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--color-accent)';
                  }}
                  aria-label="Navigate to contact section"
                >
                  LET'S TALK
                </button>
              </MagneticElement>

              {/* Mobile hamburger */}
              <button
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((o) => !o)}
                style={{
                  display:     'none', // shown via media query below
                  flexDirection: 'column',
                  gap:          '4px',
                  background:   'none',
                  border:       'none',
                  cursor:       'pointer',
                  padding:      '4px',
                }}
                id="nav-hamburger"
              >
                <span style={{ display:'block', width:'20px', height:'1px', background: 'var(--color-fg)', transition:'transform 200ms' }} />
                <span style={{ display:'block', width:'20px', height:'1px', background: 'var(--color-fg)', opacity: menuOpen ? 0 : 1 }} />
                <span style={{ display:'block', width:'20px', height:'1px', background: 'var(--color-fg)', transition:'transform 200ms' }} />
              </button>
            </div>
          </nav>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #nav-hamburger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
