// Hero.jsx — ALERAK-style hero
//
// Full-viewport opening scene. Bottom-anchored composition.
// Typography: Syncopate, ~13vw, outlined (text-stroke), fill lime on char hover (pure CSS).
// No secondary cursor — CursorEffect is the only cursor owner.
// VelocityTape renders below this section (in App.jsx).

import { useState, useEffect, useRef } from 'react';
import { profile }      from '../data/portfolioData';
import HeroWord         from '../components/HeroWord';
import MagneticElement  from '../components/MagneticElement';
import ResumeButton     from '../components/ResumeButton';

const IDENTITY_INTERVAL = 3000;

export default function Hero() {
  const [identityIdx,     setIdentityIdx]     = useState(0);
  const [identityVisible, setIdentityVisible] = useState(true);
  const timerRef = useRef(null);

  // Identity cycling — useRef to hold timer
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !profile.heroIdentities?.length) return;

    timerRef.current = setInterval(() => {
      setIdentityVisible(false);
      setTimeout(() => {
        setIdentityIdx((i) => (i + 1) % profile.heroIdentities.length);
        setIdentityVisible(true);
      }, 300);
    }, IDENTITY_INTERVAL);

    return () => clearInterval(timerRef.current);
  }, []);

  const scrollToWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      aria-label="Hero — Shuvik M, Software Developer"
      style={{
        minHeight:      '100svh',
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'flex-end',
        padding:        'var(--page-padding-x)',
        paddingTop:     '7rem',
        paddingBottom:  'clamp(3rem, 6vw, 5rem)',
        position:       'relative',
        overflow:       'hidden',
        zIndex:         'var(--z-content)',
      }}
    >
      {/* ── Ambient glow — subtle, no animation ── */}
      <div aria-hidden="true" style={{ position:'absolute', inset:0, overflow:'hidden', zIndex:0, pointerEvents:'none' }}>
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: 'clamp(400px, 60vw, 900px)', height: 'clamp(400px, 60vw, 900px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(204,255,0,0.04) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }} />
      </div>

      {/* ── Top-right metadata cluster with portrait photo ── */}
      <div style={{
        position:      'absolute',
        top:           'clamp(5.5rem, 9vw, 8rem)',
        right:         'var(--page-padding-x)',
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'flex-end',
        gap:           'clamp(1rem, 2vw, 1.5rem)',
        zIndex:         2,
      }}>

        {/* Metadata */}
        <div style={{
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'flex-end',
          gap:           '0.35rem',
        }}>
          {['CSE / 2023 — 2027', 'ERODE / INDIA', 'FULL STACK / ML'].map((l) => (
            <span key={l} style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '0.55rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         'var(--color-muted)',
            }}>
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* ── Main bottom composition ── */}
      <div style={{ position:'relative', zIndex:2 }}>

        {/* Identity pill */}
        <div style={{ marginBottom: 'clamp(1rem, 2vw, 1.75rem)' }}>
          <span
            aria-live="polite"
            aria-atomic="true"
            style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           '0.5rem',
              fontFamily:    'var(--font-body)',
              fontSize:      '0.6rem',
              fontWeight:     600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color:         'var(--color-accent)',
              border:        '1px solid var(--color-accent)',
              padding:       '0.3rem 0.75rem',
              opacity:       identityVisible ? 1 : 0,
              transform:     identityVisible ? 'translateY(0)' : 'translateY(-5px)',
              transition:    'opacity 300ms ease, transform 300ms ease',
            }}
          >
            <span style={{
              width: '5px', height: '5px', borderRadius: '50%',
              background: 'var(--color-accent)', flexShrink: 0, display: 'inline-block',
              animation: 'blink 1.4s ease-in-out infinite',
            }} aria-hidden="true" />
            {profile.heroIdentities?.[identityIdx] ?? profile.role}
          </span>
        </div>

        {/* ── Photo + Name Group ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 3vw, 2.5rem)', flexWrap: 'wrap' }}>
          {/* ── Hero name — HeroWord, outlined, each char hoverable ── */}
          <MagneticElement strength={0.08}>
            <h1
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(4rem, 13vw, 14rem)',
                lineHeight:    0.86,
                letterSpacing: '-0.03em',
                // text-stroke applied per .hero-char in globals.css
              }}
            >
              <HeroWord
                text={profile.nameFirst}
                style={{ display: 'block' }}
              />
              <HeroWord
                text={profile.nameLast}
                style={{ display: 'block' }}
              />
            </h1>
          </MagneticElement>

          {/* Square Photo (Right side of name) */}
          <div style={{
            width: 'clamp(140px, 22vw, 260px)',
            height: 'clamp(140px, 22vw, 260px)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '2px solid var(--color-accent)',
            boxShadow: '0 16px 32px rgba(0,0,0,0.5)',
            flexShrink: 0,
            marginTop: 'auto',
            marginBottom: 'clamp(1rem, 3vw, 2rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-bg)',
          }}>
            <img
              src="/assets/images/shuvik-photo.jpg"
              alt="Shuvik M portrait"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Role label */}
        <p style={{
          fontFamily:    'var(--font-body)',
          fontSize:      'clamp(0.6rem, 1.2vw, 0.75rem)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color:         'var(--color-muted)',
          marginTop:     'clamp(1rem, 2vw, 1.5rem)',
        }}>
          {profile.role}
        </p>

        {/* Divider */}
        <div aria-hidden="true" style={{
          height: '1px', background: 'var(--color-border)',
          margin: 'clamp(1.5rem, 3vw, 2.5rem) 0',
        }} />

        {/* CTA row */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          flexWrap:       'wrap',
          gap:            '1.5rem',
        }}>
          <p style={{
            fontFamily:    'var(--font-body)',
            fontSize:      'clamp(0.7rem, 1.3vw, 0.85rem)',
            letterSpacing: '0.06em',
            color:         'var(--color-muted)',
            maxWidth:      '38ch',
            lineHeight:     1.7,
            textTransform: 'uppercase',
          }}>
            {profile.bio}
          </p>

          <div style={{ display:'flex', gap:'1.25rem', alignItems:'center', flexShrink:0 }}>
            <MagneticElement strength={0.3}>
              <ResumeButton />
            </MagneticElement>

            <MagneticElement strength={0.4}>
              <button
                aria-label="Scroll to projects"
                onClick={scrollToWork}
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      '0.55rem',
                  fontWeight:     600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color:         'var(--color-muted)',
                  background:    'none',
                  border:        '1px solid var(--color-border)',
                  padding:       '0.65rem 1rem',
                  cursor:        'pointer',
                  display:       'flex',
                  flexDirection: 'column',
                  alignItems:    'center',
                  gap:           '0.3rem',
                  transition:    'border-color 200ms, color 200ms',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-muted)'; }}
              >
                <span style={{ fontSize:'1.1rem' }} aria-hidden="true">↓</span>
                WORK
              </button>
            </MagneticElement>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
