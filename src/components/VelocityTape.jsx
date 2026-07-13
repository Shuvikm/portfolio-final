// VelocityTape.jsx — ALERAK-style running tape
//
// Pure CSS animation — no JavaScript position calculation.
// Content duplicated to create a seamless loop.
// Tape: lime background, black text, Syncopate, slight negative rotation.
// prefers-reduced-motion: tape pauses.

import { velocityTape } from '../data/portfolioData';

export default function VelocityTape() {
  const content = velocityTape?.items?.join(' ✦  ') || 'SHUVIK M ✦ SOFTWARE DEVELOPER ✦ REACT ✦ NODE.JS ✦ MONGODB ✦ MACHINE LEARNING';
  const display = content + ' ✦  ';

  return (
    <div
      aria-hidden="true"
      style={{
        overflow:        'hidden',
        width:           '110%',
        marginLeft:      '-5%',
        transform:       'rotate(-1.5deg)',
        background:      'var(--color-accent)',
        padding:         '0.75rem 0',
        position:        'relative',
        zIndex:          'var(--z-content)',
        borderTop:       '1px solid rgba(0,0,0,0.1)',
        borderBottom:    '1px solid rgba(0,0,0,0.1)',
      }}
    >
      {/* Duplicate spans create seamless 50%-offset loop */}
      <div className="tape-track">
        <span style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(0.7rem, 1.4vw, 1rem)',
          fontWeight:     700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color:         '#030303',
          whiteSpace:    'nowrap',
          paddingRight:  '4rem',
        }}>
          {display}
        </span>
        <span aria-hidden="true" style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(0.7rem, 1.4vw, 1rem)',
          fontWeight:     700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color:         '#030303',
          whiteSpace:    'nowrap',
          paddingRight:  '4rem',
        }}>
          {display}
        </span>
      </div>
    </div>
  );
}
