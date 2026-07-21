// ─────────────────────────────────────────────────────────────────────────────
// App.jsx — Application shell
//
// Section order (Sample 2 direction):
//   01 / HERO        — full-viewport opening scene
//   02 / IDENTITY    — editorial About + Education
//   03 / SYSTEM      — technical territories
//   04 / WORK        — horizontal-pinned project chapters
//   05 / CREDENTIALS — certification evidence
//   06 / IMPACT      — horizontal-pinned achievement proof
//   07 / CONTACT     — final scene + resume
//
// Layer architecture (z-index):
//   --z-background (-10) — page background
//   --z-content    (  1) — sections
//   --z-noise      ( 30) — noise texture overlay
//   --z-nav        ( 40) — navigation
//   --z-cursor     ( 50) — NeonCursorEffect WebGL canvas
//   --z-modal      (200) — MediaLightbox / modals (above cursor)
//
// RESUME ARCHITECTURE:
//   VIEW RESUME opens the real PDF in a new browser tab.
//   The portfolio WebGL canvas stays in this tab.
//   The PDF tab is a native browser document — no portfolio overlays possible.
// ─────────────────────────────────────────────────────────────────────────────
import './styles/globals.css';
import SpiderCursor     from './components/SpiderCursor';
import Preloader        from './components/Preloader';

import Navigation       from './components/Navigation';

import Hero           from './sections/Hero';
import Identity       from './sections/Identity';
import AnimatedBanner from './components/AnimatedBanner';
import System         from './sections/System';
import Work           from './sections/Work';
import Credentials    from './sections/Credentials';
import Impact         from './sections/Impact';
import WheelGallery   from './components/WheelGallery';
import Contact        from './sections/Contact';

export default function App() {
  return (
    <>
      <Preloader />
      <SpiderCursor />
      {/* ── Layer: Navigation ── */}
      <Navigation />

      <main id="main-content">
        <Hero />
        <Identity />
        <System />
        <AnimatedBanner />
        <Work />
        <Credentials />
        <Impact />
        <WheelGallery />
        <Contact />

        <footer
          style={{
            borderTop: '1px solid var(--color-border)',
            padding: 'clamp(2rem, 4vw, 3rem) var(--page-padding-x)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
          aria-label="Footer"
        >
          <span style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(0.65rem, 1.2vw, 0.85rem)',
            letterSpacing: '0.12em',
          }}>
            SHUVIK M
          </span>
          <span style={{ color: 'var(--color-muted)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
            © 2026
          </span>
        </footer>
      </main>
    </>
  );
}
