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
    <>
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

                {/* Hamburger (Always visible now) */}
                <button
                  aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((o) => !o)}
                  style={{
                    display:       'flex',
                    flexDirection: 'column',
                    gap:           '5px',
                    background:    'none',
                    border:        'none',
                    cursor:        'pointer',
                    padding:       '4px',
                    zIndex:        'calc(var(--z-nav) + 2)', // above drawer
                    position:      'relative'
                  }}
                >
                  <span style={{ 
                    display: 'block', width: '24px', height: '2px', background: 'var(--color-fg)', 
                    transition: 'transform 300ms ease, opacity 300ms ease',
                    transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'translateY(0) rotate(0)'
                  }} />
                  <span style={{ 
                    display: 'block', width: '24px', height: '2px', background: 'var(--color-fg)', 
                    transition: 'opacity 300ms ease',
                    opacity: menuOpen ? 0 : 1 
                  }} />
                  <span style={{ 
                    display: 'block', width: '24px', height: '2px', background: 'var(--color-fg)', 
                    transition: 'transform 300ms ease, opacity 300ms ease',
                    transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'translateY(0) rotate(0)'
                  }} />
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* ── Right-Side Drawer Overlay ── */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100vw',
          maxWidth: '450px',
          height: '100vh',
          background: 'rgba(3, 3, 3, 0.95)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderLeft: '1px solid var(--color-border)',
          zIndex: 'calc(var(--z-nav) + 1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '4rem 2rem',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 500ms cubic-bezier(0.77, 0, 0.175, 1)',
          boxShadow: menuOpen ? '-20px 0 60px rgba(0,0,0,0.5)' : 'none',
        }}
        aria-hidden={!menuOpen}
      >
        <ul
          role="list"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <MagneticElement strength={0.2}>
                <button
                  onClick={() => scrollTo(href)}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-muted)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 300ms var(--ease-out), transform 300ms var(--ease-out)',
                    textAlign: 'left',
                    width: '100%',
                    padding: 0,
                  }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.color = 'var(--color-accent)'; 
                    e.currentTarget.style.transform = 'translateX(10px)';
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.color = 'var(--color-muted)'; 
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                  aria-label={`Navigate to ${label.toLowerCase()} section`}
                >
                  <HackerText>{label}</HackerText>
                </button>
              </MagneticElement>
            </li>
          ))}
        </ul>

        {/* Footer info in drawer */}
        <div style={{ marginTop: 'auto', paddingTop: '4rem', borderTop: '1px solid var(--color-border)' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Get in touch
          </p>
          <a href="mailto:mshuvik@gmail.com" style={{ display: 'block', marginTop: '0.5rem', fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--color-fg)', textDecoration: 'none' }}>
            mshuvik@gmail.com
          </a>
        </div>
      </div>
    </>
  );
}
